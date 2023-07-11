import { useState, useEffect } from "react";
import { useParams} from "react-router-dom";
import {
    Comment, Button, Input, Descriptions,
    Popconfirm
} from '@arco-design/web-react';
import {getReq, putReq} from "../../../tools/requests.js";
import {capitalFirstLetter} from "../../../tools/string.js";
import "./pre-screening.css";
import PreScreeningCommentsList from "./CommentsList.jsx";
import {getAccAndPsw, getCurrentUserCYCID} from "../../../tools/auth.js";
import {getTimeStamp} from "../../../tools/datetime.js";
import {IconEdit} from "@arco-design/web-react/icon";
import CandidateModal from "../../../components/UI_Modal/CandidateModal.jsx";

export default function PreScreening() {
    const RID = useParams().RID || '64a792fbe3a86cdad7522be7';

    const [userDatas, setUserDatas] = useState(null);
    const [commentText, setCommentText] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const [userCYC_ID, setUserCYC_ID] = useState(null);
    const [visible, setVisible] = useState(false);

    function getUserData(){
        getReq( `/recruiter/${RID}`).then((res) => {
            setUserDatas(res);
        });
    }



    useEffect(() => {
        getUserData();
        getCurrentUserCYCID().then((res) => {
            setUserCYC_ID(res);
        });
    }, [])

    useEffect(() => {
        getUserData();
    }, [visible]);






     const handleStatus = (status) => {
        const pre_screening_status = status ? "pre-accepted" : "pre-rejected";

        const time = getTimeStamp();

        const pre_screening = {
            status: pre_screening_status,
            pre_screening_time: time,
        }

        setIsButtonClicked(true);

        putReq(`/application/${RID}`, pre_screening).then((res) => {
            setUserDatas((userDatas) => ({
                ...userDatas,
                application: {
                    ...userDatas.application,
                    status: pre_screening_status,
                },
            }));
        });
    }

    const handleComment = (e) => {
        e.preventDefault();

        if (commentText.trim() === '') {
            return;
        }

        let comment = {
            "timestamp": getTimeStamp(),
            "comment": commentText,
            "CYC_ID": userCYC_ID,
        };
        //console.log(comment)

        setUserDatas((userDatas) => ({
            ...userDatas,
            pre_screening: {
                ...userDatas.pre_screening,
                comments: [...userDatas.pre_screening.comments, comment],
            },
        }));

        putReq(`/comments/${RID}`, comment).then((res) => {
            setCommentText('');
        });

    };

    const isButtonDisabled = isButtonClicked ||
        (userDatas && userDatas.pre_screening && userDatas.pre_screening.status !== null);

    return (
        <div className="pre-screening-con">
            <div style={{ position: "relative", overflow: "auto" }}>
                <div style={{
                    display: "flex", flexDirection: "column", alignItems: "center", padding: "15px"
                }}>
                    {userDatas && (
                        <div>
                            <div className="arco-descriptions-title" style={{ textAlign: "center", marginBottom: "25px" }}>
                                <span style={{marginRight:10}}>Candidate Information</span>
                                <IconEdit style={{cursor:"pointer"}} onClick={() => setVisible(true)}  />
                            </div>
                            <Descriptions
                                column={1}
                                data={[
                                    {
                                        label: 'Name',
                                        value: userDatas.info.name,
                                    },
                                    {
                                        label: 'Contact Number',
                                        value: userDatas.info.phone,
                                    },
                                    {
                                        label: 'Email',
                                        value: userDatas.info.email,
                                    },
                                    {
                                        label: 'Pastoral Team',
                                        value: `${capitalFirstLetter(userDatas.info.pastoral_team[0])}, 
                                    ${capitalFirstLetter(userDatas.info.pastoral_team[1])}`,
                                    },
                                    {
                                        label: 'Ministry',
                                        value: capitalFirstLetter(userDatas.info.ministry[2]),
                                    },
                                    {
                                        label: 'Status',
                                        value: capitalFirstLetter(userDatas.application.status),
                                    }
                                ]}
                                labelStyle={{ textAlign: 'right', paddingRight: 36 }}
                            />
                        </div>
                    )}

                    <div style={{ marginTop: "15px" }}>
                        <Popconfirm
                            disabled={isButtonDisabled}
                            focusLock
                            title='Confirm'
                            content='Are you sure you want to pass this candidate?'
                            onOk={() => {
                                handleStatus(true)
                            }}
                            onCancel={() => {
                            }}

                        >
                            <Button type='primary' status="success"
                                style={{
                                    marginRight: "10px",
                                }}
                                disabled={isButtonDisabled}>Pass</Button>
                        </Popconfirm>
                        <Popconfirm
                            disabled={isButtonDisabled}
                            focusLock
                            title='Confirm'
                            content='Are you sure you want to filter out this candidates?'
                            onOk={() => {
                                handleStatus(false)
                            }}
                            onCancel={() => {
                            }}

                        >
                            <Button type='secondary'
                                disabled={isButtonDisabled}>Next Time</Button>
                        </Popconfirm>
                    </div>
                </div>

                <div style={{ position: 'relative', padding: '8px 12px' }}>
                    {userDatas && <PreScreeningCommentsList userDatas={userDatas} />}
                </div>
            </div>
            <Comment
                style={{ marginBottom: "15px" }}
                align='right'
                actions={<Button key='1' type='primary' onClick={(e) => handleComment(e)}>
                    Comment
                </Button>}
                content={
                    <div>
                        <Input.TextArea
                            placeholder='Write a comment ...'
                            value={commentText}
                            onChange={(value, e) => setCommentText(value)}
                        />
                    </div>
                }
            />
            {
                userDatas && <CandidateModal recruiter={userDatas} visible={visible} setVisible={setVisible} />
            }
        </div>
    )
}

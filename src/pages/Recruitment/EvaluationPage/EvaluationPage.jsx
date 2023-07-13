import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Affix, Button, Space, List, Card, Message} from '@arco-design/web-react';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getReq, putReq} from "../../../tools/requests.js";
import {PreScreeningComment} from "../PreScreeningPage/CommentsList.jsx";
import UI_ConfirmModal from "../../../components/UI_Modal/UI_ConfirmModal/UI_ConfirmModal.jsx";
export default function Evaluation_Page() {
    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Evaluation",
            link: "/recruitment_evaluation",
            clickable: true
        }
    ]
    const [comments, setComments] = useState(null);
    const [QAs, setQAs] = useState(null);
    const [showBack, setShowBack] = useState(false);

    const RID =   useParams().RID;
    const navigate = useNavigate();

    function chooseQAs(data){
        return data.ministry.questions;
    }

    function formatQuestions(question){
        let items = question.split("-");
        items.shift();
        return items.join(" ");
    }

    useEffect(() => {
        getReq(`/comments/${RID}`).then((res) => {
            setComments(res);
            //console.log(res)

        });

        getReq(`/interview/answers/${RID}`).then((res) => {
            setQAs(chooseQAs(res));
        });

    }, []);

    function confirmSubmit(status){
        // accepted  / rejected

        let data = {
            status : status
        }
        const submitEvaluation = () => {
            putReq(`/application/${RID}`,data).then((res) => {
                if(res.status){
                    Message.success('Evaluation submitted successfully')
                    setShowBack(true);
                }
            });
        };
        UI_ConfirmModal("Confirm", "Are you sure to submit the evaluation?", submitEvaluation);
    }


    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component" style={{padding:"0 30px", boxSizing:"border-box"}}>
                    <Affix offsetTop={10}>
                        <Space style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                            {
                                showBack ?<Button type="primary" style={{width:100}} onClick={()=>navigate("/recruitment_evaluation")}>Back</Button>
                                :<div>
                                    <Button status='danger' style={{width:100,marginRight:10}} onClick={()=>confirmSubmit("rejected")}>Next Time</Button>
                                    <Button status='warning' style={{width:100,marginRight:10}}  onClick={()=>confirmSubmit("kiv")}>KIV</Button>
                                    <Button type="primary" style={{width:100}}  onClick={()=>confirmSubmit("accepted")}>Pass</Button>
                                </div>
                            }
                        </Space>
                    </Affix>

                    <Space direction='vertical' size='large' style={{ overflowY: 'auto', marginTop: "24px", width: "100%" }}>
                        { QAs !== null &&
                            <div>
                                <div>
                                    <h2>General Questions</h2>
                                    { Object.entries(QAs).map(([key, value]) => {
                                        if (key.slice(0, 1) === "g")
                                            return <Card title={formatQuestions(key)} key={key}> {value} </Card>
                                    })}
                                </div>
                                <div>
                                    <h2>Specific Questions</h2>
                                    { Object.entries(QAs).map(([key, value]) => {
                                        if (key.slice(0, 1) === "s")
                                            return <Card title={formatQuestions(key)} key={key}> {value} </Card>
                                    })}
                                </div>
                                <div>
                                    <h2>Q&A</h2>
                                    { Object.entries(QAs).map(([key, value]) => {
                                        if (key.slice(0, 1) === "f")
                                            return <Card title={"Free Q&A section"} key={key}> {value} </Card>
                                    })}
                                </div>
                            </div>
                        }

                        <div>
                            <h2>Pre-Screening</h2>
                            {
                                comments !== null &&
                                <List bordered={false} header={<span>{comments.length} comments</span>}>
                                    {comments.map((item, index) => {
                                        return (
                                            <List.Item key={index}>
                                                <PreScreeningComment item={item} index={index}/>
                                            </List.Item>
                                        );
                                    })}
                                </List>
                            }
                        </div>

                    </Space>
            </div>
        </>
    )
}
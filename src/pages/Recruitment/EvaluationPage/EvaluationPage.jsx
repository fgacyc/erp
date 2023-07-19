import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Affix, Button, Space, List, Card, Message} from '@arco-design/web-react';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getReq, putReq} from "../../../tools/requests.js";
import {PreScreeningComment} from "../PreScreeningPage/CommentsList.jsx";
import UI_ConfirmModal from "../../../components/UI_Modal/UI_ConfirmModal/UI_ConfirmModal.jsx";
import VocalRatingTable from "../InterviewPage/VocalRatingTable.jsx";
import {capitalAllFirstLetter} from "../../../tools/string.js";
import {classifyQuestion} from "./data.js";
import EvaluationResultRubberStamp from "./RubberStamp.jsx";
import "./EvaluationPage.css";
import {get} from "idb-keyval";
import {distanceBetweenPoints} from "chart.js/helpers";
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
    const [AISummary, setAISummary] = useState(null);
    const [ifVocal, setIfVocal] = useState(false);
    const [vocalRatingForm, setVocalRatingForm] = useState(null);
    const [currentRubberStampType, setCurrentRubberStampType] = useState(null);
    const [currentCandidate, setCurrentCandidate] = useState(null);

    const RID =   useParams().RID;
    const navigate = useNavigate();




    useEffect(() => {
        getReq(`/comments/${RID}`).then((res) => {
            setComments(res.data);
        });

        getReq(`/interview/answers/${RID}`).then((res) => {
            let qes =res.ministry.questions;
            setQAs(classifyQuestion(qes));
            ifCandidateVocal(qes);
        });

        getReq(`/performance/${RID}`).then((res) => {
            if(res.status === "success"){
                setAISummary(res.data);
            }
        });

        get("current_candidate").then((res) => {
            setCurrentCandidate(res);
            if(res.application.status === "accepted"||
                res.application.status === "rejected"||
                res.application.status === "kiv"){
                setShowBack(true);
                setCurrentRubberStampType(res.application.status);
            }
        });

    }, []);

    function  ifCandidateVocal(QAs){
        for (let item of QAs){
            if(item.type === "vocalRating"){
                setIfVocal(true);
                setVocalRatingForm(item.interviewer);
                return;
            }
        }
    }

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
                    setCurrentRubberStampType(status);
                }
            });
        };

        let evaluationMap = {
            "rejected":"Next Time",
            "kiv":"KIV",
            "accepted":"Pass"
        }
        let evaluation = capitalAllFirstLetter(evaluationMap[status]);

        UI_ConfirmModal("Confirm", `Are you sure to submit the evaluation: [${evaluation}] ?`, submitEvaluation);
    }


    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component" style={{padding:"0 30px", boxSizing:"border-box"}}>
                    <Affix offsetTop={10}>
                        <Space style={{ width: '100%', display: 'flex', justifyContent: 'end' }}>
                            {
                                showBack ?
                                    <div>
                                        <Button type="outline" style={{width:100,marginRight:10}} onClick={()=>navigate("/recruitment_evaluation")}>Back</Button>
                                        <Button type="outline" style={{width:100}} onClick={()=>setShowBack(false)}>Reset</Button>
                                    </div>
                                :<div>
                                    <Button status='danger' style={{width:100,marginRight:10}} onClick={()=>confirmSubmit("rejected")}>Next Time</Button>
                                    <Button status='warning' style={{width:100,marginRight:10}}  onClick={()=>confirmSubmit("kiv")}>KIV</Button>
                                    <Button type='primary' status="success" style={{width:100}}  onClick={()=>confirmSubmit("accepted")}>Pass</Button>
                                </div>
                            }
                        </Space>
                    </Affix>

                    <Space direction='vertical' size='large' style={{ overflowY: 'auto', marginTop: "24px", width: "100%" }}>
                        { AISummary !== null &&
                            <div>
                                <h2>AI Summary</h2>
                                <p className="ai-summary-con">{AISummary}</p>
                            </div>
                        }
                        { QAs !== null &&
                            <div>
                                { QAs.general.length > 0 &&
                                    <div>
                                        <h2>General Questions</h2>
                                        {  QAs.general.map((item, index) => {
                                            return  <Card title={item.question} key={index}>
                                                <div style={{marginBottom:10}}>
                                                    <span style={{fontWeight:"bold"}}>Candidate Answer:</span>
                                                    <span>{item.candidate} </span>
                                                </div>
                                                <div >
                                                    <span style={{fontWeight:"bold"}}>Interviewer Remark: </span>
                                                    <span>{item.interviewer}</span>
                                                </div>
                                            </Card>
                                        })}
                                    </div>
                                }
                                {
                                    QAs.specific.length > 0 &&
                                    <div>
                                        <h2>Specific Questions</h2>
                                        {  QAs.specific.map((item, index) => {
                                            return  <Card title={item.question} key={index}> {item.candidate} </Card>
                                        })}
                                    </div>
                                }
                                {
                                    QAs["freeQ&As"].length > 0 &&

                                    <div>
                                        <h2>Q&A</h2>
                                        {  QAs["freeQ&As"].map((item, index) => {
                                            return  <Card title={item.question} key={index}> {item.interviewer} </Card>
                                        })}
                                    </div>
                                }

                            </div>
                        }
                        {ifVocal &&
                            <div>
                                <h2>Praise & Worship Audition From</h2>
                                <VocalRatingTable vocalRatingForm={vocalRatingForm} setVocalRatingForm={setVocalRatingForm}/>
                            </div>
                        }
                        {
                            comments !== null && comments.length !== 0 &&
                            <div>
                                <h2>Pre-Screening</h2>
                                <List bordered={false} header={<span>{comments.length} comments</span>}>
                                    {comments.map((item, index) => {
                                        return (
                                            <List.Item key={index}>
                                                <PreScreeningComment item={item} index={index}/>
                                            </List.Item>
                                        );
                                    })}
                                </List>
                            </div>
                        }

                    </Space>
                {currentRubberStampType && <EvaluationResultRubberStamp type={currentRubberStampType}  /> }

            </div>
        </>
    )
}
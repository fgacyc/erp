import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Affix, Button, Space, List, Card, Message} from '@arco-design/web-react';
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {getReq, putReq} from "../../../tools/requests.js";
import {PreScreeningComment} from "../PreScreeningPage/CommentsList.jsx";
import UI_ConfirmModal from "../../../components/UI_Modal/UI_ConfirmModal/UI_ConfirmModal.jsx";
import VocalRatingTable from "../InterviewPage/VocalRatingTable.jsx";
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

    const RID =   useParams().RID;
    const navigate = useNavigate();




    useEffect(() => {
        getReq(`/comments/${RID}`).then((res) => {
            setComments(res);
            console.log(res)

        });

        getReq(`/interview/answers/${RID}`).then((res) => {
            let qes =res.ministry.questions;
            setQAs(qes);
            // console.log(res.ministry.questions)
            ifCandidateVocal(qes);
        });

        getReq(`/performance/${RID}`).then((res) => {
            if(res.status === "success"){
                setAISummary(res.data);
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
                        { AISummary !== null &&
                            <div>
                                <h2>AI Summary</h2>
                                <p>{AISummary}</p>
                            </div>
                        }
                        { QAs !== null &&
                            <div>
                                <div>
                                    <h2>General Questions</h2>
                                    {  QAs.map((item, index) => {
                                        if(item.type === "general"){
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
                                        }
                                    })}
                                </div>
                                <div>
                                    <h2>Specific Questions</h2>
                                    {  QAs.map((item, index) => {
                                        if(item.type !== "general" && item.type !== "freeQ&As"){
                                            return  <Card title={item.question} key={index}> {item.candidate} </Card>
                                        }
                                    })}
                                </div>
                                <div>
                                    <h2>Q&A</h2>
                                    {  QAs.map((item, index) => {
                                        if(item.type === "freeQ&As"){
                                            return  <Card title={item.question} key={index}> {item.interviewer} </Card>
                                        }
                                    })}
                                </div>
                            </div>
                        }
                        {ifVocal &&
                            <div>
                                <h2>Praise & Worship Audition From</h2>
                                <VocalRatingTable vocalRatingForm={vocalRatingForm} setVocalRatingForm={setVocalRatingForm}/>
                            </div>
                        }

                        <div>
                            <h2>Pre-Screening</h2>
                            {
                                comments !== null && comments.length >0 &&
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
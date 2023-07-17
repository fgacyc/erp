import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import { useNavigate, useParams} from "react-router-dom";
import {Button, Card, Input, Message, Result, Select, Steps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {getReq, postReq} from "../../../tools/requests.js";
import {get} from "idb-keyval";
import QuestionGroup1 from "./QuestionGroup1.jsx";
import "./recruitment-appo.css"
import {pad, tableDataString} from "./data.js";
import VocalRatingTable from "./VocalRatingTable.jsx";
import FreeQATextArea from "./FreeQATextArea.jsx";
import {Interview_form_Section3} from "./Interview_form_Section3.jsx";


const Step = Steps.Step;


const CountdownTimer = () => {
    const [countdown, setCountdown] = useState(15 * 60); // 初始倒计时为15分钟

    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prevCountdown => prevCountdown - 1);
        }, 1000);

        return () => clearInterval(timer); // 组件卸载时清除计时器

    }, []);

    // 将倒计时的分钟和秒数格式化为字符串
    const formatTime = () => {
        const minutes = Math.floor(countdown / 60);
        const seconds = countdown % 60;
        return `${pad(minutes)}:${pad(seconds)}`;
    };

    return (
        <div style={{position: "absolute",top:20,right:40}}>
            {countdown >= 600 && <p>{formatTime()}</p>}
            {countdown < 600 && countdown> 300 && <p style={{color:"orange"}}>{formatTime()}</p>}
            {countdown <= 300 && countdown> 0 && <p style={{color:"red"}}>{formatTime()}</p>}
            {countdown <= 0 && <p style={{color:"red"}}>Time's up!</p>}
        </div>
    );
};

export default function Interview_form() {
    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Interview",
            link: "/recruitment_interview",
            clickable: true
        }
    ]
    let {RID,partID} = useParams();

    const [QAs, setQAs] = useState([]);
    const [freeQAs, setFreeQAs] = useState("");
    const [ifSubmitted, setIfSubmitted] = useState(false);
    const navigate = useNavigate();
    const [ministry, setMinistry] = useState(null);
    const [candidate, setCandidate] = useState(null);
    const [interviewers, setInterviewers] = useState(null);
    const [currentInterviewers, setCurrentInterviewers] = useState(null);
    const [ifDisabledSubmit, setIfDisabledSubmit] = useState(false);
    const [disabledPrevious, setDisabledPrevious] = useState(false);
    const [vocalRatingForm, setVocalRatingForm] = useState(null);
    const [ifInterviewed, setIfInterviewed] = useState(false);

    useEffect(() => {
        get("current_candidate").then((res) => {
            // console.log(res)
            setMinistry(res.info.ministry[2]);
            setQAs(res.interview.ministry.questions);
            setCandidate(res.info);
            setIfInterviewed(res.interview.status);
        })
        initVocalRatingForm();
    }, []);

    useEffect(() => {
        let target;
        if(partID === "1" || partID === "2"){
            target = document.getElementById("interview-form");
        }else{
            return;
        }
        if (partID === "1"){
            target.classList.remove("full-screen-app-component")
            target.classList.add("long-screen-app-component")
            setDisabledPrevious(true);
        }else if (partID === "2"){
            let target = document.getElementById("interview-form");
            target.classList.remove("long-screen-app-component")
            target.classList.add("full-screen-app-component")
            setDisabledPrevious(false);
        }

        // console.log(QAs)
    }, [partID]);


    function backToInterViewTable(){
        navigate(`/recruitment_interview`);
    }

    function goToNextPart(num){
        partID  =    parseInt(partID);
        // console.log(QAs)

        if(num ===1){
            if (partID === 4) return;
            navigate(`/recruitment_interview/form/${RID}/${parseInt(partID)+1}`);
        }else{
            if (partID === 1) return;
            navigate(`/recruitment_interview/form/${RID}/${parseInt(partID)-1}`);
        }
    }
    function addFreeQAs(){
        for (let ele of QAs){
            if (ele.type === "freeQ&As"){
                ele.interviewer = freeQAs;
                return;
            }
        }

        let newQAs = QAs;
        newQAs.push({
            type: "freeQ&As",
            interviewer: freeQAs,
        })
        setQAs(newQAs);
    }

    function addVocalRating(){
        if (candidate.ministry[2] !== "vocal") return;
        for ( let ele of QAs){
            if (ele.type === "vocalRating"){
                ele.interviewer = vocalRatingForm;
                return;
            }
        }
        let newQAs = QAs;
        newQAs.push({
            type: "vocalRating",
            interviewer: vocalRatingForm,
        })
        setQAs(newQAs);
    }

    async function submitHandler(){
        if(!currentInterviewers){
            Message.warning('Please select interviewers');
            return;
        }
        addFreeQAs();
        addVocalRating();

        let data = {
            interviewers: currentInterviewers,
            questions : QAs,
        }

        // console.log(data)
        // return;

        let res =await postReq(`/interview/answers/${RID}`,data)

        if(res.status){
            setIfSubmitted(true);
            setIfDisabledSubmit(true);
            console.log(res)
        }
    }

    function initVocalRatingForm(){
        let vocalRatingForm = {
             "stars" :  Array(10).fill(0),
             "remarks" : Array(10).fill("")
        };
        setVocalRatingForm(vocalRatingForm);
    }


    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component" style={{position:"relative"}} id="interview-form">
                <div style={{height:30}}></div>
                <CountdownTimer  />
                <Steps current={parseInt(partID)} style={{ maxWidth: 780, margin: '0 auto' }}>
                    <Step title='General Questions' />
                    {/*<Step title='Specific Questions' />*/}
                    <Step title='Q&A' />
                    <Step title='Finish' />
                </Steps>
                {
                    partID === '1' &&
                    <div>
                        {QAs.length >0 && QAs.map((question, index) => {
                            if(question.type === "general"){
                                return (
                                    <QuestionGroup1 questions={QAs} setQuestions={setQAs} key={index} id={index} ifInterviewed={ifInterviewed}/>
                                )
                            }
                        })}
                        {QAs && QAs.map((question, index) => {
                            if(question.type !== "general" && question.type !== "freeQ&As" && question.type !== "vocalRating"){
                                return (
                                    <QuestionGroup1 questions={QAs} setQuestions={setQAs} key={index} id={index} ifInterviewed={ifInterviewed}/>
                                )
                            }
                        })}
                    </div>
                }
                {
                    partID === '2' &&
                    <FreeQATextArea candidate={candidate}
                                    questions={QAs}
                                    freeQAs={freeQAs}
                                    setFreeQAs={setFreeQAs}
                                    vocalRatingForm={vocalRatingForm}
                                    setVocalRatingForm={setVocalRatingForm}
                                    ifInterviewed={ifInterviewed}/>
                }
                {
                    partID === '3' &&
                    <Interview_form_Section3
                            ministry={ministry}
                            interviewers={interviewers}
                            setInterviewers={setInterviewers}
                            currentInterviewers={currentInterviewers}
                            setCurrentInterviewers={setCurrentInterviewers}
                             ifSubmitted={ifSubmitted}
                             backToInterViewTable={backToInterViewTable}
                            ifInterviewed={ifInterviewed}
                    />
                }
                <div style={{height:100}}></div>
                {partID === '1' && <Button type='primary'
                                          style={{bottom:80}}
                                           className="interview-btns interview-btns-left" id={"interview-btn-left"}
                                           disabled={true}
                                           onClick={()=>goToNextPart(-1)}>Previous </Button>

                }
                {
                    partID === '2' && <Button type='primary'
                                              className="interview-btns interview-btns-left" id={"interview-btn-left"}
                                              disabled={false}
                                              onClick={()=>goToNextPart(-1)}>Previous </Button>
                }
                {
                    partID === '3' && <Button type='primary'
                                              className="interview-btns interview-btns-left" id={"interview-btn-left"}
                                              disabled={false}
                                              onClick={()=>goToNextPart(-1)}>Previous </Button>
                }
                {  partID === '1' &&  <Button type='primary'
                                              style={{bottom:80}}
                                   className="interview-btns interview-btns-right" id={"interview-btn-right"}
                                   onClick={()=>goToNextPart(1)}>Next</Button>
                }
                {  partID === '2' &&  <Button type='primary'
                                              className="interview-btns interview-btns-right" id={"interview-btn-right"}
                                              onClick={()=>goToNextPart(1)}>Next</Button>
                }

                {
                    partID === '3'&& <Button type='primary'
                               disabled={ifDisabledSubmit}
                               className="interview-btns interview-btns-right"
                               onClick={submitHandler}>Submit</Button>
                }
            </div>
        </>
    )
}
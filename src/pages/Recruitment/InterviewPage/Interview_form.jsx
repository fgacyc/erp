import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import { useNavigate, useParams} from "react-router-dom";
import {Button, Input, Message, Result, Select, Steps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {getReq, postReq} from "../../../tools/requests.js";
import {get} from "idb-keyval";
import QuestionGroup1 from "./QuestionGroup1.jsx";
import "./recruitment-appo.css"
import {pad} from "./data.js";

const Option = Select.Option;
const Step = Steps.Step;
const TextArea = Input.TextArea;

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

    const [interviewers, setInterviewers] = useState(null);
    const  [currentInterviewers, setCurrentInterviewers] = useState(null);
    const [ifDisabledSubmit, setIfDisabledSubmit] = useState(false);
    const [disabledPrevious, setDisabledPrevious] = useState(false);

    useEffect(() => {
        get("current_candidate").then((res) => {
            // console.log(res)
            setMinistry(res.info.ministry[2]);
            setQAs(res.interview.ministry.questions);
        })
    }, []);

    useEffect(() => {
        ministry && getReq(`/interviewers/${ministry}`).then((res) => {
            setInterviewers(res.data);
            // console.log(res.data)
        })
    }, [ministry]);

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
    }, [partID]);



    function backToInterViewTable(){
        navigate(`/recruitment_interview`);
    }

    function goToNextPart(num){
        partID  =    parseInt(partID);
        console.log(QAs)

        if(num ===1){
            if (partID === 4) return;
            navigate(`/recruitment_interview/form/${RID}/${parseInt(partID)+1}`);
        }else{
            if (partID === 1) return;
            navigate(`/recruitment_interview/form/${RID}/${parseInt(partID)-1}`);
        }
    }
    function addFreeQAs(){
        let newQAs = QAs;
        newQAs.push({
            type: "freeQ&As",
            interviewer: freeQAs,
        })
        setQAs(newQAs);
    }

    async function submitHandler(){
        if(!currentInterviewers){
            Message.warning('Please select interviewers');
            return;
        }
        addFreeQAs();

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
                        {QAs.map((question, index) => {
                            if(question.type === "general"){
                                return (
                                    <QuestionGroup1 questions={QAs} setQuestions={setQAs} key={index} id={index}/>
                                )
                            }
                        })}
                        {QAs.map((question, index) => {
                            if(question.type !== "general" && question.type !== "freeQ&As"){
                                return (
                                    <QuestionGroup1 questions={QAs} setQuestions={setQAs} key={index} id={index}/>
                                )
                            }
                        })}
                    </div>
                }
                {
                    partID === '2' &&
                    <div style={{ display: "flex",justifyItems:"center" }}>
                        <TextArea
                            onChange={setFreeQAs}
                            placeholder='Please enter ...'
                            style={{
                                width: "80%",
                                resize: "none",
                                margin:"50px auto"
                        }}
                            autoSize={{ minRows: 20}}
                        />
                    </div>
                }
                {
                    partID === '3' &&
                        <div style={{ display: "flex",flexDirection:"column",alignItems:"center",justifyItems:"center" }}>
                            <div style={{margin:"30px 0 10px 0"}}>Interviewers</div>
                            <Select
                                mode='multiple'
                                placeholder='Please select'
                                style={{ width: 600 }}
                                defaultValue={[]}
                                allowClear
                                onChange={list => setCurrentInterviewers(list)}
                            >
                                {interviewers && interviewers.map((interviewer,index) => (
                                    <Option key={index} value={interviewer.CYC_ID}>
                                        {interviewer.username
                                            ? interviewer.username
                                            : interviewer.full_name
                                        }
                                    </Option>
                                ))}
                            </Select>
                            {
                                ifSubmitted &&
                                <Result
                                    style={{marginTop:70}}
                                    status='success'
                                    title='Submission Success'
                                    subTitle='Recruitment form has been submitted successfully.'
                                    extra={[
                                        <Button key='back' type='primary' onClick={backToInterViewTable}>
                                            Back
                                        </Button>,
                                    ]}
                                ></Result>
                            }
                    </div>
                }
                <Button type='primary'
                        className="interview-btns interview-btns-left" id={"interview-btn-left"}
                        disabled={disabledPrevious}
                        onClick={()=>goToNextPart(-1)}>Previous </Button>
                {
                    partID !== '3'
                    ?  <Button type='primary'
                               className="interview-btns interview-btns-right" id={"interview-btn-right"}
                               onClick={()=>goToNextPart(1)}>Next</Button>
                    :  <Button type='primary'
                               disabled={ifDisabledSubmit}
                               className="interview-btns interview-btns-right"
                               onClick={submitHandler}>Submit</Button>
                }
            </div>
        </>
    )
}
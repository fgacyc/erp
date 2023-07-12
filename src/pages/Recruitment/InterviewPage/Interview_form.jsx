import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Cascader, Input, Message, Result, Select, Steps} from "@arco-design/web-react";
import {useState} from "react";
import {generalQuestions} from "./generalQuestions.js";
import QuestionGroup from "./QuestionGroup.jsx";
import {people_experience_specific_questions,
    creative_team_specific_questions,
    communication_specific_questions} from "./specificQuestions.js";
import {postReq} from "../../../tools/requests.js";

const Option = Select.Option;
const Step = Steps.Step;
const TextArea = Input.TextArea;

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
    const  [interviewers, setInterviewers] = useState(null);
    const [QAs, setQAs] = useState([]);
    const [freeQAs, setFreeQAs] = useState("");
    const [ifSubmitted, setIfSubmitted] = useState(false);

    const navigate = useNavigate();


    const conStyle = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    }

    const team = 'People Experience';
    let specificQuestions = [];
    if (team === 'People Experience') {
        specificQuestions = people_experience_specific_questions;
    }else if (team === 'Creative Team') {
        specificQuestions = creative_team_specific_questions;
    }else if (team === 'Communication') {
        specificQuestions = communication_specific_questions;
    }

    function backToInterViewTable(){
        navigate(`/recruitment_interview`);
    }

    let options = [
        {
            value: 100,
            label: 'interviewer1',
        },
        {
            value: 101,
            label: 'interviewer2',
        },
        {
            value: 102,
            label: 'interviewer3',
        },
        {
            value: 103,
            label: 'interviewer4',
        }
    ]

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

    async function submitHandler(){
        if(!interviewers){
            Message.warning('Please select interviewers');
            return;
        }

        let data = {
            interviewers: interviewers,
            answers : QAs,
        }

        let res =await postReq(`/interview/answers/${RID}`,data)

        if(res.status){
            setIfSubmitted(true);
            console.log(res)
        }
    }



    return (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
            <div className="app-component full-screen-app-component" style={{position:"relative"}}>
                <div style={{height:30}}></div>
                <Steps current={parseInt(partID)} style={{ maxWidth: 780, margin: '0 auto' }}>
                    <Step title='General Questions' />
                    <Step title='Specific Questions' />
                    <Step title='Q&A' />
                    <Step title='Finish' />
                </Steps>
                {
                    partID === '1' &&
                    <div>
                        {generalQuestions.map((question, index) => {
                            return (
                                <QuestionGroup question={question} id={index + 1} type="g" key={index} QAs={QAs} setQAs={setQAs} />
                            )
                        })}

                    </div>
                }
                {
                    partID === '2' &&
                    <div>
                        {specificQuestions.map((question, index) => {
                            return (
                                <QuestionGroup question={question} id={index + 1} type="s" key={index} QAs={QAs} setQAs={setQAs}  />
                            )
                        })}
                    </div>
                }
                {
                    partID === '3' &&
                    <div style={{ display: "flex",justifyItems:"center" }}>
                        <TextArea
                            onChange={
                                (val)=>{
                                    setQAs({...QAs, ["freeQAs"]:val})
                                }
                            }
                            placeholder='Please enter ...'
                            style={{
                                width: "80%",
                                resize: "none",
                                margin:"50px auto"
                        }}
                            autoSize={{ minRows: 20}}
                            // onChange={onChangeHandler}
                        />
                    </div>
                }
                {
                    partID === '4' &&
                        <div style={{ display: "flex",flexDirection:"column",alignItems:"center",justifyItems:"center" }}>
                            <div style={{margin:"30px 0 10px 0"}}>Interviewers</div>
                            <Select
                                mode='multiple'
                                placeholder='Please select'
                                style={{ width: 600 }}
                                defaultValue={[]}
                                allowClear
                                onChange={list => setInterviewers(list)}
                            >
                                {options.map((option,index) => (
                                    <Option key={index} value={option.value}>
                                        {option.label}
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
                <Button type='primary' style={{width:100, position:"absolute",bottom:10, left:100}} onClick={()=>goToNextPart(-1)}>Previous </Button>
                {
                    partID !== '4'
                    ?  <Button type='primary' style={{width:100, position:"absolute",bottom:10, right:100}} onClick={()=>goToNextPart(1)}>Next</Button>
                    :  <Button type='primary' style={{width:100, position:"absolute",bottom:10, right:100}} onClick={submitHandler}>Submit</Button>
                }


                {/*<div style={conStyle}>*/}
                {/*    <div>*/}
                {/*        <h1>Interviewers</h1>*/}
                {/*        <Select*/}
                {/*            mode='multiple'*/}
                {/*            placeholder='Please select'*/}
                {/*            style={{ width: 345 }}*/}
                {/*            defaultValue={[]}*/}
                {/*            allowClear*/}
                {/*            onChange={list => setInterviewers(list)}*/}
                {/*        >*/}
                {/*            {options.map((option,index) => (*/}
                {/*                <Option key={index} value={option.value}>*/}
                {/*                    {option.label}*/}
                {/*                </Option>*/}
                {/*            ))}*/}
                {/*        </Select>*/}
                {/*    </div>*/}



                    {/*<div>*/}
                {/*        <h1>Specific Questions Part</h1>*/}
                {/*        {specificQuestions.map((question, index) => {*/}
                {/*            return (*/}
                {/*                <QuestionGroup question={question} id={index + 1} type="s" key={index} QAs={QAs} setQAs={setQAs}  />*/}
                {/*            )*/}
                {/*        })}*/}
                {/*    </div>*/}
                {/*    <Button type='primary' style={{width:600,margin:30}} onClick={submitHandler}>Submit</Button>*/}
                {/*</div>*/}
            </div>
        </>
    )
}
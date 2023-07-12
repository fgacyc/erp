import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";
import {Link, useNavigate, useParams} from "react-router-dom";
import {Button, Cascader, Select, Steps} from "@arco-design/web-react";
import {useState} from "react";
import {generalQuestions} from "./generalQuestions.js";
import QuestionGroup from "./QuestionGroup.jsx";
import {people_experience_specific_questions,
    creative_team_specific_questions,
    communication_specific_questions} from "./specificQuestions.js";

const Option = Select.Option;
const Step = Steps.Step;


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
    const {RID,partID} = useParams();

    const  [interviewers, setInterviewers] = useState([]);
    const [QAs, setQAs] = useState({});

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

    function goToNextPart(){
        navigate(`/recruitment_interview/form/${RID}/${parseInt(partID)+1}`);
    }

    function submitHandler(){
        // console.log(QAs);
        // console.log(interviewers);
        // console.log(ministryID);
        // console.log(formID);
        //postScorecard(formID,ministryID,  interviewers, QAs);
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
                <Button type='primary' style={{width:100, position:"absolute",bottom:10, right:100}} onClick={goToNextPart}>Next</Button>

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
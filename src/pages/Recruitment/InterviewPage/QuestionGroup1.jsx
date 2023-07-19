import { Input,  } from '@arco-design/web-react';
const TextArea = Input.TextArea;
import  "./recruitment-appo.css"
import {useEffect, useRef, useState} from "react";
import {IconCheck, IconEdit} from "@arco-design/web-react/icon";
export  default function QuestionGroup1({questions,setQuestions,id,ifInterviewed}){
    let question = questions[id];
    const [interviewerAnswer,setInterviewerAnswer] = useState("")
    const [ifDisable,setIfDisable] = useState(ifInterviewed)
    const [textAreaStyle,setTextAreaStyle] = useState({width:"100%", resize:"none"})

    let input = useRef(null);

    useEffect(()=>{
        //console.log(ifInterviewed)
        if(ifInterviewed){
            setInterviewerAnswer(question.interviewer)
            //console.log("interviewerAnswer",interviewerAnswer)
        }
    })

    const activeStyle = {
        width:"100%",
        resize:"none",
        border:"1px solid #165dff",
        backgroundColor:"#fff",
        borderRadius:"2px",
        boxShadow: "0 0 0 0 #bedaff"
    }

    function handleClick(){
        if(ifDisable){
            setIfDisable(false)
            setTextAreaStyle(activeStyle)
        }else{
            setIfDisable(true)
            setTextAreaStyle({width:"100%", resize:"none"})
        }
    }



    function onChangeHandler(val){
        setInterviewerAnswer(val)
        question = {...question,["interviewer"]:val}
        let newQuestions = [...questions]
        newQuestions[id] = question
        setQuestions(newQuestions)
    }





    return(
        <div className="question-group" >
            <div style={{
                marginTop: "30px",
                marginBottom: "10px",
            }}>{`${id+1}. ${question.question}`}</div>
            <TextArea
                placeholder='Please enter ...'
                autoSize={{ minRows: 3, maxRows: 8 }}
                value={question.candidate}
                disabled={true}
                className="candidate-textarea-disable question-group-textArea"
            />
            <div style={{height:10}}></div>
            {
                question.type === "general" &&
                <div className="interviewer-answer-con">
                    <TextArea
                        placeholder='Please enter your remarks ...'
                        autoSize={{ minRows: 3, maxRows: 8 }}
                        onChange={onChangeHandler}
                        value={interviewerAnswer}
                        className="candidate-textarea-disable"
                        style={textAreaStyle}
                        disabled={ifDisable}
                        ref={input}
                    />
                    {ifInterviewed && <span>
                        {
                            ifDisable ?  <IconEdit className="interviewer-answer-edit-icon" onClick={handleClick} />
                                : <IconCheck  className="interviewer-answer-edit-icon" onClick={handleClick} />
                        }
                    </span>
                    }
                </div>
            }
        </div>
    )
}
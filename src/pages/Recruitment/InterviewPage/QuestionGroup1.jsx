import { Input,  } from '@arco-design/web-react';
const TextArea = Input.TextArea;
import  "./recruitment-appo.css"
export  default function QuestionGroup1({questions,setQuestions,id}){
    let question = questions[id];

    const conStyle = {
        width: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",

    }

    const textAreaStyle = {
        width: "80%",
        resize: "none",
    }

    function onChangeHandler(val){
        question = {...question,["interviewer"]:val}
        let newQuestions = [...questions]
        newQuestions[id] = question
        setQuestions(newQuestions)
    }


    return(
        <div style={conStyle}>
            <div style={{
                marginTop: "30px",
                marginBottom: "10px",
            }}>{`${id+1}. ${question.question}`}</div>
            <TextArea
                placeholder='Please enter ...'
                style={textAreaStyle}
                autoSize={{ minRows: 3, maxRows: 8 }}
                value={question.candidate}
                disabled={true}
                className="candidate-textarea-disable"
            />
            <div style={{height:10}}></div>
            {
                question.type === "general" &&
                <TextArea
                    placeholder='Please enter your remarks ...'
                    style={textAreaStyle}
                    autoSize={{ minRows: 3, maxRows: 8 }}
                    onChange={onChangeHandler}/>
            }

        </div>
    )
}
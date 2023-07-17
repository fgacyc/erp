import {Card, Input} from "@arco-design/web-react";
import VocalRatingTable from "./VocalRatingTable.jsx";
import {useEffect, useState} from "react";
import {IconCheck, IconEdit} from "@arco-design/web-react/icon";
import  "./recruitment-appo.css"

const TextArea = Input.TextArea;
export default function FreeQATextArea({candidate,questions,freeQAs, setFreeQAs,
                                       vocalRatingForm, setVocalRatingForm, ifInterviewed}){
    const [ifDisable,setIfDisable] = useState(ifInterviewed)
    const [textAreaStyle,setTextAreaStyle] = useState({width:"100%", resize:"none"})
    const [ifVocal,setIfVocal] = useState(candidate.ministry[2] === "vocal")
    // console.log(questions)

    useEffect(()=>{
        if(ifInterviewed){
            setFreeQAs(getFreeQAAnswer())
        }
    },[])

    function getFreeQAAnswer(){
        for (let item  of questions){
            if(item.type === "freeQ&As"){
                return item.interviewer
            }
        }
    }

    const activeStyle = {
        width:"100%",
        resize:"none",
        border:"1px solid #165dff",
        backgroundColor:"#fff",
        borderRadius:"2px",
        boxShadow: "0 0 0 0 #bedaff"
    }

    const textAreaMinHeight = { minRows: 10}
    const VocalTextAreaMaxHeight = { maxRows: 10}

    function handleClick(){
        if(ifDisable){
            setIfDisable(false)
            setTextAreaStyle(activeStyle)
        }else{
            setIfDisable(true)
            setTextAreaStyle({width:"100%", resize:"none"})
        }
    }

    function handleTextAreaChange(val){
        setFreeQAs(val)
    }


    return(
        <div style={{ display: "flex",justifyItems:"center" }}>
            <div style={{width: "80%",height:400,margin:"50px auto"}}>
                <div className="interviewer-qas-answer-con">
                    <TextArea
                        // onChange={setFreeQAs}
                        onChange={handleTextAreaChange}
                        placeholder='Please enter ...'
                        autoSize={{ minRows: 10}}
                        disabled={ifDisable}
                        value={freeQAs}
                        style={textAreaStyle}
                        className="candidate-textarea-disable"
                    />
                    {
                        ifDisable ?  <IconEdit className="interviewer-answer-edit-icon" onClick={handleClick} />
                            : <IconCheck  className="interviewer-answer-edit-icon" onClick={handleClick} />
                    }
                </div>
                { ifVocal &&
                    <Card style={{marginTop:1}}>
                        <VocalRatingTable vocalRatingForm={vocalRatingForm} setVocalRatingForm={setVocalRatingForm} ifInterviewed={ifInterviewed} />
                    </Card>
                }
            </div>
        </div>
    )
}
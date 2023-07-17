import {Card, Input} from "@arco-design/web-react";
import VocalRatingTable from "./VocalRatingTable.jsx";
import {useEffect, useState} from "react";
import {IconCheck, IconEdit} from "@arco-design/web-react/icon";
import  "./recruitment-appo.css"

const TextArea = Input.TextArea;
export default function FreeQATextArea({candidate,questions, setFreeQAs,
                                       vocalRatingForm, setVocalRatingForm, ifInterviewed}){
    const [ifDisable,setIfDisable] = useState(ifInterviewed)
    const [textAreaStyle,setTextAreaStyle] = useState({width:"100%", resize:"none"})
    const [freeQAsInterviewer,setFreeQAsInterviewer] = useState()
    // console.log(questions)

    useEffect(()=>{
        if(ifInterviewed){
            setFreeQAsInterviewer(getFreeQAAnswer())
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
        setFreeQAsInterviewer(val)
    }


    return(
        <div style={{ display: "flex",justifyItems:"center" }}>
            { candidate.ministry[2] === "vocal" ?
                <div style={{width: "80%",height:400,margin:"50px auto"}}>
                    <div className="interviewer-answer-con">
                        <TextArea
                            // onChange={setFreeQAs}
                            onChange={handleTextAreaChange}
                            placeholder='Please enter ...'
                            autoSize={{ minRows: 10}}
                            disabled={ifDisable}
                            value={freeQAsInterviewer}
                            style={textAreaStyle}
                            className="candidate-textarea-disable"
                        />
                        {
                            ifDisable
                                ? <IconEdit className="interviewer-answer-edit-icon" onClick={handleClick} />
                                : <IconCheck  className="interviewer-answer-edit-icon" onClick={handleClick} />
                        }
                    </div>
                    <Card>
                        <VocalRatingTable vocalRatingForm={vocalRatingForm} setVocalRatingForm={setVocalRatingForm} />
                    </Card>
                </div>
                :<div className="interviewer-QAs-answer-con">
                    <TextArea
                        onChange={handleTextAreaChange}
                        placeholder='Please enter ...'
                        style={textAreaStyle}
                        autoSize={{ minRows: 20}}
                        disabled={ifDisable}
                        value={freeQAsInterviewer}
                        className="candidate-textarea-disable"
                    />
                    {
                        ifDisable
                            ? <IconEdit className="interviewer-answer-edit-icon" onClick={handleClick} />
                            : <IconCheck  className="interviewer-answer-edit-icon" onClick={handleClick} />
                    }
                </div>
            }
        </div>
    )
}
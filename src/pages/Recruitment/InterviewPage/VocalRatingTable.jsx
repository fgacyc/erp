import {Input, Rate} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {get} from "idb-keyval";

export default function VocalRatingTable({vocalRatingForm, setVocalRatingForm ,ifInterviewed}){
    const [ifDisableInput, setIfDisableInput] = useState(false);
    const [inputPlaceholder, setInputPlaceholder] = useState("Please Enter Remarks");

    useEffect(()=>{
        if(ifInterviewed){
            get("current_candidate").then((res) => {
                let questions = res.interview.ministry.questions;
                for (let item  of questions){
                    if(item.type === "vocalRating"){
                        setVocalRatingForm(item.interviewer)
                    }
                }
                //console.log(vocalRatingForm)
            });
        }

        let path = window.location.pathname;
        if(path.includes("recruitment_evaluation/form/")){
            setIfDisableInput(true);
            setInputPlaceholder("N/A");
        }
    },[])

    let items = [
        "Pitch 音准",
        "Pronunciation 咬字&发音",
        "Tone 腔调",
        "Beat 节拍",
        "Projection 音量",
        "Breathing 气息",
        "Grooving 乐感",
        "Range 音域",
        "Attitude 态度",
        "Appearance 外形/外在表现",
    ]


    function  handleStarChange(val,index){
        let newVocalRatingForm = {...vocalRatingForm};
        newVocalRatingForm.stars[index] = val;
        setVocalRatingForm(newVocalRatingForm)
    }

    function handleRemarkChange(val,index){
        let newVocalRatingForm = {...vocalRatingForm};
        newVocalRatingForm.remarks[index] = val;
        setVocalRatingForm(newVocalRatingForm)
    }

    return (
        <>
            <div style={{width:"100%"}}>
                {items.map((item, index) => {
                    return <div key={index} style={{display:"flex",marginBottom:10}}>
                        <div style={{width:"20%"}}>{item}</div>
                        <div style={{width:"20%"}}>
                            <Rate onChange={(val)=>handleStarChange(val,index)}
                            value={vocalRatingForm.stars[index]}
                            disabled={ifDisableInput}
                            />
                        </div>
                        <div style={{width:"60%"}}>
                            <Input
                                placeholder={inputPlaceholder}
                                onChange={(val)=>handleRemarkChange(val,index)}
                                value={vocalRatingForm.remarks[index]}
                                disabled={ifDisableInput}
                            />
                        </div>
                    </div>
                })}
            </div>
        </>
    )
}
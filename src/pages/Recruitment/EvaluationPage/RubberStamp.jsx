import "./EvaluationPage.css";
import {useEffect, useState} from "react";
import {getRubberStampTime} from "../../../tools/datetime.js";
export default function EvaluationResultRubberStamp({type}){
    const  [rubberStampType, setRubberStampType] = useState(null);
    const [currentColor , setCurrentColor] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);

    useEffect(() => {
        setCurrentTime(getRubberStampTime());
    }, []);

    useEffect(() => {
        if (type === "accepted"){
            setRubberStampType("PASS");
            setCurrentColor("rgba(0, 180, 42,0.5)")
        } else if (type === "rejected"){
            setRubberStampType("FAIL");
            setCurrentColor("rgba(245, 63, 63,0.5)")
        } else if (type === "kiv"){
            setRubberStampType("KIV");
            setCurrentColor("rgba(244, 120, 0,0.5)")
        }

    }, [type]);


    return (
        <div className="rubber-stamp-con"
            style={{border:"5px solid "+currentColor, color:currentColor}}
        >
            <div className="rubber-stamp-container"
                style={{border:"2px solid "+currentColor}}
            >
                {currentTime &&  <div className="rubber-stamp-body">
                    <div>{rubberStampType}</div>
                    <div className="rubber-stamp-body-text">{currentTime[0]}</div>
                    <div className="rubber-stamp-body-text">{currentTime[1]}</div>
                </div>
                }
            </div>
        </div>
    )
}
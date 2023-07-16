import {checkApplicantStatus, getRecruiterInfo} from "./data.js";
import {Steps} from "@arco-design/web-react";
import {useEffect, useState} from "react";
const Step = Steps.Step;
export default function Recruitment_Steps({recruiter}){
    const [current, setCurrent] = useState(0);
    const [description, setDescription] = useState([]);

    useEffect(() => {
        // console.log(checkApplicantStatus(recruiter))
        //console.log(Math.floor(checkApplicantStatus(recruiter)))
        // console.log(preScreeningInfo(1,recruiter), "👈")
        function  init(){
            let statusID = checkApplicantStatus(recruiter)
            console.log("statusID: ",statusID)
            setCurrent(Math.floor(statusID))
            setDescription(getRecruiterInfo(statusID,recruiter))
        }
        init()
        console.log("reset current step")
    }, [recruiter])



    return (
        <>
            { current >= 0
                ? <Steps current={ current }
                         style={{  margin: '0 auto' }}
                         size='small'
                         direction='vertical'
                >
                    <Step title='Pre-screening'  description={description[0]} ></Step>
                    <Step title='Interview'  description={description[1]} />
                    <Step title='Evaluation'  description={description[2]} />
                </Steps>
                : <Steps current={ current * -1 }
                         style={{  margin: '0 auto' }}
                         size='small'
                         direction='vertical'
                         status="error"
                >
                    <Step title='Pre-screening'   description={description[0]}></Step>
                    <Step title='Interview'  description={description[1]} />
                    <Step title='Evaluation'  description={description[2]} />
                </Steps>
            }
        </>
    )
}
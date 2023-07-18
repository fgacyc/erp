import {Button, Result, Select} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {getReq} from "../../../tools/requests.js";
import {get} from "idb-keyval";
const Option = Select.Option;

export  function Interview_form_Section3({ ministry,
                                         interviewers, setInterviewers,
                                         currentInterviewers, setCurrentInterviewers,
                                         ifSubmitted,backToInterViewTable,
                                         ifInterviewed
})
{
    const [spaceHeight,setSpaceHeight] = useState(0)
    function calHeight(){
        if(spaceHeight!==0) return;

        let appTarget = document.querySelector(".full-screen-app-component");
        let target = document.querySelector(".full-screen-app-component-con");
        let appHeight = window.getComputedStyle(appTarget).height;
        let targetHeight = window.getComputedStyle(target).height;
        //console.log(appHeight, targetHeight)

        appHeight =  parseInt(appHeight, 10)
        targetHeight = parseInt(targetHeight, 10)

        if (appHeight > targetHeight){
            setSpaceHeight(appHeight - targetHeight )
            // console.log("yessss")
        }
    }

    useEffect(() => {
        if(ifInterviewed){
            get("current_candidate").then((res) => {
                // console.log(res.interview.ministry.interviewers)
                setCurrentInterviewers(res.interview.ministry.interviewers)
            });
        }

        ministry && getReq(`/interviewers/${ministry}`).then((res) => {
            // console.log(res.data)
            setInterviewers(res.data);
        })
        calHeight();
    }, []);


    return (
        <div style={{ display: "flex",flexDirection:"column",alignItems:"center",justifyItems:"center" }}>
            <div style={{margin:"30px 0 10px 0"}}>Interviewers</div>
            <Select
                mode='multiple'
                placeholder='Please select'
                style={{ width: 600 }}
                defaultValue={[]}
                allowClear
                value={currentInterviewers}
                onChange={list => setCurrentInterviewers(list)}
            >
                {interviewers && Object.keys(interviewers).length >0 && interviewers.map((interviewer,index) => (
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
            <div style={{height:spaceHeight}}></div>
        </div>
    )
}
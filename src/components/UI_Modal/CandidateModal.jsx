import {Modal, Button, Input, Message} from '@arco-design/web-react';
import {useState} from "react";
import Ministry_Cascader from "../UI_Cascader/Ministry_Cascader.jsx";
import Pastoral_Cascader from "../UI_Cascader/Pastoral_Cascader.jsx";
import {updateRecruiter} from "../../pages/Recruitment/SubmissionPage/postRequest.js";
import valid from "../../pages/Recruitment/SubmissionPage/valid.js";

function CandidateModalInput({tip,value,setValue}) {
    return(
        <div style={{display:"flex",alignItems:"center",marginBottom:10}}>
            <div style={{width: 120}}>{tip}:</div>
            <Input allowClear value={value}
                   placeholder='Please Enter something'
                   style={{width:"80%"}}
                   onChange={setValue}
            />
        </div>
    )
}

export  default  function CandidateModal({recruiter,visible,setVisible}) {
    // console.log(recruiterInfo)
    const [name, setName] = useState(recruiter.info.name)
    const [phone, setPhone] = useState(recruiter.info.phone)
    const [email, setEmail] = useState(recruiter.info.email)
    const [pastoral_team, setPastoral_team] = useState(recruiter.info.pastoral_team)
    const [ministry, setMinistry] = useState(recruiter.info.ministry)

    function handleSubmit() {
        if(!valid(name, phone, email, pastoral_team, ministry)){
            // Message.warning('Please check input')
            return;
        }
        updateRecruiter(recruiter._id,name,phone,email,pastoral_team,ministry).then(() => {
            setVisible(false)
        })
    }


    return (
        <Modal
            title='Modify Candidate Information'
            visible={visible}
            onOk={() => {
                handleSubmit()
            }}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <CandidateModalInput tip="Name" value={name} setValue={setName}/>
            <CandidateModalInput tip="Phone" value={phone} setValue={setPhone}/>
            <CandidateModalInput tip="Email" value={email} setValue={setEmail}/>
            <div style={{display:"flex",alignItems:"center",marginBottom:10}}>
                <div style={{width: 150}}>Pastoral Team:</div>
                <Pastoral_Cascader value={pastoral_team} setPastoral={setPastoral_team}/>
            </div>
            <div style={{display:"flex",alignItems:"center",marginBottom:10}}>
                <div style={{width: 150}}>Ministry:</div>
                <Ministry_Cascader value={ministry} setMinistry={setMinistry}/>
            </div>
        </Modal>
    );
}

import {Button, Cascader, Input, Message, Space} from "@arco-design/web-react";
import {department_options} from "../../../data/ministries.js";
import {useState} from "react";
import valid from "./valid.js";
import {postRecruiter} from "./postRequest.js";
import "./Recruitment_Submission.css"
import {pastoral_team_options} from "../../../data/pastoral_teams.js";
import UI_Breadcrumb from "../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx";

export  default  function  Recruitment_Submission()  {
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [pastoral_team, setPastoral_team] = useState([]);
    const [department1, setDepartment1] = useState([]);



    const  divStyle  =  {
        width:  "100%",
        maxValue:  600,
        display:  'flex',
        flexDirection:  'column',
        justifyContent:  'center',
        alignItems:  'flex-start',
    };

    const  con_style  =  {
        width:  '100%',
        height: '100%',
        display:  'flex',
        flexDirection:  'column',
        justifyContent:  'center',
        alignItems:  'center',
        backgroundColor: 'white',
        margin: 5,
        boxSizing: 'border-box',
    }

    const  submit  =  ()  =>  {
        if(!valid(name, phone, email, pastoral_team, department1)) return;
        postRecruiter(name, phone, email, pastoral_team, department1).then((res) => {
            if(res.status === "success"){
                Message.success('Successfully submitted');
            }else {
                Message.error('Failed to submit: ' + res.error);
            }
        });
    };

    const breadcrumbItems = [
        {
            name: "Recruitment",
            link: "/",
            clickable: false
        },
        {
            name: "Add Candidate",
            link: "/recruitment_add_candidate",
            clickable: true
        }
    ]

    return  (
        <>
            <UI_Breadcrumb items={breadcrumbItems}/>
        <div className="app-component full-screen-app-component recruitment-form-con">
            <Space direction='vertical' size={"large"}  className="recruitment-container">
                <div style={divStyle}>
                    <p>Name:</p>
                    <Input  allowClear placeholder='Please Enter your name' type="text" onChange={s => setName(s)}/>
                </div>

                <div style={divStyle}>
                    <p>Phone:</p>
                    <Input  allowClear placeholder='Please Enter your phone number' type="tel" onChange={s => setPhone(s)}/>
                </div>

                <div style={divStyle}>
                    <p>Email:</p>
                    <Input  allowClear placeholder='Please Enter your email' type="email" onChange={s => setEmail(s)}/>
                </div>


                <div style={divStyle}>
                    <p>Pastoral Teams:</p>
                    <Cascader
                        placeholder='Click to expand'
                        changeOnSelect
                        expandTrigger='hover'
                        options={pastoral_team_options}
                        onChange={s => setPastoral_team(s)}
                    />
                </div>

                <div style={divStyle}>
                    <p>Ministry:</p>
                    <Cascader
                        changeOnSelect
                        placeholder='Click to expand'
                        expandTrigger='hover'
                        options={department_options}
                        onChange={s => setDepartment1(s)}
                        allowClear
                    />
                </div>

                <Button type='primary'
                    style={{
                            maxWidth:  600,
                            width:  '100%',
                            marginTop:  30,
                    }}
                    onClick={submit}
                    >
                    Submit</Button>
            </Space>
        </div>
        </>
    )
}
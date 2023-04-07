import {Button, Input,Notification} from '@arco-design/web-react';
import "./Login.css"
import { useState} from "react";
import {FBStore} from "../../firebase/storeHandler.js";
import {useNavigate} from "react-router-dom";
import StatusContainer from "../../StatusContainer.js";

export  default  function  Login () {
    const  [id, setId] = useState( "" );
    const  [password, setPassword] = useState( "" );

    const navigate = useNavigate();

    const fbStore = new FBStore();
    async function valid(){
        let queries = [["uid", "==", id], ["password", "==", password]];
        let data = await fbStore.query("users", queries)
        console.log(data)
        if (data.length > 0){
            Notification.success({
                title: 'Success',
                content: 'Login Success',
            })
            StatusContainer.currentUser = data[0];
            setTimeout(() => {
                navigate("/");
            }, 500);
        }
    }




    return (
        <div  className = "login" >
            <div  className = "login__container" >
                <img src={"CYC_Logo_black_x120.png"} style={{  marginBottom :50 }} alt={"cyc logo"}/>
                <Input style={{ width: 350, marginBottom :50 }} allowClear placeholder='Please Enter your ID'
                    onChange={ (e) => {setId(e)}}
                />
                <Input.Password  style={{ width: 350, marginBottom :50 }}
                                 onChange={ (e) => {setPassword(e)}}
                />
                <Button type='primary' style={{ width: 350 }} onClick={valid}>Login</Button>
            </div>
        </div>
    )
}
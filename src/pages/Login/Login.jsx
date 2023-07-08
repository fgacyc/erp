import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '@arco-design/web-react';
import "./Login.css";
import {getReq} from "../../tools/requests.js";
import StatusContainer from "../../StatusContainer.js";

export default function Login() {
    const navigate = useNavigate();

    let isLoggedIn = localStorage.getItem('cyc-auth');

    const [CYC_ID, setCYC_ID] = useState(0);
    const [password, setPassword] = useState('');



    function navigateLogin() {
        isLoggedIn = localStorage.getItem('cyc-auth');
        navigate('/')


        // if (isLoggedIn === 'true' && formId) {
        //     navigate(`/form/${formId}`)
        // } else if (isLoggedIn === 'true') {
        //     // navigate('/table')
        //     navigate('/submission')
        // }
    }

    async function handleLogin(e) {
        e.preventDefault();
        // let authStatus = localStorage.getItem('cyc-auth');
        // if (authStatus === 'true') navigate("/")

        let router = "/dev/auth";
        let res =await getReq(router + "?CYC_ID=" + CYC_ID + "&password=" + password);
        if (res.status){
            console.log(res);
            navigateLogin();
            StatusContainer.currentUser =   res.result;
            localStorage.setItem('cyc-auth', 'true');
            localStorage.setItem("cyc-user-data",JSON.stringify(res.result))
        }else{
            alert("Login failed");
        }
    }

    return (
        <div className='login-bg login-container'>
            <div className='login-center login-glass-effect'>
                <img src="/images/fga.png" alt="CYC Logo" style={{ width: "200px", height: "200px" }} />
                <h1>FGA CYC</h1>
                <form style={{ display: "flex", flexDirection: "column" }} onSubmit={handleLogin}>
                    <Input
                        style={{  width: 350, marginBottom: 15 }}
                        addBefore='CYC'
                        type="number"
                        onChange={setCYC_ID}
                        placeholder='Enter CYC ID' />
                    <Input.Password
                        style={{ width: 350, marginBottom: 30 }}
                        placeholder="Enter password"
                        value={password}
                        onChange={setPassword}
                        type="password"
                        autoComplete='on'
                    />
                    <Button type="primary" htmlType="submit">
                        Log In
                    </Button>
                </form>
            </div>
        </div>
    )
}
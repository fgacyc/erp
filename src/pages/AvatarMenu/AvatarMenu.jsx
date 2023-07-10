import {Avatar, Dropdown, Menu} from "@arco-design/web-react";
import "./avatarMenu.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUserNameFromUserData, updateStaffInfoLocal} from "../../tools/auth.js";


export  function AvatarMenu(){
    const navigate = useNavigate();
    const [username, setUsername] = useState(null);

    useEffect(()=>{
        getUserNameFromUserData().then((res)=>{
            setUsername(res);
        })
    },[])

    async function logout(){
        await updateStaffInfoLocal({login_status: false})
        navigate("/login")
    }

    function  handleMenuClick(key){
        if (key === "1"){
            logout();
        }
    }

    const dropList = (
        <Menu onClickMenuItem={handleMenuClick} >
            <Menu.Item key='1'>Log out</Menu.Item>
        </Menu>
    );


    return (
            <Dropdown droplist={dropList} position='bl' trigger='click'>
                <Avatar style={{ backgroundColor: '#3370ff' }} className={"avatar"}>
                    {
                        username === null ? "" : username.charAt(0).toUpperCase()
                    }
                </Avatar>
            </Dropdown>
    );
}
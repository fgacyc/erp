import {Avatar, Dropdown, Menu} from "@arco-design/web-react";
import "./avatarMenu.css"
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getUsername} from "../../../tools/auth.js";
import { logout} from "./avatarFuncs.js";


export  function AvatarMenu(){
    const navigate = useNavigate();

    // const username = useSettingModalStore(state => state.username)
    const [username, setUsername] = useState("");
    //
    //
    useEffect(()=>{
        getUsername().then((res)=>{
            setUsername(res);
        })
    },[])



    function  handleMenuClick(key){
        if (key === "1"){
            //goToProfile();
        }
        else if (key === "2"){
            //navigate("/settings")
        }
        else if (key === "3"){
            logout();
        }
    }

    const dropList = (
        <Menu onClickMenuItem={handleMenuClick} >
            {/*<Menu.Item key='1'>Profile</Menu.Item>*/}
            {/*<Menu.Item key='2'>Settings</Menu.Item>*/}
            <Menu.Item key='3'>Log out</Menu.Item>
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
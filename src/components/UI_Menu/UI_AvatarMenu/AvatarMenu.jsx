import {Avatar, Dropdown, Menu} from "@arco-design/web-react";
import "./avatarMenu.css"
import { logout} from "./avatarFuncs.js";
import {useSettingModalStore} from "../../UI_Modal/UI_SettingModal/settingModalStore.js";
//import UI_Avatar from "../../UI_Avatar.jsx";
import PubSub from "pubsub-js";


export  function AvatarMenu(){
    const username = useSettingModalStore(state => state.username)
    const avatar = useSettingModalStore(state => state.avatar)


    function  handleMenuClick(key){
        if (key === "1"){
            //goToProfile();
            PubSub.publish('switchTab', { tabNum: 0 });
        }
        else if (key === "2"){
            //navigate("/settings")
            PubSub.publish('switchTab', { tabNum: 2 });
        }
        else if (key === "3"){
            logout();
        }
    }

    const dropList = (
        <Menu onClickMenuItem={handleMenuClick} >
            <Menu.Item key='1'>Account</Menu.Item>
            <Menu.Item key='2'>Settings</Menu.Item>
            <Menu.Item key='3'>Log out</Menu.Item>
        </Menu>
    );


    return (
            <Dropdown droplist={dropList} position='bl' trigger='click'>
                {
                    avatar
                        ? <Avatar style={{ backgroundColor: '#ffffff'}}  className="avatar"  >
                            <img src={avatar} alt="avatar" style={{width:40,height:40}} />
                        </Avatar>
                        : <Avatar style={{ backgroundColor: '#3370ff'}}  className="avatar"  >
                            {username && username[0].toUpperCase()}
                        </Avatar>
                }
            </Dropdown>
    );
}
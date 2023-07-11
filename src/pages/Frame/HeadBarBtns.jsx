import {AvatarMenu} from "../../components/UI_AvatarMenu/AvatarMenu.jsx";
import {
    IconLanguage,
    IconMoon,
    IconNotification,
    IconPlus,
    IconSearch,
    IconSettings,
    IconSun
} from "@arco-design/web-react/icon";
import {Button} from "@arco-design/web-react";
import "./Frame.css"
import {useState} from "react";
import NotificationModal from "../../components/UI_Modal/NotificationModal/NotificationModal.jsx";

export default function HeadBarBtns(){
    const [notificationModalVisible, setNotificationModalVisible] = useState(false);

    const [ifDarkTheme, setIfDarkTheme] = useState(false);

    function changeTheme(){
        if(ifDarkTheme){
            document.body.removeAttribute('arco-theme');
            setIfDarkTheme(false);
        }else{
            document.body.setAttribute('arco-theme', 'dark');
            setIfDarkTheme(true);
        }
    }

    function showNotificationModal(){
        setNotificationModalVisible(!notificationModalVisible);
    }



    return (
        <span className="head-bar-btns">
            <Button shape='circle' type='primary' icon={<IconSearch />} className="head-bar-btn" />
            <Button shape='circle' type='primary' icon={<IconLanguage />} className="head-bar-btn" />
            {
                ifDarkTheme
                ? <Button shape='circle' type='primary' icon={<IconSun />} className="head-bar-btn" onClick={changeTheme}/>
                :<Button shape='circle' type='primary' icon={<IconMoon />} className="head-bar-btn" onClick={changeTheme}/>
            }
            <Button shape='circle' type='primary' icon={<IconSettings />} className="head-bar-btn"  />
            <Button shape='circle' type='primary' icon={<IconNotification />} className="head-bar-btn" onClick={showNotificationModal}/>
            <AvatarMenu/>
            <NotificationModal visible={notificationModalVisible} setVisible={setNotificationModalVisible}/>
        </span>
    )
}
import {Typography } from "@arco-design/web-react";
import "./UI_SettingModal.css"
import {
    IconApps, IconHome, IconInfoCircle,
    IconNotification,
    IconPublic,
    IconSettings,
    IconUser,
} from "@arco-design/web-react/icon";
import {shallow} from "zustand/shallow";
import {useSettingModalStore} from "./settingModalStore.js";
import UI_Avatar from "../../UI_Avatar.jsx";

export function IconSecurity(){
    return  (
        <img src="/icons/security.png" alt="security" style={{width:20,height:20}}/>
    )
}

export  function UI_SettingModalLeft(){
    const username = useSettingModalStore(state => state.username)
    const email = useSettingModalStore(state => state.email)
    const avatar = useSettingModalStore(state => state.avatar)
    const [currentTab, setCurrentTab] = useSettingModalStore(state => [state.currentTab, state.setCurrentTab],shallow)
    const tabText =["My account","My home","My settings","My notifications","My connections","Language & region","Security","About"];
    const tabIcon = [<IconUser />,<IconHome />, <IconSettings />, <IconNotification />, <IconApps />, <IconPublic />, <IconSecurity />,<IconInfoCircle />];
    const inActiveBgc = "transparent";
    const activeBgc = "#C9CDD4";
    const showAllInfo = useSettingModalStore(state => state.showAllInfo)


    return (
        <div>
            <div className="setting-modal-left-header">
                <UI_Avatar size={32} clickEvent={showAllInfo} url={avatar} username={username}/>
                <div style={{width:180,height:40}}>
                    <div style={{fontSize:14 ,fontWeight:"bold"}}>
                        {username&& username}
                    </div>
                    <Typography.Paragraph
                        style={{fontSize:12}}
                        ellipsis={{ rows: 1, showTooltip: false, expandable: false, wrapper: 'span' }}>
                        {email && email}
                    </Typography.Paragraph>
                </div>
            </div>
            <div className="setting-modal-left-body">
                { tabText.map((item,index) => {
                    return(
                        <div className="setting-modal-tab-con"
                             key={index}
                             onClick={() => setCurrentTab(index)}
                             style={{backgroundColor: currentTab === index ? activeBgc : inActiveBgc}}
                        >
                            {tabIcon[index]}
                            <div>{item}</div>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
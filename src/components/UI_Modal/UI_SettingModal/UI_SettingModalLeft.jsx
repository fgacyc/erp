import {Avatar,Typography } from "@arco-design/web-react";
import {useSettingModalStore} from "./settingModalStore.js";
import "./UI_SettingModal.css"
import {
    IconApps, IconHome, IconInfoCircle,
    IconNotification,
    IconPublic,
    IconSettings,
    IconToBottom,
    IconUser,
} from "@arco-design/web-react/icon";
import {shallow} from "zustand/shallow";

export function IconSecurity(){
    return  (
        <img src="/icons/security.png" alt="security" style={{width:20,height:20}}/>
    )
}

export  function UI_SettingModalLeft(){
    const  staff = useSettingModalStore(state => state.staff)
    const [currentTab, setCurrentTab] = useSettingModalStore(state => [state.currentTab, state.setCurrentTab],shallow)
    const tabText =["My accountModal","My home","My settings","My notifications","My connections","Language & region","Security","About"];
    const tabIcon = [<IconUser />,<IconHome />, <IconSettings />, <IconNotification />, <IconApps />, <IconPublic />, <IconSecurity />,<IconInfoCircle />];
    const inavtiveBgc = "transparent";
    const activeBgc = "#C9CDD4";


    return (
        <div>
            <div className="setting-modal-left-header">
                <Avatar style={{ backgroundColor: '#3370ff'}} size={32} >
                    {staff?.username ? staff.username[0] : staff.full_name[0]}
                </Avatar>
                <div style={{width:180,height:40}}>
                    <div style={{fontSize:14 ,fontWeight:"bold"}}>
                        {staff?.username ? staff.username : staff.full_name}
                    </div>
                    <Typography.Paragraph
                        style={{fontSize:12}}
                        ellipsis={{ rows: 1, showTooltip: false, expandable: false, wrapper: 'span' }}>
                        {staff.email}
                    </Typography.Paragraph>
                </div>
            </div>
            <div className="setting-modal-left-body">
                { tabText.map((item,index) => {
                    return(
                        <div className="setting-modal-tab-con"
                             key={index}
                             onClick={() => setCurrentTab(index)}
                             style={{backgroundColor: currentTab === index ? activeBgc : inavtiveBgc}}
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
import {Modal} from "@arco-design/web-react";
import "./UI_SettingModal.css"
import {UI_SettingModalLeft} from "./UI_SettingModalLeft.jsx";
import {useEffect, useState} from "react";
import {useSettingModalStore} from "./settingModalStore.js";
import {SettingModalAccount} from "./SettingModalPages/SettingModalAccount.jsx";
import SettingModalHome from "./SettingModalPages/SettingModalHome.jsx";
import SettingModalSettings from "./SettingModalPages/SettingModalSettings.jsx";
import SettingModalNotifications from "./SettingModalPages/SettingModalNotifications.jsx";
import SettingModalConnections from "./SettingModalPages/SettingModalConnections.jsx";
import SettingModalLanguageAndRegion from "./SettingModalPages/SettingModalLanguageAndRegion.jsx";
import SettingModalSecurity from "./SettingModalPages/SettingModalSecurity.jsx";
import SettingModalAbout from "./SettingModalPages/SettingModalAbout.jsx";

export  default  function UI_SettingModal({visible, setVisible}){
    const currentTab = useSettingModalStore(state => state.currentTab)
    const [ifInitStaff, setIfInitStaff] = useState(false);
    const pages = [ <SettingModalAccount />, <SettingModalHome />,
        <SettingModalSettings />, <SettingModalNotifications />,
        <SettingModalConnections />, <SettingModalLanguageAndRegion />,
        <SettingModalSecurity />, <SettingModalAbout />
    ]

    useEffect(() => {
        setIfInitStaff(true)
    },[])


    return (
        <Modal
            alignCenter={false}
            visible={visible}
            className="setting-modal"
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            mask = {true}
            simple = {true}
            footer = {null}
        >
            <div className="setting-modal-con">
                <div className="setting-modal-con-left">
                    {ifInitStaff &&  <UI_SettingModalLeft/>
                    }
                </div>
                <div className="setting-modal-con-right">
                    {pages[currentTab]}
                </div>
            </div>
        </Modal>
    )
}
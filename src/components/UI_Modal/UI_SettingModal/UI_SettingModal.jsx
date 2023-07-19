import {Modal} from "@arco-design/web-react";
import "./UI_SettingModal.css"
import {IconSearch, IconSwap, IconUndo} from "@arco-design/web-react/icon";
import { ReactComponent as IconEnter } from '/public/icons/icon-enter.svg'
import {UI_SettingModalLeft} from "./UI_SettingModalLeft.jsx";
import {useEffect, useState} from "react";
import {useSettingModalStore} from "./settingModalStore.js";
import {SettingModalAccount} from "./SettingModalPages/SettingModalAccount.jsx";
import SettingModalHome from "./SettingModalPages/SettingModalHome.jsx";

export  default  function UI_SettingModal({visible, setVisible}){
    const  staff = useSettingModalStore(state => state.staff)
    const currentTab = useSettingModalStore(state => state.currentTab)
    const initStaff = useSettingModalStore(state => state.initStaff)
    const [ifInitStaff, setIfInitStaff] = useState(false);
    const pages = [ <SettingModalAccount />, <SettingModalHome />]

    useEffect(() => {
        initStaff().then(
            () => {
                setIfInitStaff(true);
            }
        )
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
import {Modal} from "@arco-design/web-react";
import "./UI_SettingModal.css"
import {IconSearch, IconSwap, IconUndo} from "@arco-design/web-react/icon";
import { ReactComponent as IconEnter } from '/public/icons/icon-enter.svg'
import {UI_SettingModalLeft} from "./UI_SettingModalLeft.jsx";
import {useEffect} from "react";
import {useSettingModalStore} from "./settingModalStore.js";

export  default  function UI_SettingModal({visible, setVisible}){
    const  staff = useSettingModalStore(state => state.staff)
    const initStaff = useSettingModalStore(state => state.initStaff)
    useEffect(() => {
        initStaff()
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
            style={{width: 1150,height:715, borderRadius: 5}}
        >
            <div className="setting-modal-con">
                <div className="setting-modal-con-left">
                    <UI_SettingModalLeft/>
                </div>
                <div className="setting-modal-con-right">
                </div>
            </div>
        </Modal>
    )
}
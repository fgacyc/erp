import {useSettingModalStore} from "../settingModalStore.js";
import {Avatar, Button, Divider, Input} from "@arco-design/web-react";
import {IconRight} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import EmailOrPhoneSettingModal from "../accountModal/EmailOrPhoneSettingModal.jsx";
import PasswordSettingModal from "../accountModal/PasswordSettingModal.jsx";
import UI_ConfirmModal from "../../UI_ConfirmModal/UI_ConfirmModal.jsx";
import DeleteAccountModal from "../accountModal/DeleteAccountModal.jsx";
import {shallow} from "zustand/shallow";

export function SettingModalDivider(){
    return (
        <Divider style={{margin:"10px 0"}} />
    )
}

export  function SettingModalAccount(){
    const [username, updateUsername] = useSettingModalStore(state => [state.username,state.setUsername],shallow)
    const email = useSettingModalStore(state => state.email)
    const phoneNumber = useSettingModalStore(state => state.phone_number)

    const [emailSettingModalVisible, setEmailSettingModalVisible] = useState(false)
    const [phoneSettingModalVisible, setPhoneSettingModalVisible] = useState(false)
    const [passwordSettingModalVisible, setPasswordSettingModalVisible] = useState(false)
    const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false)
    // const [username, setUsername] = useState(staff.username ? staff.username :staff.full_name)

    function  showConfirmModal(){
        UI_ConfirmModal("Confirm",`Are you sure to log out of all devices`,()=>{console.log("confirm")})
    }


    function userNameChange(val){
        updateUsername(val)
        // updateStaff({username:val})
    }

    return (
        <div className="setting-modal-account-con">
            <div>
                <h3>My profile</h3>
                <SettingModalDivider />
                <div className="setting-modal-account-profile">
                    <Avatar style={{ backgroundColor: '#3370ff',marginRight:30}} size={60} >
                        { username && username[0].toUpperCase()}
                    </Avatar>

                    <div>
                        <div>Username</div>
                        <Input style={{ width: 150 }}
                               onChange={userNameChange}
                               value={username && username } />
                    </div>
                </div>
            </div>

            <div  className="setting-modal-account-security">
                <h3>Account Security</h3>
                <SettingModalDivider />
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                        <div >Email</div>
                        <div  className="setting-desc-text-grey" >{email && email}</div>
                    </div>
                    <Button type='outline' style={{width:140}}
                        onClick={() => setEmailSettingModalVisible(true)}
                    >Change email</Button>
                </div>
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginTop:10}}>
                    <div>
                        <div >Password</div>
                        <div  className="setting-desc-text-grey" >Set a permanent password to login to your account.</div>
                    </div>
                    <Button type='outline' style={{width:140}}
                        onClick={() => setPasswordSettingModalVisible(true)}
                    >Reset Password</Button>
                </div>
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginTop:10}}>
                    <div>
                        <div >Phone number</div>
                        <div  className="setting-desc-text-grey" >{phoneNumber ?phoneNumber : "None"}</div>
                    </div>
                    <Button type='outline' style={{width:140}}
                        onClick={() => setPhoneSettingModalVisible(true)}
                    >Reset number</Button>
                </div>
            </div>

            <div  className="setting-modal-account-support">
                <h3>Support</h3>
                <SettingModalDivider />
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                        <div >Log out of all devices</div>
                        <div  className="setting-desc-text-grey" >Log out of all other active sessions on other devices besides this one.</div>
                    </div>
                    <div className="setting-modal-account-support-left-icon"
                        onClick={showConfirmModal}
                    >
                        <IconRight />
                    </div>
                </div>
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginTop:10}}>
                    <div>
                        <div style={{color:"red"}}>Delete my account</div>
                        <div  className="setting-desc-text-grey" >Permanently delete the account and remove all data from database.</div>
                    </div>
                    <div className="setting-modal-account-support-left-icon"
                        onClick={() => setDeleteAccountModalVisible(true)}
                    >
                        <IconRight />
                    </div>
                </div>
            </div>
            <EmailOrPhoneSettingModal visible={emailSettingModalVisible} setVisible={setEmailSettingModalVisible} type="email" />
            <EmailOrPhoneSettingModal visible={phoneSettingModalVisible} setVisible={setPhoneSettingModalVisible} type="phone" />
            <PasswordSettingModal visible={passwordSettingModalVisible} setVisible={setPasswordSettingModalVisible} />
            <DeleteAccountModal visible={deleteAccountModalVisible} setVisible={setDeleteAccountModalVisible} />
        </div>
    )
}
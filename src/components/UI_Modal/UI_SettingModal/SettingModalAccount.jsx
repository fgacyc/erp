import {useSettingModalStore} from "./settingModalStore.js";
import {Avatar, Button, Divider, Input} from "@arco-design/web-react";
import {IconRight} from "@arco-design/web-react/icon";
import {useState} from "react";
import EmailOrPhoneSettingModal from "./accountModal/EmailOrPhoneSettingModal.jsx";
import PasswordSettingModal from "./accountModal/PasswordSettingModal.jsx";

function SettingModalDivider(){
    return (
        <Divider style={{margin:"10px 0"}} />
    )
}

export  function SettingModalAccount(){
    const  staff = useSettingModalStore(state => state.staff)
    const [emailSettingModalVisible, setEmailSettingModalVisible] = useState(false)
    const [phoneSettingModalVisible, setPhoneSettingModalVisible] = useState(false)
    const [passwordSettingModalVisible, setPasswordSettingModalVisible] = useState(false)
    const [deleteAccountModalVisible, setDeleteAccountModalVisible] = useState(false)

    return (
        <div className="setting-modal-account-con">
            <div>
                <h3>My profile</h3>
                <SettingModalDivider />
                <div className="setting-modal-account-profile">
                    <Avatar style={{ backgroundColor: '#3370ff',marginRight:30}} size={60} >
                        {staff?.username ? staff.username[0] : staff.full_name[0]}
                    </Avatar>
                    <div>
                        <div>Username</div>
                        <Input style={{ width: 350 }}  value={staff.username ? staff.username :"" } />
                    </div>
                </div>
            </div>

            <div  className="setting-modal-account-security">
                <h3>Account Security</h3>
                <SettingModalDivider />
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    <div>
                        <div style={{fontWeight:"bold"}}>Email</div>
                        <div>{staff && staff.email}</div>
                    </div>
                    <Button type='outline' style={{width:140}}
                        onClick={() => setEmailSettingModalVisible(true)}
                    >Change email</Button>
                </div>
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginTop:10}}>
                    <div>
                        <div style={{fontWeight:"bold"}}>Password</div>
                        <div>Set a permanent password to login to your account</div>
                    </div>
                    <Button type='outline' style={{width:140}}
                        onClick={() => setPasswordSettingModalVisible(true)}
                    >Reset Password</Button>
                </div>
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginTop:10}}>
                    <div>
                        <div style={{fontWeight:"bold"}}>Phone number</div>
                        <div>{staff?.phone ? staff.phone : "None"}</div>
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
                        <div style={{fontWeight:"bold"}}>Log out of all devices</div>
                        <div>Log out of all other active sessions on other devices besides this one.</div>
                    </div>
                    <div className="setting-modal-account-support-left-icon">
                        <IconRight />
                    </div>
                </div>
                <div  style={{display:"flex",justifyContent:"space-between",alignItems:"center", marginTop:10}}>
                    <div>
                        <div style={{color:"red"}}>Delete my account</div>
                        <div>Permanently delete the account and remove all data from database.</div>
                    </div>
                    <div className="setting-modal-account-support-left-icon">
                        <IconRight />
                    </div>
                </div>
            </div>
            <EmailOrPhoneSettingModal visible={emailSettingModalVisible} setVisible={setEmailSettingModalVisible} type="email" />
            <EmailOrPhoneSettingModal visible={phoneSettingModalVisible} setVisible={setPhoneSettingModalVisible} type="phone" />
            <PasswordSettingModal visible={passwordSettingModalVisible} setVisible={setPasswordSettingModalVisible} />
        </div>
    )
}
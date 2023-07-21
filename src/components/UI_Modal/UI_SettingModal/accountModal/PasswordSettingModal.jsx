import {Button, Input, Message, Modal} from "@arco-design/web-react";
import {IconCloseCircle, IconLock} from "@arco-design/web-react/icon";
import {useSettingModalStore} from "../settingModalStore.js";
import {shallow} from "zustand/shallow";
import {useState} from "react";
import {updateSettingsRequest} from "../SettingModalPages/updateSettingsRequest.js";

export default function PasswordSettingModal({visible, setVisible}){
    const [password,setPassword] = useSettingModalStore(state => [state.password, state.setPassword],shallow)
    const passwordKeyWords = ["password","a password", "a new password"];
    const [value, setValue] = useState("");
    const [confirmValue, setConfirmValue] = useState("");

    function handleClick(){
        if(value === confirmValue){
            updateSettingsRequest("password",value).then(res => {
                if(res.status){
                    setPassword(value)
                    setVisible(false);
                    Message.success("Password updated successfully!")
                }else{
                    Message.warning("Password updated failed!")
                }
            })
        }else{
            Message.warning('The two passwords you entered do not match!')
        }

    }

    function  handleClose(){
        setValue("")
        setConfirmValue("")
        setVisible(false)
    }

    return (
        <Modal
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            simple = {true}
            footer={null}
            closeIcon = {<IconCloseCircle />}
        >
            <div style={{color:"rgba(55, 53, 47, 0.65)"}}>
                <div style={{height:30}}>
                    <IconCloseCircle  style={{float:"right",fontSize:20,color:"gray",cursor:"pointer"}}
                                      onClick={handleClose}
                    />
                </div>
                <div style={{textAlign:"center",marginBottom:10}}>
                    <IconLock style={{fontSize:25}} />
                    <div style={{fontWeight:"bold",marginTop:10}}>Set {passwordKeyWords[1]}</div>
                </div>
                <div style={{textAlign:"center",marginBottom:20,fontSize:12}}>
                    <div>Use a password at least 15 letters long, or at least 8 characters long with both letters and numbers.</div>
                </div>
                <div style={{marginBottom:10}}>
                    <div style={{marginBottom:3 ,fontSize:12}}>Enter {passwordKeyWords[2]}</div>
                    <Input.Password style={{ width: "100%" }}   placeholder={"New " + passwordKeyWords[0]}
                           onChange={setValue}
                    />
                </div>
                <div style={{marginBottom:20}}>
                    <div style={{marginBottom:3 ,fontSize:12}}>Confirm your new {passwordKeyWords[0]}</div>
                    <Input.Password style={{ width: "100%" }}   placeholder={"Confirm " + passwordKeyWords[0]}
                        onChange={setConfirmValue}
                    />
                </div>
                <Button type='primary' long
                    onClick={handleClick}
                    >Set {passwordKeyWords[1]}</Button>
            </div>
        </Modal>
    )
}
import {Button, Input, Modal} from "@arco-design/web-react";
import {IconCloseCircle, IconDelete, IconLock} from "@arco-design/web-react/icon";
import {useSettingModalStore} from "../settingModalStore.js";

export default function DeleteAccountModal({visible, setVisible}){
    const passwordKeyWords = ["password","a password", "a new password"];
    const  email = useSettingModalStore(state => state.email)

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
                                      onClick={() => setVisible(false)}
                    />
                </div>
                <div style={{textAlign:"center",marginBottom:10}}>
                    <IconDelete style={{fontSize:25}} />
                    <div style={{fontWeight:"bold",marginTop:10}}>Delete your account</div>
                </div>
                <div style={{textAlign:"center",marginBottom:20,fontSize:12}}>
                    <div>This action cannot be undone. This will permanently delete your entire account. All private data will be deleted, and you will be removed from all workspaces.</div>
                </div>
                <div style={{marginBottom:10}}>
                    <div style={{marginBottom:3 ,fontSize:12}}>Type your email to confirm</div>
                    <Input style={{ width: "100%" }}   placeholder={email && email}/>
                </div>

                <Button type='secondary' status='danger' long>Permanently delete account</Button>
            </div>
        </Modal>
    )
}
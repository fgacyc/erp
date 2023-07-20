import {Button, Input, Modal} from "@arco-design/web-react";
import {IconCloseCircle, IconEmail, IconLock, IconPhone} from "@arco-design/web-react/icon";
import {useEffect, useState} from "react";
import {useSettingModalStore} from "../settingModalStore.js";
import {shallow} from "zustand/shallow";

export default function EmailOrPhoneSettingModal({visible, setVisible,type}){
    const emailKeyWords = ["Email","an Email", "an new Email"];
    const phoneKeyWords = ["phone number","a phone number", "a new phone number"];
    const [currentKeyWords, setCurrentKeyWords] = useState(emailKeyWords);
    const [value, setValue] = useState("");
    const [staff,updateStaff] = useSettingModalStore(state => [state.staff,state.updateStaff],shallow)

    useEffect(() => {
        if(type === "email"){
            setCurrentKeyWords(emailKeyWords);
        }else if(type === "phone"){
            setCurrentKeyWords(phoneKeyWords);
        }
    },[])

    function handleClick(){
        if(value === "") return;

        if(type === "email"){
            updateStaff({email:value})
            // console.log(staff)
        }else if(type === "phone"){
            updateStaff({phone:value})
        }
        setValue("")
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
                                        onClick={() => setVisible(false)}
                    />
                </div>
               <div style={{textAlign:"center",marginBottom:20}}>
                   { type === "email"
                       ? <IconEmail style={{fontSize:25}} />
                          : <IconPhone style={{fontSize:25}} />
                   }
                   <div style={{fontWeight:"bold",marginTop:10}}>Set {currentKeyWords[1]}</div>
               </div>
               <div style={{marginBottom:10}}>
                   <div style={{marginBottom:3 ,fontSize:12}}>Enter {currentKeyWords[2]}</div>
                   <Input style={{ width: "100%" }}
                          type={currentKeyWords[0] === "Email" ? "email" : "phone"}
                          onChange={(val) => setValue(val)}
                          placeholder={"New " + currentKeyWords[0]}
                          value={value} />
               </div>
               <div style={{marginBottom:20}}>
                   <div style={{marginBottom:3 ,fontSize:12}}>Enter PIN code</div>
                   <Input style={{ width: "100%" }}   placeholder='PIN code' disabled/>
               </div>
               <Button type='primary' long
                          onClick={handleClick}
               >Set {currentKeyWords[1]}</Button>
           </div>
        </Modal>
    )
}

import {useEffect, useState} from "react";
import {Modal} from "@arco-design/web-react";
import "./notificationModal.css"

export  default  function NotificationModal({visible, setVisible}){
    const [rightVal , setRightVal] = useState(20)

    function  initModalPosition(){
        let screenWidth = window.innerWidth;
        console.log(screenWidth)
        let modalWidth = 400;
        let rightVal = screenWidth /2 - modalWidth / 2 - 15;
        setRightVal(rightVal);
    }

    useEffect(()=>{
        initModalPosition();
        window.addEventListener('resize', initModalPosition);
        return () => {
            window.removeEventListener('resize', initModalPosition);
        }
    },[])

    let modalStyle = {
        top: 75,
        left: rightVal
    }

    return (
        <Modal
            alignCenter={false}
            style={modalStyle}
            className={"notification-modal"}
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            mask = {false}
            simple = {true}
            footer = {null}
        >
            <div className={"notification-modal-header"}>
                <div className="notification-modal-header-btns">
                    <span>Messages</span>
                    <span>Notifications</span>
                    <span>Tasks</span>
                </div>
                <div>Clear</div>
            </div>
            <div className={"notification-modal-body"}>

            </div>
            <div className={"notification-modal-footer"}>
                <div>Read All</div>
                <div>Read More</div>
            </div>
        </Modal>
    )
}
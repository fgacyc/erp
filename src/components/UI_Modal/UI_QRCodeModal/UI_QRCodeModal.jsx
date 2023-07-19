import {Button, Card, Modal, Typography} from "@arco-design/web-react";
import {QRCodeSVG} from 'qrcode.react';

import {useEffect, useState} from "react";
import {getDateString} from "../../../tools/datetime.js";
import "./UI_QRCodeModal.css";
import {capitalFirstLetter} from "../../../tools/string.js";


export function UI_QRCodeModal({ministry,RID ,visible, setVisible}){
    const  [appointmentDates, setAppointmentDates] = useState(null);
    const [currentDate, setCurrentDate] = useState(null);
    const [URL, setURL] = useState("https://fgacyc.com/serve");



    useEffect(() => {
        setAppointmentDates(getAppointmentDate(ministry));
        setCurrentDate(getDateString(getAppointmentDate(ministry)[0] *1000));
        setURL(generateURL(getAppointmentDate(ministry)[0],RID));
    }, [visible])

    function  getAppointmentDate(ministry){
        if (ministry === "dance"){
            return [1689998400,1690025400,1690099200]
        }else if(ministry === "content creation" || ministry === "editorial" || ministry === "graphic design"
            || ministry === "multimedia design" || ministry === "photography" || ministry === "sound"){
            return [1689492600,1690018200,1690097400]
        }else{
            return [1689418800,1689492600,1690018200,1690097400]
        }
    }

    function generateURL(date,RID){
        // console.log(url);
        return `https://fgacyc.com/serve/appointment/${date}/${RID}`;
    }

    function handleClick(date){
        setCurrentDate(getDateString(date *1000));
        setURL(generateURL(date,RID));
    }


    return(
        <Modal
            title='Choose appointment date time'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <div className="qrcode-modal-con">
                <div className="qrcode-modal-code-con">
                    <QRCodeSVG value={URL} />
                    <div>{capitalFirstLetter(ministry)}</div>
                    <div style={{fontSize: 16}}
                    >{currentDate}</div>

                </div>
                <div className="qrcode-modal-btns-con">
                    {
                        appointmentDates && appointmentDates.map((date,index) => {
                            return(
                                <Button type='dashed'
                                        key={index}
                                        onClick={() => handleClick(date)}
                                >{getDateString(date *1000)}
                                </Button>
                            )
                        })
                    }
                </div>
            </div>
            <Card style={{marginTop:15}}>
                <Typography.Paragraph copyable  >{URL}</Typography.Paragraph>
            </Card>
        </Modal>
    )
}
import {Input, Modal, Select,Message} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {get} from "idb-keyval";
import {deleteReq, putReq} from "../../../tools/requests.js";
import {getTimeStamp} from "../../../tools/datetime.js";


const Option = Select.Option;
const options = ['Work', 'Health Issue', 'On a Vacation', "custom"];
const TextArea = Input.TextArea;

export  default function UI_DeleteEventParticipantModal({visible, setVisible,deleteParticipant}){
    const [current_participant, setCurrentParticipant] = useState(null);
    const [delete_reason, setDeleteReason] = useState(null);
    const [key, setKey] = useState(0);


    useEffect(() => {
        get("current_participant").then((res) => {
            setCurrentParticipant(null)
            setDeleteReason(null)
            if(res) setCurrentParticipant(res);
        });
        setKey(key + 1)
    }, [visible]);

    function deleteParticipantHandler(){
        console.log(delete_reason)
        if(!delete_reason) {
            Message.warning("Please select a reason");
            return;
        }
        else  if (delete_reason === "custom"){
            Message.warning("Please enter a custom reason");
            return;
        }
        let deletedData = {
            timestamp: getTimeStamp(),
            reason: delete_reason,
        }

        putReq(`/leader_retreat/${current_participant.CYC_ID}`,deletedData).then((res) => {
            if(res.status) {
                deleteParticipant(current_participant.CYC_ID);
                Message.success("Participant deleted successfully");
            }
            else Message.error("Something went wrong");
            setVisible(false)
        });
    }



    return (
        <Modal
            title='Delete Participant'
            visible={visible}
            onOk={deleteParticipantHandler}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            key={key}
        >
            <p>
                Do you want to delete this participant: [{current_participant&& current_participant.name}] ?
            </p>
            <Select
                placeholder='Select a reason'
                onChange={(value) =>
                    setDeleteReason(value)
                }
            >
                {options.map((option, index) => (
                    <Option key={option} value={option}>
                        {option}
                    </Option>
                ))}
            </Select>
            { delete_reason === "custom" &&
                <TextArea placeholder='Please enter a custom reason'  allowClear
                          autoSize={{ minRows: 3, maxRows: 6 }}
                          style={{marginTop:20,resize:"none"}}/>
            }
        </Modal>
    );
}
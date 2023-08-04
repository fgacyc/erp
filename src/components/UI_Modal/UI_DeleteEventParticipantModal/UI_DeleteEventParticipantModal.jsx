import {Input, Modal, Select,Message} from "@arco-design/web-react";
import {useEffect, useState} from "react";
import {get} from "idb-keyval";


const Option = Select.Option;
const options = ['Work', 'Health Issue', 'On a Vacation', "custom"];
const TextArea = Input.TextArea;

export  default function UI_DeleteEventParticipantModal({visible, setVisible}){
    const [current_participant, setCurrentParticipant] = useState(null);
    const [delete_reason, setDeleteReason] = useState(null);

    useEffect(() => {
        get("current_participant").then((res) => {
            setCurrentParticipant(null)
            setDeleteReason(null)
            if(res) setCurrentParticipant(res);
        });
    }, [visible]);

    function deleteParticipant(){
        if(!delete_reason) {
            Message.warning("Please select a reason");
            return;
        }
        else  if (delete_reason === "custom"){
            Message.warning("Please enter a custom reason");
            return;
        }
        setVisible(false)
    }



    return (
        <Modal
            title='Delete Participant'
            visible={visible}
            onOk={deleteParticipant}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
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
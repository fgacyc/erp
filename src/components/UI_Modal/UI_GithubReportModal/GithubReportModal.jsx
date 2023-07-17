import {Input, Modal} from "@arco-design/web-react";
import {IconBulb, IconExclamationCircle} from "@arco-design/web-react/icon";
import {useState} from "react";
import {sendAIssue} from "../../../tools/github.js";
const TextArea = Input.TextArea;

export  default function GithubReportModal({type,visible,setVisible}) {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");


    let topic = ''
    if (type === 'bug') {
        topic = 'Report a bug'
    }else if (type === 'enhancement') {
        topic = 'Request a feature'
    }

    function submitIssue() {
        console.log(title, content);
        sendAIssue(title,content,type).then((res) => {
            // console.log(res);
            setVisible(false);
            setTitle("");
            setContent("");
        });
    }

    function  cancelIssue() {
        setVisible(false);
        setTitle("");
        setContent("");
    }



    return(
        <Modal
            title = {
                <div>
                    { type === "bug"
                        ?<div>
                        <IconExclamationCircle style={{color:"orange"}} />{topic}
                        </div>
                        :<div>
                            <IconBulb style={{color:"orange"}} />{topic}
                        </div>
                    }
                </div>
            }
            visible={visible}
            onOk={() => {
                submitIssue()
            }}
            onCancel={() => cancelIssue()}
            autoFocus={false}
            focusLock={true}
        >
            <Input  allowClear  placeholder='Title' onChange={setTitle} />
            <TextArea
                style={{ marginTop: 16 }}
                placeholder='Leave your comments here...'
                autoSize={{ minRows: 6, maxRows: 10 }}
                onChange={setContent}
            />
        </Modal>
    )
}
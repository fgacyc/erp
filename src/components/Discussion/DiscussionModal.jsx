import {Input, Modal} from "@arco-design/web-react";
import {useState} from "react";
import {useNavigate} from "react-router-dom";

const TextArea = Input.TextArea;
export  default function DiscussionModal({visible, setVisible}) {
    const textStyle = {
        color: '#868e96'
    }
    const  [title, setTitle] = useState('')
    const  [content, setContent] = useState('')

    const navigate = useNavigate();

    function  okHandler() {
        // console.log(title, content)
        setVisible(false)
        localStorage.setItem('discussion_title', title)
        localStorage.setItem('discussion_content', content)
        navigate('/discussion')
    }


    return (
        <Modal
            title="Add new topic"
            visible={visible}
            onOk={() => okHandler()}
            onCancel={() => setVisible(false)}
            okText={'Add'}
            cancelText={'Cancel'}
        >
            <div>
                <div style={textStyle}>Topic</div>
                <Input style={{ marginBottom: 10 }}
                       allowClear placeholder='Please Enter discussion title'
                          onChange={(val) => setTitle(val)}
                />
            </div>
            <div>
                <div style={textStyle}>Content</div>
                <TextArea placeholder='Please enter discussion content'
                          onChange={(val) => setContent(val)}
                />
            </div>


        </Modal>
                    
    )
}
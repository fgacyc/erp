import { Modal } from "@arco-design/web-react";
import {FunctionComponent} from "react";
import React from "react";
import "react-markdown-editor-lite/lib/index.css";
import {UI_Editor} from "@/components/UI_Editor/UI_Editor.tsx";




interface AddReviewsModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}

export const AddReviewsModalModal: FunctionComponent<AddReviewsModalProps> = ({visible, setVisible}) => {
    const [text, setMdTest] = React.useState("");

    function handleOK(){
        console.log(text);
    }

    return (
        <Modal
            title="Add Reviews"
            visible={visible}
            onOk={handleOK}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
            style={{width:"80%", height: "720px"}}
        >
            <UI_Editor setMdText={setMdTest} height={"560px"} width={"100%"} />
        </Modal>
    );
};

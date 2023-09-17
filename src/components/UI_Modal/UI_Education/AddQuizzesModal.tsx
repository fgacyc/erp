import { Modal } from "@arco-design/web-react";
import {FunctionComponent} from "react";

interface AddQuizzesModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
export const AddQuizzesModalModal: FunctionComponent<AddQuizzesModalProps> = ({visible, setVisible}) => {
    return (
        <Modal
            title="Add Quizzes"
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <p>
                You can customize modal body text by the current situation. This modal
                will be closed immediately once you press the OK button.
            </p>
        </Modal>
    );
};

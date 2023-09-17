import { Modal } from "@arco-design/web-react";
import {FunctionComponent} from "react";

interface AddCoursesModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
export const AddCoursesModal: FunctionComponent<AddCoursesModalProps> = ({visible, setVisible}) => {
    return (
        <Modal
            title="Add Courses"
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

import { Modal } from "@arco-design/web-react";
import {FunctionComponent} from "react";

interface AddReviewsModalProps {
    visible: boolean;
    setVisible: (visible: boolean) => void;
}
export const AddReviewsModalModal: FunctionComponent<AddReviewsModalProps> = ({visible, setVisible}) => {
    return (
        <Modal
            title="Add Reviews"
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
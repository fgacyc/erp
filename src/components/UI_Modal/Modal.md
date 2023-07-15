```jsx
import {Modal} from "@arco-design/web-react";
export default function Modal_Demo({visible, setVisible}){
    return (
        <Modal
            title='Modal Title'
            visible={visible}
            onOk={() => setVisible(false)}
            onCancel={() => setVisible(false)}
            autoFocus={false}
            focusLock={true}
        >
            <p>
                You can customize modal body text by the current situation. This modal will be closed
                immediately once you press the OK button.
            </p>
        </Modal>
    )
}
```
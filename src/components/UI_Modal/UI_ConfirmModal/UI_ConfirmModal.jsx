import {Modal} from "@arco-design/web-react";

export default  function UI_ConfirmModal(title,content,OK){
    Modal.confirm({
        title: title,
        content:content,
        okButtonProps: {
            status: 'info',
        },
        onOk: () => {
            OK();
        },
    })
}
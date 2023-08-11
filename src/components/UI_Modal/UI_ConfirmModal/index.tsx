import { Modal } from '@arco-design/web-react';

const UIConfirmModal = (title: string, content: string, OK: () => void) => {
	Modal.confirm({
		title: title,
		content: content,
		okButtonProps: { status: 'default' },
		onOk: () => {
			OK();
		},
	});
};

export default UIConfirmModal;

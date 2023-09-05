import { Modal } from "@arco-design/web-react";
import type { ReactNode } from "react";

const UIConfirmModal = (title: string, content: ReactNode, OK: () => void) => {
	Modal.confirm({
		title: title,
		content: content,
		okButtonProps: { status: "default" },
		cancelText: "Cancel",
		okText: "Confirm",
		autoFocus: false,
		focusLock: false,
		onOk: () => {
			OK();
		},
	});
};

export default UIConfirmModal;

import { Modal } from '@arco-design/web-react';
import './UI_SearchModal.css';
import { IconSearch, IconSwap } from '@arco-design/web-react/icon';
import IconEnter from './IconEnterSVG';
import { Dispatch, FunctionComponent, SetStateAction } from 'react';

interface UISearchModalProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
}

const UI_SearchModal: FunctionComponent<UISearchModalProps> = ({
	visible,
	setVisible,
}) => {
	return (
		<Modal
			alignCenter={false}
			className={'notification-modal'}
			visible={visible}
			onOk={() => setVisible(false)}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
			mask={true}
			simple={true}
			footer={null}
			style={{ width: 600, height: 750, borderRadius: 5 }}
		>
			<div className="search-modal-con">
				<div className="search-modal-header">
					<IconSearch className="search-modal-icon" />
					<input
						type="text"
						placeholder="Type to Search..."
						className="search-modal-input"
					/>
				</div>
				<div className="search-modal-body"></div>
				<div className="search-modal-footer">
					<span style={{ marginRight: 10 }}>
						<IconSwap className="search-modal-footer-select" /> Select
					</span>
					<span>
						<IconEnter className="search-modal-footer-enter" /> Enter
					</span>
				</div>
			</div>
		</Modal>
	);
};

export default UI_SearchModal;

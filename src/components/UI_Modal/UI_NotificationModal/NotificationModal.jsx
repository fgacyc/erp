import { useEffect, useState } from 'react';
import { Empty, Modal } from '@arco-design/web-react';
import './notificationModal.css';

const activeStyle = {
	backgroundColor: '#f2f3f5',
	color: '#165DFF',
	borderRadius: '32px',
};

const inactiveStyle = {
	backgroundColor: '#fff',
	color: '#000',
};

export default function NotificationModal({ visible, setVisible }) {
	const [rightVal, setRightVal] = useState(20);
	const [messagesNum, setMessagesNum] = useState(0);
	const [notificationsNum, setNotificationsNum] = useState(2);
	const [tasksNum, setTasksNum] = useState(3);
	const [messageStyle, setMessageStyle] = useState(activeStyle);
	const [notificationStyle, setNotificationStyle] = useState(inactiveStyle);
	const [taskStyle, setTaskStyle] = useState(inactiveStyle);
	const [showEmpty, setShowEmpty] = useState(false);
	const [currentTab, setCurrentTab] = useState(0);

	function initModalPosition() {
		let screenWidth = window.innerWidth;
		//console.log(screenWidth)
		let modalWidth = 450;
		let rightVal = screenWidth / 2 - modalWidth / 2 - 15;
		setRightVal(rightVal);
	}

	useEffect(() => {
		initModalPosition();
		window.addEventListener('resize', initModalPosition);
		return () => {
			window.removeEventListener('resize', initModalPosition);
		};
	}, []);

	let modalStyle = {
		top: 75,
		left: rightVal,
	};

	useEffect(() => {
		let tabNums = [messagesNum, notificationsNum, tasksNum];
		if (currentTab === 0) {
			setMessageStyle(activeStyle);
			setNotificationStyle(inactiveStyle);
			setTaskStyle(inactiveStyle);
		} else if (currentTab === 1) {
			setMessageStyle(inactiveStyle);
			setNotificationStyle(activeStyle);
			setTaskStyle(inactiveStyle);
		} else if (currentTab === 2) {
			setMessageStyle(inactiveStyle);
			setNotificationStyle(inactiveStyle);
			setTaskStyle(activeStyle);
		}
		tabNums[currentTab] > 0 ? setShowEmpty(false) : setShowEmpty(true);
	}, [currentTab]);

	return (
		<Modal
			alignCenter={false}
			style={modalStyle}
			className={'notification-modal'}
			visible={visible}
			onOk={() => setVisible(false)}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
			mask={true}
			simple={true}
			footer={null}
			maskStyle={{ backgroundColor: 'rgba(0,0,0,0.0)' }}
		>
			<div className={'notification-modal-header'}>
				<div className="notification-modal-header-btns">
					{messagesNum > 0 ? (
						<span style={messageStyle} onClick={() => setCurrentTab(0)}>
							Messages({messagesNum})
						</span>
					) : (
						<span style={messageStyle} onClick={() => setCurrentTab(0)}>
							Message
						</span>
					)}
					{notificationsNum > 0 ? (
						<span style={notificationStyle} onClick={() => setCurrentTab(1)}>
							Notifications({notificationsNum})
						</span>
					) : (
						<span style={notificationStyle} onClick={() => setCurrentTab(1)}>
							Notification
						</span>
					)}
					{tasksNum > 0 ? (
						<span style={taskStyle} onClick={() => setCurrentTab(2)}>
							Tasks({tasksNum})
						</span>
					) : (
						<span style={taskStyle} onClick={() => setCurrentTab(2)}>
							Task
						</span>
					)}
				</div>
				<div className="notification-modal-clear">Clear</div>
			</div>
			<div className={'notification-modal-body'}>
				{showEmpty && (
					<Empty
						imgSrc="/images/empty.png"
						className="notification-modal-body-empty"
					/>
				)}
			</div>
			<div className={'notification-modal-footer'}>
				<div>
					<span style={{ cursor: 'pointer' }}>Read All</span>
				</div>
				<div>
					<span style={{ cursor: 'pointer' }}>Read More</span>
				</div>
			</div>
		</Modal>
	);
}

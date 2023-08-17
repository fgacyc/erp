import { Button, Input, Message, Modal } from '@arco-design/web-react';
import {
	IconCloseCircle,
	IconEmail,
	IconPhone,
} from '@arco-design/web-react/icon';
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useMemo,
	useState,
} from 'react';
import { useSettingModalStore } from '../settingModalStore';
import { shallow } from 'zustand/shallow';
import { validateEmail } from '@/tools/string';
import { validatePhone } from '@/tools/number';
import { updateSettingsRequest } from '../SettingModalPages/updateSettingsRequest';

interface EmailOrPhoneSettingModalProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	type: 'email' | 'phone';
}

const EmailOrPhoneSettingModal: FunctionComponent<
	EmailOrPhoneSettingModalProps
> = ({ visible, setVisible, type }) => {
	const emailKeyWords = useMemo(
		() => ['Email', 'an Email', 'an new Email'],
		[],
	);
	const phoneKeyWords = useMemo(
		() => ['phone number', 'a phone number', 'a new phone number'],
		[],
	);
	const [currentKeyWords, setCurrentKeyWords] = useState(emailKeyWords);
	const [value, setValue] = useState('');
	const [, updateEmail] = useSettingModalStore(
		(state) => [state.email, state.setEmail],
		shallow,
	);
	const [, updatePhoneNumber] = useSettingModalStore(
		(state) => [state.phoneNumber, state.setPhoneNumber],
		shallow,
	);

	useEffect(() => {
		if (type === 'email') {
			setCurrentKeyWords(emailKeyWords);
		} else if (type === 'phone') {
			setCurrentKeyWords(phoneKeyWords);
		}
	}, [emailKeyWords, phoneKeyWords, type]);

	function handleClick() {
		if (type === 'email') {
			const res = validateEmail(value);
			if (res.status === true) {
				updateSettingsRequest('email', value).then((res) => {
					if (res.status) {
						updateEmail(value);
					} else {
						Message.warning('Email updated failed!');
					}
				});
			} else {
				Message.warning(res.message);
				return;
			}
		}

		if (type === 'phone') {
			const res = validatePhone(value);
			if (res.status === true) {
				updateSettingsRequest('phone_number', value).then((res) => {
					if (res.status) {
						updatePhoneNumber(value);
					} else {
						Message.warning('Phone number updated failed!');
					}
				});
			} else {
				Message.warning(res.message);
				return;
			}
		}
		setValue('');
		setVisible(false);
	}

	function handleClose() {
		setValue('');
		setVisible(false);
	}

	return (
		<Modal
			visible={visible}
			onOk={() => setVisible(false)}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
			simple={true}
			footer={null}
			closeIcon={<IconCloseCircle />}
		>
			<div style={{ color: 'rgba(55, 53, 47, 0.65)' }}>
				<div style={{ height: 30 }}>
					<IconCloseCircle
						style={{
							float: 'right',
							fontSize: 20,
							color: 'gray',
							cursor: 'pointer',
						}}
						onClick={handleClose}
					/>
				</div>
				<div style={{ textAlign: 'center', marginBottom: 20 }}>
					{type === 'email' ? (
						<IconEmail style={{ fontSize: 25 }} />
					) : (
						<IconPhone style={{ fontSize: 25 }} />
					)}
					<div style={{ fontWeight: 'bold', marginTop: 10 }}>
						Set {currentKeyWords[1]}
					</div>
				</div>
				<div style={{ marginBottom: 10 }}>
					<div style={{ marginBottom: 3, fontSize: 12 }}>
						Enter {currentKeyWords[2]}
					</div>
					<Input
						style={{ width: '100%' }}
						type={currentKeyWords[0] === 'Email' ? 'email' : 'phone'}
						onChange={(val) => setValue(val)}
						placeholder={'New ' + currentKeyWords[0]}
						value={value}
					/>
				</div>
				<div style={{ marginBottom: 20 }}>
					<div style={{ marginBottom: 3, fontSize: 12 }}>Enter PIN code</div>
					<Input style={{ width: '100%' }} placeholder="PIN code" disabled />
				</div>
				<Button type="primary" long onClick={handleClick}>
					Set {currentKeyWords[1]}
				</Button>
			</div>
		</Modal>
	);
};
export default EmailOrPhoneSettingModal;

import { useSettingModalStore } from '../settingModalStore.js';
import {
	Avatar,
	Button,
	Divider,
	Input,
	Message,
	Upload,
} from '@arco-design/web-react';
import { IconCamera, IconCheck, IconRight } from '@arco-design/web-react/icon';
import EmailOrPhoneSettingModal from '../accountModal/EmailOrPhoneSettingModal';
import PasswordSettingModal from '../accountModal/PasswordSettingModal';
import UI_ConfirmModal from '../../UI_ConfirmModal/';
import DeleteAccountModal from '../accountModal/DeleteAccountModal';
import { useState } from 'react';
import { hostURL } from '@/config';
import { useAuth0 } from '@auth0/auth0-react';

export const SettingModalDivider = () => {
	return <Divider style={{ margin: '10px 0' }} />;
};

export const SettingModalAccount = () => {
	const { user } = useAuth0();

	const cyc_id = useSettingModalStore((state) => state.CYC_ID);

	const staff = useSettingModalStore((state) => state.staff);
	const [newUsername, updateNewUsername] = useState(user?.name);
	const email = useSettingModalStore((state) => state.email);
	const phoneNumber = useSettingModalStore((state) => state.phoneNumber);
	const [emailSettingModalVisible, setEmailSettingModalVisible] =
		useState(false);
	const [phoneSettingModalVisible, setPhoneSettingModalVisible] =
		useState(false);
	const [passwordSettingModalVisible, setPasswordSettingModalVisible] =
		useState(false);
	const [deleteAccountModalVisible, setDeleteAccountModalVisible] =
		useState(false);
	const [file] = useState();

	function showConfirmModal() {
		UI_ConfirmModal('Confirm', 'Are you sure to log out of all devices', () => {
			console.log('confirm');
		});
	}

	function newUsernameHandler() {
		console.log('Update username');
		// updateSettingsRequest('username', newUsername).then((res) => {
		// 	if (res.status) {
		// 		updateUsername(newUsername);
		// 	}
		// });
	}

	function uploadLimit(file: File) {
		// file size limit < 5MB
		console.log(file.size);
		if (file.size < 5 * 1024 * 1024) {
			return true;
		} else {
			Message.warning('File size limit < 5MB');
			return false;
		}
	}

	return (
		<div className="setting-modal-account-con">
			<div>
				<h3>My profile</h3>
				<SettingModalDivider />
				<div className="setting-modal-account-profile">
					<Upload
						action={`${hostURL}/upload/avatar/${staff?.CYC_ID}`}
						accept="image/*"
						beforeUpload={uploadLimit}
						fileList={file ? [file] : []}
						showUploadList={false}
						onChange={() => {
							// setAvatar(URL.createObjectURL(currentFile.originFile as File));
							console.log('change avatar');
						}}
					>
						<Avatar
							triggerIcon={<IconCamera />}
							triggerIconStyle={{
								color: '#3491FA',
							}}
							autoFixFontSize={false}
							style={{
								backgroundColor: '#168CFF',
								marginRight: 30,
							}}
							size={60}
						>
							{user?.picture && (
								<img
									src={user?.picture}
									alt="avatar"
									style={{ width: 60, height: 60, backgroundColor: 'white' }}
								/>
							)}
						</Avatar>
					</Upload>

					<div>
						<div>Username</div>
						<div>
							<Input
								style={{ width: 150 }}
								onChange={updateNewUsername}
								value={newUsername}
							/>
							<Button
								type="primary"
								icon={<IconCheck />}
								onClick={newUsernameHandler}
								style={{ marginLeft: 10 }}
							/>
						</div>
					</div>
				</div>
			</div>

			<div className="setting-modal-account-security">
				<h3>Account Security</h3>
				<SettingModalDivider />
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div>
						<div>CYC ID</div>
						<div className="setting-desc-text-grey">{cyc_id ?? '-'}</div>
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div>
						<div>Email</div>
						<div className="setting-desc-text-grey">{email && email}</div>
					</div>
					<Button
						type="outline"
						style={{ width: 140 }}
						onClick={() => setEmailSettingModalVisible(true)}
					>
						Update email
					</Button>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 10,
					}}
				>
					<div>
						<div>Phone number</div>
						<div className="setting-desc-text-grey">
							{phoneNumber ? phoneNumber : 'None'}
						</div>
					</div>
					<Button
						type="outline"
						style={{ width: 140 }}
						onClick={() => setPhoneSettingModalVisible(true)}
					>
						Update phone
					</Button>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 10,
					}}
				>
					<div>
						<div>Password</div>
						<div className="setting-desc-text-grey">
							Set a permanent password to login to your account.
						</div>
					</div>
					<Button
						type="outline"
						style={{ width: 140 }}
						onClick={() => setPasswordSettingModalVisible(true)}
					>
						Reset password
					</Button>
				</div>
			</div>

			<div className="setting-modal-account-support">
				<h3>Support</h3>
				<SettingModalDivider />
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
					}}
				>
					<div>
						<div>Log out of all devices</div>
						<div className="setting-desc-text-grey">
							Log out of all other active sessions on other devices besides this
							one.
						</div>
					</div>
					<div
						className="setting-modal-account-support-left-icon"
						onClick={showConfirmModal}
					>
						<IconRight />
					</div>
				</div>
				<div
					style={{
						display: 'flex',
						justifyContent: 'space-between',
						alignItems: 'center',
						marginTop: 10,
					}}
				>
					<div>
						<div style={{ color: 'red' }}>Delete my account</div>
						<div className="setting-desc-text-grey">
							Permanently delete the account and remove all data from database.
						</div>
					</div>
					<div
						className="setting-modal-account-support-left-icon"
						onClick={() => setDeleteAccountModalVisible(true)}
					>
						<IconRight />
					</div>
				</div>
			</div>
			<EmailOrPhoneSettingModal
				visible={emailSettingModalVisible}
				setVisible={setEmailSettingModalVisible}
				type="email"
			/>
			<EmailOrPhoneSettingModal
				visible={phoneSettingModalVisible}
				setVisible={setPhoneSettingModalVisible}
				type="phone"
			/>
			<PasswordSettingModal
				visible={passwordSettingModalVisible}
				setVisible={setPasswordSettingModalVisible}
			/>
			<DeleteAccountModal
				visible={deleteAccountModalVisible}
				setVisible={setDeleteAccountModalVisible}
			/>
		</div>
	);
};

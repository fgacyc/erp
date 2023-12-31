import AvatarMenu from "@/components/UI_Menu/UI_AvatarMenu";
import {
	IconLanguage,
	IconMoon,
	IconNotification,
	IconSearch,
	IconSettings,
	IconSun,
} from "@arco-design/web-react/icon";
import { Button } from "@arco-design/web-react";
import "../../../pages/Frame/Frame.css";
import { useState } from "react";
import NotificationModal from "@/components/UI_Modal/UI_NotificationModal/NotificationModal";
import UI_SearchModal from "@/components/UI_Modal/UI_SearchModal/UI_SearchModal";
import UI_SettingModal from "@/components/UI_Modal/UI_SettingModal/UI_SettingModal";

const HeadBarBtns = () => {
	const [notificationModalVisible, setNotificationModalVisible] =
		useState(false);
	const [ifDarkTheme, setIfDarkTheme] = useState(false);
	const [searchModalVisible, setSearchModalVisible] = useState(false);
	const [settingModalVisible, setSettingModalVisible] = useState(false);
	const [ifNewNotification] = useState(false);

	function changeTheme() {
		if (ifDarkTheme) {
			document.body.removeAttribute("arco-theme");
			setIfDarkTheme(false);
		} else {
			document.body.setAttribute("arco-theme", "dark");
			setIfDarkTheme(true);
		}
	}

	function showNotificationModal() {
		setNotificationModalVisible(!notificationModalVisible);
	}

	return (
		<span className="head-bar-btns">
			<Button
				shape="circle"
				type="primary"
				icon={<IconSearch />}
				className="head-bar-btn"
				onClick={() => setSearchModalVisible(true)}
			/>
			<Button
				shape="circle"
				type="primary"
				icon={<IconLanguage />}
				className="head-bar-btn"
			/>

			<Button
				shape="circle"
				type="primary"
				icon={ifDarkTheme ? <IconSun /> : <IconMoon />}
				className="head-bar-btn"
				onClick={changeTheme}
			/>

			<Button
				shape="circle"
				type="primary"
				icon={<IconSettings />}
				className="head-bar-btn"
				onClick={() => setSettingModalVisible(true)}
			/>
			<Button
				shape="circle"
				type="primary"
				icon={<IconNotification />}
				className="head-bar-btn"
				onClick={showNotificationModal}
			>
				{ifNewNotification && <div className="notification-dot"></div>}
			</Button>
			<AvatarMenu />

			<NotificationModal
				visible={notificationModalVisible}
				setVisible={setNotificationModalVisible}
			/>
			<UI_SearchModal
				visible={searchModalVisible}
				setVisible={setSearchModalVisible}
			/>
			<UI_SettingModal
				visible={settingModalVisible}
				setVisible={setSettingModalVisible}
			/>
		</span>
	);
};

export default HeadBarBtns;

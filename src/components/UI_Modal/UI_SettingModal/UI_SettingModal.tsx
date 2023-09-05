import { Modal } from "@arco-design/web-react";
import "./UI_SettingModal.css";
import { UI_SettingModalLeft } from "./UI_SettingModalLeft";
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from "react";
import { useSettingModalStore } from "./settingModalStore";
import { SettingModalAccount } from "./SettingModalPages/SettingModalAccount";
import SettingModalHome from "./SettingModalPages/SettingModalHome";
import SettingModalSettings from "./SettingModalPages/SettingModalSettings";
import SettingModalNotifications from "./SettingModalPages/SettingModalNotifications";
// import SettingModalConnections from "./SettingModalPages/SettingModalConnections";
import SettingModalLanguageAndRegion from "./SettingModalPages/SettingModalLanguageAndRegion";
import SettingModalSecurity from "./SettingModalPages/SettingModalSecurity";
import SettingModalAbout from "./SettingModalPages/SettingModalAbout";
import PubSub from "pubsub-js";
import { shallow } from "zustand/shallow";

interface UISettingModal {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
}

const UI_SettingModal: FunctionComponent<UISettingModal> = ({
	visible,
	setVisible,
}) => {
	const [currentTab, setCurrentTab] = useSettingModalStore(
		(state) => [state.currentTab, state.setCurrentTab],
		shallow,
	);
	const [ifInitStaff, setIfInitStaff] = useState(false);
	const pages = [
		<SettingModalAccount key={0} />,
		<SettingModalHome key={1} />,
		<SettingModalSettings key={2} />,
		<SettingModalNotifications key={3} />,
		// <SettingModalConnections key={4} />,
		<SettingModalLanguageAndRegion key={4} />,
		<SettingModalSecurity key={5} />,
		<SettingModalAbout key={6} />,
	];

	useEffect(() => {
		setIfInitStaff(true);
	}, []);

	useEffect(() => {
		const subscription = PubSub.subscribe("switchTab", (_, data) => {
			if (data.tabNum === 0) {
				setCurrentTab(0);
				setVisible(true);
			} else if (data.tabNum === 2) {
				setCurrentTab(2);
				setVisible(true);
			}
		});
		return () => {
			PubSub.unsubscribe(subscription);
		};
	}, [setCurrentTab, setVisible]);

	return (
		<Modal
			alignCenter={false}
			visible={visible}
			className="setting-modal w-[1000px]"
			onOk={() => setVisible(false)}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
			mask={true}
			simple={true}
			footer={null}
		>
			<div className="setting-modal-con">
				<div className="setting-modal-con-left">
					{ifInitStaff && <UI_SettingModalLeft />}
				</div>
				<div className="setting-modal-con-right">{pages[currentTab]}</div>
			</div>
		</Modal>
	);
};
export default UI_SettingModal;

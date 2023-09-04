import { SettingModalDivider } from "./SettingModalAccount.jsx";
import { Select } from "@arco-design/web-react";

const app_themes = ["Light", "Dark"];
const start_page_options = [
	"Dashboard",
	"Calendar",
	"Tasks",
	"Contacts",
	"Settings",
];

const SettingModalSettings = () => {
	return (
		<div>
			<div style={{ marginBottom: 40 }}>
				<h3>My settings</h3>
				<SettingModalDivider />
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Appearance</div>
						<div className="setting-desc-text-grey">
							Customize how ERP System looks on your device.
						</div>
					</div>
					<div style={{ width: 140, textAlign: "right" }}>
						<Select value={app_themes[0]}>
							{app_themes.map((option, index) => (
								<Select.Option key={index} value={option}>
									{option}
								</Select.Option>
							))}
						</Select>
					</div>
				</div>
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Open on start</div>
						<div className="setting-desc-text-grey">
							Choose what to show when ERP starts.
						</div>
					</div>
					<div style={{ width: 140, textAlign: "right" }}>
						<Select value={start_page_options[0]}>
							{start_page_options.map((option, index) => (
								<Select.Option key={index} value={option}>
									{option}
								</Select.Option>
							))}
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingModalSettings;

import { SettingModalDivider } from "./SettingModalAccount";

import { Select } from "@arco-design/web-react";
const Option = Select.Option;
const options = ["English", "Chinese", "Malay"];

const SettingModalLanguageAndRegion = () => {
	return (
		<div>
			<div style={{ marginBottom: 40 }}>
				<h3>Language & Region</h3>
				<SettingModalDivider />
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Language</div>
						<div className="setting-desc-text-grey">
							Change the language used in the user interface.
						</div>
					</div>
					<div style={{ width: 150, textAlign: "right" }}>
						<Select defaultValue={options[0]}>
							{options.map((option, index) => (
								<Option key={index} value={option}>
									{option}
								</Option>
							))}
						</Select>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingModalLanguageAndRegion;

import { Select } from '@arco-design/web-react';
import { ministry_roles } from '../../data/ministries';
import { FunctionComponent } from 'react';

interface MinistryRoleSelectProps {
	value: string;
	setMinistryRole: (newMinistryRole: string) => void;
}
const MinistryRoleSelect: FunctionComponent<MinistryRoleSelectProps> = ({
	value,
	setMinistryRole,
}) => {
	return (
		<Select
			defaultValue={value}
			onChange={setMinistryRole}
			placeholder="Click to expand"
		>
			{ministry_roles.map((option, index) => (
				<Select.Option key={index} value={option.value}>
					{option.label}
				</Select.Option>
			))}
		</Select>
	);
};

export default MinistryRoleSelect;

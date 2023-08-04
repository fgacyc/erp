import { Select } from '@arco-design/web-react';
import { pastoral_team_roles } from '../../data/pastoral_teams.js';
const Option = Select.Option;
export default function PastoralRoleSelect({ value, setPastoral }) {
	return (
		<Select
			defaultValue={value}
			onChange={setPastoral}
			placeholder="Click to expand"
		>
			{pastoral_team_roles.map((option, index) => (
				<Option
					key={index}
					value={option.value}
					disabled={index === 3 || index === 4}
				>
					{option.label}
				</Option>
			))}
		</Select>
	);
}

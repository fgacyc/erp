import { Select } from '@arco-design/web-react';
import { pastoral_team_roles } from '../../data/pastoral_teams.js';
import { FunctionComponent } from 'react';

interface PastoralRoleSelectProps {
	value: string;
	setPastoral: (newPastoral: string) => void;
}

const PastoralRoleSelect: FunctionComponent<PastoralRoleSelectProps> = ({
	value,
	setPastoral,
}) => {
	return (
		<Select
			defaultValue={value}
			onChange={setPastoral}
			placeholder="Click to expand"
		>
			{pastoral_team_roles.map((option, index) => (
				<Select.Option
					key={index}
					value={option.value}
					disabled={index === 3 || index === 4}
				>
					{option.label}
				</Select.Option>
			))}
		</Select>
	);
};

export default PastoralRoleSelect;

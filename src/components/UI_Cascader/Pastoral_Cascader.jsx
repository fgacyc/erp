import { pastoral_team_options } from '../../data/pastoral_teams.js';
import { Cascader } from '@arco-design/web-react';

export default function Pastoral_Cascader({ value, setPastoral }) {
	return (
		<Cascader
			placeholder="Click to expand"
			changeOnSelect
			expandTrigger="hover"
			options={pastoral_team_options}
			onChange={(s) => setPastoral(s)}
			value={value}
		/>
	);
}

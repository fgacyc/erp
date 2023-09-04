import { FunctionComponent } from "react";
import { pastoral_team_options } from "../../data/pastoral_teams";
import { Cascader } from "@arco-design/web-react";

interface PastoralCascaderProps {
	value: string[];
	setPastoral: (newPastoralTeam: string[]) => void;
}
const PastoralCascader: FunctionComponent<PastoralCascaderProps> = ({
	value,
	setPastoral,
}) => {
	return (
		<Cascader
			placeholder="Click to expand"
			changeOnSelect
			expandTrigger="hover"
			options={pastoral_team_options}
			onChange={(s) => setPastoral(s as string[])}
			value={value}
		/>
	);
};

export default PastoralCascader;

import { FunctionComponent } from 'react';
import { department_options } from '@/data/ministries';
import { Cascader } from '@arco-design/web-react';

interface MinistryCascaderProps {
	value: string[];
	setMinistry: (newMinistryName: string[]) => void;
}

const MinistryCascader: FunctionComponent<MinistryCascaderProps> = ({
	value,
	setMinistry,
}) => {
	return (
		<Cascader
			changeOnSelect
			placeholder="Click to expand"
			expandTrigger="hover"
			options={department_options}
			onChange={(s) => setMinistry(s as string[])}
			allowClear
			value={value}
		/>
	);
};

export default MinistryCascader;

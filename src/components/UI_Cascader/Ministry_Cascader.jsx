import { department_options } from '../../data/ministries.js';
import { Cascader } from '@arco-design/web-react';

export default function Ministry_Cascader({ value, setMinistry }) {
	return (
		<Cascader
			changeOnSelect
			placeholder="Click to expand"
			expandTrigger="hover"
			options={department_options}
			onChange={(s) => setMinistry(s)}
			allowClear
			value={value}
		/>
	);
}

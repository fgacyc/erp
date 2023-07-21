import { Select} from '@arco-design/web-react';
import {ministry_roles} from "../../data/ministries.js";
const Option = Select.Option;
export default  function MinistryRoleSelect({value,setMinistryRole}){

    return (
        <Select defaultValue={value} onChange={setMinistryRole} placeholder="Click to expand"
        >
            {ministry_roles.map((option, index) => (
                <Option key={index} value={option.value}
                >
                    {option.label}
                </Option>
            ))}
        </Select>
    )
}
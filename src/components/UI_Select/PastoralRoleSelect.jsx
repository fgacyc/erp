import { Select, Message, Space } from '@arco-design/web-react';
import {pastoral_team_roles} from "../../data/pastoral_teams.js";
const Option = Select.Option;
export default  function PastoralRoleSelect(){
    return (
        <Select
            onChange={(value) =>
                Message.info({
                    content: `You select ${value}.`,
                    showIcon: true,
                })
            }
        >
            {pastoral_team_roles.map((option, index) => (
                <Option key={option.value} disabled={index === 3} value={option.value}>
                    {option.label}
                </Option>
            ))}
        </Select>
    )
}
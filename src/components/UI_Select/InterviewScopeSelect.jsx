import { Select } from '@arco-design/web-react';


const Option = Select.Option;

const departments = [
    "People-people",
    "People-general affair",
    "People-technology",
    "Communication-social media",
    "Communication-design",
    "Communication-photography",
    "Creative-production",
    "Creative-arts",
    "Creative-worship",
    "WonderKids-wonderkids",
];
const groups = [
    ["usher","security"],
    ["admin","lounge","shuttle"],
    ["software development", "project management" ],
    [ "content creation", "editorial"],
    ["graphic design","multimedia design"],
    ["photography"],
    ["stage management", "multimedia","sound","lighting","translation"],
    [ "dance", "fashion&image", "drama"],
    ["vocal","musician"],
    ["children minister"]
];

export  default  function InterviewScopeSelect({value,setScope}){


    return (
        <Select showSearch allowClear  mode='multiple' onChange={setScope} value={value}
                placeholder='Select scopes' >
            {groups.map((options, index) => {
                return (
                    <Select.OptGroup label={departments[index]} key={index}>
                        {options.map((option, index) => (
                            <Option key={option} value={option}>
                                {option}
                            </Option>
                        ))}
                    </Select.OptGroup>
                );
            })}
        </Select>
    )
}
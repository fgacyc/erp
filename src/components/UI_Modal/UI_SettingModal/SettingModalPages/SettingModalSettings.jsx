import {SettingModalDivider} from "./SettingModalAccount.jsx";
import {Select} from "@arco-design/web-react";
const Option = Select.Option;
const options = ['Beijing', 'Shanghai', 'Guangzhou', 'Disabled'];

export  default function SettingModalSettings(){
    return(
        <div>
            <div  style={{marginBottom:40}}>
                <h3>My settings</h3>
                <SettingModalDivider />
                <div className="display-flex-space-between"  style={{marginBottom:10}}>
                    <div>
                        <div >Appearance</div>
                        <div className="setting-desc-text-grey" >Customize how ERP System looks on your device.</div>
                    </div>
                    <div style={{width:140, textAlign:"right"}} >
                        <Select
                            onChange={(value) =>
                                Message.info({
                                    content: `You select ${value}.`,
                                    showIcon: true,
                                })
                            }
                        >
                            {options.map((option, index) => (
                                <Option key={option} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className="display-flex-space-between"  style={{marginBottom:10}}>
                    <div>
                        <div >Open on start</div>
                        <div className="setting-desc-text-grey" >Choose what to show when ERP starts.</div>
                    </div>
                    <div style={{width:140,textAlign:"right"}} >
                        <Select
                            onChange={(value) =>
                                Message.info({
                                    content: `You select ${value}.`,
                                    showIcon: true,
                                })
                            }
                        >
                            {options.map((option, index) => (
                                <Option key={option} value={option}>
                                    {option}
                                </Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>
        </div>
    )
}
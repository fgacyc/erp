import {SettingModalDivider} from "./SettingModalAccount.jsx";
import Pastoral_Cascader from "../../../UI_Cascader/Pastoral_Cascader.jsx";
import PastoralRoleSelect from "../../../UI_Select/PastoralRoleSelect.jsx";
import {Switch} from "@arco-design/web-react";

export  default function SettingModalSecurity(){
    return(
        <div>
            <div  style={{marginBottom:40}}>
                <h3>Security</h3>
                <SettingModalDivider />
                <div className="display-flex-space-between"  style={{marginBottom:10}}>
                    <div>
                        <div >Notifications</div>
                        <div className="setting-desc-text-grey" >Receive email notification when you login</div>
                    </div>
                    <div style={{width:140, textAlign:"right"}} >
                        <Switch  checked={true} />
                    </div>
                </div>
                {/*<div className="display-flex-space-between"  style={{marginBottom:10}}>*/}
                {/*    <div>*/}
                {/*        <div >Messages</div>*/}
                {/*        <div className="setting-desc-text-grey" >Receive message notification.</div>*/}
                {/*    </div>*/}
                {/*    <div style={{width:140, textAlign:"right"}} >*/}
                {/*        <Switch  checked={true} />*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<div className="display-flex-space-between"  style={{marginBottom:10}}>*/}
                {/*    <div>*/}
                {/*        <div >Tasks</div>*/}
                {/*        <div className="setting-desc-text-grey" >Receive tasks notification.</div>*/}
                {/*    </div>*/}
                {/*    <div style={{width:140, textAlign:"right"}} >*/}
                {/*        <Switch checked={true} />*/}
                {/*    </div>*/}
                {/*</div>*/}
            </div>
        </div>
    )
}
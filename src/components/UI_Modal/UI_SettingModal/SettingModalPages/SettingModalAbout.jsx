import {SettingModalDivider} from "./SettingModalAccount.jsx";
// import Pastoral_Cascader from "../../../UI_Cascader/Pastoral_Cascader.jsx";
// import PastoralRoleSelect from "../../../UI_Select/PastoralRoleSelect.jsx";
// import {Switch} from "@arco-design/web-react";

export  default function SettingModalAbout(){
    return(
        <div>
            <div  style={{marginBottom:40}}>
                <h3>About</h3>
                <SettingModalDivider />
                <div style={{textAlign:"center", marginTop:20}} >
                    <img src="/images/fga.png" alt="fga logo" style={{width:160,height:160,marginBottom:50}}/>
                    <div>© 2023 FGACYC</div>
                    <div>All Rights Reserved </div>
                </div>

                {/*<div className="display-flex-space-between"  style={{marginBottom:10}}>*/}
                {/*    <div>*/}
                {/*        <div >Notifications</div>*/}
                {/*        <div className="setting-desc-text-grey" >Choose receive notification or not.</div>*/}
                {/*    </div>*/}
                {/*    <div style={{width:140, textAlign:"right"}} >*/}
                {/*        <Switch  checked={true} />*/}
                {/*    </div>*/}
                {/*</div>*/}
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
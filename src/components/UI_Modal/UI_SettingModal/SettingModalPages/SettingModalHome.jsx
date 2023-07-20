import {Avatar, Input, InputTag, Switch} from "@arco-design/web-react";
import {useSettingModalStore} from "../settingModalStore.js";
import {SettingModalDivider} from "./SettingModalAccount.jsx";
import Pastoral_Cascader from "../../../UI_Cascader/Pastoral_Cascader.jsx";
import Ministry_Cascader from "../../../UI_Cascader/Ministry_Cascader.jsx";
import {useState} from "react";
import PastoralRoleSelect from "../../../UI_Select/PastoralRoleSelect.jsx";

export  default  function SettingModalHome(){
    const  staff = useSettingModalStore(state => state.staff)
    const [pastoral_team, setPastoral_team] = useState([])
    const [ministry, setMinistry] = useState([])
    const [pastoralTeam, setPastoralTeam] = useSettingModalStore(state =>[state.pastoral_team, state.setPastoralTeam])
    const [pastoralRole, setPastoralRole] = useSettingModalStore(state =>[state.pastoral_role, state.setPastoralRole])
    const [ministryName, setMinistryName] = useSettingModalStore(state =>[state.ministry_name, state.setMinistryName])
    const [ministryRole, setMinistryRole] = useSettingModalStore(state =>[state.ministry_role, state.setMinistryRole])
    const [ifMinistryInterviewer, setIfMinistryInterviewer] = useSettingModalStore(state =>[state.ministry_interviewer, state.setMinistryInterviewer])
    const [ministryScope, setMinistryScope] = useSettingModalStore(state =>[state.ministry_scope, state.setMinistryScope])

    return (
        <div>
            <div  style={{marginBottom:40}}>
                <h3>My Pastoral team</h3>
                <SettingModalDivider />
                <div className="display-flex-space-between"  style={{marginBottom:10}}>
                    <div>
                        <div >Pastoral team</div>
                        <div className="setting-desc-text-grey" >Choose which pastoral team your belong to.</div>
                    </div>
                    <div style={{width:250, textAlign:"right"}} >
                        <Pastoral_Cascader value={pastoral_team} setPastoral={setPastoral_team}
                            onchange={setPastoralTeam}
                        />
                    </div>
                </div>
                <div className="display-flex-space-between"  style={{marginBottom:10}}>
                    <div>
                        <div >Pastoral role</div>
                        <div className="setting-desc-text-grey" >Choose which pastoral role your are.</div>
                    </div>
                    <div style={{width:250,textAlign:"right"}} >
                        <PastoralRoleSelect onChange={setPastoralRole} />
                    </div>
                </div>
            </div>
            <div  style={{marginBottom:40}}>
                <h3>My Ministry</h3>
                <SettingModalDivider />
                <div className="display-flex-space-between" style={{marginBottom:10}}>
                   <div>
                       <div >Ministry name</div>
                       <div className="setting-desc-text-grey" >Choose which ministry team your are serving.</div>
                   </div>
                    <div style={{width:250}} >
                        <Ministry_Cascader value={ministry} setMinistry={setMinistry}/>
                    </div>
                </div>
                <div className="display-flex-space-between" style={{marginBottom:10}}>
                    <div >
                        <div >Ministry role</div>
                        <div className="setting-desc-text-grey" >Choose which ministry role your are.</div>
                    </div>
                    <div style={{width:250}} >
                        <Ministry_Cascader value={ministry} setMinistry={setMinistry}/>
                    </div>
                </div>
            </div>
            <div  style={{marginBottom:40}}>
                <h3>Interview</h3>
                <SettingModalDivider />
                <div className="display-flex-space-between" style={{marginBottom:10}}>
                    <div>
                        <div >Ministry appointment</div>
                        <div className="setting-desc-text-grey" >Choose whether to accept the interview appointment.</div>
                    </div>
                    <div style={{width:250, textAlign:"right"}} >
                        <Switch  />
                    </div>
                </div>
                <div className="display-flex-space-between" style={{marginBottom:10}}>
                    <div >
                        <div>Ministry scope</div>
                        <div className="setting-desc-text-grey" >Choose the scope you can interview as an interviewer..</div>
                    </div>
                    <div style={{width:250}}  >
                        <InputTag
                            allowClear
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
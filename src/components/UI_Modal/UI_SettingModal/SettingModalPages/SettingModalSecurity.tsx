import { SettingModalDivider } from "./SettingModalAccount";
import { Switch } from "@arco-design/web-react";

const SettingModalSecurity = () => {
	return (
		<div>
			<div style={{ marginBottom: 40 }}>
				<h3>Security</h3>
				<SettingModalDivider />
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Notifications</div>
						<div className="setting-desc-text-grey">
							Receive email notification when you login
						</div>
					</div>
					<div style={{ width: 140, textAlign: "right" }}>
						<Switch checked={true} />
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
	);
};

export default SettingModalSecurity;

import { Switch } from "@arco-design/web-react";
import { useSettingModalStore } from "../settingModalStore";
import { SettingModalDivider } from "./SettingModalAccount";
import PastoralCascader from "@/components/UI_Cascader/PastoralCascader";
import MinistryCascader from "@/components/UI_Cascader/MinistryCascader";
import PastoralRoleSelect from "@/components/UI_Select/PastoralRoleSelect";
import MinistryRoleSelect from "@/components/UI_Select/MinistryRoleSelect";
import InterviewScopeSelect from "@/components/UI_Select/InterviewScopeSelect";

const SettingModalHome = () => {
	// const  staff = useSettingModalStore(state => state.staff)
	const [pastoralTeam, setPastoralTeam] = useSettingModalStore((state) => [
		state.pastoral_team,
		state.setPastoralTeam,
	]);
	const [pastoralRole, setPastoralRole] = useSettingModalStore((state) => [
		state.pastoral_role,
		state.setPastoralRole,
	]);
	const [ministryName, setMinistryName] = useSettingModalStore((state) => [
		state.ministry_name,
		state.setMinistryName,
	]);
	const [ministryRole, setMinistryRole] = useSettingModalStore((state) => [
		state.ministry_role,
		state.setMinistryRole,
	]);
	const [ifMinistryInterviewer, setIfMinistryInterviewer] =
		useSettingModalStore((state) => [
			state.ministry_interviewer,
			state.setMinistryInterviewer,
		]);
	const [ministryScope, setMinistryScope] = useSettingModalStore((state) => [
		state.ministry_scope,
		state.setMinistryScope,
	]);

	return (
		<div>
			<div style={{ marginBottom: 40 }}>
				<h3>My Pastoral team</h3>
				<SettingModalDivider />
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Pastoral team</div>
						<div className="setting-desc-text-grey">
							Choose which pastoral team your belong to.
						</div>
					</div>
					<div style={{ width: 250, textAlign: "right" }}>
						<PastoralCascader
							value={pastoralTeam}
							setPastoral={setPastoralTeam}
						/>
					</div>
				</div>
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Pastoral role</div>
						<div className="setting-desc-text-grey">
							Choose which pastoral role your are.
						</div>
					</div>
					<div style={{ width: 250, textAlign: "right" }}>
						<PastoralRoleSelect
							value={pastoralRole}
							setPastoral={setPastoralRole}
						/>
					</div>
				</div>
			</div>
			<div style={{ marginBottom: 40 }}>
				<h3>My Ministry</h3>
				<SettingModalDivider />
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Ministry name</div>
						<div className="setting-desc-text-grey">
							Choose which ministry team your are serving.
						</div>
					</div>
					<div style={{ width: 250 }}>
						<MinistryCascader
							value={ministryName}
							setMinistry={setMinistryName}
						/>
					</div>
				</div>
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Ministry role</div>
						<div className="setting-desc-text-grey">
							Choose which ministry role your are.
						</div>
					</div>
					<div style={{ width: 250 }}>
						<MinistryRoleSelect
							value={ministryRole}
							setMinistryRole={setMinistryRole}
						/>
					</div>
				</div>
			</div>
			<div style={{ marginBottom: 40 }}>
				<h3>Interview</h3>
				<SettingModalDivider />
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Ministry appointment</div>
						<div className="setting-desc-text-grey">
							Choose whether to accept the interview appointment.
						</div>
					</div>
					<div style={{ width: 250, textAlign: "right" }}>
						<Switch
							checked={ifMinistryInterviewer}
							onChange={setIfMinistryInterviewer}
						/>
					</div>
				</div>
				<div
					className="display-flex-space-between"
					style={{ marginBottom: 10 }}
				>
					<div>
						<div>Ministry scope</div>
						<div className="setting-desc-text-grey">
							Choose the scope you can interview as an interviewer.
						</div>
					</div>
					<div style={{ width: 250 }}>
						<InterviewScopeSelect
							value={ministryScope}
							setScope={setMinistryScope}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SettingModalHome;

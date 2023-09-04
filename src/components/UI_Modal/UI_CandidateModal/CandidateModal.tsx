import { Modal, Input } from "@arco-design/web-react";
import {
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
	Dispatch,
} from "react";
import MinistryCascader from "@/components/UI_Cascader/MinistryCascader";
import PastoralCascader from "@/components/UI_Cascader/PastoralCascader";
import { updateRecruiter } from "@/pages/Recruitment/SubmissionPage/postRequest";
import { valid } from "@/pages/Recruitment/SubmissionPage/valid";
import RecruitmentSteps from "./RecruitmentSteps";

interface CandidateModalInputProps {
	tip: string;
	value: string;
	setValue: Dispatch<SetStateAction<string>>;
}

const CandidateModalInput: FunctionComponent<CandidateModalInputProps> = ({
	tip,
	value,
	setValue,
}) => {
	return (
		<div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
			<div style={{ width: 120 }}>{tip}:</div>
			<Input
				allowClear
				value={value}
				placeholder="Please Enter something"
				style={{ width: "80%" }}
				onChange={setValue}
			/>
		</div>
	);
};

interface CandidateModalProps {
	recruiter: Recruiter;
	setVisible: Dispatch<SetStateAction<boolean>>;
	visible: boolean;
}

const CandidateModal: FunctionComponent<CandidateModalProps> = ({
	recruiter,
	visible,
	setVisible,
}) => {
	// console.log(recruiterInfo)
	// const [name, setName] = useState(recruiter.info.name)
	// const [phone, setPhone] = useState(recruiter.info.phone)
	// const [email, setEmail] = useState(recruiter.info.email)
	// const [pastoral_team, setPastoral_team] = useState(recruiter.info.pastoral_team)
	// const [ministry, setMinistry] = useState(recruiter.info.ministry)

	const [name, setName] = useState("");
	const [phone, setPhone] = useState("");
	const [email, setEmail] = useState("");
	const [pastoral_team, setPastoral_team] = useState<string[]>([]);
	const [ministry, setMinistry] = useState<string[]>([]);

	useEffect(() => {
		// console.log(recruiter)
		//
		// console.log(checkApplicantStatus(recruiter))
	}, []);

	useEffect(() => {
		setName(recruiter.info.name);
		setPhone(recruiter.info.phone);
		setEmail(recruiter.info.email);
		setPastoral_team(recruiter.info.pastoral_team);
		setMinistry(recruiter.info.ministry);
	}, [visible, recruiter.info]);

	function handleSubmit() {
		if (!valid(name, phone, email, pastoral_team, ministry)) {
			// Message.warning('Please check input')
			return;
		}
		updateRecruiter(
			Number(recruiter._id),
			name,
			phone,
			email,
			pastoral_team,
			ministry,
		).then(() => {
			setVisible(false);
		});
	}

	return (
		<Modal
			title="Modify Candidate Information"
			visible={visible}
			onOk={() => {
				handleSubmit();
			}}
			onCancel={() => setVisible(false)}
			autoFocus={false}
			focusLock={true}
		>
			<CandidateModalInput tip="Name" value={name} setValue={setName} />
			<CandidateModalInput tip="Phone" value={phone} setValue={setPhone} />
			<CandidateModalInput tip="Email" value={email} setValue={setEmail} />
			<div style={{ display: "flex", alignItems: "center", marginBottom: 10 }}>
				<div style={{ width: 150 }}>Pastoral Team:</div>
				<PastoralCascader
					value={pastoral_team}
					// TODO: Revisit after migration
					setPastoral={setPastoral_team}
				/>
			</div>
			<div style={{ display: "flex", alignItems: "center", marginBottom: 30 }}>
				<div style={{ width: 150 }}>Ministry:</div>
				<MinistryCascader value={ministry} setMinistry={setMinistry} />
			</div>
			<RecruitmentSteps recruiter={recruiter} />
		</Modal>
	);
};

export default CandidateModal;

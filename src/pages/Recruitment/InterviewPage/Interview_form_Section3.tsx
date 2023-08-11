import { Button, Result, Select } from '@arco-design/web-react';
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useState,
} from 'react';
import { getReq } from '@/tools/requests';
import { get } from 'idb-keyval';

interface InterviewFormSection3 {
	ministry?: string;
	interviewers?: User[];
	setInterviewers: Dispatch<SetStateAction<User[]>>;
	currentInterviewers?: number[];
	setCurrentInterviewers: Dispatch<SetStateAction<number[]>>;
	ifSubmitted: boolean;
	backToInterviewTable: () => void;
	ifInterviewed: boolean;
}

export const Interview_form_Section3: FunctionComponent<
	InterviewFormSection3
> = ({
	ministry,
	interviewers,
	setInterviewers,
	currentInterviewers,
	setCurrentInterviewers,
	ifSubmitted,
	backToInterviewTable,
	ifInterviewed,
}) => {
	const [spaceHeight, setSpaceHeight] = useState(0);

	useEffect(() => {
		if (ifInterviewed) {
			get('current_candidate').then((res: Recruiter) => {
				// console.log(res.interview.ministry.interviewers)
				setCurrentInterviewers(res.interview.ministry.interviewers);
			});
		}

		function calHeight() {
			if (spaceHeight !== 0) return;

			const appTarget = document.querySelector('.full-screen-app-component');
			const target = document.querySelector('.full-screen-app-component-con');
			const appHeight = window.getComputedStyle(appTarget as Element).height;

			const targetHeight = window.getComputedStyle(target as Element).height;

			//console.log(appHeight, targetHeight)

			const newAppHeight = parseInt(appHeight, 10);
			const newTargetHeight = parseInt(targetHeight, 10);

			if (newAppHeight > newTargetHeight) {
				setSpaceHeight(newAppHeight - newTargetHeight);
				// console.log("yessss")
			}
		}

		ministry &&
			getReq(`/interviewers/${ministry}`).then(
				(res: { status: boolean; data: User[] }) => {
					// console.log(res.data)
					setInterviewers(res.data);
				},
			);
		calHeight();
	}, [
		ifInterviewed,
		ministry,
		setCurrentInterviewers,
		setInterviewers,
		spaceHeight,
	]);

	return (
		<div
			style={{
				display: 'flex',
				flexDirection: 'column',
				alignItems: 'center',
				justifyItems: 'center',
			}}
		>
			<div style={{ margin: '30px 0 10px 0' }}>Interviewers</div>
			<Select
				mode="multiple"
				placeholder="Please select"
				style={{ width: 600 }}
				defaultValue={[]}
				allowClear
				value={currentInterviewers}
				onChange={(list) => setCurrentInterviewers(list)}
			>
				{interviewers &&
					Object.keys(interviewers).length > 0 &&
					interviewers.map((interviewer, index) => (
						<Select.Option key={index} value={interviewer.CYC_ID}>
							{interviewer.username
								? interviewer.username
								: interviewer.full_name}
						</Select.Option>
					))}
			</Select>
			{ifSubmitted && (
				<Result
					style={{ marginTop: 70 }}
					status="success"
					title="Submission Success"
					subTitle="Recruitment form has been submitted successfully."
					extra={[
						<Button key="back" type="primary" onClick={backToInterviewTable}>
							Back
						</Button>,
					]}
				></Result>
			)}
			<div style={{ height: spaceHeight }}></div>
		</div>
	);
};

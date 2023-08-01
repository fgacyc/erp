import UI_Breadcrumb from '../../../components/UI_Breadcrumb/UI_Breadcrumb.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Message, Steps } from '@arco-design/web-react';
import { useEffect, useState } from 'react';
import { postReq } from '../../../tools/requests.js';
import { get } from 'idb-keyval';
import QuestionGroup1 from './QuestionGroup1.jsx';
import './recruitment-appo.css';
import { pad } from './data.js';
import FreeQATextArea from './FreeQATextArea.jsx';
import { Interview_form_Section3 } from './Interview_form_Section3.jsx';
import { findPastoralTeamLabel } from '../../../data/pastoral_teams.js';
import { findMinistryLabel } from '../../../data/ministries.js';

const Step = Steps.Step;

export function CountdownTimer() {
	const [countdown, setCountdown] = useState(15 * 60); // 初始倒计时为15分钟

	useEffect(() => {
		const timer = setInterval(() => {
			setCountdown((prevCountdown) => prevCountdown - 1);
			// PubSub.publish('interview-timer', { message: countdown });
		}, 1000);

		return () => clearInterval(timer); // 组件卸载时清除计时器
	}, []);

	// 将倒计时的分钟和秒数格式化为字符串
	const formatTime = () => {
		const minutes = Math.floor(countdown / 60);
		const seconds = countdown % 60;
		return `${pad(minutes)}:${pad(seconds)}`;
	};

	return (
		<div>
			{countdown >= 600 && <div>{formatTime()}</div>}
			{countdown < 600 && countdown > 300 && (
				<div style={{ color: 'orange' }}>{formatTime()}</div>
			)}
			{countdown <= 300 && countdown > 0 && (
				<div style={{ color: 'red' }}>{formatTime()}</div>
			)}
			{countdown <= 0 && <div style={{ color: 'red' }}>Time's up!</div>}
		</div>
	);
}

export default function Interview_form() {
	const breadcrumbItems = [
		{
			name: 'Recruitment',
			link: '/',
			clickable: false,
		},
		{
			name: 'Interview',
			link: '/recruitment_interview',
			clickable: true,
		},
	];
	let { RID, partID } = useParams();

	const [QAs, setQAs] = useState([]);
	const [freeQAs, setFreeQAs] = useState('');
	const [ifSubmitted, setIfSubmitted] = useState(false);
	const navigate = useNavigate();
	const [ministry, setMinistry] = useState(null);
	const [candidate, setCandidate] = useState(null);
	const [interviewers, setInterviewers] = useState(null);
	const [currentInterviewers, setCurrentInterviewers] = useState(null);
	const [ifDisabledSubmit, setIfDisabledSubmit] = useState(false);
	const [disabledPrevious, setDisabledPrevious] = useState(false);
	const [vocalRatingForm, setVocalRatingForm] = useState(null);
	const [ifInterviewed, setIfInterviewed] = useState(false);
	const [ifLoading, setIfLoading] = useState(false);

	useEffect(() => {
		get('current_candidate').then((res) => {
			//console.log(res)
			setMinistry(res.info.ministry[2]);
			setQAs(res.interview.ministry.questions);
			setCandidate(res.info);
			setIfInterviewed(res.interview.status);
		});
		initVocalRatingForm();
	}, []);

	useEffect(() => {
		if (partID === '1') {
			setDisabledPrevious(true);
		} else if (partID === '2') {
			setDisabledPrevious(false);
			setIfDisabledSubmit(false);
		} else if (partID === '3') {
			setIfDisabledSubmit(true);
		}
	}, [partID]);

	function backToInterViewTable() {
		navigate(`/recruitment_interview`);
	}

	function goToNextPart(num) {
		partID = parseInt(partID);
		// console.log(QAs)

		if (num === 1) {
			if (partID === 4) return;
			navigate(`/recruitment_interview/form/${RID}/${parseInt(partID) + 1}`);
		} else {
			if (partID === 1) return;
			navigate(`/recruitment_interview/form/${RID}/${parseInt(partID) - 1}`);
		}
	}
	function addFreeQAs() {
		for (let ele of QAs) {
			if (ele.type === 'freeQ&As') {
				ele.interviewer = freeQAs;
				return;
			}
		}

		let newQAs = QAs;
		newQAs.push({
			type: 'freeQ&As',
			interviewer: freeQAs,
		});
		setQAs(newQAs);
	}

	function addVocalRating() {
		if (candidate.ministry[2] !== 'vocal') return;
		for (let ele of QAs) {
			if (ele.type === 'vocalRating') {
				ele.interviewer = vocalRatingForm;
				return;
			}
		}
		let newQAs = QAs;
		newQAs.push({
			type: 'vocalRating',
			interviewer: vocalRatingForm,
		});
		setQAs(newQAs);
	}

	async function submitHandler() {
		setIfLoading(true);
		if (!currentInterviewers) {
			Message.warning('Please select interviewers');
			return;
		}
		addFreeQAs();
		addVocalRating();

		let data = {
			interviewers: currentInterviewers,
			questions: QAs,
		};

		// console.log(data)
		// return;

		let res = await postReq(`/interview/answers/${RID}`, data);

		if (res.status) {
			setIfLoading(false);
			setIfSubmitted(true);
			setIfDisabledSubmit(true);
			// console.log(res)
		}
	}

	function initVocalRatingForm() {
		let vocalRatingForm = {
			stars: Array(10).fill(0),
			remarks: Array(10).fill(''),
		};
		setVocalRatingForm(vocalRatingForm);
	}

	return (
		<>
			<UI_Breadcrumb items={breadcrumbItems} />
			<div
				className="app-component full-screen-app-component"
				style={{ position: 'relative' }}
				id="interview-form"
			>
				<div className="full-screen-app-component-con">
					<div style={{ height: 30 }}></div>
					<Steps
						current={parseInt(partID)}
						style={{ maxWidth: 780, margin: '0 auto' }}
					>
						<Step title="General Questions" />
						{/*<Step title='Specific Questions' />*/}
						<Step title="Q&A" />
						<Step title="Finish" />
					</Steps>
					<div className="candidate-basic-info">
						{candidate && (
							<div>
								<div>Name: {candidate.name}</div>
								<div>
									Pastoral Team:{' '}
									{findPastoralTeamLabel(candidate.pastoral_team).join(' - ')}
								</div>
								<div>
									Ministry: {findMinistryLabel(candidate.ministry).join(' - ')}
								</div>
							</div>
						)}
					</div>
					{partID === '1' && (
						<div>
							{QAs.length > 0 &&
								QAs.map((question, index) => {
									if (question.type === 'general') {
										return (
											<QuestionGroup1
												questions={QAs}
												setQuestions={setQAs}
												key={index}
												id={index}
												ifInterviewed={ifInterviewed}
											/>
										);
									}
								})}
							{QAs &&
								QAs.map((question, index) => {
									if (
										question.type !== 'general' &&
										question.type !== 'freeQ&As' &&
										question.type !== 'vocalRating'
									) {
										return (
											<QuestionGroup1
												questions={QAs}
												setQuestions={setQAs}
												key={index}
												id={index}
												ifInterviewed={ifInterviewed}
											/>
										);
									}
								})}
							<div style={{ height: 80 }}></div>
						</div>
					)}
					{partID === '2' && (
						<FreeQATextArea
							candidate={candidate}
							questions={QAs}
							freeQAs={freeQAs}
							setFreeQAs={setFreeQAs}
							vocalRatingForm={vocalRatingForm}
							setVocalRatingForm={setVocalRatingForm}
							ifInterviewed={ifInterviewed}
						/>
					)}
					{partID === '3' && (
						<Interview_form_Section3
							ministry={ministry}
							interviewers={interviewers}
							setInterviewers={setInterviewers}
							currentInterviewers={currentInterviewers}
							setCurrentInterviewers={setCurrentInterviewers}
							ifSubmitted={ifSubmitted}
							backToInterViewTable={backToInterViewTable}
							ifInterviewed={ifInterviewed}
						/>
					)}

					<Button
						type="primary"
						className="interview-btns interview-btns-left"
						disabled={disabledPrevious}
						onClick={() => goToNextPart(-1)}
					>
						Previous{' '}
					</Button>
					{ifDisabledSubmit ? (
						<Button
							type="primary"
							className="interview-btns interview-btns-right"
							loading={ifLoading}
							onClick={submitHandler}
						>
							Submit
						</Button>
					) : (
						<Button
							type="primary"
							className="interview-btns interview-btns-right"
							onClick={() => goToNextPart(1)}
						>
							Next
						</Button>
					)}
				</div>
			</div>
		</>
	);
}

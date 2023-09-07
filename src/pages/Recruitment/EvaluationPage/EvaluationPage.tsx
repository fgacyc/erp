import UIBreadcrumb from "@/components/UIBreadcrumb/index.jsx";
import { Button, Space, List, Card, Message } from "@arco-design/web-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getReq, postReq } from "@/tools/requests";
import { PreScreeningComment } from "@/pages/Recruitment/PreScreeningPage/CommentsList";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import VocalRatingTable from "../InterviewPage/VocalRatingTable";
import { capitalAllFirstLetter } from "@/tools/string";
import { classifyQuestion } from "./data";
import EvaluationResultRubberStamp from "./RubberStamp";
import "./EvaluationPage.css";
import { get } from "idb-keyval";
import { findPastoralTeamLabel } from "@/data/pastoral_teams";
import { findInterviewsNames, findMinistryLabel } from "@/data/ministries";
import { useSettingModalStore } from "@/components/UI_Modal/UI_SettingModal/settingModalStore";

export default function Evaluation_Page() {
	const breadcrumbItems = [
		{
			name: "Recruitment",
			link: "/",
			clickable: false,
		},
		{
			name: "Evaluation",
			link: "/recruitment_evaluation",
			clickable: true,
		},
	];
	const [comments, setComments] = useState<ClientComment[]>([]);
	const [QAs, setQAs] = useState<{
		general: InterviewQuestion[];
		specific: InterviewQuestion[];
		"freeQ&As": InterviewQuestion[];
	}>({
		general: [],
		specific: [],
		"freeQ&As": [],
	});
	const [showBack, setShowBack] = useState(false);
	const [AISummary, setAISummary] = useState(null);
	const [ifVocal, setIfVocal] = useState(false);
	const [vocalRatingForm, setVocalRatingForm] = useState<
		VocalRating | undefined
	>({
		remarks: [],
		stars: [],
	});
	const [currentRubberStampType, setCurrentRubberStampType] =
		useState<ApplicationStatus>();
	const [currentCandidate, setCurrentCandidate] = useState<Recruiter>();
	const [showRubberStamp, setShowRubberStamp] = useState(0);
	const [interviewers, setInterviewers] = useState("");
	const CYC_ID = useSettingModalStore((state) => state.CYC_ID);

	const RID = useParams().RID;
	const navigate = useNavigate();

	useEffect(() => {
		getReq(`/comments/${RID}`).then(
			(res: { status: boolean; data: ClientComment[] }) => {
				setComments(res.data);
				// console.log(res.data)
			},
		);

		getReq(`/interview/answers/${RID}`).then((res: Recruiter["interview"]) => {
			const qes = res.ministry.questions;
			setQAs(classifyQuestion(qes));
			ifCandidateVocal(qes);
		});

		getReq(`/performance/${RID}`).then((res) => {
			if (res.status === "success") {
				setAISummary(res.data);
			}
		});

		get("current_candidate").then((res: Recruiter) => {
			setCurrentCandidate(res);
			if (
				res.application.status === "accepted" ||
				res.application.status === "rejected" ||
				res.application.status === "kiv"
			) {
				setShowBack(true);
				setCurrentRubberStampType(res.application.status);
				setShowRubberStamp(2);
			}
			findInterviewsNames(res.interview.ministry.interviewers).then((res) => {
				setInterviewers(res);
			});
		});
	}, [RID]);

	function ifCandidateVocal(QAs: InterviewQuestion[]) {
		for (const item of QAs) {
			if (item.type === "vocalRating") {
				setIfVocal(true);
				setVocalRatingForm(item.interviewer as VocalRating);
				return;
			}
		}
	}

	function confirmSubmit(status: ApplicationStatus) {
		// accepted  / rejected

		const data = {
			status: status,
			evaluator: CYC_ID,
		};
		const submitEvaluation = () => {
			postReq(`/evaluation/${RID}`, data).then((res) => {
				if (res.status) {
					Message.success("Evaluation submitted successfully");
					setShowBack(true);
					setCurrentRubberStampType(status);
					setShowRubberStamp(1);
				}
			});
		};

		const evaluationMap: {
			[key: string]: string;
		} = {
			rejected: "Next Time",
			kiv: "KIV",
			accepted: "Pass",
		};
		const evaluation = capitalAllFirstLetter(evaluationMap[status] ?? "");

		UI_ConfirmModal(
			"Confirm",
			`Are you sure to submit the evaluation: [${evaluation}] ?`,
			submitEvaluation,
		);
	}

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div
				className="app-component"
				style={{ padding: "0 30px", boxSizing: "border-box" }}
			>
				<div style={{ height: 35 }}></div>
				<Space className="evaluation-page-header">
					{showBack ? (
						<div className="evaluation-page-header-finished">
							<Button
								type="outline"
								style={{ width: 100, marginRight: 10 }}
								onClick={() => navigate("/recruitment_evaluation")}
							>
								Back
							</Button>
							<Button
								type="outline"
								style={{ width: 100 }}
								onClick={() => setShowBack(false)}
							>
								Reset
							</Button>
							{/*<IconArrowLeft />*/}
							{/*<IconEdit />*/}
						</div>
					) : (
						<div className="evaluation-page-header-unfinished">
							<Button
								status="danger"
								className="evaluation-next-time-button"
								onClick={() => confirmSubmit("rejected")}
							>
								Next Time
							</Button>
							<Button
								status="warning"
								className="evaluation-kiv-button"
								onClick={() => confirmSubmit("kiv")}
							>
								KIV
							</Button>
							<Button
								type="primary"
								status="success"
								className="evaluation-pass-button"
								onClick={() => confirmSubmit("accepted")}
							>
								Pass
							</Button>
						</div>
					)}
				</Space>

				<Space
					direction="vertical"
					size="large"
					style={{ overflowY: "auto", marginTop: "24px", width: "100%" }}
				>
					{currentCandidate !== null && (
						<div>
							<h2>Candidate Info</h2>
							<div>
								<span style={{ fontWeight: "bold", color: "#4E5969" }}>
									Name:{" "}
								</span>
								<span>{currentCandidate?.info.name} </span>
							</div>
							<div>
								<span style={{ fontWeight: "bold", color: "#4E5969" }}>
									Pastoral Team:{" "}
								</span>
								<span>
									{findPastoralTeamLabel(
										currentCandidate?.info.pastoral_team ?? [],
									).join(" > ")}{" "}
								</span>
							</div>
							<div>
								<span style={{ fontWeight: "bold", color: "#4E5969" }}>
									Ministry:{" "}
								</span>
								<span>
									{findMinistryLabel(
										currentCandidate?.info.ministry ?? [],
									).join(" > ")}{" "}
								</span>
							</div>
							<div>
								<span style={{ fontWeight: "bold", color: "#4E5969" }}>
									Interviewers:{" "}
								</span>
								<span>{interviewers}</span>
							</div>
						</div>
					)}

					{AISummary !== null && (
						<div>
							<h2>AI Summary</h2>
							<p className="ai-summary-con">{AISummary}</p>
						</div>
					)}
					{QAs !== null && (
						<div>
							{QAs?.general?.length > 0 && (
								<div>
									<h2>General Questions</h2>
									{QAs.general.map((item, index) => {
										return (
											<Card title={item.question} key={index}>
												<div style={{ marginBottom: 10 }}>
													<span style={{ fontWeight: "bold" }}>
														Candidate Answer:
													</span>
													<span>{item.candidate} </span>
												</div>
												<div>
													<span style={{ fontWeight: "bold" }}>
														Interviewer Remark:{" "}
													</span>
													<span>{item.interviewer as string}</span>
												</div>
											</Card>
										);
									})}
								</div>
							)}
							{QAs.specific.length > 0 && (
								<div>
									<h2>Specific Questions</h2>
									{QAs.specific.map((item, index) => {
										return (
											<Card title={item.question} key={index}>
												{" "}
												{item.candidate}{" "}
											</Card>
										);
									})}
								</div>
							)}
							{QAs["freeQ&As"].length > 0 && (
								<div>
									<h2>Q&A</h2>
									{QAs["freeQ&As"].map((item, index) => {
										return (
											<Card title={item.question} key={index}>
												{" "}
												{item.interviewer as string}{" "}
											</Card>
										);
									})}
								</div>
							)}
						</div>
					)}
					{ifVocal && (
						<div>
							<h2>Praise & Worship Audition From</h2>
							<VocalRatingTable
								vocalRatingForm={vocalRatingForm}
								setVocalRatingForm={setVocalRatingForm}
							/>
						</div>
					)}
					{comments && comments.length > 0 && (
						<div>
							<h2>Pre-Screening</h2>
							<List
								bordered={false}
								header={<span>{comments.length} comments</span>}
							>
								{comments.map((item, index) => {
									return (
										<List.Item key={index}>
											<PreScreeningComment item={item} />
										</List.Item>
									);
								})}
							</List>
						</div>
					)}
				</Space>
				{showRubberStamp === 1 && currentRubberStampType && (
					<EvaluationResultRubberStamp
						type={currentRubberStampType}
						trigger="evaluationButtons"
					/>
				)}
				{showRubberStamp === 2 && currentRubberStampType && (
					<EvaluationResultRubberStamp
						type={currentRubberStampType}
						trigger="pageLoad"
					/>
				)}
			</div>
		</>
	);
}

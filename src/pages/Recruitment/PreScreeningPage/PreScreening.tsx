import { useState, useEffect, KeyboardEventHandler } from 'react';
import { useParams } from 'react-router-dom';
import {
	Comment,
	Button,
	Input,
	Descriptions,
	Popconfirm,
} from '@arco-design/web-react';
import { getReq, putReq } from '@/tools/requests';
import { capitalFirstLetter } from '@/tools/string';
import './pre-screening.css';
import PreScreeningCommentsList from './CommentsList';
import { getCurrentUserCYCID } from '@/tools/auth';
import { getTimeStamp } from '@/tools/datetime';
import { IconEdit } from '@arco-design/web-react/icon';
import CandidateModal from '@/components/UI_Modal/UI_CandidateModal/CandidateModal';

export default function PreScreening() {
	//const RID = useParams().RID || '64a792fbe3a86cdad7522be7';
	const RID = useParams().RID;

	const [userDatas, setUserDatas] = useState<Recruiter>();
	const [commentText, setCommentText] = useState('');
	const [isButtonClicked, setIsButtonClicked] = useState(false);
	const [userCYC_ID, setUserCYC_ID] = useState<number>(0);
	const [visible, setVisible] = useState(false);
	const [currentUserCYC_ID, setCurrentUserCYC_ID] = useState(0);

	function setCurrentCYCID() {
		getCurrentUserCYCID().then((data) => {
			setCurrentUserCYC_ID(data);
		});
	}

	useEffect(() => {
		function getUserData() {
			getReq(`/ /${RID}`).then((res) => {
				setUserDatas(res);
				// console.log(res)
			});
		}
		getUserData();
		getCurrentUserCYCID().then((res) => {
			setUserCYC_ID(res);
		});
		setCurrentCYCID();
	}, [RID]);

	useEffect(() => {
		function getUserData() {
			getReq(`/recruiter/${RID}`).then((res) => {
				setUserDatas(res);
				// console.log(res)
			});
		}

		if (!visible) {
			getUserData();
		}
	}, [RID, visible]);

	const handleStatus = (status: boolean) => {
		const pre_screening_status = status ? 'pre-accepted' : 'pre-rejected';

		const time = getTimeStamp();

		const pre_screening = {
			status: pre_screening_status,
			approver: currentUserCYC_ID,
			pre_screening_time: time,
		};

		setIsButtonClicked(true);

		putReq(`/application/${RID}`, pre_screening).then(() => {
			setUserDatas((userDatas) => {
				if (!userDatas?._id) return;
				return {
					...userDatas,
					application: {
						...userDatas?.application,
						status: pre_screening_status,
					},
				};
			});
		});
	};

	function commentScrollToBottom() {
		const target = document.getElementById('comment-list-bottom');
		target?.scrollIntoView({
			behavior: 'smooth',
		});
	}

	function sendComment() {
		if (commentText.trim() === '') {
			return;
		}

		const comment = {
			timestamp: getTimeStamp(),
			updated: getTimeStamp(),
			comment: commentText,
			CYC_ID: userCYC_ID,
		};
		//console.log(comment)

		setUserDatas((userDatas) => {
			if (!userDatas?._id) return;
			return {
				...userDatas,
				pre_screening: {
					...userDatas?.pre_screening,
					comments: [...userDatas.pre_screening.comments, comment],
				},
			};
		});

		putReq(`/comments/${RID}`, comment).then(() => {
			setCommentText('');
		});
	}

	const handleComment = (e: Event) => {
		e.preventDefault();
		commentScrollToBottom();
		sendComment();
	};

	const handleKeyDown: KeyboardEventHandler<HTMLTextAreaElement> = (event) => {
		if (event.ctrlKey && event.key === 'Enter') {
			event.preventDefault();
			commentScrollToBottom();
			sendComment();
		}
	};

	function getPreScreeningStatus(status: ApplicationStatus) {
		if (
			status === 'pending' ||
			status === 'pre-accepted' ||
			status === 'pre-rejected'
		) {
			return status;
		} else {
			return 'pre-accepted';
		}
	}

	const isButtonDisabled =
		isButtonClicked ||
		(userDatas &&
			userDatas.pre_screening &&
			userDatas.pre_screening.status !== null);

	return (
		<div className="pre-screening-con">
			<div style={{ position: 'relative', overflow: 'auto' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						padding: '15px',
					}}
				>
					{userDatas && (
						<div>
							<div
								className="arco-descriptions-title"
								style={{ textAlign: 'center', marginBottom: '25px' }}
							>
								<span style={{ marginRight: 10 }}>Candidate Information</span>
								<IconEdit
									style={{ cursor: 'pointer' }}
									onClick={() => setVisible(true)}
								/>
							</div>
							<Descriptions
								column={1}
								data={[
									{
										label: 'Name',
										value: userDatas.info.name,
									},
									{
										label: 'Contact Number',
										value: userDatas.info.phone,
									},
									{
										label: 'Email',
										value: userDatas.info.email,
									},
									{
										label: 'Pastoral Team',
										value: `${capitalFirstLetter(
											String(userDatas.info.pastoral_team[0]),
										)}, 
                                    ${capitalFirstLetter(
																			String(userDatas.info.pastoral_team[1]),
																		)}`,
									},
									{
										label: 'Ministry',
										value: capitalFirstLetter(
											String(userDatas.info.ministry[2]),
										),
									},
									{
										label: 'Status',
										value: capitalFirstLetter(
											getPreScreeningStatus(userDatas.application.status),
										),
									},
								]}
								labelStyle={{ textAlign: 'right', paddingRight: 36 }}
							/>
						</div>
					)}

					<div style={{ marginTop: '15px' }}>
						<Popconfirm
							disabled={isButtonDisabled}
							focusLock
							title="Confirm"
							content="Are you sure you want to pass this candidate?"
							onOk={() => {
								handleStatus(true);
							}}
							onCancel={() => {}}
						>
							<Button
								type="primary"
								status="success"
								style={{
									marginRight: '10px',
								}}
								disabled={isButtonDisabled}
							>
								Pass
							</Button>
						</Popconfirm>
						<Popconfirm
							disabled={isButtonDisabled}
							focusLock
							title="Confirm"
							content="Are you sure you want to filter out this candidates?"
							onOk={() => {
								handleStatus(false);
							}}
							onCancel={() => {}}
						>
							<Button type="secondary" disabled={isButtonDisabled}>
								Next Time
							</Button>
						</Popconfirm>
					</div>
				</div>

				<div style={{ position: 'relative', padding: '8px 12px' }}>
					{userDatas && (
						<PreScreeningCommentsList
							userData={userDatas}
							setUserData={setUserDatas}
						/>
					)}
				</div>
			</div>
			<Comment
				style={{ marginBottom: '15px' }}
				align="right"
				actions={
					<Button key="1" type="primary" onClick={(e) => handleComment(e)}>
						Comment
					</Button>
				}
				content={
					<div>
						<Input.TextArea
							placeholder="Write a comment ..."
							value={commentText}
							onChange={(value) => setCommentText(value)}
							onKeyDown={handleKeyDown}
						/>
					</div>
				}
			/>
			{userDatas && (
				<CandidateModal
					recruiter={userDatas}
					visible={visible}
					setVisible={setVisible}
				/>
			)}
		</div>
	);
}

import "./recruitment_appointment.css";
import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "@/tools/DB";
import { Button, Input, Table, TableColumnProps } from "@arco-design/web-react";
import {
	filterArchivedCandidate,
	filterDataHaveAppoint,
	getAppointTimes,
	recruiterInterviewStatus,
} from "./data";
import CandidateModal from "@/components/UI_Modal/UI_CandidateModal/CandidateModal";
import "./recruitment-appo.css";
import { useNavigate } from "react-router-dom";
import { putReq } from "@/tools/requests";
import {
	IconArchive,
	IconCalendar,
	IconSearch,
	IconUserGroup,
} from "@arco-design/web-react/icon";
import { set } from "idb-keyval";
import { UI_QRCodeModal } from "@/components/UI_Modal/UI_QRCodeModal/UI_QRCodeModal";
import {
	getAppoInsightData,
	getDateTimeFilterData,
} from "../EvaluationPage/data";
import { ifCurrentUserIsSuperAdmin } from "@/tools/auth";
import UIInterviewAppoInsight from "@/components/UI_Modal/UI_InterviewAppoInsight";
import UIInterviewDatePickerModal from "@/components/UI_Modal/UI_InterviewDatePickerModal";
import UI_ConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import { RefInputType } from "@arco-design/web-react/es/Input/interface";

export default function Interview_table() {
	const [userData, setUserData] = useState<Recruiter[]>([]);
	const [currentCandidate, setCurrentCandidate] = useState<Recruiter>();
	const [visible, setVisible] = useState(false);
	const [QRCodeModalVisible, setQRCodeModalVisible] = useState(false);
	const [dateTimeFilterData, setDateTimeFilterData] = useState<
		{ text: string; value: string }[]
	>([]);
	const [ifShowInsightBtn, setIfShowInsightBtn] = useState(false);
	const [insightModalVisible, setInsightModalVisible] = useState(false);
	const [insightData, setInsightData] =
		useState<
			{ date: string; ministries: { ministry: string; value: number }[] }[]
		>();
	const [datePickerModalVisible, setDatePickerModalVisible] = useState(false);
	const [isArchived, setIsArchived] = useState(false);

	const navigate = useNavigate();
	const inputRef = useRef<RefInputType>(null);

	useEffect(() => {
		function initTableData() {
			filterData("all").then((res) => {
				setUserData(res as Recruiter[]);
				setDateTimeFilterData(getDateTimeFilterData(res as Recruiter[]));
				setInsightData(getAppoInsightData(res as Recruiter[]));
			});
		}
		initTableData();
		detectIfShowInsightBtn();
	}, []);

	function initTableData() {
		filterData("all").then((res) => {
			setUserData(res as Recruiter[]);
			setDateTimeFilterData(getDateTimeFilterData(res as Recruiter[]));
			setInsightData(getAppoInsightData(res as Recruiter[]));
		});
	}

	function getArchivedCandidate() {
		if (isArchived === true) {
			setIsArchived(false);
			initTableData();
			return;
		}
		filterData("archived").then((res) => {
			setIsArchived(true);
			setUserData(res as Recruiter[]);
		});
	}

	function detectIfShowInsightBtn() {
		ifCurrentUserIsSuperAdmin().then((res) => {
			setIfShowInsightBtn(res);
		});
	}

	async function filterData(type: string) {
		const allUser = await getAllUsers();
		if (type === "all") {
			return await filterDataHaveAppoint(allUser); // pre_screening.status is ture
		} else {
			return await filterArchivedCandidate(allUser); // pre_screening.status is ture
		}
	}

	function showCandidateModal(record: Recruiter) {
		setCurrentCandidate(record);
		setVisible(true);
	}

	function startInterview(record: Recruiter) {
		const RID = record._id;
		Promise.all([
			putReq(`/interview/start_time/${RID}`),
			set("current_candidate", record),
		])
			.then(() => {
				navigate(`/recruitment_interview/form/${RID}/1`);
			})
			.catch((error) => {
				console.error(error);
			});
	}

	function checkInterview(record: Recruiter) {
		const RID = record._id;
		set("current_candidate", record).then(() => {
			navigate(`/recruitment_interview/form/${RID}/1`);
		});
	}

	function showQRCodeModal(record: Recruiter) {
		setCurrentCandidate(record);
		setQRCodeModalVisible(true);
	}

	function archiveCandidate(record: Recruiter) {
		const data = {
			status: "archived",
		};
		function archive() {
			putReq(`/application/${record._id}`, data).then((res) => {
				if (res.status === "success") {
					const newRecord = userData.filter((item) => {
						return item._id !== record._id;
					});
					setUserData(newRecord);
				}
			});
			//console.log(record);
		}
		UI_ConfirmModal(
			"Confirm",
			`Are you sure to archive this candidate: [${record.info.name}] ?`,
			archive,
		);
	}

	const columns: TableColumnProps[] = [
		{
			title: "Name",
			dataIndex: "info.name",
			className: "name-column",
			sorter: (a: Recruiter, b: Recruiter) =>
				a.info.name.localeCompare(b.info.name),
			filterIcon: <IconSearch />,
			filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
				return (
					<div className="arco-table-custom-filter">
						<Input.Search
							ref={inputRef}
							searchButton
							placeholder="Please enter a name"
							value={filterKeys?.[0] || ""}
							onChange={(value) => {
								setFilterKeys?.(value ? [value] : []);
							}}
							onSearch={() => {
								confirm?.();
							}}
							allowClear={true}
						/>
					</div>
				);
			},
			onFilter: (value, row) => {
				return row.info.name.toLowerCase().includes(value.toLowerCase());
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
			onCell: (record) => {
				return {
					onClick: () => {
						showCandidateModal(record);
					},
				};
			},
		},
		{
			title: "Ministry",
			dataIndex: "info.ministry[2]",
			sorter: (a, b) => a.info.ministry[2].localeCompare(b.info.ministry[2]),
			filterIcon: <IconSearch />,
			filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
				return (
					<div className="arco-table-custom-filter">
						<Input.Search
							ref={inputRef}
							searchButton
							placeholder="Please enter a ministry"
							value={filterKeys?.[0] || ""}
							onChange={(value) => {
								setFilterKeys?.(value ? [value] : []);
							}}
							onSearch={() => {
								confirm?.();
							}}
							allowClear={true}
						/>
					</div>
				);
			},
			onFilter: (value, row) => {
				return row.info.ministry[2].toLowerCase().includes(value.toLowerCase());
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "Date time",
			dataIndex: "appointment.ministry.appointment_time",
			filters: dateTimeFilterData,
			onFilter: (value, row) => {
				return getAppointTimes(row) === value;
			},
			filterMultiple: true,
			render: (_, record) => (
				<span>
					{recruiterInterviewStatus(record) === "Pending" ? (
						<span>
							<span>{getAppointTimes(record)}</span>
							<span
								className="icon-calendar-con"
								title={"Reschedule"}
								onClick={() => {
									set("current_candidate", record).then(() => {
										setDatePickerModalVisible(true);
									});
								}}
							>
								<IconCalendar />
							</span>
						</span>
					) : (
						<span>{getAppointTimes(record)}</span>
					)}
				</span>
			),
		},
		{
			title: "Status",
			dataIndex: "interview.status",
			filters: [
				{
					text: "Pending",
					value: "Pending",
				},
				{
					text: "Interviewed",
					value: "Interviewed",
				},
				{
					text: "Not Scheduled",
					value: "Not appointed",
				},
			],
			onFilter: (value, row) => {
				return recruiterInterviewStatus(row) === value;
			},
			filterMultiple: false,
			render: (_, record) => (
				<span>
					{recruiterInterviewStatus(record) === "Interviewed" && (
						<span style={{ color: "green" }}>Interviewed</span>
					)}
					{recruiterInterviewStatus(record) === "Pending" && (
						<span>Pending</span>
					)}
					{recruiterInterviewStatus(record) === "Not appointed" && (
						<span style={{ color: "grey" }}>Not Scheduled</span>
					)}
					{recruiterInterviewStatus(record) === "Not appointed over 7 days" && (
						<span style={{ color: "red" }} title="Not appointed over 7 days">
							Not Scheduled
						</span>
					)}
				</span>
			),
		},
		{
			title: "Operation",
			dataIndex: "op",
			render: (_, record) => (
				<span>
					{recruiterInterviewStatus(record) === "Not appointed" && (
						<Button type="outline" onClick={() => showQRCodeModal(record)}>
							Schedule
						</Button>
					)}
					{recruiterInterviewStatus(record) === "Not appointed over 7 days" && (
						<span>
							<Button type="outline" onClick={() => showQRCodeModal(record)}>
								Schedule
							</Button>
							<Button
								type="outline"
								style={{ marginLeft: 10 }}
								title="Archive this candidate"
								icon={<IconArchive />}
								onClick={() => archiveCandidate(record)}
							/>
						</span>
					)}
					{recruiterInterviewStatus(record) === "Pending" && (
						<Button
							onClick={() => startInterview(record)}
							type="primary"
							style={{ width: 93 }}
						>
							Start
						</Button>
					)}
					{recruiterInterviewStatus(record) === "Interviewed" && (
						<Button
							onClick={() => checkInterview(record)}
							type="secondary"
							status="success"
							style={{ width: 93 }}
						>
							Check
						</Button>
					)}
				</span>
			),
		},
	];

	return (
		<>
			<div className="app-component full-screen-app-component">
				{ifShowInsightBtn && (
					<div>
						<Button
							type="secondary"
							icon={<IconCalendar />}
							className="pre_screening-download-btn"
							onClick={() => {
								setInsightModalVisible(true);
							}}
						>
							Appointment Time Insight
						</Button>
						{isArchived ? (
							<Button
								type="secondary"
								icon={<IconUserGroup />}
								title={"Show archived candidates"}
								onClick={() => {
									getArchivedCandidate();
								}}
							/>
						) : (
							<Button
								type="secondary"
								icon={<IconArchive />}
								title={"Show all candidates"}
								onClick={() => {
									getArchivedCandidate();
								}}
							/>
						)}
					</div>
				)}
				{userData && (
					<Table
						columns={columns}
						data={userData}
						style={{ marginBottom: 20 }}
					/>
				)}
			</div>
			{currentCandidate && (
				<div>
					<CandidateModal
						visible={visible}
						setVisible={setVisible}
						recruiter={currentCandidate}
					/>
					<UI_QRCodeModal
						ministry={currentCandidate.info.ministry[2] || ""}
						RID={currentCandidate._id}
						visible={QRCodeModalVisible}
						setVisible={setQRCodeModalVisible}
					/>
				</div>
			)}
			<div style={{ height: 80 }}></div>
			<UIInterviewAppoInsight
				visible={insightModalVisible}
				setVisible={setInsightModalVisible}
				insightData={insightData}
			/>
			{userData && (
				<UIInterviewDatePickerModal
					visible={datePickerModalVisible}
					setVisible={setDatePickerModalVisible}
					userData={userData}
					setUserData={setUserData}
				/>
			)}
		</>
	);
}

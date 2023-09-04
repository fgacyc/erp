import UIBreadcrumb from "@/components/UIBreadcrumb";
import { useEffect, useRef, useState } from "react";
import { getAllUsers } from "@/tools/DB.js";
import { Button, Input, Table, TableColumnProps } from "@arco-design/web-react";
import CandidateModal from "@/components/UI_Modal/UI_CandidateModal/CandidateModal";
import { useNavigate } from "react-router-dom";
import { addKeys } from "@/tools/tableTools";
import { IconSearch } from "@arco-design/web-react/icon";
import { getPassStatus, filterEvaluationData } from "./data";
import { set } from "idb-keyval";
import { RefInputType } from "@arco-design/web-react/es/Input/interface.js";

export default function Recruitment_Evaluation_Table() {
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
	const [userData, setUserData] = useState<Recruiter[]>();
	const [currentCandidate, setCurrentCandidate] = useState<Recruiter>();
	const [visible, setVisible] = useState(false);

	const navigate = useNavigate();
	const inputRef = useRef<RefInputType>(null);

	useEffect(() => {
		filterData().then((filterData) => {
			setUserData(addKeys(filterData));
		});
	}, []);

	async function filterData() {
		const allUser = await getAllUsers();
		return await filterEvaluationData(allUser); //interview.status is ture
	}

	function showCandidateModal(record: Recruiter) {
		setCurrentCandidate(record);
		setVisible(true);
	}

	function startEvaluation(record: Recruiter) {
		set("current_candidate", record).then(() => {
			navigate(`/recruitment_evaluation/form/${record._id}`);
		});
	}

	const columns: TableColumnProps[] = [
		{
			title: "Name",
			dataIndex: "info.name",
			className: "name-column",
			sorter: (a, b) => a.info.name.localeCompare(b.info.name),
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
			title: "Status",
			filters: [
				{
					text: "Pending",
					value: "pre-accepted",
				},
				{
					text: "Passed",
					value: "accepted",
				},
				{
					text: "KIV",
					value: "kiv",
				},
				{
					text: "Next time",
					value: "rejected",
				},
			],
			sorter: (a, b) =>
				a.application.status.localeCompare(b.application.status),
			onFilter: (value, row) => {
				return row.application.status === value;
			},
			filterMultiple: false,
			render: (_, record) => (
				<span>
					{getPassStatus(record) === "accepted" && (
						<span style={{ color: "green" }}>Passed</span>
					)}
					{getPassStatus(record) === "rejected" && (
						<span style={{ color: "red" }}>Next time</span>
					)}
					{getPassStatus(record) === "pending" && <span>Pending</span>}
					{getPassStatus(record) === "kiv" && (
						<span style={{ color: "orange" }}>KIV</span>
					)}
				</span>
			),
		},
		{
			title: "Email Confirmation",
			dataIndex: "email.orientation.confirm.status",
			filters: [
				{
					text: "Confirmed",
					value: true,
				},
				{
					text: "Not confirmed",
					value: false,
				},
			],
			sorter: (a, b) =>
				a.application.status.localeCompare(b.application.status),
			onFilter: (value, row) => {
				return row.email.orientation.confirm.status === value;
			},
			filterMultiple: false,
			render: (_, record) => (
				<span>
					{record.email.orientation.confirm.status === true ? (
						<span style={{ color: "green" }}>Confirmed</span>
					) : (
						<span style={{ color: "red" }}>Not confirmed</span>
					)}
				</span>
			),
		},
		{
			title: "Operation",
			dataIndex: "op",
			render: (_, record) => (
				<div>
					{getPassStatus(record) === "pending" ? (
						<Button
							onClick={() => startEvaluation(record)}
							type="primary"
							style={{ width: 100 }}
						>
							Evaluate
						</Button>
					) : (
						<Button
							onClick={() => startEvaluation(record)}
							status="success"
							type="outline"
							style={{ width: 100 }}
						>
							Check
						</Button>
					)}
				</div>
			),
		},
	];

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				{userData && (
					<Table
						columns={columns}
						data={userData}
						style={{ marginBottom: 20 }}
					/>
				)}
			</div>
			<div style={{ height: 40 }}></div>
			{currentCandidate && (
				<CandidateModal
					visible={visible}
					setVisible={setVisible}
					recruiter={currentCandidate}
				/>
			)}
		</>
	);
}

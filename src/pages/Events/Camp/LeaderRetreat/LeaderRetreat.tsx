import {
	Button,
	Input,
	Message,
	Space,
	Table,
	TableColumnProps,
} from "@arco-design/web-react";
import {
	IconDelete,
	IconPlus,
	IconReply,
	IconSearch,
	IconUserGroup,
} from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import { getReq, putReq } from "../../../../tools/requests";
import { addKeysForLeadersRetreat, getPaymentStatus } from "./data";
import UIDeleteEventParticipantModal from "../../../../components/UI_Modal/UI_DeleteEventParticipantModal";
import { get, set } from "idb-keyval";
import UIConfirmModal from "../../../../components/UI_Modal/UI_ConfirmModal";
import { RefInputType } from "@arco-design/web-react/es/Input/interface";

export default function LeaderRetreat() {
	const [data, setData] = useState<
		(LeadersRetreatRecord & {
			key: number;
		})[]
	>([]);
	const [deletedData, setDeletedData] = useState<
		(LeadersRetreatRecord & {
			key: number;
		})[]
	>([]);
	const [displayData, setDisplayData] = useState<
		(LeadersRetreatRecord & {
			key: number;
		})[]
	>([]);
	const [deleteModalVisible, setDeleteModalVisible] = useState(false);
	const [current_display_type, setCurrentDisplayType] = useState("registered");
	const inputRef = useRef<RefInputType>(null);

	const columns: TableColumnProps[] = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
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
				return row.name.toLowerCase().includes(value.toLowerCase());
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "CYC ID",
			dataIndex: "CYC_ID",
			sorter: (a, b) => a.CYC_ID < b.CYC_ID,
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
				return String(row.CYC_ID) === value;
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "Phone",
			dataIndex: "phone_number",
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
				if (Object.prototype.hasOwnProperty.call(row, "phone_number")) {
					return row.phone_number.toLowerCase().includes(value.toLowerCase());
				}
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "Email",
			dataIndex: "email",
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
				return row.email.toLowerCase().includes(value.toLowerCase());
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "Paid",
			dataIndex: "paid",
			filters: [
				{
					text: "Not yet",
					value: "pending",
				},
				{
					text: "Waiting Confirm",
					value: "uploaded",
				},
				{
					text: "Confirmed",
					value: "confirmed",
				},
			],
			onFilter: (value, row) => {
				return getPaymentStatus(row) === value;
			},
			filterMultiple: false,
			render: (_, record) => (
				<div>
					{getPaymentStatus(record) === "pending" && <span>Not yet</span>}
					{getPaymentStatus(record) === "uploaded" && (
						<span>Waiting Confirm</span>
					)}
					{getPaymentStatus(record) === "confirmed" && <span>Confirmed</span>}
				</div>
			),
		},
		{
			title: "Operation",
			render: (_, record) => (
				<Space>
					{
						<Button
							type="secondary"
							icon={<IconDelete />}
							onClick={() => deleteBtnHandler(record)}
						></Button>
					}
				</Space>
			),
		},
	];

	const columnsForDeletedTable: TableColumnProps[] = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
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
				return row.name.toLowerCase().includes(value.toLowerCase());
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "CYC ID",
			dataIndex: "CYC_ID",
			sorter: (a, b) => a.CYC_ID < b.CYC_ID,
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
				return String(row.CYC_ID) === value;
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "Phone",
			dataIndex: "phone_number",
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
				if (Object.prototype.hasOwnProperty.call(row, "phone_number")) {
					return row.phone_number.toLowerCase().includes(value.toLowerCase());
				}
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "Email",
			dataIndex: "email",
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
				return row.email.toLowerCase().includes(value.toLowerCase());
			},
			onFilterDropdownVisibleChange: (visible) => {
				if (visible) {
					setTimeout(() => inputRef.current?.focus(), 150);
				}
			},
		},
		{
			title: "Paid",
			dataIndex: "paid",
			filters: [
				{
					text: "Not yet",
					value: "pending",
				},
				{
					text: "Waiting Confirm",
					value: "uploaded",
				},
				{
					text: "Confirmed",
					value: "confirmed",
				},
			],
			onFilter: (value, row) => {
				return getPaymentStatus(row) === value;
			},
			filterMultiple: false,
			render: (_, record) => (
				<div>
					{getPaymentStatus(record) === "pending" && <span>Not yet</span>}
					{getPaymentStatus(record) === "uploaded" && (
						<span>Waiting Confirm</span>
					)}
					{getPaymentStatus(record) === "confirmed" && <span>Confirmed</span>}
				</div>
			),
		},
		{
			title: "Cancel Reason",
			dataIndex: "leader_retreat.deleted.reason",
		},
		{
			title: "Operation",
			render: (_, record) => (
				<Space>
					{
						<Button
							type="secondary"
							icon={<IconReply />}
							onClick={() => restoreParticipant(record)}
						></Button>
					}
				</Space>
			),
		},
	];

	useEffect(() => {
		initData().then((res) => {
			setData(res.registeredData);
			setDeletedData(res.deletedData);
			setDisplayData(res.registeredData);
		});
	}, []);

	async function initData() {
		let resData;
		const res: { status: boolean; data: LeadersRetreatRecord[] } =
			await getReq("/leader_retreat");
		if (res.status === true) {
			resData = addKeysForLeadersRetreat(res.data);
			// resData = changeNameKey(resData);
		}

		const registeredData = resData!.filter(
			(item) => item.leader_retreat.status === "registered",
		);
		const deletedData = resData!.filter(
			(item) => item.leader_retreat.status === "deleted",
		);
		return { registeredData: registeredData, deletedData: deletedData };
	}

	async function displayDataToTable(type: string) {
		if (type === "registered") {
			setDisplayData(data);
			setCurrentDisplayType("registered");
		} else if (type === "deleted") {
			setDisplayData(deletedData);
			setCurrentDisplayType("deleted");
		}
	}

	function deleteParticipant(
		CYC_ID: number,
		deletedPutData: Record<string, unknown>,
	) {
		const deletedParticipant = data.filter((item) => item.CYC_ID === CYC_ID);
		const newData = data.filter((item) => item.CYC_ID !== CYC_ID);

		putReq(`/leader_retreat/${CYC_ID}`, deletedPutData).then((res) => {
			if (res.status) {
				Message.success("Participant deleted successfully");
			} else Message.error("Something went wrong");
		});

		setDeleteModalVisible(false);

		setData(newData);
		setDeletedData([...deletedData, ...deletedParticipant]);
		setDisplayData(newData);
	}

	function deleteBtnHandler(record: LeadersRetreatRecord) {
		set("current_participant", record).then(() => setDeleteModalVisible(true));
	}

	function restoreBtnHandler() {
		get("current_participant").then((res: LeadersRetreatRecord) => {
			const CYC_ID = res.CYC_ID;
			//console.log(CYC_ID)
			getReq(`/leader_retreat/restore/${CYC_ID}`).then((res) => {
				console.log(res);
			});
			const restoredParticipant = deletedData.filter(
				(item) => item.CYC_ID === CYC_ID,
			);
			const newData = deletedData.filter((item) => item.CYC_ID !== CYC_ID);
			setData([...data, ...restoredParticipant]);
			setDeletedData(newData);
			setDisplayData(newData);
		});
	}

	function restoreParticipant(record: LeadersRetreatRecord) {
		set("current_participant", record).then(() => {
			UIConfirmModal(
				"Restore participant",
				`Are you sure to restore this participant: [${record.name}] ?`,
				restoreBtnHandler,
			);
		});
	}

	return (
		<>
			<div className="app-component full-screen-app-component">
				<Space>
					<Button
						type="primary"
						icon={<IconPlus />}
						style={{ margin: "10px 0" }}
					>
						Register new
					</Button>
					{current_display_type === "registered" ? (
						<Button
							type="secondary"
							icon={<IconDelete />}
							onClick={() => displayDataToTable("deleted")}
						></Button>
					) : (
						<Button
							type="secondary"
							icon={<IconUserGroup />}
							onClick={() => displayDataToTable("registered")}
						></Button>
					)}
				</Space>
				<Table
					columns={
						current_display_type === "registered"
							? columns
							: columnsForDeletedTable
					}
					data={displayData}
					renderPagination={(paginationNode) => (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: 10,
							}}
						>
							<Space style={{ marginLeft: 16 }}>
								{displayData ? (
									<span>{displayData.length} Items</span>
								) : (
									<span>0 items</span>
								)}
							</Space>
							{paginationNode}
						</div>
					)}
				/>
			</div>
			<UIDeleteEventParticipantModal
				visible={deleteModalVisible}
				setVisible={setDeleteModalVisible}
				deleteParticipant={deleteParticipant}
			/>
		</>
	);
}

import {
	Button,
	Input,
	Space,
	Table,
	TableColumnProps,
} from "@arco-design/web-react";
import UIConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import { IconDelete, IconPlus, IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useRef, useState } from "react";
import { addKeys } from "@/tools/tableTools";
import { useOpenApi } from "@/lib/openapi/context";
import { RefInputType } from "@arco-design/web-react/es/Input/interface";
import { AssociateUsersWithMinistryForm } from "@/components/Form/UserMinistry/AssociateUsersWithMinistryForm";

const UserManagementMinistry = () => {
	const [modalVisible, setModalVisible] = useState(false);
	const [data, setData] = useState<(MinistryAccount & { key: number })[]>([]);
	const inputRef = useRef<RefInputType>(null);
	// const [type, setType] = useState<'checkbox' | 'radio'>('checkbox');
	const type = "checkbox";
	const [selectedRowKeys, setSelectedRowKeys] = useState<(string | number)[]>(
		[],
	);
	const [loading, setLoading] = useState(true);
	const { identity, ready } = useOpenApi();

	// Function to get ministries for a user
	const getUserMinistries = async (userId: string) => {
		return identity.GET("/users/{id}/ministries", {
			params: { path: { id: userId } },
		});
	};

	// Function to get ministries for all users
	const getUsersAndMinistries = async () => {
		if (!ready) return;

		try {
			const usersResponse = await identity.GET("/users", {});

			if (!usersResponse.error) {
				const users = usersResponse.data; // Directly access users data

				if (users) {
					const ministryAccountsArray = [];

					for (const user of users) {
						try {
							const ministriesRes = await getUserMinistries(user.id);
							const ministryAccounts = [];

							if (ministriesRes.data) {
								for (const ministryData of ministriesRes.data) {
									const ministryAccount = {
										name: user.name,
										_id: user.id,
										CYC_ID: user.no,
										username: user.username,
										email: user.email,
										role: ministryData.role.name,
										ministry: ministryData.ministry.name,
										ministry_id: ministryData.ministry.id
									};

									ministryAccounts.push(ministryAccount);
								}
							}

							ministryAccountsArray.push(...ministryAccounts);
						} catch (ministriesError) {
							console.error(
								`Error fetching ministries for user ${user.id}:`,
								ministriesError,
							);
							throw ministriesError;
						}
					}

					// Now you have an array of MinistryAccount objects with role and ministry properties set
					console.log(ministryAccountsArray);
					setData(addKeys(ministryAccountsArray));
				}
			}
		} catch (error) {
			console.error("Error fetching users:", error);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		getUsersAndMinistries();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible, ready]); // Include 'ready' in the dependency array

	const columns: TableColumnProps[] = [
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
			title: "Ministry",
			dataIndex: "ministry",
		},
		{
			title: "Role",
			dataIndex: "role",
		},
		{
			title: "Education",
			dataIndex: "education",
		},
		// {
		//     title: 'Phone',
		//     dataIndex: 'phone_number',
		//     filterIcon: <IconSearch />,
		//     filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
		//         return (
		//             <div className='arco-table-custom-filter'>
		//                 <Input.Search
		//                     ref={inputRef}
		//                     searchButton
		//                     placeholder='Please enter a ministry'
		//                     value={filterKeys[0] || ''}
		//                     onChange={(value) => {
		//                         setFilterKeys(value ? [value] : []);
		//                     }}
		//                     onSearch={() => {
		//                         confirm();
		//                     }}
		//                     allowClear={true}
		//                 />
		//             </div>
		//         );
		//     },
		//     onFilter: (value, row) => {
		//         return  String(row.phone_number).toLowerCase().includes(value.toLowerCase());
		//     },
		//     onFilterDropdownVisibleChange: (visible) => {
		//         if (visible) {
		//             setTimeout(() => inputRef.current.focus(), 150);
		//         }
		//     },
		// },
		// {
		//     title: 'Email',
		//     dataIndex: 'email',
		//     filterIcon: <IconSearch />,
		//     filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
		//         return (
		//             <div className='arco-table-custom-filter'>
		//                 <Input.Search
		//                     ref={inputRef}
		//                     searchButton
		//                     placeholder='Please enter a ministry'
		//                     value={filterKeys[0] || ''}
		//                     onChange={(value) => {
		//                         setFilterKeys(value ? [value] : []);
		//                     }}
		//                     onSearch={() => {
		//                         confirm();
		//                     }}
		//                     allowClear={true}
		//                 />
		//             </div>
		//         );
		//     },
		//     onFilter: (value, row) => {
		//         return  row.email.toLowerCase().includes(value.toLowerCase());
		//     },
		//     onFilterDropdownVisibleChange: (visible) => {
		//         if (visible) {
		//             setTimeout(() => inputRef.current.focus(), 150);
		//         }
		//     },
		// },
		{
			title: "Operation",
			render: (_, record) => (
				<Space>
					{
						<Button
							type="secondary"
							icon={<IconDelete />}
							onClick={async () => {
								setLoading(true);
								UIConfirmModal(
									"Confirm Deletion?",
									<div className="flex flex-col gap-5">
										<div className="flex flex-row items-center justify-between gap-3">
											<label
												htmlFor="name"
												className="text-sm capitalize"
											>
												Name
											</label>
											<Input
												className="arco-input w-[250px]"
												value={record.name}
												readOnly
											/>
										</div>
										<div className="flex flex-row items-center justify-between gap-3">
											<label
												htmlFor="ministry"
												className="text-sm capitalize"
											>
												Ministry
											</label>
											<Input
												className="arco-input w-[250px]"
												value={record.ministry}
												readOnly
											/>
										</div>
										<div className="flex flex-row items-center justify-between gap-3">
											<label
												htmlFor="role"
												className="text-sm capitalize"
											>
												Role
											</label>
											<Input
												className="arco-input w-[250px]"
												value={String(record.role)}
												readOnly
											/>
										</div>
									</div>,
									() => {
										if (!ready) return;
										identity
											.DELETE("/ministries/{id}/users", {
												params: {
													path: {
														id: record.ministry_id,
													},
												},
												body: {
													users: [`${record._id}`]
												}
											})
											.then(() => {
												getUsersAndMinistries();
											});
									},
								);
								setLoading(false);
							}}
						></Button>
					}
				</Space>
			),
		},
	];

	return (
		<>
			<AssociateUsersWithMinistryForm
				visible={modalVisible}
				setVisible={setModalVisible}
				title="Add New"
				onClose={() => {}}
			/>
			<div className="app-component full-screen-app-component">
				<Button
					type="primary"
					icon={<IconPlus />}
					onClick={() => setModalVisible(true)}
					className="mt-5 mx-5"
				>
					Add new
				</Button>
				<Table
					loading={loading}
					className="m-3"
					columns={columns}
					data={data}
					renderPagination={(paginationNode) => (
						<div
							style={{
								display: "flex",
								justifyContent: "space-between",
								marginTop: 10,
							}}
						>
							<Space style={{ marginLeft: 16 }}>
								{data ? <span>{data.length} Items</span> : <span>0 items</span>}
							</Space>
							{paginationNode}
						</div>
					)}
					rowSelection={{
						type,
						selectedRowKeys,
						onChange: (selectedRowKeys) => {
							// console.log('onChange:', selectedRowKeys, selectedRows);
							setSelectedRowKeys(selectedRowKeys);
						},
					}}
				/>
			</div>
		</>
	);
};

export default UserManagementMinistry;

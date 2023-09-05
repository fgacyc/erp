import { Button, Input, Space, Table } from "@arco-design/web-react";
import UIBreadcrumb from "@/components/UIBreadcrumb";
import { IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";
import { useAPI } from "@/lib/openapi";
import { operations } from "@/@types/schema";
import { addKeys } from "@/tools/tableTools";
import { ProfileForm } from "@/components/Form";
import { transformUserFromAPI } from "@/utils/transform";

const UserManagementPastoral = () => {
	const breadcrumbItems = [
		{
			name: "Users",
			link: "/",
			clickable: false,
		},
		{
			name: "Members",
			link: "/users/pastoral",
			clickable: true,
		},
	];

	const [data, setData] =
		useState<
			operations["get-user"]["responses"]["200"]["content"]["application/json; charset=utf-8"][]
		>();

	const [visible, setVisible] = useState(false);
	const [selectedUser, setSelectedUser] = useState<User2>();
	const [firstLoad, setFirstLoad] = useState(true);

	const api = useAPI();

	useEffect(() => {
		api
			.GET("/users", {})
			.then((res) => {
				if (!res.error) {
					setData(
						addKeys<
							operations["get-user"]["responses"]["200"]["content"]["application/json; charset=utf-8"]
						>(res.data),
					);
				}
			})
			.finally(() => setFirstLoad(false));

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [visible]);

	useEffect(() => {
		if (selectedUser) setVisible(true);
	}, [selectedUser]);

	return (
		<>
			{selectedUser && (
				<ProfileForm
					visible={visible}
					setVisible={setVisible}
					title={selectedUser.name}
					user={selectedUser}
					onClose={() => {
						setSelectedUser(undefined);
						setVisible(false);
					}}
					checkDetails
				/>
			)}
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				{/* <Button type="primary" icon={<IconPlus />} style={{ margin: '10px 0' }}>
					Register new
				</Button> */}
				<Table
					loading={visible || firstLoad}
					columns={[
						{
							title: "no",
							dataIndex: "no",
							sorter: (a, b) => a.no > b.no,
							filterIcon: <IconSearch />,
							filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
								return (
									<div className="arco-table-custom-filter">
										<Input.Search
											searchButton
											placeholder="Please enter a no"
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
								return String(row.no) === value;
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
						},

						{
							title: "Role",
							dataIndex: "role",
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
						{
							title: "Email",
							dataIndex: "email",
							filterIcon: <IconSearch />,
							filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
								return (
									<div className="arco-table-custom-filter">
										<Input.Search
											searchButton
											placeholder="Please enter a email"
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
						},
						{
							title: "Details",
							render: (_, record) => (
								<Space>
									{
										<Button
											type="secondary"
											icon={<IconSearch />}
											onClick={async () => {
												setVisible(true);

												api
													.GET("/users/{id}", {
														params: {
															path: {
																id: record.id,
															},
														},
													})
													.then((res) => {
														if (!res.data) return;
														setSelectedUser(transformUserFromAPI(res.data));
													});
											}}
										/>
									}
								</Space>
							),
						},
					]}
					data={data?.sort((a, b) => a.no - b.no)}
					renderPagination={(paginationNode) => (
						<div className="flex flex-row justify-between mt-3">
							<Space className="ml-4">
								{data ? <span>{data.length} Items</span> : <span>0 items</span>}
							</Space>
							{paginationNode}
						</div>
					)}
				/>
			</div>
		</>
	);
};
export default UserManagementPastoral;

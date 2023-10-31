import { SatelliteForm } from "@/components/Form/Satellite";
import { useOpenApi } from "@/lib/openapi/context";
import { addKeys } from "@/tools/tableTools";
import { transformSatelliteFromAPI } from "@/utils/transform";
import {
	Button,
	Input,
	Message,
	Modal,
	Space,
	Table,
} from "@arco-design/web-react";
import { IconDelete, IconPlus, IconSearch } from "@arco-design/web-react/icon";
import { useEffect, useState } from "react";

const PastoralRolesPage = () => {
	const { identity, ready } = useOpenApi();
	const [satellites, setSatellites] = useState<Satellite[]>();
	const [selectedSatellite, setSelectedSatellite] = useState<Satellite>();
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const getSatellites = () => {
		if (!ready) return;
		setLoading(true);
		identity.GET("/satellites", {}).then((res) => {
			if (!res.data) return;
			setSatellites(
				addKeys<Satellite>(res.data.map((d) => transformSatelliteFromAPI(d))),
			);
			setLoading(false);
		});
	};

	useEffect(() => {
		getSatellites();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible, ready]);

	return (
		<>
			<SatelliteForm
				visible={modalVisible}
				setVisible={setModalVisible}
				satellite={selectedSatellite}
				title={selectedSatellite?.name ?? "Add New Satellite?"}
				checkDetails={selectedSatellite ? true : false}
				onClose={() => setSelectedSatellite(undefined)}
			/>
			<div className="app-component full-screen-app-component">
				<Button
					type="primary"
					icon={<IconPlus />}
					onClick={() => setModalVisible(true)}
					className="mt-5 mx-5"
				>
					Add new satellite
				</Button>

				<Table
					loading={loading}
					className="m-3"
					data={satellites?.sort((a, b) => a.no - b.no)}
					columns={[
						{
							title: "Name",
							dataIndex: "name",

							render: (_, record) => <strong>{record.name}</strong>,
							filterDropdown: ({ filterKeys, setFilterKeys, confirm }) => {
								return (
									<div className="arco-table-custom-filter">
										<Input.Search
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
								return row.name.toLowerCase().includes(value.toLowerCase());
							},
						},

						{
							title: "M100 No.",
							dataIndex: "no",
						},
						{
							title: "Details",
							render: (_, record) => (
								<Space>
									<Button
										type="secondary"
										icon={<IconSearch />}
										onClick={async () => {
											if (!ready) return;
											setLoading(true);
											identity
												.GET("/satellites/{id}", {
													params: {
														path: {
															id: record.id,
														},
													},
												})
												.then((res) => {
													if (!res.data) return;
													setSelectedSatellite(
														transformSatelliteFromAPI(res.data),
													);

													setModalVisible(true);
												});
										}}
									/>
									<Button
										type="secondary"
										className="bg-red-100"
										icon={<IconDelete className="text-red-600" />}
										onClick={async () => {
											Modal.confirm({
												title: "Confirm Deletion",
												content: (
													<div className="flex flex-col justify-center gap-2 p-3">
														<div className="self-center">
															Are you sure you want to delete?
														</div>
														<div className="flex flex-row items-center justify-between gap-3">
															<label className="text-sm capitalize">Name</label>
															<input
																value={record.name}
																className="arco-input w-[250px]"
																disabled
															/>
														</div>
														<div className="flex flex-row items-center justify-between gap-3">
															<label className="text-sm capitalize">
																M100 No.
															</label>
															<input
																value={record.no}
																className="arco-input w-[250px]"
																disabled
															/>
														</div>

														<div className="self-center mt-3 text-red-500">
															You can&apos;t undo this action.
														</div>
													</div>
												),
												okButtonProps: {
													status: "danger",
												},
												okText: "Delete",
												closable: false,
												cancelText: "Cancel",
												onOk: () => {
													if (!ready) return;
													identity
														.DELETE("/connect-groups/{id}", {
															params: {
																path: {
																	id: record.id,
																},
															},
														})
														.then((res) => {
															if (res.data) Message.success("Deleted!");
															if (res.error)
																Message.error("Unknown error occured.");
														})
														.catch((e) => Message.error(e));
												},
											});
											// if (!ready) return;
											// identity
											// 	.GET("/users/{id}", {
											// 		params: {
											// 			path: {
											// 				id: record.id,
											// 			},
											// 		},
											// 	})
											// 	.then((res) => {
											// 		if (!res.data) return;
											// 		setSelectedUser(transformUserFromAPI(res.data));
											// 	});
										}}
									/>
								</Space>
							),
						},
					]}
				/>
			</div>
		</>
	);
};

export default PastoralRolesPage;

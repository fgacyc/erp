import { CGForm } from "@/components/Form/CG";
import { useOpenApi } from "@/lib/openapi/context";
import { addKeys } from "@/tools/tableTools";
import { cgVariants } from "@/utils/constants";
import { transformCGFromAPI } from "@/utils/transform";
import {
	Button,
	Input,
	Message,
	Modal,
	Space,
	Table,
} from "@arco-design/web-react";
import { IconDelete, IconPlus, IconSearch } from "@arco-design/web-react/icon";
import { FunctionComponent, useEffect, useState } from "react";

const CellGroupPage = () => {
	const { identity, ready } = useOpenApi();
	const [cgs, setCGs] = useState<CG[]>();
	const [selectedCG, setSelectedCG] = useState<CG>();
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const getCGs = () => {
		if (!ready) return;
		setLoading(true);
		identity.GET("/connect-groups", {}).then((res) => {
			if (!res.data) return;
			setCGs(addKeys<CG>(res.data.map((d) => transformCGFromAPI(d))));
			setLoading(false);
		});
	};

	useEffect(() => {
		getCGs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [modalVisible, ready]);

	return (
		<>
			<CGForm
				visible={modalVisible}
				setVisible={setModalVisible}
				cg={selectedCG}
				title={selectedCG?.name ?? "Add New CG?"}
				checkDetails={selectedCG ? true : false}
				onClose={() => setSelectedCG(undefined)}
			/>
			<div className="app-component full-screen-app-component">
				<Button
					type="primary"
					icon={<IconPlus />}
					onClick={() => setModalVisible(true)}
					className="mt-5 mx-5"
				>
					Add new CG
				</Button>

				<Table
					loading={loading}
					className="m-3"
					data={cgs?.sort((a, b) => a.no - b.no)}
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
							title: "Variant",
							render: (_, record) =>
								cgVariants.find((a) => a.value === record.variant?.trim())
									?.label,
						},
						{
							title: "Satellite",
							render: (_, record) => <Satellite id={record.satelliteId} />,
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
												.GET("/connect-groups/{id}", {
													params: {
														path: {
															id: record.id,
														},
													},
												})
												.then((res) => {
													if (!res.data) return;
													setSelectedCG(transformCGFromAPI(res.data));
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
																Variant
															</label>
															<input
																value={
																	cgVariants.find(
																		(a) => a.value === record.variant?.trim(),
																	)?.label
																}
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

export default CellGroupPage;

const Satellite: FunctionComponent<{ id: string }> = ({ id }) => {
	const { identity, ready } = useOpenApi();

	const [sat, setSat] = useState("Loading...");

	useEffect(() => {
		if (!ready) return;
		setSat("Loading...");
		if (!id) {
			setSat("No Assigned Satellites.");
			return;
		}
		identity
			.GET("/satellites/{id}", {
				params: { path: { id: id } },
			})
			.then(({ data }) => setSat(String(data?.name)))
			.catch(() => setSat("Error."));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, ready]);
	return <>{sat}</>;
};

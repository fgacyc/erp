import { CustomField } from "@/components/Form/Field";
import UIBreadcrumb from "@/components/UIBreadcrumb";
import UIConfirmModal from "@/components/UI_Modal/UI_ConfirmModal";
import { useIdentityAPI } from "@/lib/openapi";
import { addKeys } from "@/tools/tableTools";
import { Button, Input, Modal, Space, Table } from "@arco-design/web-react";
import { IconDelete, IconPlus } from "@arco-design/web-react/icon";
import { Field, Form, Formik, FormikProps } from "formik";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import * as Yup from "yup";

const PastoralRolesPage = () => {
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
		{
			name: "Roles",
			link: "/users/pastoral/roles",
			clickable: true,
		},
	];

	const api = useIdentityAPI();
	const [roles, setRoles] = useState<Role[]>();
	const [modalVisible, setModalVisible] = useState(false);
	const [loading, setLoading] = useState(true);

	const getRoles = () => {
		setLoading(true);
		api.GET("/pastoral-roles", {}).then((res) => {
			if (!res.data) return;
			setRoles(addKeys<Role>(res.data));
			setLoading(false);
		});
	};

	useEffect(() => {
		getRoles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const formRef = useRef<FormikProps<Omit<Role, "id">>>(null);

	return (
		<>
			<Modal
				visible={modalVisible}
				onCancel={() => setModalVisible(false)}
				onOk={() => formRef.current?.handleSubmit()}
				title="Add New Role?"
			>
				<Formik<Omit<Role, "id">>
					innerRef={formRef}
					initialValues={{ name: "", description: "", weight: 0 }}
					validationSchema={Yup.object().shape({
						name: Yup.string().required("Required."),
						description: Yup.string().required("Required."),
						weight: Yup.number()
							.integer("No decimals allowed.")
							.min(0)
							.max(9999)
							.required("Required."),
					})}
					onSubmit={(values, action) => {
						action.setSubmitting(true);
						api
							.POST("/pastoral-roles", {
								body: {
									description: values.description,
									name: values.name,
									weight: Number(values.weight),
								},
							})
							.then((res) => {
								action.setSubmitting(false);
								getRoles();
								if (res.error) {
									throw new Error(res.error.message);
								} else {
									setModalVisible(false);
									action.resetForm();
								}
							});
					}}
				>
					{({ errors, isSubmitting }) => (
						<Form className="px-5 mx-auto gap-5 flex flex-col">
							<CustomField
								name="name"
								errors={errors}
								loading={isSubmitting}
								editable={!isSubmitting}
							/>
							<CustomField
								name="description"
								errors={errors}
								loading={isSubmitting}
								editable={!isSubmitting}
							/>
							<div className="flex flex-col w-full justify-end">
								<div className="flex flex-row items-center justify-between gap-3">
									<label htmlFor="weight" className="text-sm capitalize">
										Weight
									</label>
									<Field
										id="weight"
										name="weight"
										className="arco-input w-[350px]"
										type="number"
										min="1"
										max="9999"
										maxLength="4"
										onInput={(event: ChangeEvent<HTMLInputElement>) =>
											(event.target.value = event.target.value.slice(
												0,
												event.target.maxLength,
											))
										}
										disabled={isSubmitting}
									/>
								</div>
								{errors && (
									<div className="text-red-500 text-xs text-right">
										{errors["weight"]}
									</div>
								)}
							</div>
						</Form>
					)}
				</Formik>
			</Modal>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component">
				<Button
					type="primary"
					icon={<IconPlus />}
					onClick={() => setModalVisible(true)}
					className="mt-5 mx-5"
				>
					Add new role
				</Button>

				<Table
					loading={loading}
					className="m-3"
					data={roles?.sort((a, b) => a.weight - b.weight)}
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
							title: "Weight",
							dataIndex: "weight",
							sorter: (a, b) => a.weight - b.weight,
						},

						{
							title: "Description",
							dataIndex: "description",
						},
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
																htmlFor="description"
																className="text-sm capitalize"
															>
																Description
															</label>
															<Input
																className="arco-input w-[250px]"
																value={record.description}
																readOnly
															/>
														</div>
														<div className="flex flex-row items-center justify-between gap-3">
															<label
																htmlFor="weight"
																className="text-sm capitalize"
															>
																Weight
															</label>
															<Input
																className="arco-input w-[250px]"
																value={String(record.weight)}
																readOnly
															/>
														</div>
													</div>,
													() =>
														api
															.DELETE("/pastoral-roles/{id}", {
																params: {
																	path: {
																		id: record.id,
																	},
																},
															})
															.then(() => {
																getRoles();
															}),
												),
													setLoading(false);
											}}
										/>
									}
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

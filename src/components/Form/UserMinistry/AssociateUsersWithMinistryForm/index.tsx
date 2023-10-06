import { Modal, Select } from "@arco-design/web-react";
import React, {
	type Dispatch,
	type SetStateAction,
	FunctionComponent,
	useEffect,
	useState,
	useRef,
	ChangeEvent,
} from "react";
import {
	Formik,
	type FormikProps,
	Form,
	FormikValues,
	Field,
	FieldArray,
	FieldArrayRenderProps,
	FormikHelpers,
} from "formik";
import { useOpenApi } from "@/lib/openapi/context";
import { components } from "src/@types/identity";

interface AssociateUsersWithMinistryFormProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	title?: string;
	onClose?: () => void;
}

interface UserRole {
	user_id?: string;
	role_id?: string;
	// Other properties of your user object
}

interface AssociateUsersWithMinistryFormType extends FormikValues {
	ministry_id: string; // This will be set when the user selects a ministry
	users: [];
}

export const AssociateUsersWithMinistryForm: FunctionComponent<
	AssociateUsersWithMinistryFormProps
> = ({ visible, setVisible, title, onClose }) => {
	const formRef = useRef<FormikProps<AssociateUsersWithMinistryFormType>>(null);
	const { ready, identity } = useOpenApi();
	const [ministries, setMinistries] =
		useState<components["schemas"]["Ministry"][]>();
	const [users, setUsers] = useState<components["schemas"]["User"][]>();
	const [roles, setMinistriesRoles] =
		useState<components["schemas"]["MinistryRole"][]>();

	const getMinistriesAndRoles = async () => {
		try {
			const res = await identity.GET("/users", {});
			if (res?.data) {
				setUsers(res.data);

				if (res.data.length > 0) {
					const res2 = await identity.GET("/ministries", {});
					if (res2?.data) {
						setMinistries(res2.data);

						if (res2.data.length > 0) {
							const res3 = await identity.GET("/ministry-roles", {});
							if (res3?.data) {
								setMinistriesRoles(res3.data);
							}
						}
					}
				}
			}
		} catch (error) {
			// Handle errors here
			console.error("Error fetching data:", error);
		}
	};

	const handleSubmit = async (
		values: AssociateUsersWithMinistryFormType,
		action: FormikHelpers<AssociateUsersWithMinistryFormType>,
	) => {
		if (!ready) return;
		try {
			console.log(values);
			action.setSubmitting(true);
			const res = await identity.POST("/ministries/{id}/users", {
				params: {
					path: { id: values.ministry_id },
				},
				body: {
					users: values.users,
				},
			});

			action.setSubmitting(false);

			if (res.error) {
				throw new Error(res.error.message);
			} else {
				setVisible(false);
				action.resetForm();
			}
			// Example: POST /ministries/{values.ministry_id}/users with values.users as the body
			console.log("Submitting data:", values);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	useEffect(() => {
		getMinistriesAndRoles();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal
			visible={visible}
			onCancel={() => {
				onClose?.();
				setVisible(false);
			}}
			cancelText="Cancel"
			okText="Confirm"
			onOk={() => {
				if (!formRef.current) return;
				if (formRef.current.isSubmitting) return;
				formRef.current.submitForm();
			}}
			title={title}
			mountOnEnter={false}
			unmountOnExit
		>
			<Formik<AssociateUsersWithMinistryFormType>
				innerRef={formRef}
				initialValues={{
					ministry_id: "", // This will be set when the user selects a ministry
					users: [],
				}}
				onSubmit={handleSubmit}
			>
				{(formikProps) => (
					<Form className="px-5 mx-auto gap-5 flex flex-col">
						<div className="flex flex-row items-center justify-between gap-3">
							<label htmlFor={"ministry_id"} className="text-sm capitalize">
								Ministry
							</label>
							<Select
								className="w-[350px]"
								disabled={formikProps.isSubmitting}
								onChange={(value: ChangeEvent<HTMLInputElement>) => {
									formikProps.setFieldValue("ministry_id", value);
								}}
							>
								{ministries !== undefined &&
									ministries.length > 0 &&
									ministries.map((ministry) => (
										<Select.Option key={ministry.id} value={ministry.id}>
											{ministry.name}
										</Select.Option>
									))}
							</Select>
						</div>

						<div className="flex flex-col gap-3">
							<label htmlFor="users" className="text-sm capitalize">
								Users:
							</label>
							<FieldArray name="users">
								{(arrayHelpers: FieldArrayRenderProps) => (
									<div>
										{formikProps.values.users.map((_, index) => (
											<div key={index} className="flex gap-4 mb-1">
												<div className="w-1/2">
													<Field
														name={`users[${index}].user_id`}
														as="select"
														className="arco-input"
														onChange={(
															event: ChangeEvent<HTMLInputElement>,
														) => {
															const updatedUsers: UserRole[] = [
																...formikProps.values.users,
															]; // Copy the users array
															if (updatedUsers.length > 0) {
																updatedUsers[index] = {
																	...updatedUsers[index],
																	user_id: event.target.value,
																};
																formikProps.setFieldValue(
																	"users",
																	updatedUsers,
																);
															}
														}}
													>
														{users !== undefined &&
															users.length > 0 &&
															users.map((user) => (
																<option key={user.id} value={user.id}>
																	{user.name}
																</option>
															))}
													</Field>
												</div>
												<div className="w-1/2">
													<Field
														name={`users[${index}].role_id`}
														as="select"
														className="arco-input"
														onChange={(
															event: ChangeEvent<HTMLInputElement>,
														) => {
															const updatedUsers: UserRole[] = [
																...formikProps.values.users,
															]; // Copy the users array
															if (updatedUsers.length > 0) {
																updatedUsers[index] = {
																	...updatedUsers[index],
																	role_id: event.target.value,
																};
																formikProps.setFieldValue(
																	"users",
																	updatedUsers,
																);
															}
														}}
													>
														{roles !== undefined &&
															roles.length > 0 &&
															roles.map((role) => (
																<option key={role.id} value={role.id}>
																	{role.name}
																</option>
															))}
													</Field>
												</div>
												<button
													type="button"
													onClick={() => arrayHelpers.remove(index)}
													className="text-red-500 hover:text-red-700"
												>
													<svg
														xmlns="http://www.w3.org/2000/svg"
														className="h-5 w-5 inline-block align-middle"
														viewBox="0 0 20 20"
														fill="currentColor"
													>
														<path
															fillRule="evenodd"
															d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
															clipRule="evenodd"
														/>
													</svg>
												</button>
											</div>
										))}
										<button
											type="button"
											onClick={() =>
												arrayHelpers.push({
													user_id: users?.[0]?.id ?? "",
													role_id: roles?.[0]?.id ?? "",
												})
											}
											className="mt-2 bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
										>
											Add User
										</button>
									</div>
								)}
							</FieldArray>
						</div>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

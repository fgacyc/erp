import { Button, Cascader, Modal, Radio, Spin } from "@arco-design/web-react";

import * as Yup from "yup";
import { type FormikValues, Formik, type FormikProps, Form } from "formik";
import {
	Dispatch,
	FunctionComponent,
	SetStateAction,
	useEffect,
	useRef,
	useState,
} from "react";
import { AddressField, CustomField } from "../Field";
import { addRolesToCGField, transformCGFromAPI } from "@/utils/transform";
import { hasDuplicatesInData } from "@/utils/helpers";
import { useOpenApi } from "@/lib/openapi/context";

interface ProfileFormType extends FormikValues {
	name: string;
	icNo: string;
	phoneNo: string;
	lineOne: string;
	lineTwo: string;
	city: string;
	country: string;
	state: string;
	postalCode: string;
	gender: Gender;
	cg: (string | string[])[];
}

interface ProfileFormProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	user: User2;
	title?: string;
	checkDetails?: boolean;
	onClose?: () => void;
}
export const ProfileForm: FunctionComponent<ProfileFormProps> = ({
	visible,
	setVisible,
	user,
	title,
	checkDetails,
	onClose,
}) => {
	const { identity, ready } = useOpenApi();

	const formRef = useRef<FormikProps<ProfileFormType>>(null);

	const [editable, setEditable] = useState(!checkDetails);

	const genderOptions: { label: string; value: Gender }[] = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
	];

	const [loading, setLoading] = useState(false);
	const [roles, setRoles] = useState<Role[]>();
	const [cgs, setCGs] = useState<CG[]>();

	const getRolesAndCGs = async () => {
		if (!ready) return;
		setLoading(true);
		const res = await identity.GET("/pastoral-roles", {});
		setRoles(res.data);

		const res2 = await identity.GET("/connect-groups", {});
		setCGs(res2.data?.map((d) => transformCGFromAPI(d)));

		// const res3 = await api.GET("/users/{id}/pastoral-roles");

		if (!res.error && !res2.error) setLoading(false);
	};

	useEffect(() => {
		getRolesAndCGs();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<Modal
			title={title ?? "Welcome!"}
			focusLock
			escToExit={checkDetails}
			unmountOnExit
			hideCancel={!checkDetails}
			onOk={() => {
				if (loading) return;
				if (!editable) {
					setEditable(true);
					return;
				}
				if (!formRef.current) return;
				if (formRef.current.isSubmitting) return;
				formRef.current
					.submitForm()
					.then(() => setEditable(false))
					.catch(() => setEditable(true));
				// setEditable(false);
				// setNewUser(false);
			}}
			closable={checkDetails}
			visible={visible}
			mountOnEnter={false}
			className={"w-[800px]"}
			onCancel={onClose}
			okText={!editable ? "Update" : "Confirm"}
			cancelText="Cancel"
		>
			<Spin loading={loading} tip="loading data..." className="w-full mx-auto">
				<Formik<ProfileFormType>
					validateOnBlur
					validateOnChange
					innerRef={formRef}
					initialValues={{
						name: user.name,
						icNo: user.icNumber ?? "",
						phoneNo: user.phoneNumber ?? "",
						lineOne: user.address?.lineOne ?? "",
						lineTwo: user.address?.lineTwo ?? "",
						city: user.address?.city ?? "",
						country: user.address?.country ?? "",
						state: user.address?.state ?? "",
						postalCode: user.address?.postalCode ?? "",
						gender: "male",
						cg: [],
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string()
							.min(5, "Name must not be lesser than 5 characters.")
							.max(50, "Name must not exceed 50 characters.")
							.required("Required."),
						icNo: Yup.string().required("Required."),
						phoneNo: Yup.string()
							.required("Required.")
							.matches(/^(\+?6?01)[0|1|2|3|4|6|7|8|9]-*[0-9]{7,8}$/),
						lineOne: Yup.string().required("Required."),
						lineTwo: Yup.string().nullable(),
						city: Yup.string().required("Required."),
						state: Yup.string().required("Required."),
						country: Yup.string().required("Required."),
						postalCode: Yup.string()
							.required("Required.")
							.matches(/^[0-9]+$/, "Must be only digits")
							.min(5, "Must be exactly 5 digits")
							.max(5, "Must be exactly 5 digits"),
					})}
					onSubmit={async (values, actions) => {
						actions.setSubmitting(true);
						if (!ready) return;

						if (hasDuplicatesInData(values.cg)) {
							actions.setFieldError("cg", "Only 1 role allowed per CG.");
							throw new Error("Only 1 role allowed per CG.");
						} else
							try {
								const res = await identity.PATCH("/users/{id}", {
									params: {
										path: {
											id: user.id,
										},
									},
									body: {
										id: user.id,
										address: {
											city: values.city,
											country: values.country,
											line_one: values.lineOne,
											line_two: values.lineTwo ?? "",
											postal_code: values.postalCode,
											state: values.state,
										},
										name: values.name,
										phone_number: values.phoneNo,
										ic_number: values.icNo,
										gender: values.gender,
									},
								});

								values.cg.forEach((cg) => {
									if (Array.isArray(cg)) {
										identity.POST("/connect-groups/{id}/users", {
											params: {
												path: { id: cg[0] as string },
											},
											body: {
												users: [
													{
														user_id: user.id,
														role_id: cg[1] as string,
													},
												],
											},
										});
									} else {
										identity.POST("/connect-groups/{id}/users", {
											params: {
												path: { id: cg[0] as string },
											},
											body: {
												users: [
													{
														user_id: user.id,
														role_id: cg[1] as string,
													},
												],
											},
										});
									}
								});

								// const res2 = await api.POST("/connect-groups/{id}/users", {
								// 	params: {
								// 		path: {
								// 			id:
								// 		}
								// 	}
								// })

								if (!res.error) {
									actions.setSubmitting(false);
									!checkDetails && setVisible(false);
								}
							} catch (err) {
								throw new Error(err as string);
							} finally {
								actions.setSubmitting(false);
							}
					}}
				>
					{({ errors, isSubmitting, setValues, values }) => (
						<Form
							id="profile-form"
							className="flex flex-col justify-between gap-3 w-[650px] px-20 mx-auto"
						>
							<CustomField
								name="name"
								label="full name"
								errors={errors}
								loading={isSubmitting}
								editable={editable}
							/>
							<CustomField
								name="icNo"
								label="IC or passport"
								placeholder="xxxxxx-xx-xxxx"
								errors={errors}
								loading={isSubmitting}
								editable={editable}
							/>
							<CustomField
								name="phoneNo"
								label="phone number"
								placeholder="xxx-xxxxxxx"
								errors={errors}
								loading={isSubmitting}
								editable={editable}
							/>
							{checkDetails && (
								<div className="flex flex-row items-center justify-between gap-3">
									<label htmlFor={"cg"} className="text-sm capitalize">
										CG
									</label>
									<Cascader
										className="w-[350px]"
										mode="multiple"
										disabled={!editable}
										placeholder="None."
										onChange={(item) => {
											// setValues({ ...values, role: item });
											console.log(item);
										}}
										changeOnSelect
										options={addRolesToCGField(cgs, roles)}
									>
										{/* {cgs?.map((cg) => (
											<Select.Option value={cg.id} key={cg.id}>
												{cg.name}
											</Select.Option>
										))} */}
									</Cascader>
								</div>
							)}

							{/* {checkDetails && (
								<div className="flex flex-row items-center justify-between gap-3">
									<label htmlFor={"role"} className="text-sm capitalize">
										Role
									</label>
									<Select
										className="w-[350px]"
										mode="multiple"
										disabled={!editable}
										placeholder="None."
										onChange={(item) => {
											setValues({ ...values, role: item });
										}}
									>
										{roles?.map((role) => (
											<Select.Option value={role.id} key={role.id}>
												{role.name}
											</Select.Option>
										))}
									</Select>
								</div>
							)} */}

							<div className="flex flex-row items-center justify-between gap-3">
								<label htmlFor={"gender"} className="text-sm capitalize">
									Gender
								</label>

								<Radio.Group
									defaultValue={user.gender === "female" ? "female" : "male"}
									name="button-radio-group"
								>
									{genderOptions.map((item) => {
										return (
											<Radio key={item.value} value={item.value}>
												{({ checked }) => {
													return (
														<Button
															tabIndex={-1}
															key={item.value}
															disabled={isSubmitting || !editable}
															shape="round"
															type={checked ? "primary" : "default"}
															onClick={() =>
																setValues({ ...values, gender: item.value })
															}
														>
															{item.label}
														</Button>
													);
												}}
											</Radio>
										);
									})}
								</Radio.Group>
							</div>

							<AddressField
								errors={errors}
								loading={isSubmitting}
								editable={editable}
							/>
						</Form>
					)}
				</Formik>
			</Spin>
		</Modal>
	);
};

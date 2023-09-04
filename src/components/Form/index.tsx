import { Button, Modal, Radio } from "@arco-design/web-react";

import * as Yup from "yup";
import { type FormikValues, Formik, type FormikProps, Form } from "formik";
import { Dispatch, FunctionComponent, SetStateAction, useRef } from "react";
import { useAPI } from "@/lib/openapi";
import { AddressField, CustomField } from "./Field";

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
	const api = useAPI();

	const formRef = useRef<FormikProps<ProfileFormType>>(null);

	const genderOptions: { label: string; value: Gender }[] = [
		{ label: "Male", value: "male" },
		{ label: "Female", value: "female" },
	];

	return (
		<Modal
			title={title ?? "Welcome!"}
			focusLock
			escToExit={checkDetails}
			unmountOnExit
			hideCancel={!checkDetails}
			onOk={() => {
				if (!formRef.current) return;
				if (formRef.current.isSubmitting) return;
				formRef.current.submitForm();
				// setNewUser(false);
			}}
			closable={checkDetails}
			visible={visible}
			mountOnEnter={false}
			className={"w-[800px]"}
			onCancel={onClose}
		>
			<Formik<ProfileFormType>
				validateOnBlur={false}
				validateOnChange={false}
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
						.required()
						.matches(/^[0-9]+$/, "Must be only digits")
						.min(5, "Must be exactly 5 digits")
						.max(5, "Must be exactly 5 digits"),
				})}
				onSubmit={async (values, actions) => {
					actions.setSubmitting(true);
					// console.log(values);
					try {
						const res = await api.PATCH("/users/{id}", {
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

						if (!res.error) {
							actions.setSubmitting(false);
							actions.resetForm();
							setVisible(false);
						}
					} catch (err) {
						throw new Error(err as string);
					} finally {
						actions.setSubmitting(false);
						actions.resetForm();
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
						/>
						<CustomField
							name="icNo"
							label="IC or passport"
							placeholder="xxxxxx-xx-xxxx"
							errors={errors}
							loading={isSubmitting}
						/>
						<CustomField
							name="phoneNo"
							label="phone number"
							placeholder="xxx-xxxxxxx"
							errors={errors}
							loading={isSubmitting}
						/>
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

						<AddressField errors={errors} loading={isSubmitting} />
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

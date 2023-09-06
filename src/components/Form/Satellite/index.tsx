import { useAPI } from "@/lib/openapi";
import { Modal } from "@arco-design/web-react";
import {
	Formik,
	type FormikValues,
	type FormikProps,
	Form,
	Field,
} from "formik";
import {
	type Dispatch,
	type SetStateAction,
	useRef,
	FunctionComponent,
	ChangeEvent,
	useState,
} from "react";
import * as Yup from "yup";
import { AddressField, CustomField } from "../Field";

interface SatelliteFormType extends FormikValues {
	name: string;
	no: number;
	lineOne: string;
	lineTwo: string;
	city: string;
	country: string;
	state: string;
	postalCode: string;
}

interface SatelliteFormProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	satellite?: Satellite;
	title?: string;
	checkDetails?: boolean;
	onClose?: () => void;
}

export const SatelliteForm: FunctionComponent<SatelliteFormProps> = ({
	visible,
	setVisible,
	title,
	onClose,
	satellite,
	checkDetails,
}) => {
	const formRef = useRef<FormikProps<SatelliteFormType>>(null);
	const [editable, setEditable] = useState(checkDetails);

	const api = useAPI();

	return (
		<Modal
			visible={visible}
			onCancel={() => {
				onClose?.();
				setVisible(false);
			}}
			cancelText="Cancel"
			okText={!editable ? "Update" : "Confirm"}
			onOk={() => {
				if (!editable) {
					setEditable(true);
					return;
				}
				if (!formRef.current) return;
				if (formRef.current.isSubmitting) return;
				formRef.current.submitForm();
				setEditable(false);
				// setNewUser(false);
			}}
			title={title}
			unmountOnExit
		>
			<Formik<SatelliteFormType>
				innerRef={formRef}
				initialValues={{
					name: satellite?.name ?? "",
					city: satellite?.address.city ?? "",
					country: satellite?.address.country ?? "",
					lineOne: satellite?.address.lineOne ?? "",
					lineTwo: satellite?.address.lineTwo ?? "",
					postalCode: satellite?.address.postalCode ?? "",
					state: satellite?.address.state ?? "",
					no: satellite?.no ?? 0,
				}}
				validationSchema={Yup.object().shape({
					name: Yup.string().required("Required."),
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
					no: Yup.string()
						.required("Required.")
						.matches(/^[0-9]+$/, "Must be only digits")
						.min(1, "Min 1 digit")
						.max(3, "Max 3 digits"),
				})}
				onSubmit={(values, action) => {
					action.setSubmitting(true);

					if (checkDetails) {
						api
							.PATCH("/satellites/{id}", {
								params: {
									path: {
										id: String(satellite?.id),
									},
								},
								body: {
									name: values.name,
									address: {
										city: values.city,
										country: values.country,
										line_one: values.lineOne,
										line_two: values.lineTwo,
										postal_code: values.postalCode,
										state: values.state,
									},
									no: Number(values.no),
								},
							})
							.then((res) => {
								action.setSubmitting(false);
								if (res.error) {
									throw new Error(res.error.message);
								} else {
									setVisible(false);
									action.resetForm();
								}
							});
					} else
						api
							.POST("/satellites", {
								body: {
									name: values.name,
									address: {
										city: values.city,
										country: values.country,
										line_one: values.lineOne,
										line_two: values.lineTwo,
										postal_code: values.postalCode,
										state: values.state,
									},
									no: Number(values.no),
								},
							})
							.then((res) => {
								action.setSubmitting(false);
								if (res.error) {
									throw new Error(res.error.message);
								} else {
									setVisible(false);
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
							editable={editable}
						/>

						<div className="flex flex-col w-full justify-end">
							<div className="flex flex-row items-center justify-between gap-3">
								<label htmlFor="no" className="text-sm capitalize">
									M100 No.
								</label>
								<Field
									id="no"
									name="no"
									className="arco-input w-[350px]"
									type="number"
									min="1"
									max="999"
									maxLength="3"
									onInput={(event: ChangeEvent<HTMLInputElement>) =>
										(event.target.value = event.target.value.slice(
											0,
											event.target.maxLength,
										))
									}
									disabled={isSubmitting || !editable}
								/>
							</div>
							{errors && (
								<div className="text-red-500 text-xs text-right">
									{errors["no"]}
								</div>
							)}
						</div>

						<AddressField
							errors={errors}
							loading={isSubmitting}
							editable={editable}
						/>
					</Form>
				)}
			</Formik>
		</Modal>
	);
};

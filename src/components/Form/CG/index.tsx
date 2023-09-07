import { useAPI } from "@/lib/openapi";
import { Modal, Select, Spin } from "@arco-design/web-react";
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
	useEffect,
} from "react";
import * as Yup from "yup";
import { CustomField } from "../Field";
import { transformSatelliteFromAPI } from "@/utils/transform";
import { cgVariants } from "@/utils/constants";

interface CGFormType extends FormikValues {
	no: number;
	name: string;
	variant: string;
	satelliteId: string;
}

interface CGFormProps {
	visible: boolean;
	setVisible: Dispatch<SetStateAction<boolean>>;
	cg?: CG;
	title?: string;
	checkDetails?: boolean;
	onClose?: () => void;
}

export const CGForm: FunctionComponent<CGFormProps> = ({
	visible,
	setVisible,
	title,
	onClose,
	cg,
	checkDetails,
}) => {
	const formRef = useRef<FormikProps<CGFormType>>(null);
	const [editable, setEditable] = useState(false);
	const [availableSatellites, setAvailableSatellites] = useState<Satellite[]>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		setEditable(!checkDetails);
	}, [checkDetails]);

	const api = useAPI();

	useEffect(() => {
		setLoading(true);
		api.GET("/satellites", {}).then(({ data }) => {
			setAvailableSatellites(data?.map((d) => transformSatelliteFromAPI(d)));
			setLoading(false);
		});

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
			mountOnEnter={false}
			unmountOnExit
		>
			<Spin loading={loading} tip="loading data..." className="w-full mx-auto">
				<Formik<CGFormType>
					innerRef={formRef}
					initialValues={{
						name: cg?.name ?? "",
						variant: cg?.variant ?? "",
						no: cg?.no ?? 0,
						satelliteId: cg?.satelliteId ?? "",
					}}
					validationSchema={Yup.object().shape({
						name: Yup.string().required("Required."),
						variant: Yup.string()
							.required("Required.")
							.min(1, "Must be 1-2 characters")
							.max(2, "Must be 1-2 characters"),
						no: Yup.string()
							.required("Required.")
							.matches(/^[0-9]+$/, "Must be only digits")
							.min(1, "Must be 1-3 digits")
							.max(3, "Must be 1-3 digits"),
						satelliteId: Yup.string().required("Required."),
					})}
					onSubmit={(values, action) => {
						action.setSubmitting(true);
						if (checkDetails) {
							api
								.PATCH("/connect-groups/{id}", {
									params: {
										path: {
											id: String(cg?.id),
										},
									},
									body: {
										name: values.name,
										satellite_id: values.satelliteId,
										variant: values.variant,
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
								.POST("/connect-groups", {
									body: {
										name: values.name,
										satellite_id: values.satelliteId,
										variant: values.variant,
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
					{({ errors, isSubmitting, values, setValues }) => (
						<Form className="px-5 mx-auto gap-5 flex flex-col">
							<CustomField
								name="name"
								errors={errors}
								loading={isSubmitting}
								editable={editable}
								placeholder="CYC 110J"
							/>
							<div className="flex flex-row items-center justify-between gap-3">
								<label htmlFor={"variant"} className="text-sm capitalize">
									Variant
								</label>
								<Select
									className="w-[350px]"
									disabled={isSubmitting || !editable}
									defaultValue={cg?.variant?.trim()}
									onChange={(e) => {
										setValues({
											...values,
											variant: e,
										});
									}}
								>
									{cgVariants.map((v) => (
										<Select.Option key={v.value} value={v.value}>
											{v.label}
										</Select.Option>
									))}
								</Select>
							</div>
							<div className="flex flex-row items-center justify-between gap-3">
								<label htmlFor={"satellite"} className="text-sm capitalize">
									Satellite
								</label>
								<Select
									className="w-[350px]"
									disabled={isSubmitting || !editable}
									defaultValue={cg?.satelliteId}
									onChange={(e) => {
										setValues({
											...values,
											satelliteId: e,
										});
									}}
								>
									{availableSatellites?.map((sat) => (
										<Select.Option key={sat.id} value={sat.id}>
											{sat.name}
										</Select.Option>
									))}
								</Select>
							</div>
							<div className="flex flex-col w-full justify-end">
								<div className="flex flex-row items-center justify-between gap-3">
									<label htmlFor="no" className="text-sm capitalize">
										No.
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
						</Form>
					)}
				</Formik>
			</Spin>
		</Modal>
	);
};

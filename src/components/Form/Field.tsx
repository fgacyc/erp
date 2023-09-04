import { Field, FormikErrors, FormikValues } from "formik";
import type { FunctionComponent, ReactNode } from "react";

interface CustomFieldProps extends FormikFieldProps {
	name: string;
	label?: string;
	placeholder?: string;
	children?: ReactNode;
	type?: HTMLInputElement["type"];
}

export const CustomField: FunctionComponent<CustomFieldProps> = ({
	name,
	placeholder,
	children,
	type = "text",
	label = name,
	errors,
	loading,
}) => {
	return (
		<div className="flex flex-col w-full justify-end">
			<div className="flex flex-row items-center justify-between gap-3">
				<label htmlFor={name} className="text-sm capitalize">
					{label}
				</label>
				<Field
					id={name}
					name={name}
					placeholder={placeholder}
					className="arco-input w-[350px]"
					type={type}
					disabled={loading}
				>
					{children}
				</Field>
			</div>
			{errors && (
				<div className="text-red-500 text-xs text-right">
					{errors[name] as string}
				</div>
			)}
		</div>
	);
};

interface FormikFieldProps {
	errors: FormikErrors<FormikValues>;
	loading: boolean;
}

export const AddressField: FunctionComponent<FormikFieldProps> = ({
	errors,
	loading,
}) => {
	const addressFields = [
		{ name: "lineOne", label: "line 1" },
		{ name: "lineTwo", label: "line 2" },
		{ name: "city", label: "city" },
		{ name: "state", label: "state" },
		{ name: "country", label: "country" },
		{ name: "postalCode", label: "postal code" },
	];
	return (
		<div className="flex flex-row items-start gap-10">
			<label className="text-sm capitalize w-[70px] pt-[0.3rem]">Address</label>
			<div className="flex flex-col gap-3 items-center justify-center w-full">
				{addressFields.map((field, i) => (
					<div key={i} className="flex flex-col justify-end w-full">
						<div className="flex flex-row items-center justify-between w-full">
							<label
								htmlFor={field.name}
								className="text-sm capitalize w-[150px]"
							>
								{field.label}
							</label>
							<Field
								id={field.name}
								name={field.name}
								className="arco-input"
								disabled={loading}
								type={field.name === "postalCode" ? "number" : "text"}
								maxLength={field.name === "postalCode" ? 5 : undefined}
							/>
						</div>
						{errors && (
							<div className="text-red-500 text-xs text-right">
								{errors[field.name] as string}
							</div>
						)}
					</div>
				))}
			</div>
		</div>
	);
};

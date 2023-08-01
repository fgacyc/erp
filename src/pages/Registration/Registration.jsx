import { useState } from 'react';
import './registration.css';
import {
	Form,
	Input,
	Button,
	Message,
	Cascader,
	Typography,
} from '@arco-design/web-react';
import { department_options } from '../../data/ministries';
import { postReq } from '../../tools/requests';
const FormItem = Form.Item;
const { Title, Paragraph } = Typography;

export default function Registration() {
	const [form] = Form.useForm();
	const [ministry, setMinistry] = useState([]);
	const [cellValues, setCellValues] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);

	return (
		<div className="registration-container">
			<h1>Interviewer Registration</h1>
			<Form
				form={form}
				// className="registration-container"
				wrapperCol={{ span: 24 }}
				autoComplete="on"
				onSubmit={(v) => {
					// setIsSubmitted(true);

					const ministry = v.interview;
					const ministries = [];

					department_options.forEach((team) => {
						team.children.forEach((department) => {
							department.children.forEach((cell) => {
								if (
									(ministry.length === 1 && ministry[0] === team.value) ||
									(ministry.length === 2 && ministry[1] === department.value) ||
									(ministry.length === 3 && ministry[2] === cell.value)
								) {
									ministries.push(cell.value);
								}
							});
						});
					});

					setCellValues(ministries);

					const registration_data = {
						full_name: v.full_name,
						username: v.username,
						email: v.email,
						ministry: [
							{
								ministry: 'interviewer',
								scope: ministries,
							},
						],
					};
					// console.log(registration_data)
					// return;

					postReq('/interviewer', registration_data).then((res) => {
						if (res.status) {
							console.log(res.data);
							Message.success('success');
							alert(
								`Your CYC ID is ${res.data.CYC_ID}. Your password is ${res.data.password}. Please take a screenshot of your credentials and keep them safe.`,
							);
						}
					});
				}}
			>
				<FormItem
					label="Full Name"
					field="full_name"
					rules={[{ required: true, message: 'full name 是必填项' }]}
				>
					<Input placeholder="please enter your full name" />
				</FormItem>
				<FormItem
					label="Username"
					field="username"
					rules={[{ required: true, message: 'username 是必填项' }]}
				>
					<Input placeholder="please enter your username" />
				</FormItem>
				<Form.Item
					label="Email"
					field="email"
					rules={[
						{
							type: 'email',
							validateLevel: 'warning',
						},
						{
							required: true,
						},
					]}
				>
					<Input placeholder="please enter your email" />
				</Form.Item>
				<FormItem
					label="Minsitry"
					field="interview"
					rules={[
						{
							type: 'array',
							required: true,
						},
					]}
				>
					<Cascader
						changeOnSelect
						placeholder="please select a ministry"
						// expandTrigger='hover'
						options={department_options}
						allowClear
						onChange={(value) => {
							setMinistry(value);
						}}
					/>
				</FormItem>
				<FormItem>
					<Button type="primary" htmlType="submit" long disabled={isSubmitted}>
						Register
					</Button>
				</FormItem>
			</Form>
			{ministry.length !== 0 && (
				<Paragraph>
					<Title heading={4}>Ministry to be Interviewed</Title>
					<ul>
						{department_options.map((team) =>
							team.children.map((department) =>
								department.children.map((cell, index) => {
									if (
										(ministry.length === 1 && ministry[0] === team.value) ||
										(ministry.length === 2 &&
											ministry[1] === department.value) ||
										(ministry.length === 3 && ministry[2] === cell.value)
									) {
										return <li key={index}>{cell.label}</li>;
									} else {
										return null;
									}
								}),
							),
						)}
					</ul>
				</Paragraph>
			)}
			{/* {cellValues.length !== 0 && (
                <Paragraph>
                    <Title heading={4}>Ministry to be Interviewed</Title>
                    <ul>
                        {cellValues.map((cell, index) => <li key={index}>{cell}</li>)}
                    </ul>
                </Paragraph>
            )} */}
		</div>
	);
}

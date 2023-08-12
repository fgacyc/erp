import { Button, Cascader, Input, Space } from '@arco-design/web-react';
import { department_options } from '@/data/ministries';
import { CSSProperties, useEffect, useState } from 'react';
import { postRecruiter } from './postRequest';
import './Recruitment_Submission.css';
import { pastoral_team_options } from '@/data/pastoral_teams';
import UIBreadcrumb from '@/components/UIBreadcrumb';
import { SubmitResults } from './SubmitResults';

export default function Recruitment_Submission() {
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [email, setEmail] = useState('');
	const [pastoral_team, setPastoral_team] = useState<(string | string[])[]>([]);
	const [department, setDepartment] = useState<(string | string[])[]>([]);
	const [ifSubmit, setIfSubmit] = useState(false);
	const [ifSubmitSuccess, setIfSubmitSuccess] = useState(false);
	const [resultMessage, setResultMessage] = useState('');
	const [showLoading, setShowLoading] = useState(false);

	useEffect(() => {
		const subscription = PubSub.subscribe(
			'reset_recruitment_add_candidate',
			() => {
				reset();
			},
		);
		return () => {
			PubSub.unsubscribe(subscription);
		};
	}, []);

	function reset() {
		setName('');
		setPhone('');
		setEmail('');
		setPastoral_team([]);
		setDepartment([]);
		setIfSubmit(false);
		setIfSubmitSuccess(false);
		setResultMessage('');
		setShowLoading(false);
	}

	const divStyle = {
		width: '100%',
		maxValue: 600,
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'flex-start',
	};

	// const con_style = {
	// 	width: '100%',
	// 	height: '100%',
	// 	display: 'flex',
	// 	flexDirection: 'column',
	// 	justifyContent: 'center',
	// 	alignItems: 'center',
	// 	backgroundColor: 'white',
	// 	margin: 5,
	// 	boxSizing: 'border-box',
	// };

	const submit = () => {
		setShowLoading(true);
		postRecruiter(
			name,
			phone,
			email,
			pastoral_team as string[],
			department as string[],
		).then((res) => {
			if (res.status === 'success') {
				console.log(department);
				//Message.success('Successfully submitted');
				setIfSubmit(true);
				setIfSubmitSuccess(true);
				setResultMessage('Successfully submitted');
			} else {
				//Message.error('Failed to submit: ' + res.error);
				setIfSubmit(true);
				setIfSubmitSuccess(false);
				setResultMessage('Failed to submit: ' + res.error);
			}
		});
	};

	const breadcrumbItems = [
		{
			name: 'Recruitment',
			link: '/',
			clickable: false,
		},
		{
			name: 'Add Candidate',
			link: '/recruitment_add_candidate',
			clickable: true,
		},
	];

	return (
		<>
			<UIBreadcrumb items={breadcrumbItems} />
			<div className="app-component full-screen-app-component recruitment-form-con">
				{!ifSubmit ? (
					<Space
						direction="vertical"
						size={'large'}
						className="recruitment-container"
					>
						<div style={divStyle as CSSProperties}>
							<p>Name:</p>
							<Input
								allowClear
								value={name}
								placeholder="Please Enter your name"
								type="text"
								onChange={(s) => setName(s)}
							/>
						</div>

						<div style={divStyle as CSSProperties}>
							<p>Phone:</p>
							<Input
								allowClear
								value={phone}
								placeholder="Please Enter your phone number"
								type="tel"
								onChange={(s) => setPhone(s)}
							/>
						</div>

						<div style={divStyle as CSSProperties}>
							<p>Email:</p>
							<Input
								allowClear
								value={email}
								placeholder="Please Enter your email"
								type="email"
								onChange={(s) => setEmail(s)}
							/>
						</div>

						<div style={divStyle as CSSProperties}>
							<p>Pastoral Teams:</p>
							<Cascader
								placeholder="Click to expand"
								changeOnSelect
								expandTrigger="hover"
								value={pastoral_team}
								options={pastoral_team_options}
								onChange={(s) => setPastoral_team(s)}
							/>
						</div>

						<div style={divStyle as CSSProperties}>
							<p>Ministry:</p>
							<Cascader
								changeOnSelect
								placeholder="Click to expand"
								expandTrigger="hover"
								value={department}
								options={department_options}
								onChange={(s) => setDepartment(s)}
								allowClear
							/>
						</div>

						<Button
							type="primary"
							style={{
								maxWidth: 600,
								width: '100%',
								marginTop: 30,
							}}
							onClick={submit}
							loading={showLoading}
						>
							Submit
						</Button>
					</Space>
				) : (
					<SubmitResults
						// ifSubmit={ifSubmit}
						setIfSubmit={setIfSubmit}
						ifSubmitSuccess={ifSubmitSuccess}
						resultMessage={resultMessage}
						setShowLoading={setShowLoading}
					/>
				)}
			</div>
		</>
	);
}

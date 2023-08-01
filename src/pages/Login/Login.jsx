import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button, Checkbox } from '@arco-design/web-react';
import './Login.css';
import { login } from '../../tools/auth.js';

export default function Login() {
	const navigate = useNavigate();

	const [CYC_ID, setCYC_ID] = useState(0);
	const [password, setPassword] = useState('');
	const [rememberMe, setRememberMe] = useState(false);

	useEffect(() => {}, []);

	async function handleLogin(e) {
		e.preventDefault();
		let res = await login(CYC_ID, password, rememberMe);
		if (res) {
			navigate('/');
		} else {
			alert('Login failed');
		}
	}

	return (
		<div className="login-bg login-container">
			<div className="login-center login-glass-effect">
				<img
					src="/images/fga.png"
					alt="CYC Logo"
					style={{ width: '200px', height: '200px' }}
				/>
				<h1>FGA CYC</h1>
				<form
					style={{ display: 'flex', flexDirection: 'column' }}
					onSubmit={handleLogin}
				>
					<Input
						style={{ width: 350, marginBottom: 15 }}
						addBefore="CYC"
						type="number"
						onChange={setCYC_ID}
						placeholder="Enter CYC ID"
					/>
					<Input.Password
						style={{ width: 350, marginBottom: 15 }}
						placeholder="Enter password"
						value={password}
						onChange={setPassword}
						type="password"
						autoComplete="on"
					/>
					<Checkbox
						style={{ width: 350, marginBottom: 20 }}
						onChange={setRememberMe}
					>
						Remember me
					</Checkbox>
					<Button type="primary" htmlType="submit">
						Log In
					</Button>
				</form>
			</div>
		</div>
	);
}

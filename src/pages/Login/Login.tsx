// import { FormEvent } from 'react';
// import { useNavigate } from 'react-router-dom';
import { Button } from '@arco-design/web-react';
import './Login.css';
import { useAuth0 } from '@auth0/auth0-react';
// import { login } from '@/tools/auth';

const Login = () => {
	// const navigate = useNavigate();

	// // const [CYC_ID, setCYC_ID] = useState('0');
	// // const [password, setPassword] = useState('');
	// // const [rememberMe, setRememberMe] = useState(false);

	// async function handleLogin(e: FormEvent) {
	// 	e.preventDefault();
	// 	// const res = await login(CYC_ID, password, rememberMe);
	// 	// if (res) {
	// 	// 	navigate('/');
	// 	// } else {
	// 	// 	alert('Login failed');
	// 	// }
	// 	navigate('/');
	// }
	const { loginWithRedirect } = useAuth0();

	return (
		<div className="login-bg login-container">
			<div className="login-center login-glass-effect">
				<img
					src="/images/fga.png"
					alt="CYC Logo"
					style={{ width: '200px', height: '200px' }}
				/>
				<h1>FGA CYC</h1>
				{import.meta.env['VITE_NODE_ENV'] === 'development' ? (
					<span className="text-red-600 text-lg">DEV</span>
				) : (
					''
				)}

				<Button
					type="primary"
					htmlType="submit"
					onClick={() => loginWithRedirect()}
				>
					Log In
				</Button>
			</div>
		</div>
	);
};

export default Login;

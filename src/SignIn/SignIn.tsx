import styles from './SignIn.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { Link } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

interface signInProps {
	setCreateAccountOpen?: (e: boolean) => void;
}
interface signInData {
	username: string;
	password: string;
}
const SignIn = ({ setCreateAccountOpen }: signInProps) => {

	const [signInData, setSignInData] = useState<signInData>({
		username: '',
		password: '',
	});
	const [signInErr, setSignInErr] = useState<boolean>(false);
	const { login } = useAuth();
	const navigate = useNavigate();
	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setSignInData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			console.log("enter try block")
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}/checkUser`,
				{
					username: signInData.username,
					password: signInData.password,
				}
			);
			console.log("entering login")
			const response2 = await axios.post(
				`${process.env.REACT_APP_BACKEND}/login`,
				{
					username: signInData.username,
					password: signInData.password,
				}
			);
			setSignInErr(false);
			console.log(response);
			console.log(response2);
			login(
				response.data.user._id,
				response.data.user.username,
				response.data.user.email,
				response.data.user.country,
				response2.data.accessToken
			);
			navigate('/inventory');
		} catch (err) {
			console.error('err', err);
			if (err.response && err.response.status === 404) {
				setSignInErr(true);
			}
		}
		setSignInData({ username: '', password: '' });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.body}>
				<div className={styles.username}>
					<p>Sign In</p>
					<input
						placeholder="Username"
						onChange={handleUpdate}
						type="text"
						name="username"
						value={signInData.username}
					/>
				</div>
				<div className={styles.password}>
					<p> </p>
					<input
						placeholder="Password"
						onChange={handleUpdate}
						type="password"
						name="password"
						value={signInData.password}
					/>
					
				</div>
				<Link className={styles.forgotPassword} to="/forgot-password">
					Forgot Password?
				</Link>
				
				{signInErr && (
					<p className={styles.signInErr}>
						Your username or password is incorrect.
						<br /> Please try again.
					</p>
				)}
				<button className={styles.button} type="submit">
					Login
				</button>
				<div className={styles.signUpSection}>
					<p className={styles.signUpGreeting}>Hey, new friend!</p>
					<p className={styles.signUpMessage}>
						New to the Village? Sign Up and start your journey!
					</p>
					<button
						className={styles.signUpLink}
						onClick={() => setCreateAccountOpen && setCreateAccountOpen(true)}
					>
						Sign Up
					</button>
					<img
						src="/images/SunFlower.png"
						alt="Decorative"
						className={styles.loginNewImage}
					/>
				</div>
			</div>
		</form>
	);
};

export default SignIn;

import styles from './SignIn.module.css';
import React, { useState } from 'react';
import axios from 'axios';

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
			const response = await axios.get('http://localhost:8000/users', {
				params: signInData,
			});
			if (response.status === 200) {
				setSignInErr(false);
			}
		} catch (err) {
			console.error('err', err);
			if (err.response.status === 404) {
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
					<p className={styles.forgotPassword}>Forgot your password?</p>
				</div>
				{signInErr && (
					<p className={styles.signInErr}>
						Your username or password is incorrect. Please try again.
					</p>
				)}
				<button className={styles.button} type="submit">
					Login
				</button>
				{setCreateAccountOpen && (
					<p>
						Hey, new friend!
						New to the Village? Sign Up and start your journey
						<span
							onClick={() => {
								setCreateAccountOpen(true);
							}}
						>
							{' '}
							<a>Sign Up</a>
						</span>
					</p>
				)}
			</div>
		</form>
	);
};

export default SignIn;

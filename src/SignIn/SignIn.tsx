import styles from './SignIn.module.scss';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { Box, Modal } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

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
	const [forgotOpen, setForgotOpen] = useState<boolean>(false);
	const [forgotEmail, setForgotEmail] = useState<string>('');
	const [forgotSubmitted, setForgotSubmitted] = useState<boolean>(false);
	const { login } = useAuth();
	const navigate = useNavigate();

	const closeForgot = () => {
		setForgotOpen(false);
		setForgotEmail('');
		setForgotSubmitted(false);
	};

	const handleForgotSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!forgotEmail) return;
		setForgotSubmitted(true);
	};
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
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}/checkUser`,
				{
					username: signInData.username,
					password: signInData.password,
				}
			);
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
					<p
						className={styles.forgotPassword}
						onClick={() => setForgotOpen(true)}
					>
						Forgot your password?
					</p>
				</div>
				<Modal open={forgotOpen} onClose={closeForgot}>
					<Box className={styles.forgotModal}>
						<CloseIcon
							onClick={closeForgot}
							className={styles.forgotCloseIcon}
						/>
						<h2 className={styles.forgotTitle}>Forgot your password?</h2>
						{!forgotSubmitted ? (
							<>
								<p className={styles.forgotText}>
									No worries! Enter the email linked to your account and
									we&apos;ll send you a link to reset your password.
								</p>
								<form onSubmit={handleForgotSubmit}>
									<input
										type="email"
										required
										placeholder="Email"
										className={styles.forgotInput}
										value={forgotEmail}
										onChange={(e) => setForgotEmail(e.target.value)}
									/>
									<button type="submit" className={styles.forgotButton}>
										Send reset link
									</button>
								</form>
							</>
						) : (
							<>
								<p className={styles.forgotText}>
									If an account is linked to <strong>{forgotEmail}</strong>,
									a password reset link is on its way. Be sure to check your
									spam folder.
								</p>
								<button
									type="button"
									className={styles.forgotButton}
									onClick={closeForgot}
								>
									Got it
								</button>
							</>
						)}
					</Box>
				</Modal>
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

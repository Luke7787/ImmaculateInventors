import styles from './SignIn.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Modal } from '@mui/material';
import ForgetPassword from '../ForgetPassword/ForgetPassword';
import CloseIcon from "@mui/icons-material/Close";

interface signInProps {
	setCreateAccountOpen?: (e: boolean) => void;
}
interface signInData {
	username: string;
	password: string;
}
const SignIn = ({ setCreateAccountOpen }: signInProps) => {
	const [forgetPasswordOpen, setForgetPasswordOpen] = useState<boolean>(false);

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
					<p>Username</p>
					<input
						placeholder="Enter username"
						onChange={handleUpdate}
						type="text"
						name="username"
						value={signInData.username}
					/>
				</div>
				<div className={styles.password}>
					<p>Password</p>
					<input
						placeholder="Enter password"
						onChange={handleUpdate}
						type="password"
						name="password"
						value={signInData.password}
					/>
				</div>
				{setForgetPasswordOpen && (
						<span
							onClick={() => {
								setForgetPasswordOpen(true);
							}}
						>
							{' '}
							<a>Forgot Password</a>
						</span>
				)}
				<Modal open={forgetPasswordOpen} onClose={() => setForgetPasswordOpen(false)}>
					<Box className={styles.forgotPasswordModal}>
						<div className={styles.modalHeader}>
							<h1>Password Recovery</h1>
						</div>
						<CloseIcon
							onClick={() => setForgetPasswordOpen(false)}
							className={styles.closeIcon}
						/>
						<ForgetPassword/>
					</Box>
				</Modal>
				
				{signInErr && (
					<p className={styles.signInErr}>
						Your username or password is incorrect. Please try again.
					</p>
				)}
				<button className={styles.button} type="submit">
					Sign In
				</button>
				{setCreateAccountOpen && (
					<p>
						Not registered?
						<span
							onClick={() => {
								setCreateAccountOpen(true);
							}}
						>
							{' '}
							<a>Create an account here</a>
						</span>
					</p>
				)}
			</div>
		</form>
	);
};

export default SignIn;

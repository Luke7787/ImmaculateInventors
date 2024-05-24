import styles from './SignIn.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';


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
	const { getUser, login } = useAuth();
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
				// `${process.env.REACT_APP_BACKEND}/users?username=${signInData.username}&password=${signInData.password}`
				`${process.env.REACT_APP_BACKEND}login`, {
					username: signInData.username,
					password: signInData.password
				}
			);
			console.log("response: ", response);
			if (response.status === 200) {
				setSignInErr(false);
				console.log(response.data.user._id);
				login(response.data.user._id);
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
				<button className={styles.button} type="submit">Login</button>
                <div className={styles.signUpSection}>
                    <p className={styles.signUpGreeting}>Hey, new friend!</p>
                    <p className={styles.signUpMessage}>New to the Village? Sign Up and start your journey!</p>
                    <button className={styles.signUpLink} onClick={() => setCreateAccountOpen && setCreateAccountOpen(true)}>
                        Sign Up
                    </button>
					<img src="/images/SunFlower.png" alt="Decorative" className={styles.loginNewImage} />
                </div>
            </div>
        </form>
    );
};

export default SignIn;

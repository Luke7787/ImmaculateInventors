import styles from './ForgetPassword.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import emailjs from "emailjs-com";


interface emailData {
	email: string;
}
const ForgetPassword = () => {
	const [emailData, setEmailData] = useState<emailData>({
		email: ''
	});
	const [emailErr, setEmailErr] = useState<boolean>(false);

	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setEmailData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
            console.log("enter try block");
			//need to add email directory to the links in backend.tsx
			const response = await axios.get('http://localhost:3000/users/email', {
				params: emailData,
			});
			if (response.status === 200) {
				setEmailErr(false);
			}
        
            console.log(response);

            const email__address = response['email'].toString();

            //send email
			//"hello" is message in place for now
            emailjs.sendForm(email__address, 'template_nh3erqm', "Hello", '8SWejLGvEgMtubpdK')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });



		} catch (err) {
			console.error('err', err);
			if (err.response.status === 404) {
				setEmailErr(true);
			}
		}
		setEmailData({ email: '' });
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className={styles.body}>
				<div className={styles.email}>
					<p>Password Recovery</p>
					<input
						placeholder="Enter your email"
						onChange={handleUpdate}
						type="text"
						name="email"
						value={emailData.email}
					/>
				</div>
				{emailErr && (
					<p className={styles.emailErr}>
						Your email is invalid. Please try again.
					</p>
				)}
				<button className={styles.button} type="submit">
					Send Email
				</button>
			</div>
		</form>
	);
};

export default ForgetPassword;

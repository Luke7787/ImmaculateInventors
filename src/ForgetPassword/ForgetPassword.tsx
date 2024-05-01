import styles from './ForgetPassword.module.css';
import { InputError } from '../passwordTypes';
import React, { useState } from 'react';
import { FORGOT_PASSWORD_API_URL } from '../passwordConstants';
import axios, { AxiosError } from 'axios';

interface emailData {
	email: string;
}
const ForgetPassword = () => {
	const [emailData, setEmailData] = useState<emailData>({
		email: ''
	});
	const [emailErr, setEmailErr] = useState<boolean>(false);
	const [validationError, setValidationError] = useState<InputError>({})
    const [submitError, setSubmitError] = useState<string>("")
    const [apiSuccessMsg, setApiSuccessMsg] = useState<string>("")
    const [loading, setLoading] = useState<boolean>(false)

	const handleUpdate = (e) => {
		const { name, value } = e.target;
		setEmailData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (emailData.email.trimEnd() === "") {
            setValidationError({ email: "Email is required" })
        }
        else {
            setValidationError({ email: "" })
            setApiSuccessMsg("")

            try {
                setLoading(true)
                const apiRes = await axios.post(FORGOT_PASSWORD_API_URL, { emailData })

                if (apiRes?.data?.success) {
                    setApiSuccessMsg(apiRes?.data.msg)
                    setSubmitError("")
                }

            } catch (error) {
                setApiSuccessMsg("")

                if (error instanceof AxiosError) {
                    const errorMsg = error.response?.data?.error
                    setSubmitError(errorMsg)
                }
            }

            setLoading(false)
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
						Your email is invalid. Please try again. email err oop
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

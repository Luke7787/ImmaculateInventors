import { InputError } from '../passwordTypes';
import React, { useState } from 'react';
import { FORGOT_PASSWORD_API_URL } from '../passwordConstants/index';
import axios, { AxiosError } from 'axios';
import {Link} from 'react-router-dom'
import Button from './common/Button/Button'
import Input from './common/Input/Input'
import styles from './Auth.module.scss'
import InfoText from './InfoText'
import SuccessText from './common/SuccessText'
import ErrorText from './common/ErrorText/ErrorText'

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

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setEmailData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleForgotPassword = async (e) => {
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
		<div className={styles.mainContainer}>
            <Link className={styles.applogo} to={"/"} >
                My Inventory Password Recovery
            </Link>

            <form
                className={`${styles.form} ${styles.forgotPasswordForm}`}
                onSubmit={handleForgotPassword}
            >
                <h2 className={styles.title}> Forgot Password </h2>

                <Input
					label={"Email"}
					name={"email"}
					onChange={handleInputChange}
					error={validationError.email} type={''}                />

                <Button
                    type={"submit"}
                    loading={loading}
                >
                    Submit
                </Button>

                {
                    apiSuccessMsg &&
                    <SuccessText text={apiSuccessMsg} />
                }

                <InfoText
                    text={"Go back to"}
                    linkTitle={"Login"}
                    linkHref={"/"}
                />

                {
                    submitError &&
                    <ErrorText text={submitError} />
                }

            </form>
        </div>
	);
};

export default ForgetPassword;

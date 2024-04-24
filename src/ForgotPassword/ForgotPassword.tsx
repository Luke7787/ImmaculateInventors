import React, {useState, useRef} from 'react';
import styles from './ForgotPassword.module.css';
import emailjs from 'emailjs-com';
import * as crypto from "crypto";
import axios from 'axios';

interface emailData {
	email: string;
}

const ForgotPassword = () => {
    const [emailData, setEmailData] = useState<emailData>({
		email: '',
	});

    const [emailErr, setEmailErr] = useState<boolean>(false);

    const handleUpdate = (e) => {
		const { name, value } = e.target;
		setEmailData((prev) => ({
			...prev,
			[name]: value,
		}));
		console.log("updated field")
	};

    const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			console.log("enter try block");
			const response = await axios.get('http://localhost:3000/users', {
				params: emailData,
			});
			if (response.status === 200) {
				setEmailErr(false);
			}

			console.log(response);

			console.log("about to randomize token");

            //form token for link
            const randomToken = crypto .randomBytes(64).toString('hex');
            
			console.log("creating link message");

            //create the message for the email
            const link__message = "Hello, you requested a password reset for your inventory account. Here is your password recovery link: <a href='http://localhost:8000/password-reset/${randomToken}'>Password Reset</a>";

			console.log("using email from db");
			const user__email = response['email'].toString();

			console.log("sending email");

            //send the email with link__message to reset password
            emailjs.sendForm(user__email, 'template_nh3erqm', "Hello", '8SWejLGvEgMtubpdK')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });

            //save the token to the specific user schema in the user-list


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
				<div className={styles.username}>
					<p>Enter your email</p>
					<input
						placeholder="Enter email"
						onChange={handleUpdate}
						type="text"
						name="email"
                        value={emailData.email}
					/>
				</div>
                {emailErr && (
					<p className={styles.EmailErr}>
						Your email is invalid. Please try another email.
					</p>
				)}
            </div>

            <button className={styles.button} type="submit">
				Send Password Recovery Email
			</button>
        </form>
    );
};

export default ForgotPassword;

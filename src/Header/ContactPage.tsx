import React from 'react';
import styles from './ContactPage.module.scss';
import Header from '../Header/Header';

const ContactPage = () => {
	return (
		<div>
			<Header />
			<img
				src="/images/contactPicture.webp"
				alt="Decorative Background"
				className={styles.bgImage}
			/>
			<div className={styles.contactContainer}>
				<div className={`${styles.heading} ${styles.customFont}`}>
					Get in Touch
				</div>
				<form className={styles.contactForm}>
					<div className={styles.inputContainer}>
						<input
							type="text"
							placeholder="Name"
							className={styles.inputField}
						/>
					</div>
					<div className={styles.inputContainer}>
						<input
							type="email"
							placeholder="Email"
							className={styles.inputField}
						/>
					</div>
					<div className={styles.inputContainer}>
						<textarea
							placeholder="Message"
							rows={4}
							className={styles.inputField}
						/>
					</div>
					<button type="submit" className={styles.submitButton}>
						Send Message
					</button>
				</form>
			</div>
		</div>
	);
};

export default ContactPage;

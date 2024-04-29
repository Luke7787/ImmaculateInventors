import React from 'react';
import styles from './AboutPage.module.scss';
import Header from '../Header/Header';

const AboutPage = () => {
    return (
        <div>
            <Header />
            <img src="/images/maybe.webp" alt="Decorative Background" className={styles.bgImage} />
            <div className={styles.aboutContainer}>
                <div className={`${styles.heading} ${styles.customFont}`}>
                    About Us
                </div>
                <div className={`${styles.bodyText} ${styles.customFont}`}>
                    Welcome to My Inventory! We’re here to simplify your inventory management with reliable and personalized services
                    tailored to meet your unique needs. Whether you’re a small business or a large enterprise, we’re excited to help
                    you find the perfect inventory solutions.
                </div>
                <div className={`${styles.bodyText} ${styles.customFont}`}>
                    Founded in 2023 by the Immaculate Inventors, My Inventory started as a humble classroom project. United by a shared 
                    passion for coding and organizing, we transformed our initial ideas into a business committed to enhancing inventory management solutions.
                </div>
                <div className={`${styles.bodyText} ${styles.customFont}`}>
                    We hope you enjoy our service as much as we enjoy offering them to you. If you have any questions or
                    comments, please don&apos;t hesitate to contact us.
                </div>
                <div className={`${styles.footerText} ${styles.customFont}`}>
                    Sincerely,
                </div>
                <div className={`${styles.footerText2} ${styles.customFont}`}>
                    The Immaculate Inventors
                </div>
            </div>
        </div>
    );
};

export default AboutPage;

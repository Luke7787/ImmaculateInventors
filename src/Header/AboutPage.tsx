import React from 'react';
import { Typography } from '@mui/material';
import styles from './AboutPage.module.scss';
import Header from '../Header/Header';

const AboutPage = () => {
    return (
        <div>
            <Header />
            <img src="/images/RoseGold.jpeg" alt="Decorative Background" className={styles.bgImage} />
            <div className={styles.aboutContainer}>
                <Typography variant="h4" component="h1" className={styles.heading}>
                    About Us
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    Welcome to My Inventory, your premier source for all things related to inventory management.
                    We are committed to providing you with the best services possible, focusing on reliability,
                    customer service, and uniqueness.
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    Founded in 2023 by the Immaculate Inventors, My Inventory has evolved from its initial setup in a classroom.
                    United by a shared determination to excel in coding and a passion for helping others become more organized,
                    we were inspired to launch our business.
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    We hope you enjoy our service as much as we enjoy offering them to you. If you have any questions or 
                    comments, please don&apos;t hesitate to contact us.
                </Typography>
                <Typography variant="h6" component="h2" className={styles.footerText}>
                    Sincerely,
                </Typography>
                <Typography variant="h6" component="h2" className={styles.footerText2}>
                    The Immaculate Inventors
                </Typography>
            </div>
        </div>
    );
};

export default AboutPage;

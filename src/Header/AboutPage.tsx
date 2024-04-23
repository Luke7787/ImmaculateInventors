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
                    <br />
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    Welcome to My Inventory! We’re here to simplify your inventory management with reliable and personalized services
                    tailored to meet your unique needs. Whether you’re a small business or a large enterprise, we’re excited to help
                    you find the perfect inventory solutions.
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    <br />
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    Founded in 2023 by the Immaculate Inventors, My Inventory started as a humble classroom project. United by a shared 
                    passion for coding and organizing, we transformed our initial ideas into a business committed to enhancing inventory 
                    management solutions.
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    <br />
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    We hope you enjoy our service as much as we enjoy offering them to you. If you have any questions or
                    comments, please don&apos;t hesitate to contact us.
                </Typography>
                <Typography variant="body1" className={styles.bodyText}>
                    <br />
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

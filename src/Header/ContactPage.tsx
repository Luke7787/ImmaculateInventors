import React from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import styles from './ContactPage.module.scss';
import Header from '../Header/Header';

const ContactPage = () => {
    return (
        <div>
            <Header />
            <div className={styles.contactContainer}>
                <Typography variant="h4" component="h1" className={styles.heading}>
                    Get in Touch
                </Typography>
                <form className={styles.contactForm}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        fullWidth
                        className={styles.inputField}
                    />
                    <TextField
                        label="Email"
                        variant="outlined"
                        fullWidth
                        className={styles.inputField}
                    />
                    <TextField
                        label="Message"
                        variant="outlined"
                        fullWidth
                        multiline
                        rows={4}
                        className={styles.inputField}
                    />
                    <Button variant="contained" color="primary" className={styles.submitButton}>
                        Send Message
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ContactPage;

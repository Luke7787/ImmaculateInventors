import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import { ThemeProvider } from '@mui/material';
import theme from '../theme.tsx';
import styles from './Homepage.module.css';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={styles.homepageContainer}>
        <img src="/images/homePage.png" alt="Home Page" style={{ width: '100%', display: 'block', filter: 'blur(2px)' }} />
        <Box className={styles.overlayTextBox}>
          <Typography variant="h4" component="h2" style={{ color: '#FFC700', fontWeight: 'bold' }} gutterBottom>
            Discover A New Way To Stay Organized
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Optimizing Your Storage: Effortless Inventory Management
          </Typography>
          <Button variant="contained" style={{ backgroundColor: '#FFC700', color: 'white', fontWeight: 'bold' }} onClick={() => navigate('/inventory')}>
            TRY NOW
          </Button>
        </Box>
      </div>
    </ThemeProvider>
  );
};

export default Homepage;

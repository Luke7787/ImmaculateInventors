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
        <img
          src="/images/homePage.png"
          alt="Home Page"
          style={{ width: '100%', display: 'block', filter: 'blur(2px)' }}
        />
        <Box className={styles.overlayTextBox}>
          <Box className={styles.decorativeRectangle}></Box>
          <Typography
            variant="h4"
            component="h2"
            style={{ color: '#FFC700', fontWeight: 'bold', marginBottom: '8px' }}
            gutterBottom
          >
            Discover A New Way To Stay Organized
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ lineHeight: '1.2' }}
          >
            Optimizing Your Storage: Effortless Inventory Management
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: '#FFC700', color: 'white', fontWeight: 'bold' }}
            onClick={() => navigate('/inventory')}
          >
            TRY NOW
          </Button>
        </Box>
        <div className={styles.featureSection}>
          <Typography variant="h4" component="h2" className={styles.featuresTitle}>
            Key Features
          </Typography>
          <div className={styles.featuresContainer}>
            {[
              { text: "Easily Add Images to Your Inventory", img: "addImage.png" },
              { text: "Secure Your Data: Advanced Password Encryption", img: "Lock.png" },
              { text: "Real-Time Inventory Updates: Instant Notifications", img: "bell.png" }
            ].map((feature, index) => (
              <div key={index} className={styles.featureBox}>
                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.25rem', lineHeight: 1.2 }}>
                  {feature.text}
                </Typography>
                <img src={`/images/${feature.img}`} alt={feature.text} className={styles.featureIcon} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Homepage;

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
            style={{ color: '#FFC700', fontWeight: 'bold', marginBottom: '9px', lineHeight: '1', marginTop: '9px' }}
            gutterBottom
          >
            Discover A New Way To Stay Organized
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ lineHeight: '1.2', marginBottom: '15px' }}
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
        <Typography variant="h4" component="h2" className={styles.featuresTitle} style={{ fontWeight: 'bold' }}>
            Key Features
          </Typography>
          <div className={styles.featuresContainer}>
          {[
            { text: "Easily Add Images to Your Inventory", img: "addImage.png" },
            { text: "Secure Your Data: Advanced Password Encryption", img: "Lock.png" },
            { text: "Real-Time Inventory Updates: Instant Notifications", img: "bell.png" }
            ].map((feature, index) => (
            <div key={index} className={styles.featureBox}>
                <div className={styles.decorativeRectangleFeature1}></div>
                <div className={styles.decorativeRectangleFeature2}></div>
                <div className={styles.decorativeRectangleFeature3}></div>
                <Typography variant="h6" style={{ fontWeight: 'bold', fontSize: '1.25rem', lineHeight: 1.2, position: 'relative', paddingTop: '50px' }}>
                {feature.text}
                </Typography>
                <img src={`/images/${feature.img}`} alt={feature.text} className={styles.featureIcon} />
            </div>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.tryOurProductSection}>
    <Typography variant="h4" component="h2" className={styles.tryOurProductTitle} style={{ fontWeight: 'bold' }}>
    Try Our Product
  </Typography>
  <div className={styles.placeholderBox}></div>
</div>

    </ThemeProvider>
  );
};

export default Homepage;

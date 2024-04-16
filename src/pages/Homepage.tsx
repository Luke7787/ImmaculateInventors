import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import { ThemeProvider } from '@mui/material';
import theme from '../theme.tsx';
import styles from './Homepage.module.scss';

const Homepage = () => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={styles.homepageContainer}>
        <img
          src="/images/homePage2.png"
          alt="Home Page"
          style={{ width: '100%', display: 'block', filter: 'blur(2px)'}}
        />
        <Box className={styles.overlayTextBox}>
          <Box className={styles.decorativeRectangle}></Box>
          <Typography
            variant="h4"
            component="h2"
            style={{ color: '#FFC700', fontWeight: 'bold', marginBottom: 'px', lineHeight: '1', marginTop: '70px', marginLeft: '23px', fontSize: '2.7rem' }}
            gutterBottom
          >
            Discover A New Way <br /> To Stay Organized
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            style={{ lineHeight: '1.2', marginBottom: '15px', marginLeft: '25px', fontSize: '1.20rem'}}
          >
            Optimizing Your Storage: Effortless Inventory <br /> Management
          </Typography>
          <Button
            variant="contained"
            style={{ backgroundColor: '#FFC700', color: 'white', fontWeight: 'bold', marginLeft: '25px', fontSize: '1.20rem',
            padding: '15px 35px', }}
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
      {index === 0 && <div className={styles.decorativeRectangleFeature1}></div>}
      {index === 1 && <div className={styles.decorativeRectangleFeature2}></div>}
      {index === 2 && <div className={styles.decorativeRectangleFeature3}></div>}
      <div style={{paddingTop: '35px', display: 'flex', flexDirection: 'column', height: '90%', justifyContent: 'space-between'}}>
        <Typography 
          variant="h6" 
          align="left"
          style={{ fontWeight: 'bold', fontSize: '1.38rem', lineHeight: 1.2}}
        >
          {feature.text}
        </Typography>
        <img src={`/images/${feature.img}`} alt={feature.text} className={styles.featureIcon} />
      </div>
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

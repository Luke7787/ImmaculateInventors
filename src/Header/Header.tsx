import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Box, Button, Modal, Slide, Backdrop } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateAccount from "../CreateAccount/CreateAccount.tsx";
import SignIn from "../SignIn/SignIn.tsx";
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SettingsIcon from '@mui/icons-material/Settings';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

const Header = () => {
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [createAccountOpen, setCreateAccountOpen] = useState<boolean>(false);
  const [sideModalOpen, setSideModalOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleOpenSideModal = () => {
    setSideModalOpen(true);
  };

  const handleCloseSideModal = () => {
    setSideModalOpen(false);
  };

  return (
    <nav className={styles.header}>
      <div className={styles.headerLeft}>
        <div onClick={() => navigate('/inventory')} style={{ cursor: 'pointer' }}>
          <h1>My Inventory</h1>
        </div>
        <img src={`${process.env.PUBLIC_URL}/images/newlogo.png`} alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.headerCenter}>
        <Button className={`${styles.signInButton} ${styles.moveRight}`} onClick={() => setSignInOpen(true)}>
          SIGN IN
        </Button>
        <Modal open={signInOpen} onClose={() => setSignInOpen(false)}>
          {!createAccountOpen ? (
            <Box className={styles.signInModal}>
              <div className={styles.modalHeader}></div>
              <CloseIcon
                onClick={() => setSignInOpen(false)}
                className={styles.closeIcon}
              />
              <SignIn setCreateAccountOpen={setCreateAccountOpen} />
            </Box>
          ) : (
            <Box className={styles.createAccountModal}>
              <div className={styles.modalHeader}>
                <img src="/images/part1.png" alt="Decorative" className={styles.loginNewImage} />
                <img src="/images/part2.png" alt="Decorative" className={styles.loginNewImage2} />
                <h1>Create Account</h1>
              </div>
              <CloseIcon
                onClick={() => setCreateAccountOpen(false)}
                className={styles.closeIcon}
              />
              <CreateAccount />
            </Box>
          )}
        </Modal>
        <Button className={styles.signInButton} onClick={() => navigate('/')}>
          HOME
        </Button>
        <Button className={styles.signInButton} onClick={() => navigate('/about')}>
          ABOUT
        </Button>
        <Button className={styles.signInButton} onClick={() => navigate('/contact')}>
          CONTACT
        </Button>
      </div>
      <img
        src={`${process.env.PUBLIC_URL}/images/penguin.png`}
        alt="Logo"
        className={styles.logoImage1}
        onClick={handleOpenSideModal}
        style={{ cursor: 'pointer' }}
      />
      <Modal
        open={sideModalOpen}
        onClose={handleCloseSideModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Slide direction="left" in={sideModalOpen} mountOnEnter unmountOnExit>
          <Box className={styles.sideModal}>
            <CloseIcon
              onClick={handleCloseSideModal}
              className={styles.closeIcon}
            />
            <div className={styles.sideModalContent}>
              <img
                src={`${process.env.PUBLIC_URL}/images/penguin.png`}
                alt="Profile"
                className={styles.profileImage}
              />
              <h2>Username</h2>
              <p>Email</p>
              <p>About me</p>
              <div className={styles.spacer}></div>
              <hr className={styles.divider} />
              <div className={styles.menuContainer}>
                <div className={styles.menuItem}>
                  <AccountCircleIcon className={styles.menuIcon} />
                  <span>Friends</span>
                </div>
                <div className={styles.menuItem}>
                  <SettingsIcon className={styles.menuIcon} />
                  <span>Settings</span>
                </div>
                <div className={styles.menuItem}>
                  <ExitToAppIcon className={styles.menuIcon} />
                  <span>Log Out</span>
                </div>
              </div>
            </div>
          </Box>
        </Slide>
      </Modal>
    </nav>
  );
};

export default Header;

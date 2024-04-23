import React, { useState } from "react";
import styles from "./Header.module.scss";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateAccount from "../CreateAccount/CreateAccount.tsx";
import SignIn from "../SignIn/SignIn.tsx";
import { useNavigate } from 'react-router-dom';


const Header = () => {
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [createAccountOpen, setCreateAccountOpen] = useState<boolean>(false);
  const navigate = useNavigate();

  return (
    <nav className={styles.header}>
      <div className={styles.headerLeft}>
      <div onClick={() => navigate('/inventory')} style={{ cursor: 'pointer' }}>
          <h1>My Inventory</h1>
        </div>
        <img src={`${process.env.PUBLIC_URL}/images/newlogo.png`} alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.headerCenter}>
        <Button className={styles.signInButton} onClick={() => setSignInOpen(true)}>
          Sign In
        </Button>
        <Modal open={signInOpen} onClose={() => setSignInOpen(false)}>
          {!createAccountOpen ? (
            <Box className={styles.signInModal}>
              <div className={styles.modalHeader}>
              </div>
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
        <Button className={styles.signInButton}>
          About
        </Button>
        <Button className={styles.signInButton} onClick={() => navigate('/contact')}>
          Contact
        </Button>
      </div>
    </nav>
  );
};

export default Header;

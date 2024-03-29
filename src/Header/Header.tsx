import React, { useState } from "react";
import styles from "./Header.module.css";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CreateAccount from "../CreateAccount/CreateAccount.tsx";
import SignIn from "../SignIn/SignIn.tsx";

const Header = () => {
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [createAccountOpen, setCreateAccountOpen] = useState<boolean>(false);

  return (
    <nav className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>My Inventory</h1>
        <img src={`${process.env.PUBLIC_URL}/images/box.png`} alt="Logo" className={styles.logoImage} />
      </div>
      <div className={styles.headerRight}>
        <Button className={styles.signInButton} onClick={() => setSignInOpen(true)}>
          Sign In
        </Button>
        <Modal open={signInOpen} onClose={() => setSignInOpen(false)}>
          {!createAccountOpen ? (
            <Box className={styles.signInModal}>
              <div className={styles.modalHeader}>
                <h1>Sign In</h1>
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
      </div>
    </nav>
  );
};

export default Header;

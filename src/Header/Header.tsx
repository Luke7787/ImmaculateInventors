import React, { useState } from "react";
import styles from "./Header.module.css";
import { Box, Button, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import axios, { AxiosError } from "axios";

interface signInData {
  username: string;
  password: string;
}

const Header = () => {
  const [signInOpen, setSignInOpen] = useState<boolean>(false);
  const [userData, setUserData] = useState<signInData>({
    username: "",
    password: "",
  });
  const [signInErr, setSignInErr] = useState<boolean>(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Send to back end
    try {
      const response = await axios.get("http://localhost:8000/users", {
        params: userData,
      });
      console.log(response);
      if (response.status == 200) {
        setSignInErr(false);
        // route to profile
      }
    } catch (err) {
      console.error("err", err);
      if (err.response.status == 404) {
        setSignInErr(true);
      }
    }
    setUserData({ username: "", password: "" });
  };

  const handleUpdate = (e) => {
    const { name, value } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleModalClose = () => {
    setUserData({ username: "", password: "" });
    setSignInOpen(false);
  };

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
        <Modal open={signInOpen} onClose={handleModalClose}>
          <Box className={styles.signInModal}>
            <form onSubmit={handleSubmit}>
              <div className={styles.signInHeader}>
                <h1>Sign In</h1>
              </div>
              <CloseIcon
                onClick={handleModalClose}
                className={styles.closeIcon}
              />
              <div className={styles.signInBody}>
                <div className={styles.userName}>
                  <p>Username</p>
                  <input
                    placeholder="Enter username"
                    onChange={handleUpdate}
                    type="text"
                    name="username"
                    value={userData.username}
                  />
                </div>
                <div className={styles.password}>
                  <p>Password</p>
                  <input
                    placeholder="Enter password"
                    onChange={handleUpdate}
                    type="password"
                    name="password"
                    value={userData.password}
                  />
                </div>
                {signInErr && <p className={styles.signInErr}>Your username or password is incorrect. Please try again.</p>}
                <button className={styles.button} type="submit">
                  Sign In
                </button>
                <p>
                  Not registered? <a href="#">Create an account here</a>
                </p>
              </div>
            </form>
          </Box>
        </Modal>
      </div>
    </nav>
  );
};

export default Header;

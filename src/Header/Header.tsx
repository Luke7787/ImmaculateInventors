import React from "react";
import styles from "./Header.module.css";

const Header = () => {
  return (
    <nav className={styles.header}>
      <div className={styles.headerLeft}>
        <h1>My Inventory</h1>
      </div>
      <div className={styles.headerRight}>
        <h2> Sign In</h2>
      </div>
    </nav>
  );
};

export default Header;

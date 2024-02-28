import React from "react";
import styles from "./LeftOptionNav.module.css";

interface LeftOptionNavProps {
  numRows: number;
  fieldNames: string[];
}

const LeftOptionNav = ({ numRows, fieldNames }: LeftOptionNavProps) => {
  return (
    <div className={styles.rowName}>
      Hello
    </div>
  );
};

export default LeftOptionNav;

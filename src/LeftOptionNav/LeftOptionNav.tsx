import React from "react";
import styles from "./LeftOptionNav.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FilterListIcon from '@mui/icons-material/FilterList';

interface LeftOptionNavProps {
  // Props if needed
}

const LeftOptionNav = () => {
  return (
    <div className={styles.leftNav}>
      <div className={styles.folderTitle}>Folder</div>
      <TextField
        variant="outlined"
        size="small"
        placeholder="Search"
        className={styles.searchBar}
      />
      <Button variant="contained" className={styles.newFolderButton}>
        New Folder +
      </Button>
      <div className={styles.filterButtonContainer}>
        <Button variant="outlined" startIcon={<FilterListIcon />}>
          Filter
        </Button>
      </div>
    </div>
  );
};

export default LeftOptionNav;

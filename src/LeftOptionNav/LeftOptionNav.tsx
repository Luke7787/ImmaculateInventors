import React, { useState } from "react";
import styles from "./LeftOptionNav.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';

const LeftOptionNav = () => {
  const [newFolderName, setNewFolderName] = useState('');

  // Replace this with your actual folder list logic
  const folders = ['Groceries', 'School Supplies']; // Placeholder array

  const handleSearch = () => {
    // Implement your search logic
  };

  const handleCreateFolder = () => {
    // Implement folder creation logic
  };

  return (
    <div className={styles.leftNav}>
      <div className={styles.folderTitle}>Folder</div>
      <div className={styles.searchContainer}>
        <TextField
          variant="outlined"
          size="small"
          placeholder="Search"
          className={styles.searchBar}
        />
        <Button variant="contained" onClick={handleSearch} className={styles.searchButton}>
          <SearchIcon />
        </Button>
      </div>
      <TextField
        variant="outlined"
        size="small"
        placeholder="New Folder Name"
        value={newFolderName}
        onChange={(e) => setNewFolderName(e.target.value)}
        className={styles.newFolderInput}
      />
      <Button variant="contained" onClick={handleCreateFolder} className={styles.createFolderButton}>
      Create New Folder
      </Button>
      <div className={styles.folderList}>
        {folders.map((folder, index) => (
          <div key={index} className={styles.folderName}>
            {folder}
          </div>
        ))}
      </div>
      <div className={styles.filterButtonContainer}>
        <Button variant="outlined" startIcon={<FilterListIcon />} className={styles.filterButton}>
          Filter
        </Button>
      </div>
    </div>
  );
};

export default LeftOptionNav;

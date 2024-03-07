import React, { useState } from "react";
import styles from "./LeftOptionNav.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete'; // Import the delete icon

const LeftOptionNav = () => {
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState(['Groceries', 'School Supplies']); // State to track folders

  const handleSearch = () => {
    // Implement your search logic
  };

  const handleCreateFolder = () => {
    // Implement folder creation logic, adding the new folder to the state
    if(newFolderName.trim() === '') return; // Prevent adding empty names
    const updatedFolders = [...folders, newFolderName.trim()];
    setFolders(updatedFolders);
    setNewFolderName(''); // Reset the input field
  };

  const handleDeleteFolder = (folderName) => {
    // Filter out the folder to delete and update state
    const updatedFolders = folders.filter(folder => folder !== folderName);
    setFolders(updatedFolders);
  };

  return (
    <div className={styles.leftNav}>
      <div className={styles.folderTitle}>Folders</div>
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
        <AddIcon /> Create Folder
      </Button>
      <div className={styles.folderList}>
        {folders.map((folder, index) => (
          <div key={index} className={styles.folderItem}>
            <div className={styles.folderName}>{folder}</div>
            <Button 
              onClick={() => handleDeleteFolder(folder)} 
              className={styles.deleteFolderButton}
            >
              <DeleteIcon fontSize="small" />
            </Button>
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

import React, { useState } from "react";
import styles from "./LeftOptionNav.module.css";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

interface LeftOptionNavProps {
  onFolderSelect: (folderName: string) => void;
}

const LeftOptionNav: React.FC<LeftOptionNavProps> = ({ onFolderSelect }) => {
  const [newFolderName, setNewFolderName] = useState('');
  const [folders, setFolders] = useState(['Default', 'Groceries', 'School Supplies']);

  const handleSearch = () => {
    // Implement your search logic
  };

  const handleCreateFolder = () => {
    if(newFolderName.trim() === '') return;
    setFolders(prevFolders => [...prevFolders, newFolderName.trim()]);
    setNewFolderName('');
  };

  const handleDeleteFolder = (folderName: string) => {
    setFolders(prevFolders => prevFolders.filter(folder => folder !== folderName));
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
            <div 
              className={styles.folderName} 
              onClick={() => onFolderSelect(folder)}
            >
              {folder}
            </div>
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

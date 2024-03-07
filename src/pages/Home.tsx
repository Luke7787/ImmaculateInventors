import React, { useState } from "react";
import ItemBox from "../ItemBox/ItemBox.tsx";
import Header from "../Header/Header.tsx";
import theme from "../theme.tsx";
import { ThemeProvider } from "@mui/material";
import LeftOptionNav from "../LeftOptionNav/LeftOptionNav.tsx";
import styles from "./Home.module.css";

const Home = () => {
  // Initialize folders
  const [folders, setFolders] = useState(['Default', 'Groceries', 'School Supplies']);
  const [currentFolder, setCurrentFolder] = useState('Default');
  const [itemsData, setItemsData] = useState([
    // Initial items, you can assign them to the 'default' folder or specific ones
    { folder: 'Default', name: "Apple", quantity: 5, image: "/images/apple.jpg" },
    { folder: 'Default', name: "Big Pot", quantity: 2, image: "/images/bigPot.jpg" },
    { folder: 'Default', name: "Fish", quantity: 3, image: "/images/fish.jpg" },
    { folder: 'Default', name: "Mini", quantity: 5, image: "/images/mini.jpg" },
    { folder: 'Default', name: "Mushroom", quantity: 10, image: "/images/mushrooom.jpg" },
    { folder: 'Default', name: "Golf Club", quantity: 1, image: "/images/golf.jpg" },
    { folder: 'Default', name: "Basketball", quantity: 1, image: "/images/basketball.jpg" },
    { folder: 'Default', name: "Rocket", quantity: 1, image: "/images/rocket.jpg" },
    { folder: 'Default', name: "Testing Size", quantity: 1, image: "/images/testing.jpg" },
  ]);

  const handleFolderSelect = (folderName) => {
    setCurrentFolder(folderName);
  };

  const handleDelete = itemName => {
    setItemsData(itemsData.filter(item => item.name !== itemName));
  };

  const handleAddNewItem = (newItem) => {
    setItemsData([...itemsData, newItem]);
  };

  // Function to add a new folder
  const handleCreateFolder = (folderName) => {
    if (!folders.includes(folderName)) {
      setFolders([...folders, folderName]);
    } else {
      alert("Folder already exists!");
    }
  };

  // Filter the items by the selected folder
  const filteredItems = itemsData.filter(item => item.folder === currentFolder);

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div className={styles.homeContainer}>
        <LeftOptionNav 
          folders={folders} 
          onFolderSelect={handleFolderSelect} 
          onCreateFolder={handleCreateFolder} 
        />
        <div className={styles.contentContainer}>
          <ItemBox items={filteredItems} onDelete={handleDelete} onAddNewItem={handleAddNewItem} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;

import React, { useState } from "react";
import ItemBox from "../ItemBox/ItemBox.tsx";
import Header from "../Header/Header.tsx";
import theme from "../theme.tsx";
import { ThemeProvider } from "@mui/material";
import LeftOptionNav from "../LeftOptionNav/LeftOptionNav.tsx";
import styles from "./Home.module.css";

const Home = () => {
  const [folders, setFolders] = useState(['Default', 'Groceries', 'School Supplies']);
  const [currentFolder, setCurrentFolder] = useState('Default');
  const [itemsData, setItemsData] = useState([
    // Preset items assigned to 'Default' folder or others as needed
    { folder: 'Default', name: "Grocery List", quantity: 5, image: "/images/groceryList.jpg" },
    { folder: 'Default', name: "Purse", quantity: 2, image: "/images/purseItems.jpg" },
    { folder: 'Default', name: "Sneakers", quantity: 3, image: "/images/sneakers.jpg" },
    { folder: 'Default', name: "Adam's Crafts", quantity: 5, image: "/images/etsyStore.jpg" },
  ]);

  const handleFolderSelect = (folderName) => {
    setCurrentFolder(folderName);
  };

  const handleDelete = (itemName) => {
    setItemsData(itemsData.filter(item => item.name !== itemName));
  };

  // Updated to include the current folder in new items
  const handleAddNewItem = ({ name, image, quantity }) => {
    const imageUrl = image ? URL.createObjectURL(image) : ''; // Assuming image is a File object
    const newItem = { folder: currentFolder, name, quantity, image: imageUrl };
    setItemsData(prevItems => [...prevItems, newItem]);
  };

  const handleCreateFolder = (folderName) => {
    if (!folders.includes(folderName)) {
      setFolders(prevFolders => [...prevFolders, folderName]);
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
        {/* <LeftOptionNav 
          folders={folders}
          onFolderSelect={handleFolderSelect}
          onCreateFolder={handleCreateFolder}
        /> */}
        <div className={styles.contentContainer}>
          <ItemBox 
            items={filteredItems} 
            onDelete={handleDelete} 
            onAddNewItem={handleAddNewItem}
          />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;

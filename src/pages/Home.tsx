import React, { useState } from "react";
import ItemBox from "../ItemBox/ItemBox.tsx";
import Header from "../Header/Header.tsx";
import theme from "../theme.tsx";
import { ThemeProvider } from "@mui/material";
import LeftOptionNav from "../LeftOptionNav/LeftOptionNav.tsx";

const Home = () => {
  const [itemsData, setItemsData] = useState([
    { name: "Apple", quantity: 5, image: "/images/apple.jpg" },
    { name: "Big Pot", quantity: 2, image: "/images/bigPot.jpg" },
    { name: "Fish", quantity: 3, image: "/images/fish.jpg" },
    { name: "Mini", quantity: 5, image: "/images/mini.jpg" },
    { name: "Mushroom", quantity: 10, image: "/images/mushrooom.jpg" },
    { name: "Golf Club", quantity: 1, image: "/images/golf.jpg" },
    { name: "Basketball", quantity: 1, image: "/images/basketball.jpg" },
    { name: "Rocket", quantity: 1, image: "/images/rocket.jpg" },
    { name: "Testing Size", quantity: 1, image: "/images/testing.jpg" },
  ]);

  const handleDelete = itemName => {
    setItemsData(itemsData.filter(item => item.name !== itemName));
  };

  const handleAddNewItem = ({ name, image, quantity }) => {
    const imageUrl = image ? URL.createObjectURL(image) : '';
    const newItem = { name, quantity, image: imageUrl };
    setItemsData([...itemsData, newItem]);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header />
      <div style={{ display: "flex", height: '105vh' }}> {/* Ensure full height */}
        <LeftOptionNav /> {/* Navigation stays on the left */}
        <div style={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center" }}> {/* Centering ItemBox */}
          <ItemBox items={itemsData} onDelete={handleDelete} onAddNewItem={handleAddNewItem} />
        </div>
      </div>
    </ThemeProvider>
  );
};

export default Home;
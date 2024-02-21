import React, { useState } from "react";
import ItemBox from "./ItemBox/ItemBox.tsx";
import Header from "./Header/Header.tsx";
import theme from "./theme.tsx";
import { ThemeProvider } from "@mui/material";

const MyApp = () => {
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

  return (

    <ThemeProvider theme={theme}>
      <div>
        <Header />
      </div>
      <div>
      <ItemBox items={itemsData} onDelete={handleDelete} />
     </div>
    </ThemeProvider>
  );
};

export default MyApp;

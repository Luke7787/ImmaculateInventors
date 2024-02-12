import React from 'react';
import styles from './ItemBox.module.css';

interface ItemBoxProps {
    num: number;
    items: ItemBoxObject[];
}

interface ItemBoxObject {
    name: string;
    quantity: number;
    image: string;
}

/*
  const itemsData = [
    { name: "Item 1", quantity: 10, image: "/images/apple.jpg" },
    { name: "Item 2", quantity: 20, image: "/images/bigPot.jpg" },
    { name: "Item 3", quantity: 30, image: "/images/fish.jpg" },
    { name: "Item 4", quantity: 40, image: "/images/mini.jpg" },
  ];
  */

const ItemBox = ({ num, items }: ItemBoxProps) => {
    return (
        <div className={styles.gridContainer}>
            {items.map((item, index) => (
                <div className={styles.gridItem} key={index}>
                    <img src={item.image} alt={item.name} className={styles.itemImage} />
                    <p className={styles.itemName}>{item.name}</p>
                    <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
                </div>
            ))}
        </div>
    );
}

export default ItemBox;

import React, { useState } from 'react';
import styles from './ItemBox.module.css';

interface ItemBoxProps {
  items: { name: string; quantity: number; image: string; }[];
  onDelete: (name: string) => void; // Assuming deletion logic is still handled by the parent component
}

const ItemBox = ({ items, onDelete }: ItemBoxProps) => {
  // Example usage of useState, if needed inside ItemBox
  // const [localState, setLocalState] = useState(initialState);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.buttonContainer}>
          <button className={styles.addButton}>+ New Item</button>
      </div>
      <div className={styles.gridContainer}>
        {items.map((item, index) => (
          <div className={styles.gridItem} key={index}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <p className={styles.itemName}>{item.name}</p>
            <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
            <button 
              className={styles.deleteButton} 
              onClick={() => onDelete(item.name)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ItemBox;

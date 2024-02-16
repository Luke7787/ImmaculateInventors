import React from 'react';
import styles from './ItemBox.module.css';

interface ItemProps {
  name: string;
  quantity: number;
  image: string;
}

interface ItemBoxProps {
  items: ItemProps[];
  onDelete: (name: string) => void;
}

const ItemBox = ({ items, onDelete }: ItemBoxProps) => {
  // Function to split item names into chunks of 12 characters
  const splitName = (name: string) => {
    const chunkSize = 12;
    const chunks = [];

    for (let i = 0; i < name.length; i += chunkSize) {
      chunks.push(name.substring(i, i + chunkSize));
    }

    return chunks;
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.addButton}>+ New Item</button>
      </div>
      <div className={styles.gridContainer}>
        {items.map((item, index) => (
          <div className={styles.gridItem} key={index}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            {/* Render item name with line breaks for every 12 characters */}
            <div className={styles.itemName}>
              {splitName(item.name).map((chunk, index) => (
                <React.Fragment key={index}>
                  {chunk}<br />
                </React.Fragment>
              ))}
            </div>
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

import React, { useState } from 'react';
import styles from './ItemBox.module.css';
import AddItemModal from './AddItemModal.tsx'; // Ensure this import path is correct

interface ItemProps {
  name: string;
  quantity: number;
  image: string;
}

interface ItemBoxProps {
  items: ItemProps[];
  onDelete: (name: string) => void;
  onAddNewItem: (item: { name: string; image: string; quantity: number }) => void;
}

const ItemBox = ({ items, onDelete, onAddNewItem }: ItemBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>+ New Item</button>
      </div>
      <div className={styles.gridContainer}>
        {items.map((item, index) => (
          <div className={styles.gridItem} key={index}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemName}>{item.name}</div> {/* Ensure item name is displayed */}
            <p className={styles.itemQuantity}>Qty: {item.quantity}</p> {/* Ensure item quantity is displayed */}
            <button className={styles.deleteButton} onClick={() => onDelete(item.name)}>Delete</button>
          </div>
        ))}
      </div>
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(newItem) => {
          onAddNewItem(newItem); // Ensure this function correctly updates the state with the new item
          setIsModalOpen(false); // Close modal after adding
        }}
      />
    </div>
  );
}

export default ItemBox;

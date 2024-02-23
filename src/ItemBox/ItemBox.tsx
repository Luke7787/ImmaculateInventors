import React, { useState } from 'react';
import styles from './ItemBox.module.css';
import AddItemModal from './AddItemModal.tsx';

interface ItemProps {
  name: string;
  quantity: number;
  image: string;
}

interface ItemBoxProps {
  items: ItemProps[];
  onDelete: (name: string) => void;
  onAddNewItem: (item: { name: string; image: string; quantity: number }) => void; // Ensure this prop is passed down from the parent component
}

const ItemBox = ({ items, onDelete, onAddNewItem }: ItemBoxProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className={styles.outerContainer}>
      <div className={styles.buttonContainer}>
        {/* Button to toggle modal visibility */}
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>+ New Item</button>
      </div>
      <div className={styles.gridContainer}>
        {items.map((item, index) => (
          <div className={styles.gridItem} key={index}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemName}>
              {/* Item name and other properties */}
            </div>
            {/* Other item details */}
            <button className={styles.deleteButton} onClick={() => onDelete(item.name)}>Delete</button>
          </div>
        ))}
      </div>
      {/* Modal for adding a new item */}
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(newItem) => {
          onAddNewItem(newItem); // Handler to add a new item, ensure implementation in parent component
          setIsModalOpen(false); // Close modal after adding
        }}
      />
    </div>
  );
}

export default ItemBox;

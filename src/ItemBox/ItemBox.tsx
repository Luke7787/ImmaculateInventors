import React, { useState } from 'react';
import styles from './ItemBox.module.css';
import AddItemModal from '../AddItemModal/AddItemModal.tsx';

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

  const splitLongName = (name) => {
    if (name.length <= 12) return name;
    const parts = [];
    for (let i = 0; i < name.length; i += 12) {
      parts.push(name.slice(i, i + 12));
    }
    return parts.join('\n');
  };

  return (
    <div className={styles.outerContainer}>
      <div className={styles.buttonContainer}>
        <button className={styles.addButton} onClick={() => setIsModalOpen(true)}>+ New Item</button>
      </div>
      <div className={styles.gridContainer}>
        {items.map((item, index) => (
          <div className={styles.gridItem} key={index}>
            <img src={item.image} alt={item.name} className={styles.itemImage} />
            <div className={styles.itemName}>
              {}
              {splitLongName(item.name).split('\n').map((part, index) => (
                <React.Fragment key={index}>
                  {part}<br />
                </React.Fragment>
              ))}
            </div>
            <p className={styles.itemQuantity}>Qty: {item.quantity}</p>
            <button className={styles.deleteButton} onClick={() => onDelete(item.name)}>Delete</button>
          </div>
        ))}
      </div>
      <AddItemModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={(newItem) => {
          onAddNewItem(newItem);
          setIsModalOpen(false);
        }}
      />
    </div>
  );
}

export default ItemBox;

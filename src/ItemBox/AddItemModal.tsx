import React, { useState, useEffect } from 'react';
import styles from './AddItemModal.module.css';

interface AddItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: (item: { name: string; image: string; quantity: number }) => void;
}

const AddItemModal = ({ isOpen, onClose, onAdd }: AddItemModalProps) => {
  const [itemName, setItemName] = useState('');
  const [itemImage, setItemImage] = useState('');
  const [quantity, setQuantity] = useState('');

  // Effect to reset the form when the modal is opened or closed
  useEffect(() => {
    if (isOpen) {
      setItemName('');
      setItemImage('');
      setQuantity('');
    }
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedItemName = itemName.trim();
    const trimmedItemImage = itemImage.trim();
    const parsedQuantity = parseInt(quantity, 10);

    // Validate form inputs
    if (!trimmedItemName || !trimmedItemImage || isNaN(parsedQuantity) || parsedQuantity < 1) {
      alert('Please ensure all fields are correctly filled. Quantity must be a positive number.');
      return;
    }

    // Invoke the onAdd prop function with the new item
    onAdd({ name: trimmedItemName, image: trimmedItemImage, quantity: parsedQuantity });
    onClose(); // Close the modal
  };

  // Do not render the modal if it is not open
  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <form onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <label htmlFor="itemName">Item Name:</label>
            <input
              id="itemName"
              type="text"
              value={itemName}
              onChange={(e) => setItemName(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="itemImage">Image URL:</label>
            <input
              id="itemImage"
              type="text"
              value={itemImage}
              onChange={(e) => setItemImage(e.target.value)}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="quantity">Quantity:</label>
            <input
              id="quantity"
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              required
            />
          </div>
          <div className={styles.buttonGroup}>
            <button type="submit" className={styles.addButton}>Add Item</button>
            <button type="button" onClick={onClose} className={styles.closeButton}>Close</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItemModal;

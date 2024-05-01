import React, { useState, useEffect } from 'react';
import styles from './AddItemModal.module.scss';

interface ItemProps {
	name: string;
	quantity: number;
	image: string;
	id: string;
	note: string;
}
interface AddItemModalProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (item: ItemProps) => void;
}

const AddItemModal = ({ isOpen, onClose, onAdd }: AddItemModalProps) => {
	const [itemName, setItemName] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [quantity, setQuantity] = useState('');

	useEffect(() => {
		if (isOpen) {
			setItemName('');
			setImageFile(null);
			setQuantity('');
		}
	}, [isOpen]);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const parsedQuantity = parseInt(quantity, 10);
		if (
			!itemName.trim() ||
			!imageFile ||
			isNaN(parsedQuantity) ||
			parsedQuantity < 1
		) {
			alert(
				'Please ensure all fields are correctly filled. Quantity must be a positive number.'
			);
			return;
		}
		onAdd({ name: itemName, image: imageFile, quantity: parsedQuantity });
		onClose();
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setImageFile(file);
	};

	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
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
						<label htmlFor="itemImage">Image:</label>
						<input
							id="itemImage"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
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
						<button type="submit" className={styles.addButton}>
							Add Item
						</button>
						<button
							type="button"
							onClick={onClose}
							className={styles.closeButton}
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddItemModal;

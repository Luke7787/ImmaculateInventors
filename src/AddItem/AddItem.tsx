import React, { useState, useEffect } from 'react';
import styles from './AddItem.module.scss';
import axios from 'axios';

interface AddItemProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (
		name: string,
		quantity: number,
		note: string,
		imageUrl: string
	) => any;
}

const AddItem = ({ isOpen, onClose, onAdd }: AddItemProps) => {
	const [itemName, setItemName] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);
	const [quantity, setQuantity] = useState(0);
	const [note, setNote] = useState('');

	useEffect(() => {
		if (isOpen) {
			setItemName('');
			setImageFile(null);
			setQuantity('');
			setNote('');
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
		try {
			const formData = new FormData();
			formData.append('imageFile', imageFile);
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}/upload`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log('File uploaded successfully:', response.data.fileUrl);
			const res: string = response.data.fileUrl;
			onAdd(itemName, quantity, note, res);
			onClose();
		} catch (error) {
			console.error('Error uploading file:', error);
		}
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
							onChange={(e) => setQuantity(parseInt(e.target.value))}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="quantity">Note:</label>
						<input
							id="quantity"
							type="text"
							value={note}
							onChange={(e) => setNote(e.target.value)}
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

export default AddItem;

import React, { useState } from 'react';
import styles from './ItemBox.module.css';
import AddItemModal from '../AddItemModal/AddItemModal.tsx';
import Button from '@mui/material/Button';

interface ItemProps {
	name: string;
	quantity: number;
	image: string;
}

interface ItemBoxProps {
	items: ItemProps[];
	onDelete: (name: string) => void;
	onAddNewItem: (item: {
		name: string;
		image: string;
		quantity: number;
	}) => void;
}

const ItemBox = ({ items, onDelete, onAddNewItem }: ItemBoxProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isEditMode, setIsEditMode] = useState(false);

	return (
		<div className={styles.outerContainer}>
			<div className={styles.boxHeader}>
				<button
					className={styles.addButton}
					onClick={() => setIsModalOpen(true)}
				>
					Filter Folders
				</button>
				<p>Your Folders</p>
				<button
					className={styles.addButton}
					onClick={() => setIsModalOpen(true)}
				>
					<img src="/images/editIcon.png" className={styles.iconImage}/>
					Edit Folders
				</button>
			</div>
			<div className={styles.gridContainer}>
				{items.map((item, index) => (
					<div className={styles.gridItem} key={index}>
						<img
							src={item.image}
							alt={item.name}
							className={styles.itemImage}
						/>
						{/* <Button
							variant="contained"
							color="error"
							onClick={() => onDelete(item.name)}
							className={styles.deleteButton}
						>
							Delete
						</Button> */}
						<div className={styles.folderNameOverlay}>
							<div className={styles.itemName}>
								<p>{item.name}</p>
							</div>
							<p className={styles.itemQuantity}>Qty: {item.quantity}</p>
						</div>
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
};

export default ItemBox;

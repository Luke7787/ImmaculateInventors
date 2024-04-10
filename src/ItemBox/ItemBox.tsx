import React, { useState } from 'react';
import styles from './ItemBox.module.css';
import AddItemModal from '../AddItemModal/AddItemModal.tsx';
import classNames from 'classnames';

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
					className={classNames(styles.addButton, isEditMode && styles.addButtonActive)}
					onClick={() => setIsEditMode(!isEditMode)}
				>
					<img src="/images/editIcon.png" className={styles.iconImage} />
					Edit Folders
				</button>
			</div>
			<div className={styles.gridContainer}>
				{items.map((item, index) => (
					<div
						className={classNames(
							styles.gridItem,
							isEditMode && styles.gridItemEditMode
						)}
						key={index}
					>
						<img
							src={item.image}
							alt={item.name}
							className={styles.itemImage}
						/>
						{isEditMode && <button onClick={() => onDelete(item.name)}className={styles.deleteButton}>Delete Folder</button>}
						<div
							className={classNames(
								styles.folderNameOverlay,
								isEditMode && styles.folderOverlayEditMode
							)}
						>
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

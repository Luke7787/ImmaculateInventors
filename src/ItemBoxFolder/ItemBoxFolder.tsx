import React, { useState } from 'react';
import styles from './ItemBoxFolder.module.scss';
import AddItemModal from '../AddItemModal/AddItemModal.tsx';
import classNames from 'classnames';
import LeftOptionNav from '../LeftOptionNav/LeftOptionNav.tsx';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';

interface ItemProps {
	name: string;
	quantity: number;
	image: string;
	id: string;
}

interface ItemBoxProps {
	items: ItemProps[];
	onDelete: (userId: string, folderName: string) => void;
	onAddNewItem: (userId: string, name: string) => void;
	type: 'Folder' | 'Item';
	lowerText: React.ReactNode;
}
const ItemBoxFolder = ({
	items,
	onDelete,
	onAddNewItem,
	lowerText,
	type,
}: ItemBoxProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const [isFilterMode, setIsFilterMode] = useState<boolean>(false);
	const navigate = useNavigate();
	const { getUser } = useAuth();
	return (
		<>
			<div
				className={classNames(
					styles.filterMode,
					isFilterMode && styles.expandFilter
				)}
			>
				{isFilterMode && (
					<>
						<LeftOptionNav />
					</>
				)}
				<div
					className={styles.closeSection}
					onClick={() => setIsFilterMode(!isFilterMode)}
				>
					{isFilterMode ? (
						<KeyboardDoubleArrowLeftIcon />
					) : (
						<KeyboardDoubleArrowRightIcon />
					)}
				</div>
			</div>

			<div className={styles.outerContainer}>
				<div className={styles.boxHeader}>
					{type === 'Item' && (
						<button
							className={classNames(styles.goBackButton)}
							onClick={() => navigate(-1)}
						>
							<img
								src="https://static.thenounproject.com/png/1881199-200.png"
								height="80%"
							/>
						</button>
					)}
				</div>
				<div className={styles.boxHeader}>
					<button
						className={styles.addButton}
						onClick={() => setIsFilterMode(!isFilterMode)}
					>
						Filter {type}s
					</button>
					<p>Your {type}s</p>
					<button
						className={classNames(
							styles.addButton,
							isEditMode && styles.addButtonActive
						)}
						onClick={() => setIsEditMode(!isEditMode)}
					>
						<img src="/images/editIcon.png" className={styles.iconImage} />
						Edit {type}s
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
							onClick={() => {
								navigate(`/inventory/folder/${item.id}`);
							}}
						>
							<img
								src={item.image}
								alt={item.name}
								className={styles.itemImage}
							/>
							{isEditMode && (
								<button
									onClick={(e: any) => {
										e.preventDefault();
										e.stopPropagation();
										onDelete(getUser(), item.name);
									}}
									className={styles.deleteButton}
								>
									Delete {type}
								</button>
							)}
							<div
								className={classNames(
									styles.folderNameOverlay,
									isEditMode && styles.folderOverlayEditMode
								)}
							>
								<div className={styles.itemName}>
									<p>{item.name}</p>
								</div>
								{/* <p className={styles.itemQuantity}>Qty: {item.quantity}</p> */}
								{lowerText}
							</div>
						</div>
					))}
					{isEditMode && (
						<button
							onClick={() => setIsModalOpen(true)}
							className={classNames(styles.gridItem, styles.addFolderBtn)}
						>
							Add New {type}
						</button>
					)}
				</div>
				<AddItemModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onAdd={async (newItem) => {
						await onAddNewItem(getUser(), newItem.name);
						setIsModalOpen(false);
					}}
				/>
			</div>
		</>
	);
};

export default ItemBoxFolder;

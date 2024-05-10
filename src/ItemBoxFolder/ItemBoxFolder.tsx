import React, { useState } from 'react';
import styles from './ItemBoxFolder.module.scss';
import AddItemModal from '../AddFolder/AddFolder.tsx';
import classNames from 'classnames';
import LeftOptionNav from '../LeftOptionNav/LeftOptionNav.tsx';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { FolderProps } from '../interfaces/interfaces.tsx';


interface ItemBoxFolderProps {
	items: FolderProps[];
	onDelete: (userId: string, folderName: string) => void;
	onAddNewItem: (name: string, userId: string, imageUrl: string)  => any;
}
const ItemBoxFolder = ({
	items,
	onDelete,
	onAddNewItem,
}: ItemBoxFolderProps) => {
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
					<button
						className={styles.addButton}
						onClick={() => setIsFilterMode(!isFilterMode)}
					>
						Filter Folders
					</button>
					<p>Your Folders</p>
					<button
						className={classNames(
							styles.addButton,
							isEditMode && styles.addButtonActive
						)}
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
							onClick={() => {
								navigate(`/inventory/folder/${item.id}`);
							}}
						>
							<img
								src={item.imageUrl}
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
									Delete Folders
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
								<p>{item.items.length} items</p>
							</div>
						</div>
					))}
					{isEditMode && (
						<button
							onClick={() => setIsModalOpen(true)}
							className={classNames(styles.gridItem, styles.addFolderBtn)}
						>
							Add New Folders
						</button>
					)}
				</div>
				<AddItemModal
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onAdd={async (name: string, imageUrl: string) => {
						await onAddNewItem(name, getUser(), imageUrl);
						setIsModalOpen(false);
					}}
				/>
			</div>
		</>
	);
};

export default ItemBoxFolder;

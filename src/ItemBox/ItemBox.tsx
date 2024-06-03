import React, { useState } from 'react';
import styles from './ItemBox.module.scss';
import classNames from 'classnames';
import LeftOptionNav from '../LeftOptionNav/LeftOptionNav.tsx';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth.ts';
import { ItemProps } from '../interfaces/interfaces.tsx';
import AddItem from '../AddItem/AddItem.tsx';

interface ItemBoxProps {
	items: ItemProps[];
	onDelete: (item: ItemProps) => void;
	onAddNewItem: (
		name: string,
		quantity: number,
		note: string,
		imageUrl: string
	) => void;
	onClickBox: () => void;
}
const ItemBox = ({
	items,
	onDelete,
	onAddNewItem,
	onClickBox,
}: ItemBoxProps) => {
	const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
	const [isEditMode, setIsEditMode] = useState<boolean>(false);
	const navigate = useNavigate();
	const { getUser } = useAuth();
	return (
		<>
			<div className={styles.outerContainer}>
				<div className={styles.boxHeader}></div>
				<div className={styles.boxHeader}>
					<button
						className={classNames(styles.goBackButton)}
						onClick={() => navigate(-1)}
					>
						<img
							src="https://static.thenounproject.com/png/1881199-200.png"
							height="80%"
						/>
					</button>
					<p>Your Items</p>
					<button
						className={classNames(
							styles.addButton,
							isEditMode && styles.addButtonActive
						)}
						onClick={() => setIsEditMode(!isEditMode)}
					>
						<img src="/images/editIcon.png" className={styles.iconImage} />
						Edit Items
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
							onClick={onClickBox}
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
										onDelete(item);
									}}
									className={styles.deleteButton}
								>
									Delete Item
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
								<p>Qty: {item.quantity}</p>
								<p>
									<i>{item.note}</i>
								</p>
							</div>
						</div>
					))}
					{isEditMode && (
						<button
							onClick={() => setIsModalOpen(true)}
							className={classNames(styles.gridItem, styles.addFolderBtn)}
						>
							Add New Item
						</button>
					)}
				</div>
				<AddItem
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
					onAdd={async (
						name: string,
						quantity: number,
						note: string,
						imageUrl: string
					) => {
						await onAddNewItem(name, quantity, note, imageUrl);
						setIsModalOpen(false);
					}}
				/>
			</div>
		</>
	);
};

export default ItemBox;

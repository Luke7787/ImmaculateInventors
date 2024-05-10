import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.tsx';
import { useParams } from 'react-router-dom';
import ItemBox from '../ItemBox/ItemBox.tsx';
import styles from './Folder.module.scss';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.ts';
import { ItemProps } from '../interfaces/interfaces.tsx';

interface ItemBoxProps {
	items: ItemProps[];
	onDelete: (name: string) => void;
	onAddNewItem: (item: {
		name: string;
		image: string;
		quantity: number;
		id: string;
		note: string;
	}) => void;
	onClickBox: () => void;
	lowerText: React.ReactNode;
}
const Folder = () => {
	const { id } = useParams();
	const { getUser } = useAuth();
	const [folderData, setFolderData] = useState<ItemProps[]>([
		{
			name: '',
			quantity: 0,
			imageUrl: '',
			id: '',
			folder: '',
		},
	]);
	const [updateItems, setUpdateItems] = useState(false);

	useEffect(() => {
		fetchItems(id || '');
	}, [id, updateItems]);
	const fetchItems = async (folderId: string) => {
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BACKEND}/folderGet?folderId=${folderId}`
			);
			const dataArray = Object.values(response.data);
			const formattedArray: any = dataArray.map(
				(item: any) =>
					({
						name: item.name,
						quantity: item.quantity,
						imageUrl:
							item.image ||
							'https://plus.unsplash.com/premium_photo-1661870839207-d668a9857cb4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
						id: item._id,
						note: item.note,
						folder: item.folder,
						date: item.date,
						userId: item.userId,
					}) as ItemProps
			);
			setFolderData(formattedArray);
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleAddNewItem: any = async (
		name: string,
		quantity: number,
		note: string,
		imageUrl: string
	) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}/items/`,
				{
					image: imageUrl,
					name: name,
					quantity: quantity,
					note: note,
					folder: id,
					date: Date.now(),
					userId: getUser()					
				}
			);
			setUpdateItems(!updateItems);
			console.log(response);
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleDelete: any = async (item: ItemProps) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_BACKEND}/items?id=${item.id}`
			);
			setUpdateItems(!updateItems);
			console.log(response);
		} catch (err) {
			console.error('err', err);
		}
	};

	return (
		<>
			<Header />
			<div className={styles.homeContainer}>
				<div className={styles.contentContainer}>
					<ItemBox
						items={folderData}
						onDelete={handleDelete}
						onAddNewItem={handleAddNewItem}
						onClickBox={() => console.log('helo')}
					/>
				</div>
			</div>
		</>
	);
};

export default Folder;

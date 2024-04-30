import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.tsx';
import { useParams } from 'react-router-dom';
import ItemBox from '../ItemBox/ItemBox.tsx';
import styles from './Folder.module.scss';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.ts';

interface ItemProps {
	name: string;
	quantity: number;
	image: string;
	id: string;
	note: string;
}
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
			image: '',
			id: '',
			note: '',
		},
	]);
	const [updateItems, setUpdateItems] = useState(false);

	useEffect(() => {
		fetchItems(id || '');
	}, [id, updateItems]);
	const fetchItems = async (folderId: string) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/folderGet?folderId=${folderId}`
			);
			const dataArray = Object.values(response.data);
			const formattedArray: any = dataArray.map((item: any) => ({
				name: item.name,
				quantity: 0,
				image:
					'https://plus.unsplash.com/premium_photo-1661870839207-d668a9857cb4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
				id: item._id,
				note: item.node,
			}));
			setFolderData(formattedArray);
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleAddNewItem: any = async (item: ItemProps) => {
		try {
			const response = await axios.post('http://localhost:8000/items/', {
				name: item.name,
				quantity: item.quantity,
				note: item.note,
				folder: id,
				date: Date.now(),
				userId: getUser(),
			});
			setUpdateItems(!updateItems);
			console.log(response);
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleDelete: any = async (item: ItemProps) => {
		try {
			const response = await axios.delete(`http://localhost:8000/items?id=${item.id}`)
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
						lowerText={<p>Quantity: 3</p>}
						type="Item"
					/>
				</div>
			</div>
		</>
	);
};

export default Folder;

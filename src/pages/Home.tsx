import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.tsx';
import theme from '../theme.tsx';
import { ThemeProvider } from '@mui/material';
import styles from './Home.module.scss';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.ts';
import ItemBoxFolder from '../ItemBoxFolder/ItemBoxFolder.tsx';
import { FolderProps } from '../interfaces/interfaces.tsx';
import { useNavigate } from 'react-router-dom';

const Home = () => {
	const [itemsData, setItemsData] = useState<FolderProps[]>([]);
	const [updateFolders, setUpdateFolders] = useState(false);

	const { getUser } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!getUser()) {
			navigate('/');
		}
		fetchFolders(getUser());
	}, [getUser(), updateFolders]);

	const fetchFolders = async (userId: string) => {
		if (!userId) return;
		try {
			const response = await axios.get(
				`${process.env.REACT_APP_BACKEND}/folders?userId=${userId.substring(1, userId.length - 1)}`
			);
			const dataArray = Object.values(response.data);
			const formattedArray: any = dataArray.map(
				(item: any) =>
					({
						name: item.name,
						userId: item.userId,
						imageUrl: item.image || '/images/etsyStore.jpg',
						items: item.items,
						id: item._id,
					}) as FolderProps
			);
			console.log(userId);
			setItemsData(formattedArray);
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleDelete = async (userId: string, folderName: string) => {
		try {
			const response = await axios.delete(
				`${process.env.REACT_APP_BACKEND}/folders?folderName=${folderName}&userId=${userId.substring(1, userId.length - 1)}`
			);
			console.log(response);
			setUpdateFolders(!updateFolders);
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleAddNewItem: any = async (
		name: string,
		userId: string,
		imageUrl: string
	) => {
		try {
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}/folders?userId=${userId.substring(1, userId.length - 1)}&folderName=${name}&imageUrl=${imageUrl}`
			);
			console.log(response);
			setUpdateFolders(!updateFolders);
		} catch (err) {
			console.error('err', err);
		}
	};

	return (
		<ThemeProvider theme={theme}>
			<Header />
			<div className={styles.homeContainer}>
				<div className={styles.contentContainer}>
					<ItemBoxFolder
						items={itemsData}
						onDelete={handleDelete}
						onAddNewItem={handleAddNewItem}
					/>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Home;

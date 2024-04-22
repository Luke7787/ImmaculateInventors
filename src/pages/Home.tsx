import React, { useEffect, useState } from 'react';
import Header from '../Header/Header.tsx';
import theme from '../theme.tsx';
import { ThemeProvider } from '@mui/material';
import styles from './Home.module.scss';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth.ts';
import ItemBoxFolder from '../ItemBoxFolder/ItemBoxFolder.tsx';

const Home = () => {
	const [currentFolder, setCurrentFolder] = useState('Default');
	const [itemsData, setItemsData] = useState([
		// Preset items assigned to 'Default' folder or others as needed
	]);
	const [updateFolders, setUpdateFolders] = useState(false);
	const navigate = useNavigate();

	const { getUser } = useAuth();

	useEffect(() => {
		fetchFolders(getUser());
	}, [getUser(), updateFolders]);
	const fetchFolders = async (userId: string) => {
		try {
			const response = await axios.get(
				`http://localhost:8000/folders?userId=${userId.substring(1, userId.length - 1)}`
			);
			const dataArray = Object.values(response.data);
			const formattedArray: any = dataArray.map((item: any) => ({
				folder: 'Default',
				name: item.name,
				quantity: 0,
				image: '/images/etsyStore.jpg',
			}));
			setItemsData(formattedArray);
		} catch (err) {
			console.error('err', err);
		}
	};

	const handleDelete = (itemName) => {
		setItemsData(itemsData.filter((item: any) => item.name !== itemName));
	};

	// Updated to include the current folder in new items
	// const handleAddNewItem = ({ name, image, quantity }) => {
	// 	const imageUrl = image ? URL.createObjectURL(image) : ''; // Assuming image is a File object
	// 	const newItem = { folder: currentFolder, name, quantity, image: imageUrl };
	// 	setItemsData((prevItems) => [...prevItems, newItem]);
	// };
	const handleAddNewItem: any = async (userId: string, name: string) => {
		try {
			const response = await axios.post(
				`http://localhost:8000/folders?userId=${userId.substring(1, userId.length - 1)}&folderName=${name}`
			);
			console.log(response);
			setUpdateFolders(!updateFolders);
		} catch (err) {
			console.error('err', err);
		}
	};

	// Filter the items by the selected folder
	// const filteredItems = itemsData.filter(
	// 	(item: any) => item.folder === currentFolder
	// );
	const onClickBox = () => {
		navigate('/inventory/folder/:id');
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
						onClickBox={onClickBox}
						lowerText={<p>13 items</p>}
						type="Folder"
					/>
				</div>
			</div>
		</ThemeProvider>
	);
};

export default Home;

import React, { useState } from 'react';
import styles from './LeftOptionNav.module.scss';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';

const LeftOptionNav = () => {
	const [newFolderName, setNewFolderName] = useState('');

	const handleSearch = () => {
		// Implement your search logic
	};

	return (
		<div className={styles.leftNav}>
			<div className={styles.folderTitle}>Filters</div>
			<div className={styles.searchContainer}>
				<TextField
					variant="outlined"
					size="small"
					placeholder="Search"
					className={styles.searchBar}
				/>
				<Button
					variant="contained"
					onClick={handleSearch}
					className={styles.searchButton}
				>
					<SearchIcon />
				</Button>
			</div>
			<TextField
				variant="outlined"
				size="small"
				placeholder="New Folder Name"
				value={newFolderName}
				onChange={(e) => setNewFolderName(e.target.value)}
				className={styles.newFolderInput}
			/>
		</div>
	);
};

export default LeftOptionNav;

import React, { useState, useEffect } from 'react';
import styles from './AddFolder.module.scss';
import axios from 'axios';

interface AddFolderProps {
	isOpen: boolean;
	onClose: () => void;
	onAdd: (name: string, imageUrl: string) => any;
}

const AddFolder = ({ isOpen, onClose, onAdd }: AddFolderProps) => {
	const [folderName, setFolderName] = useState('');
	const [imageFile, setImageFile] = useState<File | null>(null);

	useEffect(() => {
		if (isOpen) {
			setFolderName('');
			setImageFile(null);
		}
	}, [isOpen]);

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (!folderName.trim() || !imageFile) {
			alert(
				'Please ensure all fields are correctly filled. Quantity must be a positive number.'
			);
			return;
		}
		try {
			const formData = new FormData();
			formData.append('imageFile', imageFile);
			const response = await axios.post(
				`${process.env.REACT_APP_BACKEND}/upload`,
				formData,
				{
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				}
			);

			console.log('File uploaded successfully:', response.data.fileUrl);
			const res: string = response.data.fileUrl;
			onAdd(folderName, res);
			onClose();
		} catch (error) {
			console.error('Error uploading file:', error);
		}
	};

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files ? e.target.files[0] : null;
		setImageFile(file);
	};

	if (!isOpen) return null;

	return (
		<div className={styles.modalOverlay}>
			<div className={styles.modalContent}>
				<form onSubmit={handleSubmit}>
					<div className={styles.formGroup}>
						<label htmlFor="folderName">Folder Name:</label>
						<input
							id="folderName"
							type="text"
							value={folderName}
							onChange={(e) => setFolderName(e.target.value)}
							required
						/>
					</div>
					<div className={styles.formGroup}>
						<label htmlFor="folderImage">Image:</label>
						<input
							id="folderImage"
							type="file"
							accept="image/*"
							onChange={handleFileChange}
							required
						/>
					</div>
					<div className={styles.buttonGroup}>
						<button type="submit" className={styles.addButton}>
							Add Item
						</button>
						<button
							type="button"
							onClick={onClose}
							className={styles.closeButton}
						>
							Close
						</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default AddFolder;

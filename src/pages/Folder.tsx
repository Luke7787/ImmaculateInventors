import React from 'react';
import Header from '../Header/Header.tsx';
import { useParams } from 'react-router-dom';
import ItemBox from '../ItemBox/ItemBox.tsx';
import styles from './Folder.module.scss';

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
	onClickBox: () => void;
	lowerText: React.ReactNode;
}
const Folder = () => {
	const { id } = useParams();

	const items: ItemProps[] = [
		{
			name: 'Keys',
			quantity: 1,
			image:
				'https://images.unsplash.com/photo-1609587415882-97552f39c6c2?q=80&w=1827&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Water Bottle',
			quantity: 2,
			image:
				'https://images.unsplash.com/photo-1605714312496-01e90cb509cc?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
		{
			name: 'Carrots',
			quantity: 3,
			image:
				'https://plus.unsplash.com/premium_photo-1661870839207-d668a9857cb4?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
		},
	];

	return (
		<>
			<Header />
			<div className={styles.homeContainer}>
				<div className={styles.contentContainer}>
					<ItemBox
						items={items}
						onDelete={(name: string) => console.log('hello')}
						onAddNewItem={(item: {
							name: string;
							image: string;
							quantity: number;
						}) => console.log('dawg')}
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

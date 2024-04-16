import React from 'react';
import Header from '../Header/Header.tsx';
import { useParams } from 'react-router-dom';

const Folder = () => {
	const { id } = useParams();
	return (
		<>
			<Header />
		</>
	);
};

export default Folder;

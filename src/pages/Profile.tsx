import React from 'react';
import theme from '../theme.tsx';
import { ThemeProvider } from '@mui/material';
import Header from '../Header/Header.tsx';
import LeftOptionNav from '../LeftOptionNav/LeftOptionNav.tsx';

const Profile = () => {
	return (
		<ThemeProvider theme={theme}>
			<div>
				<Header />
				<LeftOptionNav numRows={4} fieldNames={['hello']} />
			</div>
		</ThemeProvider>
	);
};

export default Profile;

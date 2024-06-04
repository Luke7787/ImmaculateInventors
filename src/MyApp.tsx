import React from 'react';
import Home from './pages/Home.tsx';
import Homepage from './pages/Homepage.tsx';
import Profile from './pages/Profile.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Folder from './pages/Folder.tsx';
import ContactPage from './Header/ContactPage.tsx';
import AboutPage from './Header/AboutPage.tsx';
import { AuthContext } from './context/AuthContext.tsx';
import { useAuth } from './hooks/useAuth.ts';
import ForgetPassword from './ForgetPassword/ForgetPassword.tsx';
import ResetPassword from './ForgetPassword/ResetPassword.tsx';
import InfoText from './ForgetPassword/InfoText.tsx';
import ErrorText from './ForgetPassword/common/ErrorText/ErrorText.tsx';

const MyApp = () => {
	return (
		
			<Router>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/inventory" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/folder/:id" element={<Folder />} />
					<Route path="/inventory/folder/:id" element={<Folder />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/about" element={<AboutPage />} />
					<Route path="/error" element={<ErrorText text={'an error occurred'} />} />
					<Route path="/forgot-password" element={<ForgetPassword />} />
					<Route path="/reset-password/:token" element={<ResetPassword params={{
						token: ''
					}} />} />
					<Route path="/info-text" element={<InfoText text={'info'} linkHref={'/'} linkTitle={'info'} />} />
				</Routes>
			</Router>
		
	);
};

export default MyApp;

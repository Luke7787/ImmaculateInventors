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

const MyApp = () => {
	const { user, login, logout, setUser } = useAuth();
	return (
		<AuthContext.Provider value={{ user, setUser }}>
			<Router>
				<Routes>
					<Route path="/" element={<Homepage />} />
					<Route path="/inventory" element={<Home />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/folder/:id" element={<Folder />} />
					<Route path="/inventory/folder/:id" element={<Folder />} />
					<Route path="/contact" element={<ContactPage />} />
					<Route path="/about" element={<AboutPage />} />
				</Routes>
			</Router>
		</AuthContext.Provider>
	);
};

export default MyApp;

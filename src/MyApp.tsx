import React from 'react';
import Home from './pages/Home.tsx';
import Homepage from './pages/Homepage.tsx';
import Profile from './pages/Profile.tsx';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Folder from './pages/Folder.tsx';

const MyApp = () => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Homepage />} />
				<Route path="/inventory" element={<Home />} />
				<Route path="/profile" element={<Profile />} />
				<Route path="/folder/:id" element={<Folder />} />
			</Routes>
		</Router>
	);
};

export default MyApp;

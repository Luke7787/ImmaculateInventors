import React from "react";
import Home from "./pages/Home.tsx";
import Homepage from "./pages/Homepage.tsx"; // Import your new Homepage component
import Profile from "./pages/Profile.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const MyApp = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} /> {/* Set Homepage as the default route */}
        <Route path="/inventory" element={<Home />} /> {/* Move Home to a new path */}
        <Route path="/profile" element={<Profile />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default MyApp;

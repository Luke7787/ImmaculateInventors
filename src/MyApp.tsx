import React from "react";
import Home from "./pages/Home.tsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Profile from "./pages/Profile.tsx";
const MyApp = () => {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
    </Router>
  );
};

export default MyApp;

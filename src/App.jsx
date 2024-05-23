import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FCNavbar from "../src/FCComponents/FCNavbar";
import FCMainPage from "./assets/Pages/MainPage";
import FCBusinessCard from "../src/FCComponents/FCBusinessCard";

import RegisterPage from "./assets/Pages/RegisterPage";
import AboutPage from "./assets/Pages/AboutPage";
import "bootstrap/dist/css/bootstrap.min.css";
import FCLoginModal from "./FCComponents/FCLoginModal";
import BusinessPage from "./assets/Pages/BusinessPage";

function App() {
  return (
    <Router>
      <div>
        <FCNavbar />
        <hr style={{ width: "100%", marginTop: 0, color: "#1c1c1cca" }} />

        <Routes>
          <Route path="/" element={<FCMainPage />} />
          
          <Route path="/signup" element={<RegisterPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/BusinessPage" element={<BusinessPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

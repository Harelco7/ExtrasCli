import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {  faSearch, faBars } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";


import "../Styles/Navbar.css";
import FCUserDrillDown from "./FCUserDrillDown.jsx";

const FCNavbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}></div>
      <div className="search-container">
        <FontAwesomeIcon icon={faSearch} size="xs" className="search-icon" />
        <input
          type="text"
          placeholder="Search in Extra's"
          className="search-input"
        />
      </div>
      <FCUserDrillDown className="user-button" />
    </nav>
  );
};

export default FCNavbar;



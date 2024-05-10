import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faSearch, faBars } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap"; // Import Bootstrap modal components
import { useNavigate } from "react-router-dom";
import FCLoginModal from "../FCComponents/FCLoginModal.jsx";

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
      <div className="logo" onClick={() => navigate("/Main")}></div>
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

/* <div className="nav-buttons">
        <button className="navbar-buttons" onClick={() => navigate("/signup")}>
          Sign Up
        </button>
        <button className="navbar-buttons" onClick={() => setShowModal(true)}>
          Log In
        </button>
        <button className="navbar-buttons" onClick={() => navigate("/about")}>
          About
        </button>
      </div> */

import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faChevronUp, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import FCLoginModal from "./FCLoginModal";
import FCRegisterModal from "./FCRegisterModal";


import "../Styles/UserDrillDown.css";
import FCModal from "./FCModal";

const FCUserDrillDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false); // State to control modal visibility
  const [showRegisterModal, setShowRegisterModal] = useState(false); // State to control modal visibility
  const [userData, setUserData] = useState(null); // State to store the user data

  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  const handleSuccessfulLogin = (userData) => {
    setLoggedInUser(userData);
  };

  const handleShowLoginModal  = ()=>{
    setShowRegisterModal(false)
    setShowLoginModal(true)
  }
  const handleShowRegisterModal = ()=>{
    setShowRegisterModal(true)
    setShowLoginModal(false)
  }
  
  useEffect(() => {
    if (loggedInUser) {
      setUserData(loggedInUser);
    }
  }, [loggedInUser]);

  useEffect(() => {
    const storedUserData = sessionStorage.getItem("userData");
    if (storedUserData) {
      setUserData(JSON.parse(storedUserData));
    }
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogOut = () => {
    sessionStorage.clear();
    setUserData(null);
  };

  return (
    <>
      <div className="drilldown-container">
        <div className="user-icon-container" onClick={toggleDropdown}>
          <Dropdown show={isOpen} onToggle={toggleDropdown}>
          <Dropdown.Toggle className="user-button" style={{ backgroundColor: userData ? "#efa43a" : "" }}>
              {userData ? (
                <span style={{ fontSize: 25,marginBottom:10 }}>{userData.customerName[0]}</span>
              ) : (
                <FontAwesomeIcon icon={faUser} size="xl" />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu className={`dropdown-menu ${isOpen ? "show" : "hide"}`}>
              {userData ? (
                <>
                  <Dropdown.Item onClick={() => console.log("Profile")}>
                    Profile
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleLogOut}>Sign Out</Dropdown.Item>
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={ handleShowLoginModal}>
                    Log In
                  </Dropdown.Item>
                  <Dropdown.Item onClick={handleShowRegisterModal}>
                    Sign Up
                  </Dropdown.Item>
                </>
              )}
              <Dropdown.Item onClick={() => navigate("/about")}>
                About Us
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="arrow-container" onClick={toggleDropdown}>
          <FontAwesomeIcon icon={isOpen ? faChevronUp : faChevronDown} size="lg" />
        </div>
      </div>
    
      <FCLoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onSuccessfulLogin={handleSuccessfulLogin}
      />
       <FCRegisterModal
        show={showRegisterModal}
        onHide={() => setShowRegisterModal(false)}
      />
    </>
  );
};

export default FCUserDrillDown;

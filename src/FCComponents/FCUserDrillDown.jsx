import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faChevronUp,
  faChevronDown,
  faArrowRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import FCLoginModal from "./FCLoginModal";

import "../Styles/UserDrillDown.css";

const FCUserDrillDown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [userData, setUserData] = useState(null);

  const [loggedInUser, setLoggedInUser] = useState(null);

  const navigate = useNavigate();

  const handleSuccessfulLogin = (userData) => {
    setLoggedInUser(userData);
  };

  const handleShowLoginModal = () => {
    setShowRegisterModal(false);
    setShowLoginModal(true);
  };
  const handleShowRegisterModal = () => {
    setShowRegisterModal(true);
    setShowLoginModal(false);
  };

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

  function capitalizeFullName(fullName) {
    let words = fullName.split(" ");
    let capitalized = "";

    for (let i = 0; i < words.length; i++) {
      capitalized += words[i][0].toUpperCase();
    }

    return capitalized;
  }

  return (
    <>
      <div className="drilldown-container">
        <div className="user-icon-container" onClick={toggleDropdown}>
          <Dropdown show={isOpen} onToggle={toggleDropdown}>
            <Dropdown.Toggle
              className="user-button"
              style={{ backgroundColor: userData ? "#efa43a" : "" }}
            >
              {userData ? (
                <span style={{ fontSize: 25, margin: 0 }}>
                  {userData.customerName
                    ? capitalizeFullName(userData.customerName)
                    : userData.username[0].toUpperCase()}
                </span>
              ) : (
                <FontAwesomeIcon icon={faUser} size="xl" />
              )}
            </Dropdown.Toggle>
            <Dropdown.Menu
              dir="rtl"
              className={`dropdown-menu ${isOpen ? "show" : "hide"}`}
            >
              {userData ? (
                <>
                  {userData.age ? (
                    <>
                      <Dropdown.Item onClick={() => console.log("Profile")}>
                        אזור אישי
                      </Dropdown.Item>
                    </>
                  ) : (
                    <>
                      {" "}
                      <Dropdown.Item
                        onClick={() => navigate("/addbox")}
                      >
                        העסק שלי
                      </Dropdown.Item>
                    </>
                  )}

                  <hr style={{ margin: 5 }} />
                  <Dropdown.Item onClick={handleLogOut}>
                    התנתקות
                    <FontAwesomeIcon
                      icon={faArrowRightFromBracket}
                      style={{ paddingRight: 10 }}
                    />
                  </Dropdown.Item>

                  <hr style={{ margin: 5 }} />
                </>
              ) : (
                <>
                  <Dropdown.Item onClick={handleShowLoginModal}>
                    כניסה
                  </Dropdown.Item>
                  <hr style={{ margin: 5 }} />
                  <Dropdown.Item onClick={() => navigate("/signup")}>
                    הרשמה
                  </Dropdown.Item>
                  <hr style={{ margin: 5 }} />
                </>
              )}
              <Dropdown.Item onClick={() => navigate("/about")}>
                קצת עלינו!
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
        <div className="arrow-container" onClick={toggleDropdown}>
          <FontAwesomeIcon
            icon={isOpen ? faChevronUp : faChevronDown}
            size="lg"
          />
        </div>
      </div>

      <FCLoginModal
        show={showLoginModal}
        onHide={() => setShowLoginModal(false)}
        onSuccessfulLogin={handleSuccessfulLogin}
      />
    </>
  );
};

export default FCUserDrillDown;

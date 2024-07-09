import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "..//..//public/Images/CircleLogo.png";
import "../Styles/LoginModal.css";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

const FCLoginModal = ({ show, onHide, onSuccessfulLogin }) => {
  const navigate = useNavigate();

  const sendtoNavbarUser = (user) => {};

  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");

  const [showRegister, setShowRegister] = useState(false);

  let user = {
    username,
    password,
  };

  const apiURLUser = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Login/LoginTest";

  const btnLogin = (e) => {
    e.preventDefault();

    fetch(apiURLUser, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      },
      body: JSON.stringify(user),
    })
      .then((res) => {
        if (res.ok) {
          return res.json().then((result) => {
            localStorage.setItem("userData", JSON.stringify(result));
            console.log("Now Logged-In: ", result);
            onHide();
            onSuccessfulLogin(result);
          });
        } else if (res.status === 404 || res.status === 401) {
          throw new Error("Username or Password are invalid");
        } else {
          throw new Error("Failed to login. Please try again later.");
        }
      })
      .catch((error) => {
        setError(error.message);
        console.error("Error while logging in:", error);
      });
  };

  const getModalSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1440) {
      return "md";
    } else if (screenWidth >= 1024) {
      return "md";
    } else {
      return "sm";
    }
  };

  const theme = createTheme({
    direction: "rtl",
    palette: {
      mode: "light",
    },
  });

  const cacheRtl = createCache({
    key: "muirtl",
    stylisPlugins: [prefixer, rtlPlugin],
  });

  const handleClickOnSignUp = () => {
    onHide();
    navigate("/signup");
  };

  
  const isMobile = () => window.innerWidth <= 768;

 
  useEffect(() => {
    const handleResize = () => setMobile(isMobile());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [mobile, setMobile] = useState(isMobile());

  return (
    <Modal
      className={mobile ? "mobile-modal" : ""}
      show={show}
      onHide={onHide}
      centered={!mobile}
      size={getModalSize()}
    >
      <Modal.Body className="modal-body">
        <div className="form-container">
          <div className="logo-img" style={{backgroundImage:'url(https://proj.ruppin.ac.il/bgroup33/test2/dist/Images/CircleLogo.png)'}}>
            
          </div>
          <form className="form">
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                label="שם משתמש"
                id="fullWidth"
                variant="outlined"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
           

            
              <TextField
                fullWidth
                label="סיסמא"
                id="fullWidth"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </ThemeProvider>
            </CacheProvider>
            {error && (
              <p style={{ fontSize: 12, color: "Red", textAlign: "center", margin: 0 }}>
                {error}
              </p>
            )}

            <p className="page-link">
              <span className="page-link-label">Forgot Password?</span>
            </p>
            <button className="form-btn" onClick={btnLogin}>
              הירשם
            </button>
          </form>
          <p className="sign-up-label">
            עדיין לא נרשמת ?
            <span className="sign-up-link" onClick={handleClickOnSignUp}>
              לחץ כאן!
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FCLoginModal;

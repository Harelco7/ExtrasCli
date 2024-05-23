import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import logo from "../Images/CircleLogo.png";
import "../Styles/LoginModal.css";

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

  const apiURLUser = "http://localhost:5048/api/Login/LoginTest";

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
            sessionStorage.setItem("userData", JSON.stringify(result));
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
    palette: {
      primary: {
        main: "#000",
      },
    },
  });

  const handleClickOnSignUp = () => {
    onHide();
    navigate("/signup");
  };

  // Function to determine if the device is mobile
  const isMobile = () => window.innerWidth <= 768;

  // Use useEffect to handle resizing
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
          <div className="logo-img">
            <img src={logo} alt="" />
          </div>
          <form className="form">
            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                label="Username"
                id="fullWidth"
                variant="outlined"
                onChange={(e) => {
                  setUserName(e.target.value);
                }}
              />
            </ThemeProvider>

            <ThemeProvider theme={theme}>
              <TextField
                fullWidth
                label="Password"
                id="fullWidth"
                variant="outlined"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </ThemeProvider>
            {error && (
              <p style={{ fontSize: 12, color: "Red", textAlign: "center", margin: 0 }}>
                {error}
              </p>
            )}

            <p className="page-link">
              <span className="page-link-label">Forgot Password?</span>
            </p>
            <button className="form-btn" onClick={btnLogin}>
              Log in
            </button>
          </form>
          <p className="sign-up-label">
            Don't have an account?
            <span className="sign-up-link" onClick={handleClickOnSignUp}>
              Sign up
            </span>
          </p>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FCLoginModal;

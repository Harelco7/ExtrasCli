import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { TextField} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo from "../Images/CircleLogo.png";

import "../Styles/LoginModal.css";

const FCLoginModal = ({ show, onHide ,onSuccessfulLogin}) => {
  const navigate = useNavigate();

  const sendtoNavbarUser = (user) => {

  }

  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");
  const [error, setError] = useState("");

  const [showRegister, setShowRegister] = useState(false);

  let user = {
    username,
    password,
  };

  const apiURLUser = "http://localhost:5041/api/Login/LoginTest";

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
          throw new Error("Username or Password are Invaliad");
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

  const toggle = (
    <div className="btn-container">
      <label className="switch btn-color-mode-switch">
        <input value="1" id="color_mode" name="color_mode" type="checkbox" />
        <label
          className="btn-color-mode-switch-inner"
          data-off="Login"
          data-on="Join Us"
          for="color_mode"
        ></label>
      </label>
    </div>
  );

  const handleClickOnSignUp = ()=>{
    onHide();
    navigate("/signup")
  }

  return (
    <Modal show={show} onHide={onHide} centered size={getModalSize()}>
      <Modal.Body className="modal-body">
        <h1 style={{textAlign:"center"}}>Login</h1>
        <div className="form-container">
          <div className="logo-img">
            <img src={logo} alt="" />
          </div>
          <div style={{display:"flex",justifyContent:"center"}}>{toggle}</div>
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
              <p style={{ fontSize: 12, color: "Red", textAlign: "center" }}>
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

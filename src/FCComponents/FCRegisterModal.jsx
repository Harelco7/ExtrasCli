import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

import logo from "../Images/CircleLogo.png";

import "../Styles/LoginModal.css";

const FCLoginModal = ({ show, onHide}) => {
  const navigate = useNavigate();


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
    <div class="btn-container">
      <label class="switch btn-color-mode-switch">
        <input value="1" id="color_mode" name="color_mode" type="checkbox" />
        <label
          class="btn-color-mode-switch-inner"
          data-off="Login"
          data-on="Join Us"
          for="color_mode"
        ></label>
      </label>
    </div>
  );

  return (
    <Modal show={show} onHide={onHide} centered size={getModalSize()}>
      <Modal.Body className="modal-body">
        <h1 style={{textAlign:"center"}}>Register</h1>
        <div className="form-container">
          <div className="logo-img">
            <img src={logo} alt="" />
          </div>
          <div style={{ display: "flex", justifyContent: "center" }}>
            {toggle}
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
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default FCLoginModal;

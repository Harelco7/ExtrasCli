import React, { useState } from "react";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TextField, MenuItem, Select, InputLabel, FormControl } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

export default function FCClientForm() {

  const navigate = useNavigate();

  const theme = createTheme({
    palette: {
      primary: {
        main: "#000",
      },
    },
  });

  const [ClientData, setClientData] = useState({
    ContactInfo: "",
    Username: "",
    Password: "",
    Address: "",
    Gender: "",
    Age: "",
    Email:"",
    phoneNumber:"",
    CustomerName: ""
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    let tempErrors = {};
    tempErrors.ContactInfo = ClientData.ContactInfo ? "" : "Contact Info is required.";
    tempErrors.Username = ClientData.Username ? "" : "Username is required.";
    tempErrors.Password = ClientData.Password ? "" : "Password is required.";
    tempErrors.Address = ClientData.Address ? "" : "Address is required.";
    tempErrors.Gender = ClientData.Gender ? "" : "Gender is required.";
    tempErrors.Age = ClientData.Age > 0 ? "" : "Age is required.";
    tempErrors.CustomerName = ClientData.CustomerName ? "" : "Customer Name is required.";
    tempErrors.Email = ClientData.Email ? "" : "Email is required.";
    tempErrors.phoneNumber = ClientData.phoneNumber ? "" : "Phone Number is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const apiURLAdd = "http://localhost:5048/api/Register/registerClient";
      fetch(apiURLAdd, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        },
        body: JSON.stringify(ClientData),
      })
        .then((res) => {
          console.log(res);
          if (!res.ok) {
            throw new Error("Network response was not ok");
          }
          navigate("/");
          return res.json();
        })
        .then(
          (result) => {
            console.log("Added Successfully!", result);
            console.log("Navigating to main page...");
            navigate("/"); // Navigate to the main page after successful submission
          },
          (error) => {
            console.error("Error posting data:", error);
          }
        );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...ClientData, [name]: value });
  };

  return (
    <div>
      <div className="head-container">
        <FontAwesomeIcon size="5x" icon={faBagShopping} alt="Shopping Bag Icon" />
      </div>
      <div className="register-container">
        <ThemeProvider theme={theme}>
          <form className="inputs-container" >
            <div className="register-inputs-left">
              <div className="text-field-wrapper">
                <TextField
                  label="Username"
                  name="Username"
                  id="username"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.Username}
                  fullWidth
                  error={!!errors.Username}
                  helperText={errors.Username}
                />
              </div>
              <div className="text-field-wrapper">
                <TextField
                  label="Password"
                  name="Password"
                  id="password"
                  type="password"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.Password}
                  fullWidth
                  error={!!errors.Password}
                  helperText={errors.Password}
                />
              </div>
              <div className="text-field-wrapper">
                <TextField
                  label="Email"
                  name="Email"
                  id="Email"
                  type="Email"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.Email}
                  fullWidth
                  error={!!errors.Email}
                  helperText={errors.Email}
                />
              </div>
              <div className="text-field-wrapper">
                <TextField
                  label="Customer Name"
                  name="CustomerName"
                  id="customerName"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.CustomerName}
                  fullWidth
                  error={!!errors.CustomerName}
                  helperText={errors.CustomerName}
                />
              </div>
              <div className="text-field-wrapper">
                <TextField
                  label="Phone Number"
                  name="phoneNumber"
                  id="phoneNumber"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.phoneNumber}
                  fullWidth
                  error={!!errors.phoneNumber}
                  helperText={errors.phoneNumber}
                />
              </div>
         
            </div>
            <div className="register-inputs-right">
            <div className="text-field-wrapper">
                <FormControl fullWidth variant="outlined" error={!!errors.Gender}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    name="Gender"
                    id="gender"
                    value={ClientData.Gender}
                    onChange={handleChange}
                    label="Gender"
                  >
                    <MenuItem value="">
                      <em>None</em>
                    </MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Other">Other</MenuItem>
                  </Select>
                  {errors.Gender && <p style={{ color: "red", fontSize: "0.75rem", margin: "3px 0 0 14px" }}>{errors.Gender}</p>}
                </FormControl>
              </div>
              <div className="text-field-wrapper">
                <TextField
                  label="Age"
                  name="Age"
                  id="age"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.Age}
                  fullWidth
                  error={!!errors.Age}
                  helperText={errors.Age}
                />
              </div>
              <div className="text-field-wrapper">
                <TextField
                  label="Address"
                  name="Address"
                  id="address"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.Address}
                  fullWidth
                  error={!!errors.Address}
                  helperText={errors.Address}
                />
              </div>
              <div className="text-field-wrapper">
                <TextField
                  label="Contact Info"
                  name="ContactInfo"
                  id="contactInfo"
                  variant="outlined"
                  onChange={handleChange}
                  value={ClientData.ContactInfo}
                  fullWidth
                  error={!!errors.ContactInfo}
                  helperText={errors.ContactInfo}
                />
              </div>
            </div>
          </form>
        </ThemeProvider>
      </div>
            <div className="button-container">
              <button type="submit" className="button-submit" onClick={handleSubmit}>
                Sign-Up as a Customer
              </button>
            </div>
    </div>
  );
}

import React, { useState, useEffect } from "react";
import { faBagShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  TextField,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

export default function FCClientForm() {
  const navigate = useNavigate();

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

  const [ClientData, setClientData] = useState({
    ContactInfo: "",
    Username: "",
    Password: "",
    Address: "",
    Gender: "",
    Age: "",
    Email: "",
    phoneNumber: "",
    CustomerName: "",
  });

  const [errors, setErrors] = useState({});

  const [years, setYears] = useState([]);

  useEffect(() => {
    setYears(getYears());
  }, []);

  const validate = () => {
    let tempErrors = {};
    tempErrors.ContactInfo = ClientData.ContactInfo
      ? ""
      : "Contact Info is required.";
    tempErrors.Username = ClientData.Username ? "" : "Username is required.";
    tempErrors.Password = ClientData.Password ? "" : "Password is required.";
    tempErrors.Address = ClientData.Address ? "" : "Address is required.";
    tempErrors.Gender = ClientData.Gender ? "" : "Gender is required.";
    tempErrors.Age = ClientData.Age >= 16 ? "" : "Age is required.";
    tempErrors.CustomerName = ClientData.CustomerName
      ? ""
      : "Customer Name is required.";
    tempErrors.Email = ClientData.Email ? "" : "Email is required.";
    tempErrors.phoneNumber = ClientData.phoneNumber
      ? ""
      : "Phone Number is required.";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const apiURLAdd = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Register/registerClient";
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
          console.log(ClientData);
          return res.json();
        })
        .then(
          (result) => {
            console.log("Added Successfully!", result);
            console.log("Navigating to main page...");
            navigate("/"); 
          },
          (error) => {
            console.error("Error posting data:", error);
          }
        );
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setClientData({ ...ClientData, [name]: value }, console.log(name, value));
  };

  const iconSize = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth >= 1440) {
      return "5x";
    } else if (screenWidth >= 1024) {
      return "3x";
    } else {
      return "2x";
    }
  };

  const getYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 16;
    const endYear = currentYear - 80; 
    const yearArray = [];

    for (let year = startYear; year >= endYear; year--) {
      if (year == currentYear - 50) {
        setYears(yearArray);
        return yearArray;
      }
      yearArray.push(year);
    }
    return yearArray;
  };

  return (
    <div>
      <div className="head-container">
        <FontAwesomeIcon
          size={iconSize()}
          icon={faBagShopping}
          alt="Shopping Bag Icon"
        />
      </div>
      <div className="register-container">
        <CacheProvider value={cacheRtl}>
          <ThemeProvider theme={theme}>
            <form className="inputs-container">
              <div className="register-inputs-right">
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="שם משתמש"
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
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="סיסמה"
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
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="אימייל"
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
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="שם מלא "
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
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="מספר טלפון"
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
              </div>
              <div className="register-inputs-left">
                <div className="text-field-wrapper">
                  <FormControl
                    fullWidth
                    variant="outlined"
                    error={!!errors.Gender}
                  >
                    <InputLabel id="gender-label">מגדר</InputLabel>
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
                      <MenuItem value="נקבה">נקבה</MenuItem>
                      <MenuItem value="זכר">זכר</MenuItem>
                      <MenuItem value="אחר">אחר</MenuItem>
                    </Select>
                    {errors.Gender && (
                      <p
                        style={{
                          color: "red",
                          fontSize: "0.75rem",
                          margin: "3px 0 0 14px",
                        }}
                      >
                        {errors.Gender}
                      </p>
                    )}
                  </FormControl>
                </div>
                <div className="text-field-wrapper">
                  <FormControl
                    variant="outlined"
                    fullWidth
                    error={!!errors.Age}
                  >
                    <InputLabel id="age-label">גיל</InputLabel>
                    <Select
                      labelId="age-label"
                      id="age"
                      name="Age"
                      value={ClientData.Age}
                      onChange={handleChange}
                      label="Age"
                      helpertext={errors.Age}
                    >
                      {years.map((year) => (
                        <MenuItem
                          key={year}
                          value={new Date().getFullYear() - year}
                        >
                          {year}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="כתובת"
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
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="מספר טלפון ליצירת קשר"
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
              </div>
            </form>
          </ThemeProvider>
        </CacheProvider>
      </div>
      <div className="button-container">
        <button type="submit" className="button-submit" onClick={handleSubmit}>
          הרשמה כלקוח
        </button>
      </div>
    </div>
  );
}

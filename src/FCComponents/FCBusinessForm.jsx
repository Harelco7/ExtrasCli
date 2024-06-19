import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Select,
  MenuItem,
  TextField,
  InputLabel,
  FormControl,
  Button,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

import "../Styles/RegisterPage.css";

export default function FCBusinessForm() {
  const navigate = useNavigate();

  const [BusinessData, setBusinessData] = useState({
    BusinessName: "",
    BusinessType: "",
    ContactInfo: "",
    BusinessPhoto: "",
    BusinessLogo: "",
    OpeningHours: "",
    DailySalesHour: "",
    Username: "",
    Password: "",
    Address: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const fetchCoordinates = async () => {
      if (BusinessData.Address.trim() !== "") {
        try {
          console.log(
            "Fetching coordinates for address:",
            BusinessData.Address
          );
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
              BusinessData.Address
            )}&key=AIzaSyCNC4zj7eDw0flA2nEGmtJpezsnYtwBAlw`
          );

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data = await response.json();
          console.log("Geocode API response:", data);

          if (data.status !== "OK") {
            throw new Error(`Error: ${data.status} - ${data.error_message}`);
          }

          if (data.results && data.results.length > 0) {
            const { lat, lng } = data.results[0].geometry.location;
            console.log("Latitude:", lat, "Longitude:", lng);
            setBusinessData((prevData) => ({
              ...prevData,
              latitude: lat,
              longitude: lng,
            }));
          } else {
            throw new Error("No results found");
          }
        } catch (error) {
          console.error("Error fetching coordinates:", error);
        }
      }
    };

    fetchCoordinates();
  }, [BusinessData.Address]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.BusinessName = BusinessData.BusinessName ? "" : "שדה חובה";
    tempErrors.BusinessType = BusinessData.BusinessType ? "" : "שדה חובה";
    tempErrors.ContactInfo = /^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i.test(BusinessData.ContactInfo) ? "" : "דוא\"ל לא תקין";
    tempErrors.OpeningHours = BusinessData.OpeningHours ? "" : "שדה חובה";
    tempErrors.DailySalesHour = BusinessData.DailySalesHour ? "" : "שדה חובה";
    tempErrors.Username = BusinessData.Username ? "" : "שדה חובה";
    tempErrors.Password = BusinessData.Password.length >= 6 ? "" : "סיסמא חייבת להיות לפחות 6 תווים";
    tempErrors.Address = BusinessData.Address ? "" : "שדה חובה";
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === "");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addBusiness();
    }
  };

  const addBusiness = () => {
    const apiURLAddbusiness =
      "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Register/registerBusiness";
    fetch(apiURLAddbusiness, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      },
      body: JSON.stringify(BusinessData),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);
        return res.json();
      })
      .then(
        (result) => {
          console.log("ADD Successfully!", result);
          navigate("/");
        },
        (error) => {
          console.log("err post=", error);
        }
      );
    console.log(BusinessData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBusinessData({ ...BusinessData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setBusinessData({ ...BusinessData, [name]: files[0] });
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

  return (
    <CacheProvider value={cacheRtl}>
      <ThemeProvider theme={theme}>
        <div>
          <div className="head-container">
            <FontAwesomeIcon size={iconSize()} icon={faShop} />
          </div>
          <div className="register-container">
            <form className="inputs-container">
              <div className="register-inputs-right">
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="שם העסק"
                      name="BusinessName"
                      id="businessName"
                      variant="outlined"
                      onChange={handleChange}
                      value={BusinessData.BusinessName}
                      error={!!errors.BusinessName}
                      helperText={errors.BusinessName}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <FormControl variant="outlined" fullWidth error={!!errors.BusinessType}>
                      <InputLabel id="business-type-label">
                        סוג העסק
                      </InputLabel>
                      <Select
                        labelId="business-type-label"
                        id="businessType"
                        name="BusinessType"
                        value={BusinessData.BusinessType}
                        onChange={handleChange}
                        label="Business Type"
                        fullWidth
                      >
                        <MenuItem value="">
                          <em>None</em>
                        </MenuItem>
                        <MenuItem value="Coffee House">בית קפה</MenuItem>
                        <MenuItem value="Restaurant">מסעדה</MenuItem>
                        <MenuItem value="Bakery">מאפייה</MenuItem>
                        <MenuItem value="Flowers">פרחים</MenuItem>
                      </Select>
                      {errors.BusinessType && <div className="error-text">{errors.BusinessType}</div>}
                    </FormControl>
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="פרטי יצירת קשר"
                      name="ContactInfo"
                      id="contactInfo"
                      variant="outlined"
                      onChange={handleChange}
                      value={BusinessData.ContactInfo}
                      error={!!errors.ContactInfo}
                      helperText={errors.ContactInfo}
                      fullWidth
                    />
                  </div>
                </div>

                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <Button
                      style={{
                        backgroundColor: "#ffc107",
                        fontFamily: "Arimo",
                        fontWeight: 500,
                      }}
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      אעלה תמונת רקע של העסק 
                      <input
                        type="file"
                        name="BusinessPhoto"
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <Button
                      style={{
                        backgroundColor: "#ffc107",
                        fontFamily: "Arimo",
                        fontWeight: 500,
                      }}
                      component="label"
                      variant="contained"
                      startIcon={<CloudUploadIcon />}
                      fullWidth
                    >
                      אעלה לוגו של העסק
                      <input
                        type="file"
                        name="BusinessLogo"
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>
                  </div>
                </div>
              </div>
              <div className="register-inputs-left">
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="שעות פתיחה"
                      name="OpeningHours"
                      id="openingHours"
                      variant="outlined"
                      onChange={handleChange}
                      value={BusinessData.OpeningHours}
                      error={!!errors.OpeningHours}
                      helperText={errors.OpeningHours}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="שעות איסוף יומית "
                      name="DailySalesHour"
                      id="dailySalesHour"
                      variant="outlined"
                      onChange={handleChange}
                      value={BusinessData.DailySalesHour}
                      error={!!errors.DailySalesHour}
                      helperText={errors.DailySalesHour}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="שם משתמש"
                      name="Username"
                      id="username"
                      variant="outlined"
                      onChange={handleChange}
                      value={BusinessData.Username}
                      error={!!errors.Username}
                      helperText={errors.Username}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="סיסמא"
                      name="Password"
                      id="password"
                      type="password"
                      variant="outlined"
                      onChange={handleChange}
                      value={BusinessData.Password}
                      error={!!errors.Password}
                      helperText={errors.Password}
                      fullWidth
                    />
                  </div>
                </div>
                <div className="text-field-wrapper">
                  <div dir="rtl">
                    <TextField
                      label="כתובת"
                      name="Address"
                      id="address"
                      variant="outlined"
                      onChange={handleChange}
                      value={BusinessData.Address}
                      error={!!errors.Address}
                      helperText={errors.Address}
                      fullWidth
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div className="button-container">
            <button type="submit" className="button-submit" onClick={handleSubmit}>
              הרשמה כבית עסק
            </button>
          </div>
        </div>
      </ThemeProvider>
    </CacheProvider>
  );
}

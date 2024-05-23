import React, { useState, useEffect } from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Select, MenuItem, TextField, InputLabel,FormControl ,Button} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { faShop } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    addBusiness();
  };

  const addBusiness = () => {
    // Your fetch function to add business
    const apiURLAddbusiness =
      "http://localhost:5048/api/Register/registerBusiness";
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
          navigate("/")
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
    direction: 'rtl',
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
          data-off="Customer"
          data-on="Business"
          for="color_mode"
        ></label>
      </label>
    </div>
  );

  return (
    <div>
      <div className="head-container">
        <FontAwesomeIcon size="5x" icon={faShop} />
      </div>
      <div className="register-container">
        <form className="inputs-container">
          <div className="register-inputs-left">
            <div className="text-field-wrapper">
              <ThemeProvider theme={theme}>
                <TextField
                  label="Business Name"
                  name="BusinessName"
                  id="businessName"
                  variant="outlined"
                  onChange={handleChange}
                  value={BusinessData.BusinessName}
                  fullWidth
                />
              </ThemeProvider>
            </div>
            <div className="text-field-wrapper">
            <ThemeProvider theme={theme} >
                <FormControl variant="outlined" fullWidth >
                  <InputLabel id="business-type-label">Business Type</InputLabel>
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
                    <MenuItem value="Coffee House">Coffee House</MenuItem>
                    <MenuItem value="Restaurant">Restaurant</MenuItem>
                    <MenuItem value="Bakery">Bakery</MenuItem>
                    <MenuItem value="Flowers">Flowers</MenuItem>
                  </Select>
                </FormControl>
              </ThemeProvider>
            </div>
            <div className="text-field-wrapper">
              <ThemeProvider theme={theme}>
                <TextField
                  label="Contact Info"
                  name="ContactInfo"
                  id="contactInfo"
                  variant="outlined"
                  onChange={handleChange}
                  value={BusinessData.ContactInfo}
                  fullWidth
                  
                />
              </ThemeProvider>
            </div>

            <div className="text-field-wrapper">
            <Button style={{backgroundColor:"#ffc107",fontFamily:"Manrope",fontWeight:700}}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Upload Business Photo
                    <input
                      type="file"
                      name="BusinessPhoto"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
            </div>
            <div className="text-field-wrapper">
            <Button style={{backgroundColor:"#ffc107",fontFamily:"Manrope",fontWeight:700}}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    fullWidth
                  >
                    Upload Business Logo
                    <input
                      type="file"
                      name="BusinessLogo"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
            </div>
          </div>
          <div className="register-inputs-right">
            <div className="text-field-wrapper">
              <ThemeProvider theme={theme}>
                <TextField 
                  label="Opening Hours"
                  name="OpeningHours"
                  id="openingHours"
                  variant="outlined"
                  onChange={handleChange}
                  value={BusinessData.OpeningHours}
                  fullWidth
                />
              </ThemeProvider>
            </div>
            <div className="text-field-wrapper">
              <ThemeProvider theme={theme}>
                <TextField
                  label="Daily Sales Hour"
                  name="DailySalesHour"
                  id="dailySalesHour"
                  variant="outlined"
                  onChange={handleChange}
                  value={BusinessData.DailySalesHour}
                  fullWidth
                />
              </ThemeProvider>
            </div>
            <div className="text-field-wrapper">
              <ThemeProvider theme={theme}>
                <TextField
                  label="Username"
                  name="Username"
                  id="username"
                  variant="outlined"
                  onChange={handleChange}
                  value={BusinessData.Username}
                  fullWidth
                />
              </ThemeProvider>
            </div>
            <div className="text-field-wrapper">
              <ThemeProvider theme={theme}>
                <TextField
                  label="Password"
                  name="Password"
                  id="password"
                  type="password"
                  variant="outlined"
                  onChange={handleChange}
                  value={BusinessData.Password}
                  fullWidth
                />
              </ThemeProvider>
            </div>
            <div className="text-field-wrapper">
              <ThemeProvider theme={theme}>
                <TextField
                  label="Address"
                  name="Address"
                  id="address"
                  variant="outlined"
                  onChange={handleChange}
                  value={BusinessData.Address}
                  fullWidth
                />
              </ThemeProvider>
            </div>
          </div>
        </form>
      </div>
      <div className="button-container">
        <button type="submit" className="button-submit" onClick={handleSubmit}>
          Sign-Up as a Business
        </button>
      </div>
    </div>
  );
}

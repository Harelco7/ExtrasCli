import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from "@mui/material";
import { useBusinessData } from "../assets/Context/BusinessDataContext.jsx";
import logo from "../..//public/Images/logo.png";
import "../Styles/Navbar.css";
import FCUserDrillDown from "./FCUserDrillDown.jsx";

const FCNavbar = () => {
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();
  const { businessData, errorMessage } = useBusinessData();

  const handleSearchSelection = (event, newValue) => {
    setSearchInput(newValue);
    if (newValue) {
      // Assuming you have some way to find the id or unique identifier for the selected business
      const selectedBusiness = businessData.find(
        (business) => business.businessName === newValue
      );
      if (selectedBusiness) {
        // Assuming 'businessId' is the key to navigate to the BusinessPage
        navigate(`/businessPage/${selectedBusiness.businessID}`);
      }
    }
  };
  return (
    <nav className="navbar">
      <div
        className="logo"
        style={{
          backgroundImage: `url(https://proj.ruppin.ac.il/bgroup33/test2/dist/Images/logo.png)`,
        }}
        onClick={() => navigate("/MainPage")}
      ></div>
      <div className="search-container">
        <Autocomplete
          freeSolo
          fullWidth
          id="search-businesses"
          disableClearable
          options={businessData.map((option) => option.businessName)}
          value={searchInput}
          onChange={handleSearchSelection}
          onInputChange={(event, newInputValue) => {
            setSearchInput(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search in Extra's"
              variant="standard"
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,
                type: "search",
              }}
            />
          )}
        />
      </div>
      <FCUserDrillDown className="user-button" />
    </nav>
  );
};

export default FCNavbar;

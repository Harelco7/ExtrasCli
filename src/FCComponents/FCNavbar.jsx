import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { Autocomplete, TextField } from '@mui/material';
import { useBusinessData } from "../assets/Context/BusinessDataContext.jsx";

import "../Styles/Navbar.css";
import FCUserDrillDown from "./FCUserDrillDown.jsx";

const FCNavbar = () => {
  const [searchInput, setSearchInput] = useState('');
  const navigate = useNavigate();
  const { businessData, errorMessage } = useBusinessData();

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/MainPage")}></div>
      <div className="search-container">
        {/* <div className="searchIcon-wrapper">
        <FontAwesomeIcon icon={faSearch} size="xs" className="search-icon" />
        </div> */}
        <Autocomplete
          freeSolo
          fullWidth
          id="search-businesses"
          disableClearable
          options={businessData.map((option) => option.businessName)}
          value={searchInput}
          onChange={(event, newValue) => {
            setSearchInput(newValue);
          }}
          onInputChange={(event, newInputValue) => {
            setSearchInput(newInputValue);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Search in Extra's"
              variant="standard"  // Changed from 'outlined' to 'standard'
              InputProps={{
                ...params.InputProps,
                disableUnderline: true,  // This removes the underline
                type: 'search',
                
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

import React from 'react'
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot,faBars } from "@fortawesome/free-solid-svg-icons";
import "..//Styles/ToggleViewMode.css"
import { useState } from "react";

export default function ToggleViewMode() {
    const [alignment, setAlignment] = useState('list');

    const handleChange = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
      }
    };
  
    return (
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="Platform"
      >
        <ToggleButton value="list">
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
            color={alignment === 'list' ? '#d67d00' : '#a2a2a2'}
            
          />
        </ToggleButton>
        <ToggleButton value="map">
          <FontAwesomeIcon
            icon={faMapLocationDot}
            size="2x"
            color={alignment === 'map' ? '#d67d00' : '#a2a2a2'}
          />
        </ToggleButton>
      </ToggleButtonGroup>
    );
}

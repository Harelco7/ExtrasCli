import React, { useState } from 'react';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot, faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "../Styles/ToggleViewMode.css";
import NotificationBox from './NotificationBox';

export default function ToggleViewMode(props) {
  const { userData } = props;
  const [alignment, setAlignment] = useState('list');
  const navigate = useNavigate();

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);

      // Navigating based on the new alignment value
      if (newAlignment === 'list') {
        navigate("/");
      } else if (newAlignment === 'map') {
        navigate("/MapPage");
      }
      
      // Ensure the window scrolls to the top after navigation
      window.scrollTo(0, 0); 
    }
  };

  return (
    <>
        <NotificationBox userId={userData ? userData.customerID : null} />
      <ToggleButtonGroup
        color="primary"
        value={alignment}
        exclusive
        onChange={handleChange}
        aria-label="View mode toggle"
      >
        <ToggleButton 
          value="list" 
          style={{ color: alignment === 'list' ? '#d67d00' : '#a2a2a2' }}
        >
          <FontAwesomeIcon
            icon={faBars}
            size="2x"
          />
        </ToggleButton>
        <ToggleButton 
          value="map" 
          style={{ color: alignment === 'map' ? '#d67d00' : '#a2a2a2' }}
        >
          <FontAwesomeIcon
            icon={faMapLocationDot}
            size="2x"
          />
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
}

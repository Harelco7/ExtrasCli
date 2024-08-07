import React, { useState, useEffect } from 'react';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocationDot,faBars } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import "..//Styles/ToggleViewMode.css";
import NotificationBox from './NotificationBox';
import { produrl } from '../Settings';


export default function ToggleViewMode(props) {
    const{userData} = props;
    const [alignment, setAlignment] = useState('list');
    const navigate = useNavigate();

    const handleChange = (event, newAlignment) => {
      if (newAlignment !== null) {
        setAlignment(newAlignment);
        if (newAlignment === 'list') {
          navigate("/");
        } else if (newAlignment === 'map') {
          navigate("/MapPage");
        }
        window.scrollTo(0, 0); 
      }
    };
  
    

    return (<>
    <NotificationBox userId= {userData?userData.customerID:null} />
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
      </>
    );
  };

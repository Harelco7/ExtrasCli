import React, { useState, useEffect } from "react";
import ShowMap from "../../FCComponents/FCMap";
import ToggleViewMode from "../../FCComponents/ToggleViewMode";
import FCMap from "../../FCComponents/FCMap";
import { BusinessDataProvider } from "../Context/BusinessDataContext.jsx";
import Slider from "@mui/material/Slider";
import Box from '@mui/material/Box';

const MapsPage = () => {
  const [radius, setRadius] = useState(); // Set initial radius

  const handleSliderChange = (event, newValue) => {
    console.log(radius);
    setRadius(newValue); // Update the radius state immediately
  };

  return (
    <>
      <div>
        <div className="view-options-container">
          <ToggleViewMode />
        </div>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexDirection:"column",padding:10}}>
          <p>סנן לפי מרחק ממך</p>
          <Box sx={{ width: 300 }}>
            <Slider
              value={radius}
              aria-label="Default"
              valueLabelDisplay="auto"
              defaultValue={50}
              min={10}
              max={50}
              onChange={handleSliderChange} // Attach the change handler
            />
          </Box>
        </div>

        <BusinessDataProvider>
          <FCMap radius={radius} /> {/* Pass the radius as a prop */}
        </BusinessDataProvider>
      </div>
    </>
  );
};

export default MapsPage;

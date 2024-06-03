import React, { useState } from "react";
import ShowMap from "../../FCComponents/FCMap";
import ToggleViewMode from "../../FCComponents/ToggleViewMode";
import FCMap from "../../FCComponents/FCMap";
import { BusinessDataProvider } from "..//Context/BusinessDataContext.jsx";

const MapsPage = () => {
  return (
    <>
      <div>
        <div className="view-options-container">
          <ToggleViewMode />
        </div>

        <BusinessDataProvider>
          <FCMap />
        </BusinessDataProvider>
      </div>
    </>
  );
};

export default MapsPage;

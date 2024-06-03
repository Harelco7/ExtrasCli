import React, { useState } from "react";
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from "@react-google-maps/api";
import { GrLocation } from "react-icons/gr";
import { GoMoveToStart } from "react-icons/go";
import { useNavigate } from "react-router-dom";

import { useBusinessData } from "..//assets/Context/BusinessDataContext.jsx";


const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 32.0853,
  lng: 34.7818,
};

function FCMap() {
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNC4zj7eDw0flA2nEGmtJpezsnYtwBAlw", 
  });

  const { businessData } = useBusinessData();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  console.log(businessData)

  const handleMarkerClick = (business) => {
    setSelectedBusiness(business);
  };

  const handleButtonClick = (business) => {
    navigate("/BusinessPage", { state: { ...business } });
    window.scrollTo(0, 0); 
  };

  return isLoaded ? (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={13}
      options={{
        streetViewControl: false,
        mapTypeControl: false,
      }}
    >
      {businessData.map((business, index) => (
        <MarkerF
          key={index}
          position={{ lat: business.latitude, lng: business.longitude }}
          onClick={() => handleMarkerClick(business)}
          animation={window.google.maps.Animation.DROP} 
        />
      ))}
     
      {selectedBusiness && (
        <InfoWindowF
          position={{ lat: selectedBusiness.latitude, lng: selectedBusiness.longitude }}
          onCloseClick={() => setSelectedBusiness(null)} 
        >
          <div style={{ display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <img style={{ width: "100%", height: 100 }} src="/src/Images/breads.jpeg" alt="Bakery Image" />
            <p style={{ fontSize: 25, marginRight: 10,fontWeight:500 }}>{selectedBusiness.businessName}</p>
            <p style={{ fontSize: 15 ,fontWeight:500}}><GrLocation size={25} /> {selectedBusiness.businessAdress}</p>
            <button 
              style={{padding:10, fontSize: 25, textAlign: "center" ,borderRadius:10,border:"none",backgroundColor:"#113946",color:"white"}}
              onClick={() => handleButtonClick(selectedBusiness)}
            >
              מעבר לחנות <GoMoveToStart style={{marginRight:10}} />
            </button>
          </div>
        </InfoWindowF>
      )}
    </GoogleMap>
  ) : (
    <></>
  );
}

export default FCMap;

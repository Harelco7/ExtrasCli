import React, { useState, useEffect } from "react";
import {
  GoogleMap,
  useJsApiLoader,
  MarkerF,
  InfoWindowF,
} from "@react-google-maps/api";
import { GrLocation } from "react-icons/gr";
import { GoMoveToStart } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import { useBusinessData } from "../assets/Context/BusinessDataContext.jsx";
import { IoNavigateCircleOutline } from "react-icons/io5";



const containerStyle = {
  width: "100%",
  height: "100vh",
};

const center = {
  lat: 32.0853,
  lng: 34.7818,
};

function FCMap({ radius }) {
  const navigate = useNavigate();
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCNC4zj7eDw0flA2nEGmtJpezsnYtwBAlw",
  });

  const { businessData } = useBusinessData();
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [filteredBusinesses, setFilteredBusinesses] = useState(businessData); // Initialize with all businesses

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLoc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(userLoc);
      },
      (error) => {
        console.error("Error getting user location:", error);
      }
    );
  }, []);

  useEffect(() => {
    console.log(radius);
    if (userLocation && radius) {
      const filtered = businessData.filter((business) => {
        const distance = calculateDistance(userLocation, {
          lat: business.latitude,
          lng: business.longitude,
        });
        return distance <= radius;
      });
      setFilteredBusinesses(filtered);
    } else {
      setFilteredBusinesses(businessData); // Show all businesses if no filtering
    }
  }, [radius, userLocation, businessData]);

  const calculateDistance = (loc1, loc2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = toRad(loc2.lat - loc1.lat);
    const dLng = toRad(loc2.lng - loc1.lng);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(loc1.lat)) *
        Math.cos(toRad(loc2.lat)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const toRad = (Value) => {
    return (Value * Math.PI) / 180;
  };

  const handleMarkerClick = (business) => {
    setSelectedBusiness(business);
  };

  const handleButtonClick = (business) => {
    navigate("/BusinessPage", { state: { ...business } });
    window.scrollTo(0, 0);
  };
  const navigateToBusiness = (business) => {
    const origin = `${userLocation.lat},${userLocation.lng}`;
    const destination = `${business.latitude},${business.longitude}`;
    const navigateUrl = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}&travelmode=driving`;
    window.open(navigateUrl, "_blank");
  };

  return isLoaded ? (
    <div className="allInfo" style={{ position: "relative" }}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation || center}
        zoom={13}
        options={{
          streetViewControl: false,
          mapTypeControl: false,
        }}
      >
        {filteredBusinesses.map((business, index) => (
          <MarkerF
            key={index}
            position={{ lat: business.latitude, lng: business.longitude }}
            onClick={() => handleMarkerClick(business)}
            animation={window.google.maps.Animation.DROP}
          />
        ))}
        {userLocation && (
          <MarkerF
            position={userLocation}
            icon={{
              url: "http://maps.google.com/mapfiles/ms/icons/blue-dot.png",
            }}
          />
        )}
        {selectedBusiness && (
          <InfoWindowF
            position={{
              lat: selectedBusiness.latitude,
              lng: selectedBusiness.longitude,
            }}
            onCloseClick={() => setSelectedBusiness(null)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
              }}
            >
              <img
                style={{ width: "100%", height: 100, borderRadius: 10 }}
                src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessImage/${selectedBusiness.businessPhoto}`}
                alt="Business Image"
              />
              <p style={{ fontSize: 25, textAlign:"center", fontWeight: 500 }}>
                {selectedBusiness.businessName}
              </p>
              <p style={{ fontSize: 15, fontWeight: 500 ,textAlign:"center"}}>
                <GrLocation size={25} /> {selectedBusiness.businessAdress}
              </p>
              <button
                style={{
                  padding: 10,
                  fontSize: 25,
                  textAlign: "center",
                  borderRadius: 10,
                  border: "none",
                  backgroundColor: "#113946",
                  color: "white",
                }}
                onClick={() => handleButtonClick(selectedBusiness)}
              >
                מעבר לחנות <GoMoveToStart style={{ marginRight: 10}} />
              </button>
              <div style={{display:"flex",justifyContent:"center"}}>
              <button
                style={{
                  padding: 10,
                  marginTop: 10,
                  fontSize: 25,
                  width:"100%",
                  borderRadius: "16px",
                 textAlign:"center",
                  border: "none",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
                onClick={() => navigateToBusiness(selectedBusiness)}
              >
              נווט<IoNavigateCircleOutline size={"34"} style={{ marginRight: 5 }}  />

              </button>
              </div>
            </div>
          </InfoWindowF>
        )}
        כ
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
}

export default FCMap;

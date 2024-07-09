import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faClock } from "@fortawesome/free-solid-svg-icons";
import "../Styles/BusinessCard.css";
import { useNavigate } from "react-router-dom";

export default function FCBusinessCard({ data }) {
  const navigate = useNavigate();
  const[Pic,setPic]=useState()
  
   const handleOrderNow = () => {
    navigate(`/BusinessPage/${data.businessID}`);
    console.log(data);
    window.scrollTo(0, 0); 
  };

 
  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessImage/${data.businessPhoto}`} alt="Bakery Image" />
          <img
            className="circular-logo"
            src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessLogo/${data.businessLogo}`}
            alt="Bakery Image"
          />
        </div>
        <div className="card-content">
          <h2>{data.businessName}</h2>
          <p>
            <FontAwesomeIcon icon={faLocationDot} size="lg" style={{marginLeft:10}}  />
            
            {data.businessAdress}
          </p>
          <p>
          <FontAwesomeIcon icon={faClock} size="lg" style={{marginLeft:10}}  />
            {data.openingHours}</p>
          <button onClick={handleOrderNow}>צפייה במארזים </button>
        </div>
      </div>
    </>
  );
}

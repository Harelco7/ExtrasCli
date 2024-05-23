import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "../Styles/BusinessCard.css";
import { useNavigate } from "react-router-dom";

export default function FCBusinessCard({ data }) {
  const navigate = useNavigate();
  
   const handleOrderNow = () => {
    navigate("/BusinessPage", { state: { ...data } });
    window.scrollTo(0, 0); 
  };

  return (
    <>
      <div className="card">
        <div className="card-image">
          <img src="/src/Images/breads.jpeg" alt="Bakery Image" />
          <img
            className="circular-logo"
            src="/src/Images/BigaLogo.png"
            alt="Bakery Image"
          />
        </div>
        <div className="card-content">
          <h2>{data.businessName}</h2>
          <p>
            <FontAwesomeIcon icon={faLocationDot} />
            {data.businessAdress}
          </p>
          <p>{data.openingHours}</p>
          <button onClick={handleOrderNow}>Order Now</button>
        </div>
      </div>
    </>
  );
}

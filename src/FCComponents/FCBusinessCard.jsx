import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import "../Styles/BusinessCard.css";

export default function FCBusinessCard({name,address,hours}) {
  return (
    <>
      <div className="card">
        <div className="card-image">
        <img src="/src/Images/breads.jpeg" alt="Bakery Image" />
        <img className="circular-logo" src="/src/Images/BigaLogo.png" alt="Bakery Image" />
        </div>
        <div className="card-content">
          <h2>{name}</h2>
          <p>
            <FontAwesomeIcon icon={faLocationDot} />
            {address}
          </p>
          <p>{hours}</p>
          <button>Order Now</button>
        </div>
      </div>
    </>
  );
}

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot,faClock } from "@fortawesome/free-solid-svg-icons";
import { faStar as regularStar } from "@fortawesome/free-regular-svg-icons";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import "../Styles/BusinessCard.css";
import { useNavigate } from "react-router-dom";
import { getFavorites, islocal, localurl, produrl } from "..//Settings";

export default function FCBusinessCard({ data , userData, Favorite, callBack }) {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(Favorite);
  const[Pic,setPic]=useState()
  
   const handleOrderNow = () => {
    navigate(`/BusinessPage/${data.businessID}`);
    console.log(data);
    window.scrollTo(0, 0); 
  };
  const toggleFavorite = () => {
    console.log(isFavorite);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    const raw = JSON.stringify({
      "BusinessID": data.businessID ? data.businessID : data.businessId, // Match C# case
      "CustomerId": userData.customerID,
      "IsFavorite": !isFavorite ? "yes" : "no"
    });
    

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };
    console.log(raw);
    

    fetch(`https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/User/updateFavorite`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setIsFavorite(!isFavorite);
        if (callBack) {
          callBack(data.businessID?data.businessID:data.businessId)
        }
      })
      .catch((error) => console.error(error));
    
  };

  console.log("now image",data);
  
 
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
            <FontAwesomeIcon icon={faLocationDot} size="lg" style={{ marginLeft: 10 }} />
            {data.businessAdress?data.businessAdress:data.address}
          </p>
          <p>
            <FontAwesomeIcon icon={faClock} size="lg" style={{ marginLeft: 10 }} />
            {data.dailySalesHour}</p>
          <button onClick={handleOrderNow}>צפייה במארזים </button>
          <FontAwesomeIcon
            icon={isFavorite ? solidStar : regularStar}
            className="favorite-icon"
            onClick={toggleFavorite}
            title="הוספה למועדפים"
          />
        </div>
      </div>
    </>
  );
}

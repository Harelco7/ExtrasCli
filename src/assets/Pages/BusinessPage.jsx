import React from "react";
import { useLocation } from "react-router-dom";
import "..//..//Styles/BusinessPage.css";
import FCNavbar from "..//..//FCComponents/FCNavbar";

export default function BusinessPage() {
  const location = useLocation();
  const {
    businessName,
    businessType,
    businessAdress,
    dailySalesHour,
    businessID,
  } = location.state;

  //קריאה לדאטה בייס עם שדה איידי בית עסק

  return (
    <>
  
      <div className="business-page-container">
        <div className="img-container">
          <h1>{businessName} | {businessAdress}</h1>
          <p>Daily Sales Hours : {dailySalesHour}</p>
          <img className="Business-logo" src="/src/Images/MafiyaLogo.png" alt="Business Logo" />
        </div>
        <div className="box-container">
          <div className="box-headline">
          <h1>Our Packages</h1>
          </div>
        </div>
      </div>
    </>
  );
}

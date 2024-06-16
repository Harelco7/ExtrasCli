import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TbShoppingBagX } from "react-icons/tb";
import "../../Styles/BusinessPage.css";
import FCBoxCarousel from "../../FCComponents/FCBoxCarousel";
import FCBoxCard from "../../FCComponents/FCBoxCard";

export default function BusinessPage() {
  const location = useLocation();
  const {
    businessName,
    businessType,
    businessAdress,
    dailySalesHour,
    businessID,
  } = location.state;

  const [boxes, setBoxes] = useState([]);

  const BoxUrl =
    "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/ShowBusiness/" +
    businessID;
  const fetchBoxes = async () => {
    try {
      const response = await fetch(BoxUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        throw new Error("Something Went Wrong :(");
      }
      const boxes = await response.json();
      console.log(BoxUrl);
      console.log(boxes);
      setBoxes(boxes);
    } catch {
      console.log("Something went wrong!");
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  const OutofStockElement = (
    <div className="OOS-container">
      <p style={{ fontSize: 70, color: "red" }}>
        <TbShoppingBagX /> אין מארזים במלאי
      </p>
    </div>
  );

  return (
    <>
      <div className="business-page-container">
        <div className="img-container">
          <h1>
            {businessName} | {businessAdress}
          </h1>
          <p>שעות איסוף : {dailySalesHour}</p>
          <img
            className="Business-logo"
            src="/src/Images/MafiyaLogo.png"
            alt="Business Logo"
          />
        </div>
        <div
          className={
            boxes.length === 0 ? "box-container-centered" : "box-container"
          }
        >
          {boxes.length === 0 ? (
            OutofStockElement
          ) : (
            <>
              <div className="box-title">
                <h1>המארזים שלנו :</h1>
              </div>
              <div className="grid-container">
                {boxes.map((box, index) => (
                  <div key={index} className="grid-item">
                    <FCBoxCard box={box} />
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// {boxes.length !== 0 && <FCBoxCarousel boxes={boxes} />}

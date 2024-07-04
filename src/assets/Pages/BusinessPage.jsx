import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TbShoppingBagX } from "react-icons/tb";
import "../../Styles/BusinessPage.css";
import FCBoxCard from "../../FCComponents/FCBoxCard";

const commonAllergies = ["Nuts", "Fish", "Gluten", "Dairy", "Eggs", "Soy"];

export default function BusinessPage({ onBusinessIDChange }) {
  const location = useLocation();
  const {
    businessName,
    businessAdress,
    dailySalesHour,
    businessID,
    businessPhoto,
    businessLogo,
  } = location.state;

  const [boxes, setBoxes] = useState([]);
  const [filters, setFilters] = useState(
    commonAllergies.reduce((filterObject, allergy) => {
      filterObject[allergy] = false;
      return filterObject;
    }, {})
  );

  const updateBusinessID = () => {
    if (location.state && location.state.businessID) {
      onBusinessIDChange(location.state.businessID);
    }
  };

  useEffect(() => {
    updateBusinessID();
  }, [location]);

  const fetchBoxes = async () => {
    const BoxUrl = `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/ShowBusiness/${businessID}`;
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
      setBoxes(boxes);
    } catch (error) {
      console.error("Fetch failed:", error);
    }
  };

  useEffect(() => {
    fetchBoxes();
  }, []);

  const handleFilterChange = (e) => {
    const { name, checked } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: checked,
    }));
  };

  const filteredBoxes = boxes.filter((box) => {
    return (
      commonAllergies.every(
        (allergy) =>
          !(
            filters[allergy] &&
            box.alergicType &&
            box.alergicType.includes(allergy)
          )
      ) && box.quantityAvailable > 0
    );
  });

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
        <div className="img-container"
          style={{
            backgroundImage: `url('https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessImage/${businessPhoto}')`,
          }}
        >
          <h1>
            {businessName} | {businessAdress}
          </h1>
          <p>שעות איסוף : {dailySalesHour}</p>
          <img
            className="Business-logo"
            src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessLogo/${businessLogo}`}
            alt="Business Logo"
          />
        </div>
        <div className="filter-container">
          <h3>סנן על פי אלרגיות:</h3>
          {commonAllergies.map((allergy) => (
            <label key={allergy}>
              <input
                type="checkbox"
                name={allergy}
                checked={filters[allergy]}
                onChange={handleFilterChange}
              />
              {allergy}
            </label>
          ))}
        </div>
        <div
          className={
            filteredBoxes.length === 0
              ? "box-container-centered"
              : "box-container"
          }
        >
          {filteredBoxes.length === 0 ? (
            OutofStockElement
          ) : (
            <>
              <div className="box-title">
                <h1>המארזים שלנו :</h1>
              </div>
              <div className="grid-container">
                {filteredBoxes.map((box, index) => (
                  <div key={index} className="grid-item">
                    <FCBoxCard box={box} businessID={businessID} />
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

import React, { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { TbShoppingBagX } from "react-icons/tb";
import Button from "@mui/material/Button";
import "../../Styles/BusinessPage.css";
import FCBoxCard from "../../FCComponents/FCBoxCard";
import Fab from "@mui/material/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faWheatAwn,
  faCheese,
  faDrumstickBite,
  faCarrot,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { WhatsappShareButton } from 'react-share';
import { SiWhatsapp } from "react-icons/si";

const allergyIcons = {
  אגוזים: faStar,
  גלוטן: faWheatAwn,
  חלבי: faCheese,
  בשרי: faDrumstickBite,
  צמחוני: faCarrot,
  טבעוני: faSeedling,
};

const commonAllergies = ["אגוזים", "גלוטן", "חלבי", "בשרי", "צמחוני", "טבעוני"];

export default function BusinessPage({ onBusinessIDChange }) {
  const { businessId } = useParams();
  const location = useLocation();
  const [businessDetails, setBusinessDetails] = useState({});
  const [boxes, setBoxes] = useState([]);
  const [filters, setFilters] = useState(
    commonAllergies.reduce((filterObject, allergy) => {
      filterObject[allergy] = false;
      return filterObject;
    }, {})
  );

  useEffect(() => {
    onBusinessIDChange(businessId);
  }, [businessId, onBusinessIDChange]);

  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(
          `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/GetBusiness/${businessId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch business details");
        }
        const businessDetails = await response.json();
        setBusinessDetails(businessDetails);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    if (businessId) {
      fetchBusinessDetails();
    }
  }, [businessId]);

  useEffect(() => {
    const fetchBoxes = async () => {
      const BoxUrl = `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/ShowBoxes/${businessId}`;
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

    fetchBoxes();
  }, [businessId]);

  const handleFilterChange = (allergy) => {
    setFilters({
      ...filters,
      [allergy]: !filters[allergy],
    });
  };

  const filteredBoxes = boxes.filter(
    (box) =>
      commonAllergies.every(
        (allergy) =>
          !(
            filters[allergy] &&
            box.alergicType &&
            box.alergicType.includes(allergy)
          )
      ) && box.quantityAvailable > 0
  );

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
        <div
          className="img-container"
          style={{
            backgroundImage: `url('https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessImage/${businessDetails.businessPhoto}')`,
          }}
        >
          <h1>
            {businessDetails.businessName} | {businessDetails.businessAdress}
          </h1>
          <p>שעות איסוף : {businessDetails.dailySalesHour}</p>
          <img
            className="Business-logo"
            src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessLogo/${businessDetails.businesslogo}`}
            alt="Business Logo"
          />
        </div>
        <div style={{ position: "fixed", bottom: "90px", right: "6px", zIndex: 1201 }}>
          <WhatsappShareButton
            url={`https://proj.ruppin.ac.il/bgroup33/test2/dist/index.html#/BusinessPage/${businessId}`}
            title={`Check out ${businessDetails.businessName} on our website!`}
            separator=":: "
          >
            <Fab  style={{backgroundColor:"#25D366",width:"60px",height:"60px",color:"white",}}  aria-label="whatsapp">
              <SiWhatsapp size={32} />
            </Fab>
          </WhatsappShareButton>
        </div>
        <div className="business-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit, qui.
          Reiciendis dolores explicabo, at cumque nisi, nobis dolore aperiam
          impedit veniam, aliquam voluptatum ad. Fugit quas sapiente eaque
          distinctio id? Lorem ipsum dolor sit amet, consectetur adipisicing
          elit. Magni consequatur autem exercitationem possimus impedit quis
          sequi a, libero perspiciatis id velit eius culpa quia nostrum optio
          voluptas aut laudantium? Nulla!
        </div>
        <div className="allergics-container">
          <div className="allergic-title">
            <h3>סנן על פי אלרגיות:</h3>
          </div>
          <div className="allergic-buttons">
            {commonAllergies.map((allergy) => (
              <Button
                key={allergy}
                title={allergy}
                onClick={() => handleFilterChange(allergy)}
                style={{
                  margin: "5px",
                  backgroundColor: filters[allergy] ? "#4caf50" : "white",
                  color: filters[allergy] ? "white" : "black",
                  border: "1px solid black",
                  borderRadius: "50%",
                  width: "60px",
                  height: "60px",
                  fontSize: "16px",
                  textTransform: "none",
                  zIndex: 100
                }}
              >
                {<FontAwesomeIcon size={"2x"} icon={allergyIcons[allergy]} />}
              </Button>
            ))}
          </div>
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
                <p style={{ textAlign: "center", color: "#9b9b9b" }}>
                  נמצאו {filteredBoxes.length} מארזים
                </p>
              </div>
              <div className="grid-container">
                {filteredBoxes.map((box, index) => (
                  <div key={index} className="grid-item">
                    <FCBoxCard box={box} businessID={businessId} />
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

import React, { useState, useEffect } from "react";
import "../../Styles/MainPage.css";
import FCBusinessCard from "../../FCComponents/FCBusinessCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

export default function MainPage(props) {
  const apiURL = "http://localhost:5048/api/Main/Businesses";

  const [businessData, setBusinessData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const fetchBusinessData = async () => {
    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) {
        setErrorMessage("OOPS! Somthing Went Wrong :(");
        throw new Error("Somthing Went Wrong :(");
      }
      const data = await response.json();
      console.log(data);
      setBusinessData(data);
      setLoading(false);
    } catch {
      setErrorMessage("Somthing Went Wrong :(");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  const [bakerys, setBakery] = useState([]);

  useEffect(() => {
    // This code runs after the component is mounted or when businessData changes
    let bakeryBusinesses = businessData.filter(
      (i) => i.businessType === "Bakery"
    );
    setBakery(bakeryBusinesses);
  }, [businessData]);

  const [coffee, setCoffee] = useState([]);

  useEffect(() => {
    // This code runs after the component is mounted or when businessData changes
    let coffeeBusinesses = businessData.filter(
      (c) => c.businessType === "Coffee"
    );
    setCoffee(coffeeBusinesses);
  }, [businessData]);

  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    // This code runs after the component is mounted or when businessData changes
    let flowersBusinesses = businessData.filter(
      (f) => f.businessType === "Flowers"
    );
    setFlowers(flowersBusinesses);
  }, [businessData]);

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 1440 },
      items: 4,
      partialVisibilityGutter: 30,
    },
    laptop: {
      breakpoint: { max: 1440, min: 1024 },
      items: 3,
    },
    tabletLS: {
      breakpoint: { max: 1024, min: 834 },
      items: 2,
    },
    tablet: {
      breakpoint: { max: 834, min: 480 },
      items: 1,
    },
    mobile: {
      breakpoint: { max: 480, min: 0 },
      items: 1,
    },
  };

  if (loading) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <svg
          className="loader"
          viewBox="0 0 384 384"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            className="active"
            pathLength="360"
            fill="transparent"
            strokeWidth="36"
            cx="192"
            cy="192"
            r="176"
          ></circle>
          <circle
            className="track"
            pathLength="360"
            fill="transparent"
            strokeWidth="36"
            cx="192"
            cy="192"
            r="176"
          ></circle>
        </svg>
      </div>
    );
  } else if (errorMessage) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "red",
          fontSize: "50px",
        }}
      >
        {errorMessage}
      </div>
    );
  } else {
    return (
      <>
        <div className="headlines">
          <h1 style={{ direction: "rtl" }}>מאפיות</h1>
        </div>
        <div className="carousel-container">
          <Carousel
            responsive={responsive}
            className="carousel"
            infinite={true}
            // centerMode={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {bakerys.map((Bakery, index) => (
              <div className="carousel-item" key={index}>
                <FCBusinessCard data={Bakery} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="headlines">
          <h1 style={{ direction: "rtl" }}>בתי קפה</h1>
        </div>
        <div className="carousel-container">
          <Carousel
            responsive={responsive}
            className="carousel"
            infinite={true}
            // centerMode={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {coffee.map((coffee, index) => (
              <div className="carousel-item" key={index}>
                <FCBusinessCard data={coffee} />
              </div>
            ))}
          </Carousel>
        </div>

        <div className="headlines">
          <h1 style={{ direction: "rtl" }}>פרחים</h1>
        </div>
        <div className="carousel-container">
          <Carousel
            responsive={responsive}
            className="carousel"
            infinite={true}
            // centerMode={true}
            removeArrowOnDeviceType={["tablet", "mobile"]}
          >
            {flowers.map((flowers, index) => (
              <div className="carousel-item" key={index}>
                <FCBusinessCard data={flowers} />
              </div>
            ))}
          </Carousel>
        </div>
      </>
    );
  }
}

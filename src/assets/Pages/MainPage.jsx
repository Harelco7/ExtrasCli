import React, { useState, useEffect } from "react";
import "../../Styles/MainPage.css";
import FCBusinessCard from "../../FCComponents/FCBusinessCard";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import ToggleViewMode from "../../FCComponents/ToggleViewMode";
import { useBusinessData } from "..//Context/BusinessDataContext.jsx";
import Skeleton from "@mui/material/Skeleton";
import { getFavorites } from "..//..//Settings.js";


export default function MainPage() {
  const { businessData, errorMessage } = useBusinessData();
  const [loading, setLoading] = useState(true);
  const [bakerys, setBakery] = useState([]);
  const [coffee, setCoffee] = useState([]);
  const [flowers, setFlowers] = useState([]);
  const [businessFavorite, setbusinessFavorite] = useState([]);
  const [userData, setuserData] = useState([]);




  useEffect(() => {
    async function fetchData() {
      let userData = localStorage.getItem("userData");
    if (userData){
     userData = JSON.parse(userData);
     setuserData(userData)
    }  
   else {
     alert("not found")
     return;
   }
   const favoriteData = await getFavorites(userData.customerID)
    if (favoriteData && favoriteData.length > 0) {
      let temp = favoriteData.map(x => x.businessId)
      setbusinessFavorite(temp)}
    }
    fetchData();
  },[])





  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500); 

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      let bakeryBusinesses = businessData.filter(
        (i) => i.businessType === "Bakery"
      );
      setBakery(bakeryBusinesses);

      let coffeeBusinesses = businessData.filter(
        (c) => c.businessType === "Coffee House"
      );
      setCoffee(coffeeBusinesses);

      let flowersBusinesses = businessData.filter(
        (f) => f.businessType === "Flowers"
      );
      setFlowers(flowersBusinesses);
    }
  }, [businessData, loading]);

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
      <>
        <div style={{ marginTop: 100 }}>
          <Skeleton
            style={{ borderRadius: 16 }}
            variant="h3"
            width={321}
            height={50}
            
          />
        </div>
        <div
          style={{
            height: "100vh",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
          }}
        >
          <Skeleton
            style={{ borderRadius: 16 }}
            variant="rounded"
            width={321}
            height={470}
          />
          <Skeleton
            style={{ borderRadius: 16 }}
            variant="rounded"
            width={321}
            height={470}
          />
          <Skeleton
            style={{ borderRadius: 16 }}
            variant="rounded"
            width={321}
            height={470}
          />
        </div>
      </>
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
        <div className="view-options-container">
          <ToggleViewMode />
        </div>
        <div className="headlines">
          <h1 style={{ direction: "rtl" }}>מאפיות</h1>
        </div>
        <div className="carousel-container">
          <Carousel
            responsive={responsive}
            className="carousel"
            infinite={true}
            removeArrowOnDeviceType={["tablet"]}
            direction="rtl"
          >
            {bakerys.map((Bakery, index) => (
              <div className="carousel-item" key={index}>
                <FCBusinessCard userData = {userData} Favorite= {businessFavorite.includes(Bakery.businessID)} data={Bakery} />
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
            removeArrowOnDeviceType={["tablet"]}
          >
            {coffee.map((coffee, index) => (
              <div className="carousel-item" key={index}>
                <FCBusinessCard userData = {userData} Favorite= {businessFavorite.includes(coffee.businessID)} data={coffee} />
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
            removeArrowOnDeviceType={["tablet"]}
          >
            {flowers.map((flowers, index) => (
              <div className="carousel-item" key={index}>
                <FCBusinessCard userData = {userData} Favorite= {businessFavorite.includes(flowers.businessID)} data={flowers} />
              </div>
            ))}
          </Carousel>
        </div>
      </>
    );
  }
}

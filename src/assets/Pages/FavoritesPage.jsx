import React, { useState, useEffect } from "react";
import "../../Styles/FavoritePage.css";
import FCBusinessCard from "../../FCComponents/FCBusinessCard";
import { getFavorites } from "../../Settings";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import ClientProfileDetails from "../../FCComponents/ClientProfileDetails";
import Grow from "@mui/material/Grow";
import Fade from "@mui/material/Fade";
import MyOrdersClient from "../../FCComponents/MyOrdersClient";

const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [businessFavorite, setBusinessFavorite] = useState([]);
  const [userData, setUserData] = useState();
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    async function fetchData() {
      const userDataFromStorage = localStorage.getItem("userData");
      if (userDataFromStorage) {
        const userData = JSON.parse(userDataFromStorage);
        setUserData(userData);
        console.log("UserData", userData);

        const favoriteData = await getFavorites(userData.customerID, "yes");
        console.log(favoriteData);
        if (favoriteData && favoriteData.length > 0) {
          setBusinessFavorite(favoriteData);
        }
      } else {
        alert("not found");
        return;
      }
    }
    fetchData();
  }, []);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const removeFavorite = (businessId) => {
    const temp = businessFavorite.filter((x) => x.businessId !== businessId);
    setBusinessFavorite(temp);
    console.log(temp);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={tabValue}
          onChange={handleChange}
          aria-label="basic tabs example"
          centered
        >
          <Tab label="המועדפים שלי" />
          <Tab label="הפרטים שלי" />
          <Tab label="הזמנות קודמות" />
        </Tabs>
      </Box>
      {tabValue === 0 && (
        <div className="app">
          <h3 style={{textAlign:"center"}}>המועדפים שלי</h3>
          <Fade in={true} timeout={500}>
            <Grow in={true} timeout={500}>
              <div className="business-list">
                {businessFavorite.map((business) => (
                  <FCBusinessCard
                    userData={userData}
                    key={business.businessId}
                    Favorite={true}
                    data={business}
                    callBack={removeFavorite}
                  />
                ))}
              </div>
            </Grow>
          </Fade>
        </div>
      )}
      {tabValue === 1 && (
  <Fade in={true} timeout={500}>
    <Grow in={true} timeout={1000}>
      <div>
        <ClientProfileDetails
          userData={userData}
          setUserData={setUserData}
        />
      </div>
    </Grow>
  </Fade>
)}
{tabValue === 2 && (
  <Fade in={true} timeout={500}>
    <Grow in={true} timeout={1000}>
      <div className="myOrders"> 
        <MyOrdersClient userData={userData} />
      </div>
    </Grow>
  </Fade>
)}

    </Box>
  );
};

export default App;

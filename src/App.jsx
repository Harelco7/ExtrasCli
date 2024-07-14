import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FCMainPage from "./assets/Pages/MainPage";
import FCNavbar from "../src/FCComponents/FCNavbar";
import Fab from "@mui/material/Fab";
import { FiShoppingBag } from "react-icons/fi";


import AddBoxPage from "./assets/Pages/AddBoxPage.jsx";
import AboutPage from "./assets/Pages/AboutPage";

import BusinessPage from "./assets/Pages/BusinessPage";
import MapsPage from "./assets/Pages/MapsPage";
import RegisterPage from "./assets/Pages/RegisterPage";
import { BusinessDataProvider } from "..//src/assets/Context/BusinessDataContext.jsx";
import OrderPage from "./assets/Pages/OrderPage.jsx";
import { ShoppingBagProvider } from "..//src//assets/Context/ShoppingBagContext.jsx";
import ShoppingBagCanvas from "./FCComponents/ShoppingBagCanvas.jsx"; // Adjust the import path
import MyBusinessPage from "./assets/Pages/MyBusinessPage.jsx";
import FavoritePage from "..//src/assets/Pages/FavoritesPage.jsx";


function App() {
  const [showBag, setShowBag] = useState(false);
  const [businessID, setBusinessID] = useState(null);

  const handleBusinessIDChange = (newBusinessID) => {
    setBusinessID(newBusinessID);
    console.log("BusinessID updated to:", newBusinessID); // Optional: for debugging
  };

  const handleShowBag = () => setShowBag(true);
  const handleCloseBag = () => setShowBag(false);

  return (
    <ShoppingBagProvider>
      <Router>
        <div>
          <BusinessDataProvider>
            <FCNavbar />
            <hr style={{ width: "100%", color: "#1c1c1cca" }} />
          </BusinessDataProvider>
          <Routes>
            <Route path="/" element={<BusinessDataProvider><FCMainPage /></BusinessDataProvider>} />
            <Route path="/MainPage" element={<BusinessDataProvider><FCMainPage /></BusinessDataProvider>} />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/BusinessPage/:businessId" element={<BusinessPage onBusinessIDChange={handleBusinessIDChange} />} />
            <Route path="/MapPage" element={<MapsPage />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/addbox" element={<AddBoxPage />} />
            <Route path="/mybusiness" element={<MyBusinessPage />} />
            <Route path="/favoritepage" element={<FavoritePage />} />
          </Routes>

          <Fab
            style={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              width:"60px",
              height:"60px",
              zIndex: 1101,
              backgroundColor: "#d67d00",
            }}
            onClick={handleShowBag}
          >
            <FiShoppingBag fontSize={32} />
          </Fab>
          <BusinessDataProvider>
          <ShoppingBagCanvas show={showBag} handleClose={handleCloseBag} businessID={businessID} />
          </BusinessDataProvider>
        </div>
      </Router>
    </ShoppingBagProvider>
  );
}

export default App;

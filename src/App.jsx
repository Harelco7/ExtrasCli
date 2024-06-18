import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import FCMainPage from "./assets/Pages/MainPage";
import FCNavbar from "../src/FCComponents/FCNavbar";
import Fab from "@mui/material/Fab";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";

import AboutPage from "./assets/Pages/AboutPage";
import AddBoxPage from "./assets/Pages/AddBoxPage.jsx";
import BusinessPage from "./assets/Pages/BusinessPage";
import MapsPage from "./assets/Pages/MapsPage";
import RegisterPage from "./assets/Pages/RegisterPage";
import { BusinessDataProvider } from "..//src/assets/Context/BusinessDataContext.jsx";
import OrderPage from "./assets/Pages/OrderPage.jsx";
import { ShoppingBagProvider } from "..//src//assets/Context/ShoppingBagContext.jsx";
import ShoppingBagCanvas from "./FCComponents/ShoppingBagCanvas.jsx"; // Adjust the import path

function App() {
  const [showBag, setShowBag] = useState(false);

  const handleShowBag = () => setShowBag(true);
  const handleCloseBag = () => setShowBag(false);

  return (
    <ShoppingBagProvider>
      <Router>
        <div>
          <FCNavbar />
          <hr style={{ width: "100%", marginTop: 0, color: "#1c1c1cca" }} />

          <Routes>
            <Route
              path="/"
              element={
                <BusinessDataProvider>
                  <FCMainPage />
                </BusinessDataProvider>
              }
            />
            <Route path="/signup" element={<RegisterPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/BusinessPage" element={<BusinessPage />} />
            <Route path="/MapPage" element={<MapsPage />} />
            <Route path="/orderpage" element={<OrderPage />} />
            <Route path="/addbox" element={<AddBoxPage/>} />
          </Routes>
          
          <Fab
            style={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              height: 70,
              width: 70,
              zIndex: 1101,
              backgroundColor: "#d67d00",
            }}
            onClick={handleShowBag}
          >
            <ShoppingBagTwoToneIcon fontSize="large" />
          </Fab>
          <ShoppingBagCanvas show={showBag} handleClose={handleCloseBag} />
        </div>
      </Router>
    </ShoppingBagProvider>
  );
}

export default App;

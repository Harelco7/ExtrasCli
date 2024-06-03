
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";


import FCMainPage from "./assets/Pages/MainPage";
import FCNavbar from "../src/FCComponents/FCNavbar";


import AboutPage from "./assets/Pages/AboutPage";
import BusinessPage from "./assets/Pages/BusinessPage";
import MapsPage from "./assets/Pages/MapsPage";
import RegisterPage from "./assets/Pages/RegisterPage";
import { BusinessDataProvider } from "..//src/assets/Context/BusinessDataContext.jsx";

function App() {
  return (
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;

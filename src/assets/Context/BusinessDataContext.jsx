import React, { createContext, useContext, useState, useEffect } from "react";

const BusinessDataContext = createContext();

export const useBusinessData = () => useContext(BusinessDataContext);

export const BusinessDataProvider = ({ children }) => {
  const apiURL = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Main/Businesses";// לבדוק אם להחזיר ל TAR1
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
        setErrorMessage("OOPS! Something Went Wrong :(");
        throw new Error("Something Went Wrong :(");
      }
      const data = await response.json();
      setBusinessData(data);
      setLoading(false);
    } catch {
      setErrorMessage("Something Went Wrong :(");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBusinessData();
  }, []);

  return (
    <BusinessDataContext.Provider value={{ businessData, loading, errorMessage }}>
      {children}
    </BusinessDataContext.Provider>
  );
};

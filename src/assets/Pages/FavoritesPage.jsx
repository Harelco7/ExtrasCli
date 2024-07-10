import React, { useState , useEffect } from 'react';
import "..//..//Styles/FavoritePage.css";
import FCBusinessCard from "../../FCComponents/FCBusinessCard";
import { getFavorites } from '..//..//Settings';


const App = () => {
  const [favorites, setFavorites] = useState([]);
  const [businessFavorite, setbusinessFavorite] = useState([]);
  const [UserData, setuserData] = useState();

  const handleSave = (business) => {
    setFavorites([...favorites, business]);
  };

  useEffect(() => {
    async function fetchData() {
      let userData = localStorage.getItem("userData");
    if (userData && !UserData){
     userData = JSON.parse(userData);
     setuserData(userData)
    }  
   else {
     alert("not found")
     return;
   }
    const favoriteData = await getFavorites(userData.customerID, "yes")
    console.log(favoriteData)
    if (favoriteData && favoriteData.length > 0) {
      setbusinessFavorite(favoriteData)}
    }
    fetchData();
  },[])

  const removeFavorite = (businessId) => {
    const temp = businessFavorite.filter(x => x.businessId != businessId)
    setbusinessFavorite(temp);
    console.log(temp);
  }

  return (
    <div className="app">
      <h1>שלום, בתי העסק המועדפים עליך:</h1>
      <div className="business-list">
        {businessFavorite.map((business) => (
          <FCBusinessCard userData= {UserData} key={business.businessId} Favorite = {true} data={business} callBack= {removeFavorite} />
        ))}
      </div>
    </div>
  );
};

export default App;

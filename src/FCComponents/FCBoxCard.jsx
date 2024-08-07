import React, { useState, useEffect } from 'react';
import "../Styles/Box.css";
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function FCBoxCard({ box ,businessID , boxId}) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500); 

    return () => clearTimeout(timer);
  }, []);

  const handleOrderHere = (event) => {
    event.preventDefault();
    navigate("/orderpage", { 
      state: { 
        box: box,
        businessID: box.businessID  // Add businessID to the navigation state
      }
    });
    console.log('Navigating with box:', box, 'and businessID:', businessID);
  };

  if (loading) {
    return (
      <div>
        <Skeleton style={{borderRadius:16}} variant="rounded" width={550} height={200} />
      </div>
    );
  }

  return (
    <div className="product-card">
      <div className="product-image-placeholder">
      {/* <img src="/src/Images/breads.jpeg" alt="Bakery Image" className="product-image"/> */}
      <img src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BoxImage/${boxId}.JPG`} alt="Bakery Image" className="product-image"/>
      </div>
      <div className="product-details">
        <h2 className="product-title">{box.boxName}</h2>
        {box.alergicType && box.alergicType !== "none" && (
          <p>מכיל: {box.alergicType}</p>)}        
          <p className="product-description">{box.description}</p>
        <div className="product-price">
          <div className="quantity-available">
            <p>כמות זמינה: {box.quantityAvailable}</p>
          </div>
          <span>{box.price + "₪"}</span> 
          <p className="sale-price">{box.salePrice + "₪"}</p> 
          <button className="add-to-cart" onClick={handleOrderHere}>
            <MdOutlineAddShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

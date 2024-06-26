import React, { useState, useEffect } from 'react';
import "../Styles/Box.css";
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';
import { MdOutlineAddShoppingCart } from "react-icons/md";

export default function FCBoxCard({ box ,businessID }) {
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
        businessID: businessID  // Add businessID to the navigation state
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
      <img src="/src/Images/breads.jpeg" alt="Bakery Image" className="product-image"/>
      </div>
      <div className="product-details">
        <h2 className="product-title">{box.boxName}</h2>
        {box.alergicType !== "none" && <p>אלרגיה ל: {box.alergicType}</p>}
        <p className="product-description">{box.description}</p>
        <p className="product-description">{businessID}</p>
        <div className="product-price">
          <span>{box.price + "₪"}</span>
          <div className="quantity-available">
            <span>כמות זמינה: {box.quantityAvailable}</span>
          </div>
          <button className="add-to-cart" onClick={handleOrderHere}>
            <MdOutlineAddShoppingCart size={25} />
          </button>
        </div>
      </div>
    </div>
  );
}

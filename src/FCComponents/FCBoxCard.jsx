import React, { useState, useEffect } from 'react';
import "../Styles/Box.css";
import { useNavigate } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton';

export default function FCBoxCard({ box }) {
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
    navigate("/orderpage", { state: box });
    console.log(box);
  };

  if (loading) {
    return (
      <div>
        <Skeleton style={{borderRadius:16}} variant="rounded" width={300} height={200} />
        
       
      </div>
    );
  }

  return (
    <div className="package-card">
      <h3>{box.boxName}</h3>
      <h3>{box.boxID}</h3>
      {box.alergicType !== "none" && <p>אלרגיה ל: {box.alergicType}</p>}
      <p>{box.description}</p>
      <p>מחיר: {box.price + "₪"}</p>
      <p>מארזים שנשארו: {box.quantityAvailable}</p>
      <button onClick={handleOrderHere}>הזמן כאן</button>
    </div>
  );
}

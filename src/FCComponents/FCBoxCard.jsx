import React from 'react'
import "..//Styles/Box.css"

export default function FCBoxCard({box}) {
  return (
    <div>
        <div className="package-card">
          <h3>{box.boxName}</h3>
          {box.alergicType !== "none" && <p>Alergic: {box.alergicType}</p>}
          
          <p>{box.description}</p>
          <p>Price: {box.price}</p>
          <p>Quantity Available: {box.quantityAvailable}</p>
        </div>
    </div>
  )
}

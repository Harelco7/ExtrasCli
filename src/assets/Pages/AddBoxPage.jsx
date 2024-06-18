import React, { useState } from 'react';
import '../../Styles/AddBoxPage.css';
import { islocal, localurl, produrl } from '../Settings';


const AddBox = () => {
    const [allergens, setAllergens] = useState([]);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setprice] = useState('');
    const [sale_price, setsale_price] = useState('');
    const [boxName, setboxName] = useState('');

    const handleAllergenToggle = (allergen) => {
        setAllergens((prevAllergens) =>
            prevAllergens.includes(allergen)
                ? prevAllergens.filter((a) => a !== allergen)
                : [...prevAllergens, allergen]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        const raw = JSON.stringify({
            "boxName": boxName,
            "description": description,
            "price": price,
            "sale_Price": sale_price,
            "quantityAvailable": quantity,
            "boxImage": null,
            "alergicType": allergens.join('|')
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Accept: "application/json; charset=UTF-8",
              },
            body: raw
        };

        fetch(`${islocal? localurl: produrl}/Box/AddBox`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>שלום , הוספת מארז חדש</h1>
            <div>
                <label>שם המארז:</label>
                <input
                    type="text"
                    value={boxName}
                    onChange={(e) => setboxName(e.target.value)}
                />
            </div>
            <div>
                <label>העלאת תמונה:</label>
                <input type="file" accept="image/*" />
            </div>
            <div>
                <label>האם המארז מכיל אלרגנים?</label>
                <button type="button" className= {allergens.includes('גלוטן') && 'active'} onClick={() => handleAllergenToggle('גלוטן')}>מכיל גלוטן</button>
                <button type="button" className= {allergens.includes('לקטוז') && 'active'} onClick={() => handleAllergenToggle('לקטוז')}>מכיל לקטוז</button>
                <button type="button" className= {allergens.includes('אגוזים') && 'active'} onClick={() => handleAllergenToggle('אגוזים')}>מכיל אגוזים</button>
            </div>
            <div>
                <label>תאר את תכולת המארז:</label>
                <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    maxLength="100"
                />
            </div>
            <div>
                <label>כמות מארזים במלאי:</label>
                <button type="button" onClick={() => setQuantity(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
            </div>
            <div>
                <label>מחיר מקור:</label>
                <input
                    type="number"
                    value={price}
                    onChange={(e) => setprice(e.target.value)}
                />
            </div>
            <div>
                <label>מחיר מוזל:</label>
                <input
                    type="number"
                    value={sale_price}
                    onChange={(e) => setsale_price(e.target.value)}
                />
            </div>
            <button type="submit">פרסום מארז</button>
        </form>
    );
};

export default AddBox;
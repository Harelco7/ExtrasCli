import React, { useState } from 'react';
import '../../Styles/AddBoxPage.css';


const AddBox = () => {
    const [allergens, setAllergens] = useState([]);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [sourcePrice, setSourcePrice] = useState('');
    const [modelPrice, setModelPrice] = useState('');

    const handleAllergenToggle = (allergen) => {
        setAllergens((prevAllergens) =>
            prevAllergens.includes(allergen)
                ? prevAllergens.filter((a) => a !== allergen)
                : [...prevAllergens, allergen]
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle form submission logic
        console.log({
            allergens,
            description,
            quantity,
            sourcePrice,
            modelPrice,
        });
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>שלום , הוספת מארז חדש</h1>
            <div>
                <label>העלאת תמונה:</label>
                <input type="file" accept="image/*" />
            </div>
            <div>
                <label>האם המארז מכיל אלרגנים?</label>
                <button type="button" onClick={() => handleAllergenToggle('גלוטן')}>מכיל גלוטן</button>
                <button type="button" onClick={() => handleAllergenToggle('לקטוז')}>מכיל לקטוז</button>
                <button type="button" onClick={() => handleAllergenToggle('אגוזים')}>מכיל אגוזים</button>
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
                    value={sourcePrice}
                    onChange={(e) => setSourcePrice(e.target.value)}
                />
            </div>
            <div>
                <label>מחיר מוזל:</label>
                <input
                    type="number"
                    value={modelPrice}
                    onChange={(e) => setModelPrice(e.target.value)}
                />
            </div>
            <button type="submit">פרסום מארז</button>
        </form>
    );
};

export default AddBox;
import React, { useState } from 'react';
<<<<<<< HEAD
import '..//..//Styles/AddBoxPage.css';
import { islocal, localurl, produrl } from '..//..//Settings';
import { ColorLensRounded } from '@mui/icons-material';
import axios from 'axios';
=======
import '../../Styles/AddBoxPage.css';
import { islocal, localurl, produrl } from '../Settings';
>>>>>>> 4900ef0a5779fa8db8ed43c10e5dee6a82931cbc


const AddBox = () => {
    const [allergens, setAllergens] = useState([]);
    const [description, setDescription] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [price, setprice] = useState('');
    const [sale_price, setsale_price] = useState('');
    const [boxName, setboxName] = useState('');
<<<<<<< HEAD
    const [boxImage, setboxImage] = useState('');
=======
>>>>>>> 4900ef0a5779fa8db8ed43c10e5dee6a82931cbc

    const handleAllergenToggle = (allergen) => {
        setAllergens((prevAllergens) =>
            prevAllergens.includes(allergen)
                ? prevAllergens.filter((a) => a !== allergen)
                : [...prevAllergens, allergen]
        );
    };

    const uploadImage = async() => {
        let data = new FormData()
        data.append('image', boxImage)
        const response = await axios.post(`${islocal? localurl: produrl}/Pictures/addPicture`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          console.log(response)

    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const userData = JSON.parse(sessionStorage.getItem("userData"));

        const raw = JSON.stringify({
            "boxName": boxName,
            "description": description,
            "price": price,
            "sale_Price": sale_price,
            "quantityAvailable": quantity,
            "boxImage": null,
            "alergicType": allergens.join('|'),
            "businessID": userData.businessID
        });

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json; charset=UTF-8",
                Accept: "application/json; charset=UTF-8",
              },
            body: raw
        };

        fetch(`${islocal? localurl: produrl}Box/AddBox`, requestOptions)
            .then((response) => response.json())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    };

    return (
        <>
       
        <form className='formBox' onSubmit={handleSubmit}>
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
                <input type="file" accept="image/*" onChange={(e) => setboxImage(e.target.files[0])}/>
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
                <button className='QuantityButton' type="button" onClick={() => setQuantity(quantity - 1)}>-</button>
                <span>{quantity}</span>
                <button className='QuantityButton' type="button" onClick={() => setQuantity(quantity + 1)}>+</button>
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
        </>
    );
};

export default AddBox;
import React, { useState } from "react";
import "..//..//Styles/AddBoxPage.css";
import { islocal, localurl, produrl } from "..//..//Settings";
import { ColorLensRounded } from "@mui/icons-material";
import axios from "axios";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import ToggleButton from "react-bootstrap/ToggleButton";

const AddBox = () => {
  const [allergens, setAllergens] = useState([]);
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [price, setprice] = useState("");
  const [sale_price, setsale_price] = useState("");
  const [boxName, setboxName] = useState("");
  const [boxImage, setboxImage] = useState("");

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [checked, setChecked] = useState(false);

  const handleOpenSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const handleAllergenToggle = (allergen) => {
    setAllergens((prevAllergens) =>
      prevAllergens.includes(allergen)
        ? prevAllergens.filter((a) => a !== allergen)
        : [...prevAllergens, allergen]
    );
  };

  const uploadBoxImage = async (file,boxid) => {
    const formData = new FormData();
    formData.append("file", file);
    // Optionally append other data such as business ID if necessary
    formData.append("boxid", boxid);
  
    const url = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/FileUpload/uploadBoximage";
  
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: formData,
      });
  
      if (!response.ok) throw new Error(`Failed to upload Box Image: ${response.statusText}`);
      
      const data = await response.json();
      console.log("Box Image uploaded:", data);
      return data;
    } catch (error) {
      console.error("Error during Box Image upload:", error);
      return null;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const userData = JSON.parse(localStorage.getItem("userData"));
  
    const raw = JSON.stringify({
      boxName: boxName,
      description: description,
      price: price,
      sale_Price: sale_price,
      quantityAvailable: quantity,
      boxImage: null, // This will be updated later
      alergicType: allergens.join("|"),
      businessID: userData.businessID,
    });
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      },
      body: raw,
    };
  
    try {
      const response = await fetch(
        `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Box/AddBox`,
        requestOptions
      );
      const result = await response.json();
  
      if (response.ok) {
        // Now we have the boxId, proceed with image upload
        const boxid = result.boxDetails.boxId; // Assuming your API returns the ID as boxId
        const imageUploadResult = await uploadBoxImage(boxImage, boxid);
  
        if (imageUploadResult) {
          handleOpenSnackbar("המארז נוסף והתמונה הועלתה בהצלחה!");
        } else {
          handleOpenSnackbar("המארז נוסף אך ההעלאת תמונה נכשלה!");
        }
      } else {
        throw new Error("Failed to create box");
      }
    } catch (error) {
      console.error("Error in adding box:", error);
      handleOpenSnackbar("משהו השתבש בעת העלאה!");
    }
  };
  

  return (
    <>
      <form className="formBox" onSubmit={handleSubmit}>
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
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setboxImage(e.target.files[0])}
          />
        </div>
        <div>
  <label>האם המארז מכיל אלרגנים?</label>
  <ToggleButton
      className={`mb-2`}
      style={{
        backgroundColor: allergens.includes("גלוטן") ? '#4CAF50' : '#f44336', // Green when active, red when inactive
        color: '#ffffff', // White text color
        borderColor: allergens.includes("גלוטן") ? '#4CAF50' : '#f44336' // Border color matches background
      }}
    id="toggle-gluten" // Unique ID for gluten toggle
    type="checkbox"
    variant="outline-primary"
    checked={allergens.includes("גלוטן")}
    value="1"
    onChange={(e) => handleAllergenToggle("גלוטן")}
  >
    מכיל גלוטן
  </ToggleButton>

  <ToggleButton
      className={`mb-2`}
      style={{
        backgroundColor: allergens.includes("חלבי") ? '#4CAF50' : '#f44336', // Green when active, red when inactive
        color: '#ffffff', // White text color
        borderColor: allergens.includes("חלבי") ? '#4CAF50' : '#f44336' // Border color matches background
      }}
    id="toggle-Dairy" // Unique ID for gluten toggle
    type="checkbox"
    variant="outline-primary"
    checked={allergens.includes("חלבי")}
    value="1"
    onChange={(e) => handleAllergenToggle("חלבי")}
  >
    חלבי
  </ToggleButton>

  <ToggleButton
      className={`mb-2`}
      style={{
        backgroundColor: allergens.includes("בשרי") ? '#4CAF50' : '#f44336', // Green when active, red when inactive
        color: '#ffffff', // White text color
        borderColor: allergens.includes("בשרי") ? '#4CAF50' : '#f44336' // Border color matches background
      }}
    id="toggle-Meat" // Unique ID for gluten toggle
    type="checkbox"
    variant="outline-primary"
    checked={allergens.includes("בשרי")}
    value="1"
    onChange={(e) => handleAllergenToggle("בשרי")}
  >
  בשרי
  </ToggleButton>

  <ToggleButton
      className={`mb-2`}
      style={{
        backgroundColor: allergens.includes("צמחוני") ? '#4CAF50' : '#f44336', // Green when active, red when inactive
        color: '#ffffff', // White text color
        borderColor: allergens.includes("צמחוני") ? '#4CAF50' : '#f44336' // Border color matches background
      }}
    id="toggle-vegetarian" // Unique ID for lactose toggle
    type="checkbox"
    variant="outline-primary"
    checked={allergens.includes("צמחוני")}
    value="1"
    onChange={(e) => handleAllergenToggle("צמחוני")}
  >
    צמחוני
  </ToggleButton>

  <ToggleButton
      className={`mb-2`}
      style={{
        backgroundColor: allergens.includes("טבעוני") ? '#4CAF50' : '#f44336', // Green when active, red when inactive
        color: '#ffffff', // White text color
        borderColor: allergens.includes("טבעוני") ? '#4CAF50' : '#f44336' // Border color matches background
      }}
    id="toggle-vegan" // Unique ID for lactose toggle
    type="checkbox"
    variant="outline-primary"
    checked={allergens.includes("טבעוני")}
    value="1"
    onChange={(e) => handleAllergenToggle("טבעוני")}
  >
    טבעוני
  </ToggleButton>

  <ToggleButton
    className={`mb-2`}
    style={{
      backgroundColor: allergens.includes("אגוזים") ? '#4CAF50' : '#f44336', // Green when active, red when inactive
      color: '#ffffff', // White text color
      borderColor: allergens.includes("אגוזים") ? '#4CAF50' : '#f44336' // Border color matches background
    }}
    id="toggle-nuts" // Unique ID for nuts toggle
    type="checkbox"
    variant="outline-primary"
    checked={allergens.includes("אגוזים")}
    value="1"
    onChange={(e) => handleAllergenToggle("אגוזים")}
  >
    מכיל אגוזים
  </ToggleButton>
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
          <button
            className="QuantityButton"
            type="button"
            onClick={() => setQuantity(quantity - 1)}
          >
            -
          </button>
          <span>{quantity}</span>
          <button
            className="QuantityButton"
            type="button"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
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
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default AddBox;

import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/OrderPage.css";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Typography from '@mui/material/Typography';
import { useShoppingBag } from "../Context/ShoppingBagContext.jsx";
import exampleBox from "../../Images/exampleBox.jpg";
import { LiaAllergiesSolid } from "react-icons/lia";

export default function OrderPage() {
  const location = useLocation();
  const initialBox = location.state;

  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedInUser, setLoggedInUser] = useState({});
  const [box, setBox] = useState(initialBox);
  const { addItemToBag } = useShoppingBag(); // Use the context
  const [snackbarAddToBagOpen, setSnackbarAddToBagOpen] = useState(false);
  const [snackbarOrderOpen, setSnackbarOrderOpen] = useState(false);

  useEffect(() => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      setIsLoggedIn(true);
      setLoggedInUser(userData);
      console.log(userData);
    }
    console.log(LoggedInUser);
  }, []);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.min(
      Math.max(quantity + value, 1),
      box.quantityAvailable
    );
    setQuantity(newQuantity);
  };

  const handleCheckout = () => {
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if (userData) {
      console.log(LoggedInUser.customerID, "this is loggedin user");
      setIsLoggedIn(true);
      addOrder();
    } else {
      setIsLoggedIn(false);
    }

    if (isLoggedIn) {
      console.log(`Checking out ${quantity} ${box.boxName}(s)!`);
      setSnackbarOrderOpen(true); // Show the order snackbar
    } else {
      console.log("You need to login first!");
    }
  };

  const addOrder = () => {
    const apiURLAddOrder =
      "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Box/BuyBox";

    const order = {
      boxId: box.boxID,
      quantityBuy: quantity,
      customerId: LoggedInUser.customerID,
    };

    console.log("Order to be sent:", order);

    fetch(apiURLAddOrder, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      },
      body: JSON.stringify(order),
    })
      .then((res) => {
        console.log("res=", res);
        console.log("res.status", res.status);
        console.log("res.ok", res.ok);

        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error: ${res.status} - ${text}`);
          });
        }

        return res.json();
      })
      .then(
        (result) => {
          console.log("Order Added Successfully!", result);

          setBox((prevBox) => ({
            ...prevBox,
            quantityAvailable: prevBox.quantityAvailable - quantity,
          }));
        },
        (error) => {
          console.log("err post=", error.message);
        }
      );
  };

  const handleAddToBag = () => {
    const item = {
      id: box.boxID,
      name: box.boxName,
      price: box.price,
      quantity: quantity,
    };
    addItemToBag(item);
    console.log(`Added ${quantity} ${box.boxName}(s) to the shopping bag!`);
    setSnackbarAddToBagOpen(true); // Show the snackbar
  };

  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarAddToBagOpen(false);
    setSnackbarOrderOpen(false);
  };

  return (
    <div className="container-wrapper">
      {/* <h2 style={{ display: "flex", justifyContent: "center", width: "100%", marginBottom: 30, marginTop: 30 }}>הזמנת קופסא</h2> */}
      <div className="box-img-container">
        <img src={exampleBox} alt="" />
      </div>
      <div className="order-container">
        {box ? (
          <div>
            {/* <h3>{box.boxID}</h3> */}
            <h3>{box.boxName}</h3>
            {box.alergicType !== "none" && (
              <p style={{ fontSize: 20, fontWeight: 400, border: "1px solid black", borderRadius: 10 }}>
                אלרגיות<LiaAllergiesSolid size={30} />: {box.alergicType}
              </p>
            )}
            <p>{box.description}</p>
            <p>
              מחיר: {box.price}
              {"₪"}
            </p>
            <p>
              <ShoppingBagTwoToneIcon />
              מארזים שנותרו : {box.quantityAvailable}
            </p>
            <div className="quantity-selector">
              <button className="quantity-btn" onClick={() => handleQuantityChange(-1)}>
                -
              </button>
              <span>{quantity}</span>
              <button className="quantity-btn" onClick={() => handleQuantityChange(1)}>
                +
              </button>
            </div>
          </div>
        ) : (
          <p>No box data available.</p>
        )}
        <button className="button-checkout" onClick={handleCheckout}>
          הזמן עכשיו
        </button>
        <button className="button-checkout" onClick={handleAddToBag}>
          הוסף לסל
        </button>
      </div>

      <Snackbar
        open={snackbarAddToBagOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, padding: '0 16px' }}>
          <Typography variant="body1" style={{ textAlign: 'center', flexGrow: 1 }}>
            המארז שבחרת נוסף לסל !
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbarOrderOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '300px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 1, padding: '0 16px' }}>
          <Typography variant="body1" style={{ textAlign: 'center', flexGrow: 1 }}>
            ההזמנה שלך בוצעה בהצלחה!
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}

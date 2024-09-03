import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "../../Styles/OrderPage.css";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import { useShoppingBag } from "../Context/ShoppingBagContext.jsx";
import exampleBox from "..//..//..//public/Images/exampleBox.jpg";
import { LiaAllergiesSolid } from "react-icons/lia";
import { islocal, localurl, produrl } from "..//..//Settings";
import { useParams } from "react-router-dom";

export default function OrderPage() {
  const location = useLocation();
  const { box, businessID } = location.state;
  const [loading, setLoading] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedInUser, setLoggedInUser] = useState({});
  // const [box, setBox] = useState(initialBox);
  const { addItemToBag } = useShoppingBag(); // Use the context
  const [snackbarAddToBagOpen, setSnackbarAddToBagOpen] = useState(false);
  const [snackbarOrderOpen, setSnackbarOrderOpen] = useState(false);
  const { boxId } = useParams(); // Extract the box ID from the URL
  useEffect(() => {
    const fetchBoxDetails = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${islocal ? localurl : produrl}api/Box/GetBox/${boxId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch box details");
        }
        const data = await response.json();
        setBox(data);
      } catch (error) {
        console.error("Error fetching box details:", error);
      } finally {
        setLoading(false);
      }
    };

    if (boxId) {
      fetchBoxDetails();
    }
  }, [boxId]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setIsLoggedIn(true);
      setLoggedInUser(userData);
    }
  }, []);

  useEffect(() => {
    if (isLoggedIn && LoggedInUser) {
      console.log("Logged in user:", LoggedInUser);
    }
  }, [isLoggedIn, LoggedInUser]);

  const handleQuantityChange = (value) => {
    const newQuantity = Math.min(
      Math.max(quantity + value, 1),
      box.quantityAvailable
    );
    setQuantity(newQuantity);
  };

  const handleCheckout = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
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
    setLoading(true); // Start loading
    const apiURLAddOrder = `${islocal ? localurl : produrl}Box/BuyBox`;
    const order = {
      boxId: box.boxID,
      quantityBuy: quantity,
      customerId: LoggedInUser.customerID,
      boxDescription: box.description,
      businessID: businessID,
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
      .then((res) => res.json())
      .then(
        (result) => {
          console.log("Order Added Successfully!", result);
          setBox((prevBox) => ({
            ...prevBox,
            quantityAvailable: prevBox.quantityAvailable - quantity,
          }));
        },
        (error) => {
          console.error("Error adding order:", error);
        }
      )
      .finally(() => setLoading(false)); // End loading regardless of result
  };

  const handleAddToBag = () => {
    const item = {
      boxId: box.boxId,
      name: box.boxName,
      price: box.salePrice,
      description: box.description,
    };
    console.log("this is item:", item);
    addItemToBag(item, quantity); // Pass the selected quantity
    console.log(`Added ${quantity} ${box.boxName}(s) to the shopping bag!`);
    setSnackbarAddToBagOpen(true); // Show the snackbar
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarAddToBagOpen(false);
    setSnackbarOrderOpen(false);
  };

  console.log("this box", box);

  return (
    <div className="container-wrapper">
      <div className="box-img-container">
        <img
          src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BoxImage/${box.boxId}.jpg`}
          alt="Box Image"
        />
      </div>
      <div className="order-container">
        {box ? (
          <div>
            <h3>{box.boxID}</h3>
            <h2>{box.boxName}</h2>
            {box.alergicType !== "none" && (
              <p style={{ fontSize: 20, fontWeight: "bold" }}>
                אלרגנים
                <LiaAllergiesSolid size={30} />: {box.alergicType}
              </p>
            )}
            <p>{box.description}</p>
            <p>
              מחיר: {box.salePrice}
              {"₪"}
            </p>
            <p>
              <ShoppingBagTwoToneIcon />
              מארזים שנותרו : {box.quantityAvailable}
            </p>
            <div className="quantity-selector">
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(-1)}
              >
                -
              </button>
              <span>{quantity}</span>
              <button
                className="quantity-btn"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          </div>
        ) : (
          <p>No box data available.</p>
        )}

        <button className="button-checkout" onClick={handleAddToBag}>
          הוסף לסל
        </button>
      </div>

      <Snackbar
        open={snackbarAddToBagOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            padding: "0 16px",
          }}
        >
          <Typography
            variant="body1"
            style={{ textAlign: "center", flexGrow: 1 }}
          >
            המארז שבחרת נוסף לסל !
          </Typography>
        </Alert>
      </Snackbar>

      <Snackbar
        open={snackbarOrderOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{
            width: "300px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: 1,
            padding: "0 16px",
          }}
        >
          <Typography
            variant="body1"
            style={{ textAlign: "center", flexGrow: 1 }}
          >
            ההזמנה שלך בוצעה בהצלחה!
          </Typography>
        </Alert>
      </Snackbar>
    </div>
  );
}

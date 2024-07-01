import React, { useState, useEffect } from "react";
import { Offcanvas, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useShoppingBag } from "../assets/Context/ShoppingBagContext"; // Update the path accordingly
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FCQRCode from "./FCQRCode"
import { color } from "framer-motion";

const ShoppingBagCanvas = ({ show, handleClose,businessID }) => {
  const { items, removeItemFromBag, clearBag } = useShoppingBag();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showAlert, setShowAlert] = useState(true); // State for showing alert
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [qrCodeValue, setQrCodeValue] = useState(''); // State for QRCode value
  const [dialogOpen, setDialogOpen] = useState(false); // State for Dialog

  const checkLoginStatus = () => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setIsLoggedIn(true);
      setLoggedInUser(userData);
      setShowAlert(false); // Hide alert when user is logged in
    } else {
      setIsLoggedIn(false);
      setShowAlert(true); // Show alert when user is not logged in
    }
  };

  useEffect(() => {
    // Initial check for login status on component mount
    checkLoginStatus();
  
  }, [show]);

  const calculateTotalPrice = () => {
    console.log("items:",items);
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    checkLoginStatus();
    if (isLoggedIn) {
      const orders = items.map((item) => ({
        boxId: item.id,
        quantityBuy: item.quantity,
        customerId: loggedInUser.customerID,
        BoxDescription : item.desc,
        businessId:parseInt(businessID)
      }));
  
      orders.forEach((order) => {
        addOrders(order);
      });
    } else {
      setShowAlert(true); // Show alert if user is not logged in
    }
  };

  const addOrders = (order) => {
    const apiURLAddOrder = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Box/BuyBox";
    console.log("Order to be sent check:", order);
    
    // Send a PUT request for each item
    fetch(apiURLAddOrder, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
        Accept: "application/json; charset=UTF-8",
      },
      body: JSON.stringify(order),
    })
    .then((res) => {
      console.log("Response:", res);
      setSnackbarOpen(true); // Indicate a response has been received
      // Check if response is not OK (HTTP status code outside 2xx range)
      if (!res.ok) {
        // If response is not OK, handle error
        return res.text().then((text) => {
          // Attempt to parse error message from response body
          throw new Error(`Error: ${res.status} - ${text}`);
        });
      }
  
      // Check if response is JSON
      const contentType = res.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        // If response is not JSON, handle unexpected response type
        throw new Error(`Unexpected response type: ${contentType}`);
      }
  
      return res.json(); // Parse response body as JSON
    })
    .then(
      (result) => {
        console.log("Order Added Successfully!", result);
        setSnackbarOpen(true); // Show Snackbar on successful order
        setDialogOpen(true); // Optionally close the dialog or modal if it's open
      },
      (error) => {
        // Handle fetch or parsing error
        console.error("Error adding order:", error.message);
        // Optionally show user-friendly error message or retry mechanism
      }
    );
  };
  

  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackbarOpen(false);
  };

  const generateQRCodeValue = () => {
    return Math.random().toString(36).substring(2, 15); // Create a random string
  };

  const handleCheckoutQR = () => {
    setQrCodeValue(generateQRCodeValue());
  };

  const handleCheckoutCombined = () => {
    handleCheckout();
    handleCheckoutQR();
    setTimeout(() => {
      handleClose(); // Close the Offcanvas after 3 seconds
      // setDialogOpen(true); // Open the Dialog
      clearBag();
    }, 0);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
        style={{ zIndex: 1102, borderRadius:20}}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ marginLeft: 10 }}>
            סל הקניות שלי
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {items.length > 0 ? (
            <>
              <ListGroup>
                {items.map((item, index) => (
                  <ListGroupItem
                    key={index}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <div>
                      {item.name} - {item.quantity}x {item.price}₪ 
                    </div>
                    <Button
                      variant="danger"
                      onClick={() => removeItemFromBag(item.id)}
                    >
                      <DeleteIcon />
                    </Button>
                  </ListGroupItem>
                ))}
              </ListGroup>
              <hr />
              <h5>מחיר כולל: {calculateTotalPrice()}₪</h5>
              <Button
                variant="primary"
                onClick={handleCheckoutCombined}
                style={{ marginTop: 10, width: "100%" }}
              >
                לרכישה
              </Button>
            </>
          ) : (
            <p style={{ fontSize: 20, fontWeight: "bold"}}>
              סל הקניות שלך ריק!
            </p>
          )}

          {showAlert && (
            <Alert severity="error" onClose={() => setShowAlert(false)}>
              <AlertTitle>Error</AlertTitle>
              יש צורך להיות מחובר כדי להמשיך בתהליך הקנייה
            </Alert>
          )}

          {/* Snackbar for successful order */}
          <Snackbar
            open={snackbarOpen}
            autoHideDuration={3000}
            onClose={handleSnackbarClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert
              onClose={handleSnackbarClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              ההזמנה בוצעה בהצלחה!
            </Alert>
          </Snackbar>
        </Offcanvas.Body>
      </Offcanvas>
      <FCQRCode open={dialogOpen} onClose={handleDialogClose} qrCodeValue={qrCodeValue} />
    </>
  );
};

export default ShoppingBagCanvas;

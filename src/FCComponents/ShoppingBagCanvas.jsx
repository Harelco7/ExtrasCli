import React, { useState, useEffect } from "react";
import { Offcanvas, Button, ListGroup, ListGroupItem } from "react-bootstrap";
import { useShoppingBag } from "../assets/Context/ShoppingBagContext"; // Update the path accordingly
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import DeleteIcon from "@mui/icons-material/Delete";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import FCQRCode from "./FCQRCode";
import Fab from "@mui/material/Fab";
import { FiShoppingBag } from "react-icons/fi";
import "../Styles/FloatingButton.css";
import { useBusinessData } from "../assets/Context/BusinessDataContext.jsx"; // Corrected import path
import "..//..//src/Styles/ShoppingBagCanvas.css" 

const ShoppingBagCanvas = ({ show, handleClose, businessID }) => {
  const { items, removeItemFromBag, clearBag } = useShoppingBag();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState({});
  const [showAlert, setShowAlert] = useState(true); // State for showing alert
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar
  const [qrCodeValue, setQrCodeValue] = useState(""); // State for QRCode value
  const [dialogOpen, setDialogOpen] = useState(false); // State for Dialog
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const [boxName, setBoxName] = useState(""); // State for Box Name

  const { businessData } = useBusinessData(); // Correctly use the business data context
  const [business, setBusiness] = useState({});

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
    checkLoginStatus();
    if (items.length > 0) {
      setBoxName(items[0].name);
    }
    const userData = JSON.parse(localStorage.getItem("userData"));
    console.log("userData now", userData);
    console.log("BusinessID", businessID);
  }, [show, items]);

  useEffect(() => {
    if (show && businessID) {
      // Only fetch business data when the shopping bag is shown
      const foundBusiness = GetBusinessData(businessID);
      setBusiness(foundBusiness || {}); // Set business data or empty object to avoid undefined errors
    }
  }, [show, businessID]); // Runs only when the shopping bag is shown or businessID changes

// הוספת useEffect לטעינת מצב הכפתור הצף מ-localStorage
useEffect(() => {
  const isFloatingButtonVisible = localStorage.getItem('floatingButtonVisible') === 'true';
  if (isFloatingButtonVisible) {
    setShowFloatingButton(true); // אם המצב שמור, הכפתור הצף יופיע
  }
}, []); // פועל רק בטעינה ראשונה של העמוד
  
  const GetBusinessData = (businessID) => {
    // Ensure businessID is a number if businessData contains numeric businessID
    const numericBusinessID = Number(businessID);
    console.log("Searching for businessID:", numericBusinessID);

    const business = businessData.find((business) => {
      console.log("Checking business:", business.businessID);
      return business.businessID === numericBusinessID;
    });

    console.log("Found business:", business);
    return business;
  };

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = () => {
    checkLoginStatus();
    if (isLoggedIn) {
      const orders = items.map((item) => ({
        boxId: item.id,
        quantityBuy: item.quantity,
        customerId: loggedInUser.customerID,
        BoxDescription: item.desc,
        businessId: parseInt(businessID),
      }));
      console.log("orders:", orders);
      orders.forEach((order) => {
        addOrders(order);
      });
    } else {
      setShowAlert(true); // Show alert if user is not logged in
    }
  };

  const addOrders = (order) => {
    const apiURLAddOrder =
      "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Box/BuyBox";
    console.log("Order to be sent check:", order);

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
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(`Error: ${res.status} - ${text}`);
          });
        }

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error(`Unexpected response type: ${contentType}`);
        }

        return res.json();
      })
      .then(
        (result) => {
          console.log("Order Added Successfully!", result);
          setSnackbarOpen(true); // Show Snackbar on successful order
          setDialogOpen(true); // Optionally close the dialog or modal if it's open
        },
        (error) => {
          console.error("Error adding order:", error.message);
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
    // setAllowScroll(true);
    setTimeout(() => {
      setDialogOpen(true); // Open the Dialog before closing Offcanvas
      handleClose(); // Close the Offcanvas after 3 seconds
      clearBag();
      setShowFloatingButton(true);
      localStorage.setItem('floatingButtonVisible', 'true'); // שמירת המצב ב-localStorage
    }, 0);
  };
  
  

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const handleCollectOrder = () => {
    setShowFloatingButton(false); // מסתיר את הכפתור הצף
    setDialogOpen(false); // סוגר את הדיאלוג של ה-QRCode
  };

  return (
    <>
      <Offcanvas
        show={show}
        onHide={handleClose}
        placement="end"
         scroll={true} // מאפשר גלילה בתוך ה-Offcanvas
        style={{ zIndex: 1102, borderRadius: 20 }}
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
            <p style={{ fontSize: 20, fontWeight: "bold" }}>
              סל הקניות שלך ריק!
            </p>
          )}

          {showAlert && (
            <Alert severity="error" onClose={() => setShowAlert(false)}>
              <AlertTitle>Error</AlertTitle>
              יש צורך להיות מחובר כדי להמשיך בתהליך הקנייה
            </Alert>
          )}

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
      <FCQRCode
        open={dialogOpen}
        onClose={handleDialogClose}
        qrCodeValue={`https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/GetBusiness/${businessID}`}
        boxName={boxName}
        businessName={business.businessName || "שם העסק לא זמין"}
        businessAdress={business.businessAdress || "כתובת העסק לא זמינה"}
        onCollect={handleCollectOrder}
      />

      {showFloatingButton && (
        <div className="floating-button" onClick={() => setDialogOpen(true)}>
          <FiShoppingBag fontSize={32} />
          <span style={{ textAlign: "center" }}>ההזמנה שלי</span>
        </div>
      )}
    </>
  );
};

export default ShoppingBagCanvas;

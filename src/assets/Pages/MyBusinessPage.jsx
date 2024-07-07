// src/pages/MyBusinessPage.jsx
import React, { useState, useEffect } from "react";
import { Snackbar, Alert } from "@mui/material";
import BusinessDetailsDialog from "..//..//FCComponents/BusinessDetailsDialog.jsx";
import BusinessDetailsAccordion from "..//..//FCComponents/BusinessDetailsAccordion.jsx";
import BusinessDataCards from "..//..//FCComponents/BusinessDataCards.jsx";
import UploadImagesAccordion from "..//..//FCComponents/UploadImagesAccordion.jsx";
import OrdersAccordion from "..//..//FCComponents/OrdersAccordion.jsx";
import AddBoxPage from "..//Pages/AddBoxPage.jsx";
import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";

export default function MyBusinessPage() {
  const [businessSales, setBusinessSales] = useState({});
  const [openOrders, setOpenOrders] = useState([]);
  const [deliveredOrders, setDeliveredOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedInUser, setLoggedInUser] = useState({});
  const businessid = LoggedInUser.businessID;
  const [BusinessImage, setBusinessImage] = useState({});
  const [BusinessLogo, setBusinessLogo] = useState({});

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [editValues, setEditValues] = useState({
    businessName: LoggedInUser.businessName,
    businessType: LoggedInUser.businessType,
    contactInfo: LoggedInUser.contactInfo,
    dailySalesHour: LoggedInUser.dailySalesHour,
    openingHours: LoggedInUser.openingHours,
  });

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const Businessid2Send = businessid;

    if (name === "BusinessImage") {
      await uploadBusinessImage(file, Businessid2Send);
    } else if (name === "BusinessLogo") {
      await uploadBusinessLogo(file, Businessid2Send);
    }
  };

  const uploadBusinessImage = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("businessid", businessid);
    const url = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/FileUpload/uploadBusinessimage";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok)
        throw new Error(`Failed to upload business image: ${response.statusText}`);
      const data = await response.json();
      console.log("Business image uploaded:", data);
      return data;
    } catch (error) {
      console.error("Error during business image upload:", error);
      return null;
    }
  };

  const uploadBusinessLogo = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("businessid", businessid);
    const url = "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/FileUpload/uploadLogoImage";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok)
        throw new Error(`Failed to upload business logo: ${response.statusText}`);
      const data = await response.json();
      console.log("Business logo uploaded:", data);
      return data;
    } catch (error) {
      console.error("Error during business logo upload:", error);
      return null;
    }
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userData"));
    if (userData) {
      setIsLoggedIn(true);
      setLoggedInUser(userData);
      fetchBusinessData(userData.businessID);
    }
  }, []);

  const fetchBusinessData = async (businessId) => {
    const apiURL = `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/MyDataBusiness/GetSalesData?businessId=${businessId}`;
    try {
      const response = await fetch(apiURL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        },
      });
      if (!response.ok) throw new Error("Failed to fetch business data.");
      const data = await response.json();
      setBusinessSales(data);
      setOpenOrders(data.openOrders);
      setDeliveredOrders(data.deliveredOrders);
      console.log("this is data open orders", data.openOrders);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    console.log("Business Sales Updated:", businessSales);
    console.log("Open Orders:", businessSales.openOrders);
  }, [businessSales]);

  const handleClickOpenEditDialog = () => {
    setEditValues({
      businessName: LoggedInUser.businessName,
      businessType: LoggedInUser.businessType,
      contactInfo: LoggedInUser.contactInfo,
      dailySalesHour: LoggedInUser.dailySalesHour,
      openingHours: LoggedInUser.openingHours,
    });
    setOpenEditDialog(true);
  };

  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
  };

  const handleSaveChanges = async () => {
    const businessId = LoggedInUser.businessID;
    const url = `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/UpdateBusiness/${businessId}`;
    
    const updatedBusinessDetails = {
      businessName: editValues.businessName,
      businessType: editValues.businessType,
      contactInfo: editValues.contactInfo,
      dailySalesHour: editValues.dailySalesHour,
      openingHours: editValues.openingHours,
    };

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedBusinessDetails),
      });

      if (!response.ok) {
        throw new Error(`Failed to update business details: ${response.statusText}`);
      }

      const data = await response.json();
      console.log('Business details updated:', data);
      setSnackbarMessage("פרטי העסק שלך עודכנו נא להתנתק ולהתחבר מחדש!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      setOpenEditDialog(false);
    } catch (error) {
      console.error('חלה בעיה בעדכון הפרטים נסה מאוחר יותר');
      setSnackbarMessage("Error updating business details. Please try again.");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleEditChange = (event) => {
    setEditValues({
      ...editValues,
      [event.target.name]: event.target.value,
    });
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ backgroundColor: "white", height: "150vh" }}>
      <div style={{ width: "75%", margin: "0 auto" }}>
        <h1>שלום! ,{LoggedInUser.businessName}</h1>

        <UploadImagesAccordion handleFileChange={handleFileChange} />
        <OrdersAccordion openOrders={openOrders} deliveredOrders={deliveredOrders} />
        <BusinessDetailsAccordion LoggedInUser={LoggedInUser} handleClickOpenEditDialog={handleClickOpenEditDialog} />
        <BusinessDataCards businessSales={businessSales} />

        <Accordion defaultExpanded style={{ backgroundColor: "#EEEEEE" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontSize: 25 }}>
              <ControlPointTwoToneIcon /> הוספת מארז
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <AddBoxPage />
          </AccordionDetails>
        </Accordion>
      </div>

      <BusinessDetailsDialog
        open={openEditDialog}
        onClose={handleCloseEditDialog}
        onSave={handleSaveChanges}
        editValues={editValues}
        handleEditChange={handleEditChange}
      />

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

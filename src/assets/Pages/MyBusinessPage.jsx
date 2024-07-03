// src/pages/MyBusinessPage.jsx
import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddBoxPage from "../Pages/AddBoxPage.jsx";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Button,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import DataThresholdingTwoToneIcon from "@mui/icons-material/DataThresholdingTwoTone";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";
import ControlPointTwoToneIcon from "@mui/icons-material/ControlPointTwoTone";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import FCOrdersGrid from "../../FCComponents/FCOrderGrid.jsx";
import FCDeliveredOrders from "../../FCComponents/FCDeliveredOrders.jsx";

export default function MyBusinessPage() {
  const [businessSales, setBusinessSales] = useState({});
  const [openOrders, setOpenOrders] = useState([]);
  const [deliveredOrders, setdeliveredOrders] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [LoggedInUser, setLoggedInUser] = useState({});
  const businessid = LoggedInUser.businessID;
  const [BusinessImage, setBusinessImage] = useState({});
  const [BusinessLogo, setBusinessLogo] = useState({});

  const handleFileChange = async (e) => {
    const { name, files } = e.target;
    const file = files[0];
    if (!file) return;

    const Businessid2Send = businessid; // This should be fetched or defined based on your application's context

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
    const url =
      "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/FileUpload/uploadBusinessimage";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok)
        throw new Error(
          `Failed to upload business image: ${response.statusText}`
        );
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
    const url =
      "https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/FileUpload/uploadLogoImage";
    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });
      if (!response.ok)
        throw new Error(
          `Failed to upload business logo: ${response.statusText}`
        );
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
      setOpenOrders(data.openOrders); // Set open orders data
      setdeliveredOrders(data.deliveredOrders); 

      console.log("this is data open orders", data.openOrders);
    } catch (error) {
      console.error("Something went wrong:", error);
    }
  };

  useEffect(() => {
    console.log("Business Sales Updated:", businessSales);
    console.log("Open Orders:", businessSales.openOrders);
  }, [businessSales]);

  const DataCard = ({ icon: Icon, title, number }) => (
    <Card
      sx={{
        minWidth: 240,
        boxShadow: 3,
        borderRadius: 2,
        m: 1,
        textAlign: "center",
      }}
    >
      <CardContent>
        <Icon sx={{ fontSize: 40, color: "#DC5F00" }} />
        <Typography variant="h6" component="div">
          {title}
        </Typography>
        <Typography
          variant="h4"
          component="div"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            fontWeight: "bold",
            justifyContent: "center",
          }}
        >
          {number.toLocaleString()}
        </Typography>
      </CardContent>
    </Card>
  );

  return (
    <div style={{ backgroundColor: "white", height: "150vh" }}>
      <div style={{ width: "75%", margin: "0 auto" }}>
        <h1>שלום! ,{LoggedInUser.businessName}</h1>

        <Accordion defaultExpanded style={{ backgroundColor: "#EEEEEE" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontSize: 25 }}>
              <AddPhotoAlternateTwoToneIcon /> העלאת תמונת העסק
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-start",
                  alignContent: "center",
                  flexDirection: "row",
                  gap: 15,
                }}
              >
                <div dir="rtl">
                  <Button
                    style={{
                      backgroundColor: "#ffc107",
                      fontFamily: "Arimo",
                      fontWeight: 500,
                    }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    תמונת רקע לעסק
                    <input
                      type="file"
                      name="BusinessImage"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                </div>
                <div dir="rtl">
                  <Button
                    style={{
                      backgroundColor: "#ffc107",
                      fontFamily: "Arimo",
                      fontWeight: 500,
                    }}
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                  >
                    לוגו של העסק
                    <input
                      type="file"
                      name="BusinessLogo"
                      hidden
                      onChange={handleFileChange}
                    />
                  </Button>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded style={{ backgroundColor: "#EEEEEE" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography style={{ fontSize: 25 }}>
              <ShoppingBagTwoToneIcon /> הזמנות פתוחות
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FCOrdersGrid openOrders={openOrders} />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded style={{ backgroundColor: "#EEEEEE" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel3a-content"
            id="panel3a-header"
          >
            <Typography style={{ fontSize: 25 }}>
              <ShoppingBagTwoToneIcon />
              היסטוריית הזמנות
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <FCDeliveredOrders deliveredOrders={deliveredOrders} />
          </AccordionDetails>
        </Accordion>

        <Accordion defaultExpanded style={{ backgroundColor: "#EEEEEE" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography style={{ fontSize: 25 }}>
              <TextSnippetTwoToneIcon /> פרטי העסק
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography><b>שם העסק: </b>{LoggedInUser.businessName}</Typography>
            <Typography><b>סוג העסק: </b> {LoggedInUser.businessType}</Typography>
            <Typography><b>פרטי תקשורת:  </b>{LoggedInUser.contactInfo}</Typography>
            <Typography>
            <b>שעות איסוף קבלה: </b>{LoggedInUser.dailySalesHour}
            </Typography>
            <Typography>
            <b>שעות פתיחה: </b>{LoggedInUser.openingHours}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ backgroundColor: "#EEEEEE" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel2a-content"
            id="panel2a-header"
          >
            <Typography style={{ fontSize: 25 }}>
              <DataThresholdingTwoToneIcon /> נתוני מכירות
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <DataCard
                  icon={ShoppingBagTwoToneIcon}
                  title="מכירות"
                  number={businessSales.totalBoxesOrdered || 0}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DataCard
                  icon={TimerTwoToneIcon}
                  title="מארזים למסירה"
                  number={businessSales.ordersPending || 0}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <DataCard
                  icon={AccountBalanceWalletTwoToneIcon}
                  title="הכנסות"
                  number={businessSales.totalPrice + "₪" || 0}
                />
              </Grid>
            </Grid>
          </AccordionDetails>
        </Accordion>

        <Accordion style={{ backgroundColor: "#EEEEEE" }}>
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
    </div>
  );
}

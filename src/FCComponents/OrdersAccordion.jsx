import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import FCOrdersGrid from "..//FCComponents/FCOrderGrid.jsx";
import FCDeliveredOrders from "..//FCComponents/FCDeliveredOrders.jsx";

const OrdersAccordion = ({ openOrders, deliveredOrders }) => (
  <>
    <Accordion  style={{ backgroundColor: "#EEEEEE" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography style={{ fontSize: 25 , fontFamily:'Varela Round'}}>
          <ShoppingBagTwoToneIcon /> הזמנות פתוחות
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FCOrdersGrid openOrders={openOrders} />
      </AccordionDetails>
    </Accordion>

    <Accordion  style={{ backgroundColor: "#EEEEEE" }}>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="panel3a-content"
        id="panel3a-header"
      >
        <Typography style={{ fontSize: 25 , fontFamily:'Varela Round'}}>
          <ShoppingBagTwoToneIcon />
          היסטוריית הזמנות
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FCDeliveredOrders deliveredOrders={deliveredOrders} />
      </AccordionDetails>
    </Accordion>
  </>
);

export default OrdersAccordion;

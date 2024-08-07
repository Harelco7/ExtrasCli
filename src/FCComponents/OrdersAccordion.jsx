import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import FCOrdersGrid from "..//FCComponents/FCOrderGrid.jsx";
import FCDeliveredOrders from "..//FCComponents/FCDeliveredOrders.jsx";

const OrdersAccordion = ({ openOrders, deliveredOrders }) => (
  <>
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
  </>
);

export default OrdersAccordion;

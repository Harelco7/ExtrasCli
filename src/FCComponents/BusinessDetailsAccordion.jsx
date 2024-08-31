import React from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Button,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";

const BusinessDetailsAccordion = ({
  LoggedInUser,
  handleClickOpenEditDialog,
}) => (
  <Accordion defaultExpanded style={{ backgroundColor: "#EEEEEE" }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography style={{ fontSize: 25 , fontFamily:'Varela Round'}}>
        <TextSnippetTwoToneIcon /> פרטי העסק
      </Typography>
    </AccordionSummary>
    <AccordionDetails>
      <Typography style={{fontFamily:'Varela Round'}}>
        <b>שם העסק: </b>
        {LoggedInUser.businessName}
      </Typography>
      <Typography style={{fontFamily:'Varela Round'}}>
        <b>כתובת : </b>
        {LoggedInUser.address}
      </Typography>
      <Typography style={{fontFamily:'Varela Round'}}>
        <b>סוג העסק: </b> {LoggedInUser.businessType}
      </Typography>
      <Typography style={{fontFamily:'Varela Round'}}>
        <b>פרטי תקשורת: </b>
        {LoggedInUser.contactInfo}
      </Typography>
      <Typography style={{fontFamily:'Varela Round'}}>
        <b>שעות איסוף קבלה: </b>
        {LoggedInUser.dailySalesHour}
      </Typography>
      <Typography style={{fontFamily:'Varela Round'}}>
        <b>שעות פתיחה: </b>
        {LoggedInUser.openingHours}
      </Typography>
      <Button
        variant="contained"
        style={{ backgroundColor: "#d67d00", marginTop: 10 , fontFamily:'Varela Round'}}
        onClick={handleClickOpenEditDialog}
      >
        עריכת פרטי העסק
      </Button>
    </AccordionDetails>
  </Accordion>
);

export default BusinessDetailsAccordion;

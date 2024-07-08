import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import TextSnippetTwoToneIcon from "@mui/icons-material/TextSnippetTwoTone";

const BusinessDetailsAccordion = ({ LoggedInUser, handleClickOpenEditDialog }) => (
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
      <Button variant="contained" style={{backgroundColor:"#d67d00",marginTop:10}} onClick={handleClickOpenEditDialog}>
        עריכת פרטי בעסק
      </Button>
    </AccordionDetails>
  </Accordion>
);

export default BusinessDetailsAccordion;

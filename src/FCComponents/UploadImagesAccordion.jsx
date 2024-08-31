import React from "react";
import { Accordion, AccordionSummary, AccordionDetails, Typography, Button } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AddPhotoAlternateTwoToneIcon from "@mui/icons-material/AddPhotoAlternateTwoTone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadImagesAccordion = ({ handleFileChange }) => (
  <Accordion  style={{ backgroundColor: "#EEEEEE" }}>
    <AccordionSummary
      expandIcon={<ExpandMoreIcon />}
      aria-controls="panel1a-content"
      id="panel1a-header"
    >
      <Typography style={{ fontSize: 25 , fontFamily:'Varela Round'}}>
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
                backgroundColor: "#D67D00",
                fontFamily: 'Varela Round',
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
                backgroundColor: "#D67D00",
                fontFamily: 'Varela Round',
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
);

export default UploadImagesAccordion;

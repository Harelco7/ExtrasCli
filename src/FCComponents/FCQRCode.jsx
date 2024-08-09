import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import QRCode from "react-qr-code";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const FCQRCode = ({
  open,
  onClose,
  qrCodeValue,
  boxName,
  businessName,
  businessAdress,
  onCollect 
}) => {

  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleCollect = () => {
    setSnackbarOpen(true); // פותח את ה-Snackbar עם ההודעה
    onCollect(); // מפעיל את הפונקציה שסוגרת את הדיאלוג ומסתירה את הכפתור הצף
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  }; 

  return (
    <>
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>
          ההזמנה של {boxName} נשלחה בהצלחה לעסק-{businessName} לכתובת{" "}
          {businessAdress}
          <CheckCircleIcon
            style={{ color: "green", verticalAlign: "middle", marginLeft: 5 }}
          />
        </DialogTitle>
        {qrCodeValue && (
          <div id="Container" style={{ marginTop: 20, textAlign: "center" }}>
            <QRCode value={qrCodeValue} />
            <p style={{ marginTop: 10, fontSize: 16 }}>
              <br />
              נא להראות את הקוד לבית העסק
              <CameraAltIcon style={{ marginLeft: 5, verticalAlign: "middle" }} />
              <br />
            </p>
          </div>
        )}
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
          <Button 
            variant="contained" 
            color="success" 
            onClick={handleCollect} // הפונקציה הנכונה לסגירה והצגת Snackbar
            style={{ backgroundColor: "#4caf50" }}
          >
            אספתי את ההזמנה
          </Button>
        </div>
        <br />
      </Dialog>

      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          תודה שהזמנת מ-EXTRAS!
        </Alert>
      </Snackbar>
    </>
  );
};

export default FCQRCode;

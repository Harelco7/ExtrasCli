import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import QRCode from "react-qr-code";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

const FCQRCode = ({
  open,
  onClose,
  qrCodeValue,
  boxName,
  businessName,
  businessAdress,
}) => {
  // console.log("i just found", businessName, businessAdress);
  return (
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
    </Dialog>
  );
};

export default FCQRCode;

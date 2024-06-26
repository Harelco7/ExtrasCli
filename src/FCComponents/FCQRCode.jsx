import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import QRCode from 'react-qr-code';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CameraAltIcon from '@mui/icons-material/CameraAlt';

const FCQRCode = ({ open, onClose, qrCodeValue }) => {

    return (
        <Dialog open={open} onClose={onClose}>
          <DialogTitle>
            ההזמנה בוצעה בהצלחה ונשלחה לבית העסק!
            <CheckCircleIcon style={{ color: 'green', verticalAlign: 'middle', marginLeft: 5 }} />
          </DialogTitle>
          {qrCodeValue && (
            <div id="Container" style={{ marginTop: 20, textAlign: "center" }}>
              <QRCode value={qrCodeValue} />
              <p style={{ marginTop: 10, fontSize: 16 }}>
                <br />
                נא לצלם מסך זה ולהראות לבית העסק
                <CameraAltIcon style={{ marginLeft: 5, verticalAlign: 'middle' }} />
                <br />
              </p>
            </div>
          )}
        </Dialog>
      );
    };
    
    export default FCQRCode;
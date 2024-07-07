import React from "react";
import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from "@mui/material";
import rtlPlugin from "stylis-plugin-rtl";
import { prefixer } from "stylis";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";




const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});

const BusinessDetailsDialog = ({ open, onClose, onSave, editValues, handleEditChange }) => (
  <Dialog open={open} onClose={onClose}>
    <DialogTitle>עדכון פרטי העסק</DialogTitle>
    <DialogContent>
      <DialogContentText>
        לעדכון יש לשנות את השדה ואת הערך שתרצה לשנות לאליו
      </DialogContentText>
      <CacheProvider value={cacheRtl}>
      <TextField
        margin="dense"
        name="businessName"
        label="שם העסק"
        type="text"
        fullWidth
        value={editValues.businessName}
        onChange={handleEditChange}
      />
      <TextField
        margin="dense"
        name="businessType"
        label="סוג העסק"
        type="text"
        fullWidth
        value={editValues.businessType}
        onChange={handleEditChange}
      />
      <TextField
        margin="dense"
        name="contactInfo"
        label="פרטי יצירת קשר"
        type="text"
        fullWidth
        value={editValues.contactInfo}
        onChange={handleEditChange}
      />
      <TextField
        margin="dense"
        name="dailySalesHour"
        label="שעות איסוף"
        type="text"
        fullWidth
        value={editValues.dailySalesHour}
        onChange={handleEditChange}
      />
      <TextField
        margin="dense"
        name="openingHours"
        label="שעות פתיחה"
        type="text"
        fullWidth
        value={editValues.openingHours}
        onChange={handleEditChange}
      />
      </CacheProvider>
    </DialogContent>
    <DialogActions>
      <Button onClick={onClose} color="primary">
       ביטול
      </Button>
      <Button onClick={onSave} color="primary">
        שמור עדכונים
      </Button>
    </DialogActions>
  </Dialog>
);

export default BusinessDetailsDialog;

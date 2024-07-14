import React, { useState } from 'react';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import { Box, Dialog, TextField, DialogActions, DialogContent, DialogTitle, Button } from '@mui/material';
import '../Styles/ClientProfileDetails.css';
import profile from '../../public/Images/profile.jpg';


const ClientProfileDetails = ({ userData }) => {
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState({
    customerName: userData.customerName,
    UserID: userData.userID, // Ensure the key name matches exactly what your backend expects
    address: userData.address,
    phoneNumber: userData.phoneNumber,
    Email: userData.email
  });


  const raw = JSON.stringify({
    "UserID": userData.userID,
    "customerName": editData.customerName,
    "address": editData.address,
    "phoneNumber":editData.phoneNumber,
    "Email":editData.Email,
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);


  const handleSave = async () => {
    console.log("Sending update data:", editData); // Logs the data being sent for update
    const url = `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/User/UpdateUserDetails/${userData.customerID}`;

    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editData) // Ensure this uses JSON.stringify
        });

        if (!response.ok) {
            throw new Error(`Failed to update user details: ${response.statusText}`);
        }

        // Additional logging to verify the response was successful
        console.log("Update successful, status:", response.status); // Logs the status code of the response

       handleClose();

    } catch (error) {
        console.error('Error updating user details:', error);
    }
};


  
  const handleChange = (e) => {
    setEditData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="alldetails-wrapper">
      <div className="profile-card">
        <div className="right-container">
          <Avatar className="avatar" src={profile} sx={{ height: 80, width: 80 }} />
          <Button variant="text" onClick={handleOpen}>עריכה</Button>
        </div>
        <div className="left-container">
          <div className="wrapper-name">
            <h3>{userData.customerName}</h3>
          </div>
          <div className="wrapper-det">
            <div className="det">
              <h4>מייל</h4>
              <p>{userData.email}</p>
            </div>
            <div className="det">
              <h4>כתובת</h4>
              <p>{userData.address}</p>
            </div>
            <div className="det">
              <h4>טלפון</h4>
              <p>{userData.phoneNumber}</p>
            </div>
          </div>
        </div>
      </div>

     
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>עדכון פרופיל</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="שם"
            type="text"
            fullWidth
            variant="standard"
            name="customerName"
            value={editData.customerName}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="מייל"
            type="email"
            fullWidth
            variant="standard"
            name="email"
            value={editData.Email}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="כתובת"
            type="text"
            fullWidth
            variant="standard"
            name="address"
            value={editData.address}
            onChange={handleChange}
          />
          <TextField
            margin="dense"
            label="טלפון"
            type="tel"
            fullWidth
            variant="standard"
            name="phoneNumber"
            value={editData.phoneNumber}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>בטל</Button>
          <Button onClick={handleSave}>שמור</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ClientProfileDetails;


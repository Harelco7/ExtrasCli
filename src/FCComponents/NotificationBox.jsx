import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";  
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { produrl } from "../Settings";
import axios from "axios";
import "../Styles/NotificationBox.css";


export default function NotificationBox(props) {
    const { userId } = props
    const [open, setOpen] = React.useState(false);
    const [boxDetails, setBoxDetails] = useState([]);
    const navigate = useNavigate();  // שימוש ב-useNavigate
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetch() {
            let config = {
                method: 'get',
                maxBodyLength: Infinity,
                url: `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Orders/ShowOrders/${userId}`,
                headers: {
                    'Content-Type': 'application/json'
                }
            };

            axios.request(config)
                .then((response) => {
                    if (response && response.data && response.data !== 0) {
                        setBoxDetails(response.data)
                    }
                    console.log(userId)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        userId && !boxDetails.length && fetch()
    }, [userId, boxDetails.length]);

    const handleOrderNow = (boxId) => {
        navigate(`/box/${boxId}`);  // מעבר לעמוד של המארז
        setOpen(false);
    };
    
    return (
        <div>
            {boxDetails && boxDetails.length > 0 ? ( <Button style={{ transform: "translateX(-40vw)" }} onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faBell} size="2x" color="orange" />
                <span className="notification" style={{ position: "absolute", top: -3, right: -3, padding: "1px", background: "red", color: "white", borderRadius: "50%", width: "20px", height: "20px", fontSize: "12px" }}>{boxDetails.length}</span>
            </Button>  ) : (
                <div style={{ transform: "translateX(-40vw)" }} ><FontAwesomeIcon icon={faBell} size="2x" color="orange" /></div>
            )}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <Button onClick={handleClose} className="btn-close"></Button>
                <DialogTitle className="alert-dialog-title">
                    מצאנו עבורך מארזים שאולי תאהב!
                </DialogTitle>
                <DialogContent className="dialog-content"> {boxDetails && boxDetails.length > 0 && boxDetails.map((x, i) => (
                    <div key={`boxDetails${i}`} className="box-suggestion">
                        <h6>{x["box_name"]}</h6>
                        <p>{x["box_description"]}</p>
                        <p>מחיר מקורי: {x["price"]}₪</p>
                        <p>מחיר מוזל: {x["sale_price"]}₪</p>
                        <DialogActions>
                        <Button onClick={() => handleOrderNow(x["box_id"])} autoFocus className="btn-order">
                        הזמן עכשיו
                    </Button>
                </DialogActions>
                    </div>))}
                    
                </DialogContent>
            </Dialog>
        </div>
    );
}

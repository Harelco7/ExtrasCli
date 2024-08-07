import React, { useEffect, useState } from "react";
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

export default function NotificationBox(props) {
    const { userId } = props
    const [open, setOpen] = React.useState(false);
    const [boxDetails, setboxDetails] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        async function fetch() {
            console.log("***")
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
                   if(response && response.data && response.data!=0){
                     setboxDetails(response.data)}
                    console.log(userId)
                })
                .catch((error) => {
                    console.log(error);
                });

        }
        userId && !boxDetails && fetch()
    }, [userId])


    return (
        <React.Fragment>
            { boxDetails && boxDetails.length>0 ? <Button style={{ transform: "translateX(-40vw)" }} onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faBell} size="2x" color="orange" />
                <span style={{ position: "absolute", top: 0, right: 0, padding: "4px", background: "red", color: "white", borderRadius: "50%" }}>{boxDetails.length}</span>
            </Button> :
                <div style={{ transform: "translateX(-40vw)" }} ><FontAwesomeIcon icon={faBell} size="2x" color="orange" /></div>
            }
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    מצאנו עבורך מארז שאולי תאהב!
                </DialogTitle> 
                <DialogContent> { boxDetails && boxDetails.length>0 && boxDetails.map((x,i) => 
                    <div key={`boxDetails${i}`}><p>{x["box_name"]}</p> <p>{x["box_description"]}</p> <p>{x["price"]}</p></div>
)}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>סגירה</Button>
                    <Button onClick={handleClose} autoFocus>
                        הזמן עכשיו
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}

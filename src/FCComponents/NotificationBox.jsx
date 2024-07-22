import React, { useEffect, useState } from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

export default function NotificationBox(props) {
    const {userId} = props
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
            // const res = await boxSuggest(userId)
            // if (res) {
            //     // setboxSuggest()
            // }

            setboxDetails( {
                "box_id": 300,
                "business_id": 200,
                "order_id": null,
                "box_name": "דונאטס",
                "box_description": "5 דונאטס שוקולד",
                "price": 30.00,
                "quantity_available": 7,
                "date_added": "2024-05-30T00:00:00",
                "box_image": null,
                "alergic_type": "גלוטן",
                "sale_price": null,
                "keyword_id": 700,
                "box_id1": 300
            })
        }
        userId && fetch()
    }, [userId])


  return (
        <React.Fragment>
            {boxDetails && <Button style={{transform: "translateX(-40vw)"}} onClick={handleClickOpen}>
            <FontAwesomeIcon icon={faBell} size="2x" color="orange"/>
            <span style={{position: "absolute", top:0, right:0, padding: "4px", background:"red", color: "white", borderRadius:"50%"}}>1</span>
            </Button>}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    מצאנו עבורך מארז שאולי תאהב!
                </DialogTitle>
                <DialogContent> <p>{boxDetails["box_name"]}</p> <p>{boxDetails["box_description"]}</p> <p>{boxDetails["price"]}</p>
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

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
    const [businessDetails, setBusinessDetails] = useState({});
    const navigate = useNavigate(); 
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
    
            try {
                const response = await axios.request(config);
                if (response && response.data && response.data !== 0) {
                    setBoxDetails(response.data);
    
                    // Fetch business details for each box
                    const businessIds = [...new Set(response.data.map(box => box.business_id))];
                    const businessData = await Promise.all(businessIds.map(id => fetchBusinessDetails(id)));
                    const businessDataMap = businessData.reduce((acc, business) => {
                        if (business && business.businessId) {  // Check if business and businessId exist
                            acc[business.businessId] = business; // Ensure we use `businessId` not `business_id`
                        }
                        return acc;
                    }, {});
    
                    setBusinessDetails(businessDataMap); // Set business details state
                    console.log("Business details set:", businessDataMap);  // Log the business details map
                }
            } catch (error) {
                console.error(error);
            }
        }
    
        async function fetchBusinessDetails(businessId) {
            try {
                const response = await axios.get(`https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/GetBusiness/${businessId}`);
                console.log(`Fetched business details for business ID ${businessId}:`, response.data);
                return response.data;
            } catch (error) {
                console.error(`Failed to fetch business details for business ID ${businessId}:`, error);
                return {};
            }
        }
    
        userId && !boxDetails.length && fetch();
    }, [userId, boxDetails.length]);
    

    const handleOrderNow = (boxId) => {
        navigate(`/box/${boxId}`);  // מעבר לעמוד של המארז
        setOpen(false);
    };
    
    return (
        <div>
            {boxDetails && boxDetails.length > 0 ? ( <Button style={{ transform: "translateX(-27vw)" }} onClick={handleClickOpen}>
                <FontAwesomeIcon icon={faBell} size="2x" color="orange" />
                <span className="notification" style={{ position: "absolute", top: -3, right: -3, padding: "1px", background: "red", color: "white", borderRadius: "50%", width: "20px", height: "20px", fontSize: "12px" }}>{boxDetails.length}</span>
            </Button>  ) : (
                <div style={{ transform: "translateX(-33vw)" }} ><FontAwesomeIcon icon={faBell} size="2x" color="orange" /></div>
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
                <DialogContent className="dialog-content"> {boxDetails && boxDetails.length > 0 && boxDetails.map((x, i) => {
            console.log("Rendering box with business ID:", x.business_id, "Business details:", businessDetails[x.business_id]);
            return (
                <div key={`boxDetails${i}`} className="box-suggestion">
                <h6>{x["box_name"]}</h6>
                <img 
                  src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BoxImage/${x.box_id}.JPG`} 
                  alt={x["box_name"]} 
                  className="product-image"  
                 />
                    <p>{x["box_description"]}</p>
                    <p>מחיר מקורי: {x["price"]}₪</p>
                    <p>מחיר מוזל: {x["sale_price"]}₪</p>
                    <p>שם בית העסק: {businessDetails[x.business_id]?.businessName || 'Loading...'}</p>
                    <h6>המארז יעלה בין השעות: {businessDetails[x.business_id]?.dailySalesHour || 'Loading...'}</h6>
        </div>
    );
})}
                    
                </DialogContent>
            </Dialog>
        </div>
    );
}

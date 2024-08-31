import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { TbShoppingBagX } from "react-icons/tb";
import Button from "@mui/material/Button";
import "../../Styles/BusinessPage.css";
import FCBoxCard from "../../FCComponents/FCBoxCard";
import Fab from "@mui/material/Fab";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faStar,
  faWheatAwn,
  faCheese,
  faDrumstickBite,
  faCarrot,
  faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { WhatsappShareButton } from "react-share";
import { SiWhatsapp } from "react-icons/si";
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

// Icon mapping for common allergies
const allergyIcons = {
  אגוזים: faStar,
  גלוטן: faWheatAwn,
  חלבי: faCheese,
  בשרי: faDrumstickBite,
  צמחוני: faCarrot,
  טבעוני: faSeedling,
};

// List of common allergies
const commonAllergies = ["אגוזים", "גלוטן", "חלבי", "בשרי", "צמחוני", "טבעוני"];

const createGoogleCalendarEvent = (salesHour, reminderMinutes) => {
  if (!salesHour || !salesHour.includes("-")) {
    console.error("Invalid sales hour format:", salesHour);
    return;
  }

  const [startHour, startMinute] = salesHour.split("-")[0].split(":").map(Number);
  const eventStartTime = new Date();
  eventStartTime.setHours(startHour, startMinute - reminderMinutes, 0);

  if (isNaN(eventStartTime.getTime())) {
    console.error("Invalid time value:", eventStartTime);
    return;
  }

  const eventEndTime = new Date(eventStartTime.getTime() + 10 * 60 * 1000);

  const startTimeISO = eventStartTime.toISOString().replace(/-|:|\.\d\d\d/g, "");
  const endTimeISO = eventEndTime.toISOString().replace(/-|:|\.\d\d\d/g, "");

  const calendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(
    "ניתן לרכוש מארזים מבית העסק בעוד 10 דקות"
  )}&dates=${startTimeISO}/${endTimeISO}&details=${encodeURIComponent(
    "Reminder to purchase boxes from the business"
  )}&sf=true&output=xml`;

  console.log(calendarUrl); // Check the URL in the console
  return calendarUrl;
};



// Main React component for the Business Page
export default function BusinessPage({ onBusinessIDChange }) {
  const { businessId } = useParams();
  const location = useLocation();
  const [businessDetails, setBusinessDetails] = useState({});
  const [boxes, setBoxes] = useState([]);
  console.log (boxes);
  const [filters, setFilters] = useState(
    commonAllergies.reduce((filterObject, allergy) => {
      filterObject[allergy] = false;
      return filterObject;
    }, {})
  );
  const [countdown, setCountdown] = useState(null);
  const [showBoxes, setShowBoxes] = useState(false);
  

  // Effect hook to update the business ID via the parent component's callback
  useEffect(() => {
    onBusinessIDChange(businessId);
  }, [businessId, onBusinessIDChange]);

  // Effect hook to fetch business details and initialize the countdown
  useEffect(() => {
    const fetchBusinessDetails = async () => {
      try {
        const response = await fetch(
          `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/GetBusiness/${businessId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch business details");
        }
        const data = await response.json();
        console.log(data);
        setBusinessDetails(data);
        initializeCountdown(data.dailySalesHour);
      } catch (error) {
        console.error("Error fetching business details:", error);
      }
    };

    if (businessId) {
      fetchBusinessDetails();
    }
  }, [businessId]);

  // Effect hook to fetch boxes when they are supposed to be shown
  useEffect(() => {
    const fetchBoxes = async () => {
      if (!showBoxes) return;

      const BoxUrl = `https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/Business/ShowBoxes/${businessId}`;
      try {
        const response = await fetch(BoxUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json; charset=UTF-8",
            Accept: "application/json; charset=UTF-8",
          },
        });
        if (!response.ok) {
          throw new Error("Something Went Wrong :(");
        }
        const boxesData = await response.json();
        setBoxes(boxesData);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };

    fetchBoxes();
  }, [businessId, showBoxes]);

  // Function to initialize countdown based on business's sales hour
  const initializeCountdown = (salesHour) => {
    const [time1, time2] = salesHour.split("-").map((time) => {
      const [hours, minutes] = time.split(":").map(Number);
      // Use a new date instance for each time to avoid mutation
      return new Date(new Date().setHours(hours, minutes, 0, 0));
    });

    // Sort the times
    let startTime = new Date(Math.min(time1, time2));
    let endTime = new Date(Math.max(time1, time2));

    const updateCountdown = () => {
      const currentTime = new Date();

      // Show boxes or start countdown
      if (currentTime >= startTime && currentTime < endTime) {
        // Within the sales window
        setShowBoxes(true);
        setCountdown(null);
      } else {
        // Outside the sales window
        setShowBoxes(false);
        let targetTime;

        if (currentTime >= endTime) {
          // After end time, countdown to next day's start time
          targetTime = new Date(startTime);
          targetTime.setDate(targetTime.getDate() + 1);
        } else {
          // Before start time, countdown to today's start time
          targetTime = startTime;
        }

        const diff = targetTime - currentTime;

        if (diff <= 0) {
          clearInterval(timer);
          setShowBoxes(currentTime >= startTime && currentTime < endTime);
        } else {
          const seconds = Math.floor(diff / 1000);
          const hh = Math.floor(seconds / 3600);
          const mm = Math.floor((seconds % 3600) / 60);
          const ss = seconds % 60;

          // Format the countdown string as HH:MM:SS
          const formattedCountdown = `${hh.toString().padStart(2, "0")}:${mm
            .toString()
            .padStart(2, "0")}:${ss.toString().padStart(2, "0")}`;
          setCountdown(formattedCountdown);
        }
      }
    };

    updateCountdown(); // Immediately run to set initial state
    const timer = setInterval(updateCountdown, 1000); // Ensure it runs every second
    return () => clearInterval(timer);
  };
  
  const businessDescription = businessDetails.businessDescription || '';
  const sentences = businessDescription.split('.').filter(Boolean); 
  

   // Filter boxes based on selected allergens
   const filteredBoxes = boxes.filter((box) => {
    for (let allergy in filters) {
      // Check if the filter is enabled
      if (filters[allergy]) {
        if (["אגוזים", "גלוטן", "חלבי", "בשרי"].includes(allergy)) {
          // Exclude box if it contains any of these allergens
          if (box.alergicType && box.alergicType.includes(allergy)) {
            return false; // Exclude this box
          }
        } else if (["צמחוני", "טבעוני"].includes(allergy)) {
          // Include box if it contains "צמחוני" or "טבעוני"
          if (box.alergicType && !box.alergicType.includes(allergy)) {
            return false; // Exclude if it doesn't contain "צמחוני" or "טבעוני"
          }
        }
      }
    }
    return true; // Include this box in the filtered list
  });

  // Conditional rendering of the business page
  return (
    <div className="business-page-container">
      {/* Header with business image and details */}
      <div
        className="img-container"
        style={{
          backgroundImage: `url('https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessImage/${businessDetails.businessPhoto}')`,
        }}
      >
        <h1>
          {businessDetails.businessName} | {businessDetails.businessAdress}
        </h1>
        <p>שעות איסוף : {businessDetails.dailySalesHour}</p>
        <img
          className="Business-logo"
          src={`https://proj.ruppin.ac.il/bgroup33/test2/images/BusinessLogo/${businessDetails.businesslogo}`}
          alt="Business Logo"
        />
      </div>
      {/* WhatsApp share button */}
      <div
        style={{
          position: "fixed",
          bottom: "90px",
          right: "6px",
          zIndex: 1201,
        }}
      >
        <WhatsappShareButton
          url={`https://proj.ruppin.ac.il/bgroup33/test2/dist/index.html#/BusinessPage/${businessId}`}
          title={`Check out ${businessDetails.businessName} on our website!`}
          separator=":: "
        >
          <Fab
            style={{
              backgroundColor: "#25D366",
              width: "60px",
              height: "60px",
              color: "white",
            }}
            aria-label="whatsapp"
          >
            <SiWhatsapp size={32} />
          </Fab>
        </WhatsappShareButton>
      </div>
      {/* Business description */}
      <div className="business-desc">
        {sentences.map((sentence, index) => (
      <div key={index}>
        {sentence.trim()}.<br />
      </div> ))}
      </div>
      
      {/* Allergy filters */}
      {businessDetails.businessType !== "Flowers" && (
  <div className="allergics-container">
    <div className="allergic-title">
      <h3>סנן מארזים על פי אלרגיות:</h3>
    </div>
    <div className="allergic-buttons">
      {commonAllergies.map((allergy) => (
        <Button
          key={allergy}
          title={allergy}
          onClick={() =>
            setFilters({
              ...filters,
              [allergy]: !filters[allergy],
            })
          }
          style={{
            margin: "5px",
            backgroundColor: filters[allergy] ? "#4caf50" : "white",
            color: filters[allergy] ? "white" : "black",
            border: "1px solid black",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            fontSize: "16px",
            textTransform: "none",
            zIndex: 100,
          }}
        >
          <FontAwesomeIcon size={"2x"} icon={allergyIcons[allergy]} />
        </Button>
      ))}
    </div>
  </div>
)}
      {/* Box display or countdown */}
      <div>
        {showBoxes ? (
          <div className="box-container">
          {filteredBoxes.length > 0 ? (
            <div className="grid-container">
              {filteredBoxes.map((box, index) => (
                <div key={index} className="grid-item">
                  <FCBoxCard box={box} businessID={businessId} boxId={box.boxId}/>
                </div>
              ))}
            </div>
          ) : (
              <div className="OOS-container">
                <p style={{ fontSize: 40, color: "red" }}>
                 אין מארזים במלאי <TbShoppingBagX />
                </p>
              </div>
            )}
          </div>
        ) : (
          <div className="countdown-container">
            <h3>מארזים מוזלים יעלו בעוד</h3>
            <div className="countdown-display">
              <span>{countdown}</span>
            </div>
          </div>
        )}
      </div>
      {!showBoxes && (
  <Button variant="contained" color="primary" className= "btn-calendar" onClick={() =>
      window.open(
        createGoogleCalendarEvent(businessDetails.dailySalesHour),
        "_blank"
      )}
    style={{ backgroundColor: "#d67d00", marginTop: 10 , marginBottom: 10 , fontFamily: "Varela Round"}} >
    {<CalendarTodayIcon />}
הוסף תזכורת ליומן 
  </Button>
)}
    </div>
  );
}
import React from "react";
import { Grid, Card, CardContent, Typography ,Accordion,AccordionSummary,AccordionDetails} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ShoppingBagTwoToneIcon from "@mui/icons-material/ShoppingBagTwoTone";
import TimerTwoToneIcon from "@mui/icons-material/TimerTwoTone";
import AccountBalanceWalletTwoToneIcon from "@mui/icons-material/AccountBalanceWalletTwoTone";
import DataThresholdingTwoToneIcon from "@mui/icons-material/DataThresholdingTwoTone";


const DataCard = ({ icon: Icon, title, number }) => (
  <Card
    sx={{
      minWidth: 240,
      boxShadow: 3,
      borderRadius: 2,
      m: 1,
      textAlign: "center",
    }}
  >
    <CardContent>
      <Icon sx={{ fontSize: 40, color: "#DC5F00" }} />
      <Typography variant="h6" component="div">
        {title}
      </Typography>
      <Typography
        variant="h4"
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 1,
          fontWeight: "bold",
          justifyContent: "center",
        }}
      >
        {number.toLocaleString()}
      </Typography>
    </CardContent>
  </Card>
);

const BusinessDataCards = ({ businessSales }) => (
 <>
      <Typography style={{ fontSize: 25 }}>
        <DataThresholdingTwoToneIcon /> נתוני מכירות
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <DataCard
            icon={ShoppingBagTwoToneIcon}
            title="מכירות"
            number={businessSales.totalBoxesOrdered || 0}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DataCard
            icon={TimerTwoToneIcon}
            title="מארזים למסירה"
            number={businessSales.ordersPending || 0}
          />
        </Grid>
        <Grid item xs={12} sm={4}>
          <DataCard
            icon={AccountBalanceWalletTwoToneIcon}
            title="הכנסות"
            number={businessSales.totalPrice + "₪" || 0}
          />
        </Grid>
      </Grid>
      </>
);

export default BusinessDataCards;

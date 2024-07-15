import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "../Styles/MyOrdersClient.css";

export default function MyOrdersClient({userData}) {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetch(`https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/User/GetDeliveredOrders/${userData.customerID}`) 
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setRows(data))
      
      .catch(error => console.error("There was an error fetching the data:", error));
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // 'en-GB' uses day/month/year format by default
  };

  console.log(rows);
  return (
    <div className="table-wrapper">
        <h3 className="header-title">הזמנות קודמות</h3>
      <TableContainer component={Paper} style={{ width: "80%" }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>מספר הזמנה</TableCell>
              <TableCell align="right">מחיר</TableCell>
              <TableCell align="right">שעה</TableCell>
              <TableCell align="right">תאריך</TableCell>
              <TableCell align="right">פירוט מוצר</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.orderId}
                </TableCell>
                <TableCell align="right">{row.totalPrice}</TableCell>
                <TableCell align="right">{row.time}</TableCell>
                <TableCell align="right">{formatDate(row.orderDate)}</TableCell>
                <TableCell align="right">{row.boxDescription}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

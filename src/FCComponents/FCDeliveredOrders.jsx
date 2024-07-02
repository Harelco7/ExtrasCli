import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const FCDeliveredOrders = ({ deliveredOrders }) => {
  const rows = deliveredOrders.map((order, index) => ({
    id: index + 1,
    OrderNumber: order.orderId,
    CustomerID: order.customerId,
    CustomerName: order.customerName,
    BoxID: order.boxID,
    TotalPrice: order.totalPrice,
    BoxDescription: order.boxDescription,
    OrderStatus: order.orderStatus,
    Quantity: order.quantityOrdered,
  }));

  const columns = [
    {
      field: "OrderNumber",
      headerName: "מספר הזמנה",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "CustomerID",
      headerName: "מספר לקוח",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "CustomerName",
      headerName: "שם לקוח",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "BoxDescription",
      headerName: "תיאור המארז",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "Quantity",
      headerName: "כמות ",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "BoxID",
      headerName: "מספר מארז",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "OrderStatus",
      headerName: "סטטוס הזמנה",
      width: 150,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "TotalPrice",
      headerName: "מחיר סופי",
      width: 130,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "actions",
      headerName: "פעולה",
      width: 150,
      renderCell: (params) => (
        <Box display="flex" gap={1}>
         
        </Box>
      ),
    },
  ];





  

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          slots={{ toolbar: GridToolbar }}
          rows={rows}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          sx={{
            "& .MuiDataGrid-cell": {
              textAlign: "left",
            },
            "& .MuiDataGrid-columnHeaders": {
              textAlign: "right",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default FCDeliveredOrders;

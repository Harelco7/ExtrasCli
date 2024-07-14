import React from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Box, Button } from "@mui/material";

const FCOrdersGrid = ({ openOrders, onStatusChange }) => {

  
  const rows = openOrders.map((order, index) => {
    // Convert orderDate to a readable format
    const formattedOrderDate = new Date(order.orderDate).toISOString().split('T')[0];
  
    return {
      id: index + 1,
      OrderDate: formattedOrderDate,
      OrderNumber: order.orderId,
      CustomerID: order.customerId,
      CustomerName: order.customerName,
      BoxID: order.boxID,
      TotalPrice: order.totalPrice,
      BoxDescription: order.boxDescription,
      OrderStatus: order.orderStatus,
      Quantity: order.quantityOrdered,
    };
  });

  const columns = [
    {
      field: "OrderNumber",
      headerName: "מספר הזמנה",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "OrderDate",
      headerName: "תאריך",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "CustomerID",
      headerName: "מספר לקוח",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "CustomerName",
      headerName: "שם לקוח",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "BoxDescription",
      headerName: "תיאור המארז",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "Quantity",
      headerName: "כמות",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "BoxID",
      headerName: "מספר מארז",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "OrderStatus",
      headerName: "סטטוס הזמנה",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "TotalPrice",
      headerName: "מחיר סופי",
      flex: 1,
      minWidth: 100,
      align: "right",
      headerAlign: "right",
    },
    {
      field: "actions",
      headerName: "פעולה",
      flex: 1,
      minWidth: 150,
      renderCell: (params) => (
        <Button
          variant="contained"
          style={{ backgroundColor: "#41B06E" }}
          onClick={() => handleChangeStatus(params.row)}
        >
          Delivered
        </Button>
      ),
    },
  ];

  const handleChangeStatus = async (order) => {
    try {
      const response = await fetch("https://proj.ruppin.ac.il/bgroup33/test2/tar1/api/MyDataBusiness/UpdateOrderStatus", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ OrderId: order.OrderNumber }),
      });

      if (!response.ok) {
        throw new Error("Failed to update order status.");
      }

      console.log("Order status changed to delivered", order.OrderNumber);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

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
            "& .MuiDataGrid-root": {
              overflowX: "auto",
            },
          }}
        />
      </Box>
    </Box>
  );
};

export default FCOrdersGrid;

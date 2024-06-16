// ShoppingBagOffcanvas.jsx
import React, { useState ,useEffect } from 'react';
import { Offcanvas, Button, ListGroup, ListGroupItem } from 'react-bootstrap';
import { useShoppingBag } from '../assets/Context/ShoppingBagContext'; // Update the path accordingly
import ShoppingBagTwoToneIcon from '@mui/icons-material/ShoppingBagTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import zIndex from '@mui/material/styles/zIndex.js';

const ShoppingBagCanvas = ({ show, handleClose }) => {
  const { items, removeItemFromBag } = useShoppingBag();
  
  useEffect(() => {
    // Load items from sessionStorage on component mount
    const storedItems = JSON.parse(sessionStorage.getItem('shoppingBagItems')) || [];
    // Optionally, update context state directly if needed
    // setItems(storedItems);
  }, []);

  const calculateTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <Offcanvas show={show} onHide={handleClose} placement="end" style={{zIndex:1102}}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Shopping Bag</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {items.length > 0 ? (
          <>
            <ListGroup>
              {items.map((item, index) => (
                <ListGroupItem key={index} className="d-flex justify-content-between align-items-center">
                  <div>
                    {item.name} - {item.quantity} x {item.price}₪ ::{item.id}
                  </div>
                  <Button variant="danger" onClick={() => removeItemFromBag(item.id)}>
                    <DeleteIcon />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
            <hr />
            <h5>Total Price: {calculateTotalPrice()}₪</h5>
          </>
        ) : (
          <p>Your shopping bag is empty.</p>
        )}
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default ShoppingBagCanvas;

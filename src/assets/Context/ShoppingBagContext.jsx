// ShoppingBagContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';

const ShoppingBagContext = createContext();

export const useShoppingBag = () => useContext(ShoppingBagContext);

export const ShoppingBagProvider = ({ children }) => {
  const [items, setItems] = useState([]);



  useEffect(() => {
    // Load items from sessionStorage on component mount
    const storedItems = JSON.parse(localStorage.getItem('shoppingBagItems')) || [];
    setItems(storedItems); // Update state with storedItems
  }, []);

  useEffect(() => {
    // Save items to sessionStorage whenever items change
    localStorage.setItem('shoppingBagItems', JSON.stringify(items));
  }, [items]);


  const addItemToBag = (box, quantity) => {
    const existingItem = items.find(item => item.id === box.boxId);
    if (existingItem) {
      // If item exists, update the quantity
      setItems(items.map(item => item.id === box.boxId ? { ...item, quantity: quantity } : item));
    } else {
      // If item does not exist, add as new item
      const newItem = {
        id: box.boxId,
        name: box.name,
        price: box.price,
        quantity: quantity, // Use the provided quantity
        desc: box.description
      };
      setItems([...items, newItem]);
    }
  };

  const removeItemFromBag = (id) => {
    setItems(items.filter(item => item.id !== id));
  };
  const clearBag = () => {
    setItems([]);
  };

  return (
    <ShoppingBagContext.Provider value={{ items, addItemToBag, removeItemFromBag,clearBag }}>
      {children}
    </ShoppingBagContext.Provider>
  );
};

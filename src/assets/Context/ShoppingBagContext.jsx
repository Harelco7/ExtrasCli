// ShoppingBagContext.js
import React, { createContext, useState, useContext,useEffect } from 'react';

const ShoppingBagContext = createContext();

export const useShoppingBag = () => useContext(ShoppingBagContext);

export const ShoppingBagProvider = ({ children }) => {
  const [items, setItems] = useState([]);



  useEffect(() => {
    // Load items from sessionStorage on component mount
    const storedItems = JSON.parse(sessionStorage.getItem('shoppingBagItems')) || [];
    setItems(storedItems); // Update state with storedItems
  }, []);

  useEffect(() => {
    // Save items to sessionStorage whenever items change
    sessionStorage.setItem('shoppingBagItems', JSON.stringify(items));
  }, [items]);


  const addItemToBag = (item) => {
    setItems([...items, item]);
  };

  const removeItemFromBag = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <ShoppingBagContext.Provider value={{ items, addItemToBag, removeItemFromBag }}>
      {children}
    </ShoppingBagContext.Provider>
  );
};

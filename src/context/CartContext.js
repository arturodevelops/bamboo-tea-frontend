import React, { createContext, useContext, useState } from 'react';
import { fetchData  } from '../api/CRUD';
import { useEffect } from 'react';

// Create a Context for Cart
const CartContext = createContext();

// Custom hook to use CartContext
export const useCart = () => {
  return useContext(CartContext);
};

// CartProvider component to wrap the app and provide cart state
export const CartProvider = ({ children }) => {
  // Initialize the cardCounts state with an empty object
  const [cardCounts, setCardCounts] = useState({});
  const [cardData, setData] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const result = await fetchData();
        setData(result);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    getData();
  }, []);

  const handleCardCountAddChange = (id, delta) => {
    setCardCounts(prevState => {
      const newCounts = { ...prevState };
      newCounts[id] = (newCounts[id] || 0) + delta;
      return newCounts;
    });
  };

  const handleCardCountRestChange = (id, delta) => {
    setCardCounts(prevState => {
      const newCounts = { ...prevState };
      newCounts[id] = (newCounts[id] || 0) - delta;
      if (newCounts[id] < 0) newCounts[id] = 0;
      return newCounts;
    });
  };


  const totalCount = Object.values(cardCounts).reduce((acc, count) => acc + count, 0);

  return (
    <CartContext.Provider
      value={{
        cardCounts,
        cardData,
        handleCardCountAddChange,
        handleCardCountRestChange,
        totalCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

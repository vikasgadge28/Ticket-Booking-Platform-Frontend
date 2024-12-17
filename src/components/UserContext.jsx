// src/UserContext.jsx

import React, { createContext, useContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Set user to null initially
  const [bookingId, setBookingId] = useState(null);

  const login = (userData) => {
    setUser(userData); // Set the user data on login
  };

  const logout = () => {
    setUser(null); // Reset user data on logout
  };

  return (
    <UserContext.Provider value={{ user, bookingId, login, logout, setBookingId}}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);

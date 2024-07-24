// src/contexts/AuthContext/AuthContext.js
import React, { createContext, useContext } from 'react';
import { useUsers } from '../../hooks/useUsers/useUsers';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const { currentUser, login, logout } = useUsers();

  return (
    <AuthContext.Provider value={{ user: currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
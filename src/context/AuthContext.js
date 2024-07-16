// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        }
    }, []);

    const login = (userData, navigate) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
    };

    const logout = (navigate) => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

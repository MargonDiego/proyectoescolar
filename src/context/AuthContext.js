// src/context/AuthContext.js

import React, { createContext, useState, useEffect } from 'react';

// Crear el contexto de autenticación
export const AuthContext = createContext();

// Proveedor de autenticación que maneja el estado del usuario y la autenticación
const AuthProvider = ({ children }) => {
    // Estado para verificar si el usuario está autenticado
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    // Estado para almacenar la información del usuario
    const [user, setUser] = useState(null);

    // Cargar datos del usuario desde el almacenamiento local al montar el componente
    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('user'));
        if (storedUser) {
            setIsAuthenticated(true);
            setUser(storedUser);
        }
    }, []);

    // Función de inicio de sesión que actualiza el estado y guarda los datos en el almacenamiento local
    const login = (userData, navigate) => {
        setIsAuthenticated(true);
        setUser(userData);
        localStorage.setItem('user', JSON.stringify(userData));
        navigate('/dashboard');
    };

    // Función de cierre de sesión que limpia el estado y elimina los datos del almacenamiento local
    const logout = (navigate) => {
        setIsAuthenticated(false);
        setUser(null);
        localStorage.removeItem('user');
        navigate('/');
    };

    // Proveer el contexto de autenticación a los componentes hijos
    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        name: 'Juan Pérez',
        email: 'juan.perez@example.com',
        position: 'Profesor',
        avatar: 'https://via.placeholder.com/100',
    });
    const [isAuthenticated, setIsAuthenticated] = useState(true);

    const updateUser = (profileData) => {
        // Lógica para actualizar el perfil del usuario
        setUser((prevUser) => ({
            ...prevUser,
            ...profileData,
            password: undefined,
            confirmPassword: undefined,
        }));
        alert('Perfil actualizado con éxito');
    };

    const logout = () => {
        setIsAuthenticated(false);
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, updateUser, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;

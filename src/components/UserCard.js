// src/components/UserCard.js
import React from 'react';
import { Paper, Typography, Avatar, Button } from '@mui/material';

// Componente para mostrar la tarjeta de un usuario
const UserCard = ({ user, onClose }) => {
    if (!user) return null; // Si no hay usuario, no renderiza nada

    return (
        // Contenedor principal de la tarjeta del usuario
        <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            {/* Avatar del usuario */}
            <Avatar
                alt={`${user.firstName} ${user.lastName}`}
                src={user.avatar}
                sx={{ width: 100, height: 100, marginBottom: 2 }}
            />
            {/* Nombre del usuario */}
            <Typography variant="h6">
                {user.firstName} {user.lastName}
            </Typography>
            {/* Email del usuario */}
            <Typography variant="body2" color="textSecondary">
                Email: {user.email}
            </Typography>
            {/* RUT del usuario */}
            <Typography variant="body2" color="textSecondary">
                RUT: {user.rut}
            </Typography>
            {/* Rol del usuario */}
            <Typography variant="body2" color="textSecondary">
                Rol: {user.role}
            </Typography>
            {/* Botón para cerrar la tarjeta */}
            <Button variant="contained" color="primary" onClick={onClose} sx={{ mt: 2 }}>
                Cerrar
            </Button>
        </Paper>
    );
};

export default UserCard;

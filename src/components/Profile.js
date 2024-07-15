import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Avatar, Paper } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
    const { user, updateUser } = useContext(AuthContext);
    const [profileData, setProfileData] = useState({
        name: '',
        email: '',
        position: '',
        password: '',
        confirmPassword: '',
    });

    useEffect(() => {
        // Cargar los datos del usuario en el estado inicial
        setProfileData({
            name: user.name,
            email: user.email,
            position: user.position,
            password: '',
            confirmPassword: '',
        });
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfileData({ ...profileData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Validar que las contraseñas coincidan
        if (profileData.password !== profileData.confirmPassword) {
            alert('Las contraseñas no coinciden');
            return;
        }
        // Lógica para actualizar los datos del usuario
        updateUser(profileData);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Perfil del Usuario
            </Typography>
            <Paper style={{ padding: '16px', marginBottom: '16px' }}>
                <Avatar alt={user.name} src={user.avatar} style={{ width: 100, height: 100, marginBottom: '16px' }} />
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Nombre"
                        name="name"
                        value={profileData.name}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Correo Electrónico"
                        name="email"
                        type="email"
                        value={profileData.email}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Cargo"
                        name="position"
                        value={profileData.position}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Nueva Contraseña"
                        name="password"
                        type="password"
                        value={profileData.password}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <TextField
                        label="Confirmar Contraseña"
                        name="confirmPassword"
                        type="password"
                        value={profileData.confirmPassword}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Actualizar Perfil
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default Profile;

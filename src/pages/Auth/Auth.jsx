// src/pages/Auth/Auth.jsx
import React from 'react';
import { Grid, Paper, Box, Typography, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth/useAuth';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import RecoverPasswordForm from './components/RecoverPasswordForm';

const Auth = () => {
    const {
        isRegistering,
        isRecovering,
        formData,
        setIsRegistering,
        setIsRecovering,
        onChange,
        onSubmit
    } = useAuth();
    const navigate = useNavigate();

    const switchToRegister = () => {
        setIsRegistering(true);
        setIsRecovering(false);
    };

    const switchToRecover = () => {
        setIsRecovering(true);
        setIsRegistering(false);
    };

    const switchToLogin = () => {
        setIsRegistering(false);
        setIsRecovering(false);
    };

    return (
        <Container component="main" maxWidth="lg">
            <Box sx={{ marginTop: 8 }}>
                <Grid container>
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url(/landing.jpg)",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) => t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    />
                    <Grid
                        item
                        xs={12}
                        sm={8}
                        md={5}
                        component={Paper}
                        elevation={6}
                        square
                    >
                        <Box sx={{ my: 8, mx: 4, display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography component="h1" variant="h5">
                                {isRegistering ? 'Registro' : isRecovering ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
                            </Typography>
                            {isRegistering ? (
                                <RegisterForm
                                    formData={formData}
                                    onChange={onChange}
                                    onSubmit={onSubmit}
                                    switchToLogin={switchToLogin}
                                    navigate={navigate}
                                />
                            ) : isRecovering ? (
                                <RecoverPasswordForm
                                    formData={formData}
                                    onChange={onChange}
                                    onSubmit={onSubmit}
                                    switchToLogin={switchToLogin}
                                    navigate={navigate}
                                />
                            ) : (
                                <LoginForm
                                    formData={formData}
                                    onChange={onChange}
                                    onSubmit={onSubmit}
                                    switchToRecover={switchToRecover}
                                    switchToRegister={switchToRegister}
                                    navigate={navigate}
                                />
                            )}
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Auth;

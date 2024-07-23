// src/pages/Auth/components/RegisterForm.jsx
import React from 'react';
import { TextField, Button, Grid, Box, Link } from '@mui/material';

const RegisterForm = ({ formData, onChange, onSubmit, switchToLogin, navigate }) => {
    const { firstName, lastName, email, password, rut } = formData;

    return (
        <Box component="form" noValidate onSubmit={(e) => onSubmit(e, navigate)} sx={{ mt: 1 }}>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fname"
                        name="firstName"
                        variant="outlined"
                        required
                        fullWidth
                        id="firstName"
                        label="Nombre"
                        autoFocus
                        value={firstName}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="lastName"
                        label="Apellido"
                        name="lastName"
                        autoComplete="lname"
                        value={lastName}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="email"
                        label="Correo Electrónico"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        id="rut"
                        label="RUT"
                        name="rut"
                        autoComplete="rut"
                        value={rut}
                        onChange={onChange}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        variant="outlined"
                        required
                        fullWidth
                        name="password"
                        label="Contraseña"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        value={password}
                        onChange={onChange}
                    />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Registrar
            </Button>
            <Grid container justifyContent="flex-end">
                <Grid item>
                    <Link href="#" variant="body2" onClick={switchToLogin}>
                        ¿Ya tienes una cuenta? Inicia sesión
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RegisterForm;

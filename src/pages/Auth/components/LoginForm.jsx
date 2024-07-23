// src/pages/Auth/components/LoginForm.jsx
import React from 'react';
import { TextField, Button, Grid, Link, Box, FormControlLabel, Checkbox } from '@mui/material';

const LoginForm = ({ formData, onChange, onSubmit, switchToRecover, switchToRegister, navigate }) => {
    const { emailOrRut, password } = formData;

    return (
        <Box component="form" noValidate onSubmit={(e) => onSubmit(e, navigate)} sx={{ mt: 1 }}>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="emailOrRut"
                label="Correo Electrónico o RUT"
                name="emailOrRut"
                autoComplete="email"
                autoFocus
                value={emailOrRut}
                onChange={onChange}
            />
            <TextField
                variant="outlined"
                margin="normal"
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
            <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Recuérdame"
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Iniciar Sesión
            </Button>
            <Grid container>
                <Grid item xs>
                    <Link href="#" variant="body2" onClick={switchToRecover}>
                        ¿Olvidaste tu contraseña?
                    </Link>
                </Grid>
                <Grid item>
                    <Link href="#" variant="body2" onClick={switchToRegister}>
                        {"¿No tienes una cuenta? Regístrate"}
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default LoginForm;

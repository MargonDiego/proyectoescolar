import React from 'react';
import { TextField, Button, Box, Link, Grid } from '@mui/material';

const RecoverPasswordForm = ({ formData, onChange, onSubmit, switchToLogin, navigate }) => {
    const { emailOrRut, securityAnswer } = formData;

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
                id="securityAnswer"
                label="Respuesta de Seguridad"
                name="securityAnswer"
                autoComplete="security-answer"
                value={securityAnswer}
                onChange={onChange}
            />
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
            >
                Recuperar Contraseña
            </Button>
            <Grid container>
                <Grid item>
                    <Link href="#" variant="body2" onClick={switchToLogin}>
                        Volver a iniciar sesión
                    </Link>
                </Grid>
            </Grid>
        </Box>
    );
};

export default RecoverPasswordForm;

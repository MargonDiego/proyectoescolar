import React, { useState, useContext } from 'react';
import { TextField, Button, Container, Typography, Grid, Link } from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Auth = () => {
    const { login } = useContext(AuthContext);
    const [isRegistering, setIsRegistering] = useState(false);
    const [isRecovering, setIsRecovering] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        rut: '',
        emailOrRut: '',
        securityAnswer: ''
    });

    const { firstName, lastName, email, password, rut, emailOrRut, securityAnswer } = formData;

    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

    const users = [
        {
            firstName: 'Test',
            lastName: 'User',
            email: 'test@example.com',
            password: 'password',
            rut: '12345678-9'
        }
    ];

    const onSubmit = e => {
        e.preventDefault();

        if (isRegistering) {
            const userExists = users.find(user => user.email === email || user.rut === rut);
            if (userExists) {
                alert('Email or RUT already exists');
            } else {
                users.push({ firstName, lastName, email, password, rut });
                alert('User registered successfully');
                setIsRegistering(false);
            }
        } else if (isRecovering) {
            const user = users.find(user => user.email === emailOrRut || user.rut === emailOrRut);
            if (!user) {
                alert('Invalid credentials');
            } else {
                alert('Recovery email sent (simulated)');
            }
        } else {
            const user = users.find(user => (user.email === emailOrRut || user.rut === emailOrRut) && user.password === password);
            if (!user) {
                alert('Invalid credentials');
            } else {
                alert('Login successful');
                login();
            }
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ marginTop: '8px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <Typography component="h1" variant="h5">
                    {isRegistering ? 'Registro' : isRecovering ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
                </Typography>
                <form onSubmit={onSubmit} style={{ width: '100%', marginTop: '8px' }}>
                    {isRegistering && (
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
                    )}

                    {!isRegistering && !isRecovering && (
                        <>
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
                        </>
                    )}

                    {isRecovering && (
                        <>
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
                        </>
                    )}

                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '24px' }}
                    >
                        {isRegistering ? 'Registrar' : isRecovering ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
                    </Button>

                    <Grid container>
                        <Grid item xs>
                            {!isRecovering && (
                                <Link href="#" variant="body2" onClick={() => setIsRecovering(true)}>
                                    ¿Olvidaste tu contraseña?
                                </Link>
                            )}
                        </Grid>
                        <Grid item>
                            {!isRegistering && !isRecovering && (
                                <Link href="#" variant="body2" onClick={() => setIsRegistering(true)}>
                                    {"¿No tienes una cuenta? Regístrate"}
                                </Link>
                            )}
                            {(isRegistering || isRecovering) && (
                                <Link href="#" variant="body2" onClick={() => { setIsRegistering(false); setIsRecovering(false); }}>
                                    {"Volver a iniciar sesión"}
                                </Link>
                            )}
                        </Grid>
                    </Grid>
                </form>
            </div>
        </Container>
    );
};

export default Auth;

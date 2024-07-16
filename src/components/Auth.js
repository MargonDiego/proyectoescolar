import React, { useState, useContext } from 'react';
import { TextField, Button, CssBaseline, Grid, Link, Paper, Box, Typography, Container, FormControlLabel, Checkbox } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
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
            firstName: 'Admin',
            lastName: 'User',
            email: 'admin@example.com',
            password: 'password',
            rut: '12345678-9',
            role: 'admin',
            position: 'Administrator',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Regular',
            lastName: 'User',
            email: 'user@example.com',
            password: 'password',
            rut: '98765432-1',
            role: 'user',
            position: 'User',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'View',
            lastName: 'Only',
            email: 'view@example.com',
            password: 'password',
            rut: '11223344-5',
            role: 'viewer',
            position: 'Viewer',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Estudiante',
            lastName: 'Uno',
            email: 'estudiante1@example.com',
            password: 'password',
            rut: '66778899-1',
            role: 'student',
            position: 'Estudiante',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Estudiante',
            lastName: 'Dos',
            email: 'estudiante2@example.com',
            password: 'password',
            rut: '77889900-2',
            role: 'student',
            position: 'Estudiante',
            avatar: 'https://via.placeholder.com/150'
        },
        {
            firstName: 'Estudiante',
            lastName: 'Tres',
            email: 'estudiante3@example.com',
            password: 'password',
            rut: '88990011-3',
            role: 'student',
            position: 'Estudiante',
            avatar: 'https://via.placeholder.com/150'
        }
    ];

    const onSubmit = e => {
        e.preventDefault();

        if (isRegistering) {
            const userExists = users.find(user => user.email === email || user.rut === rut);
            if (userExists) {
                alert('Email or RUT already exists');
            } else {
                users.push({ firstName, lastName, email, password, rut, role: 'user', position: 'User', avatar: 'https://via.placeholder.com/150' });
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
                login(user, navigate);
            }
        }
    };

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
            <Box
                sx={{
                    marginTop: 8,
                }}
            >
                <Grid container>
                    <CssBaseline />
                    <Grid
                        item
                        xs={false}
                        sm={4}
                        md={7}
                        sx={{
                            backgroundImage: "url(/landing.jpg)",
                            backgroundRepeat: "no-repeat",
                            backgroundColor: (t) =>
                                t.palette.mode === "light"
                                    ? t.palette.grey[50]
                                    : t.palette.grey[900],
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
                        <Box
                            sx={{
                                my: 8,
                                mx: 4,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}
                        >
                            <Typography component="h1" variant="h5">
                                {isRegistering ? 'Registro' : isRecovering ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
                            </Typography>
                            <Box
                                component="form"
                                noValidate
                                onSubmit={onSubmit}
                                sx={{ mt: 1 }}
                            >
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
                                    {isRegistering ? 'Registrar' : isRecovering ? 'Recuperar Contraseña' : 'Iniciar Sesión'}
                                </Button>

                                <Grid container>
                                    <Grid item xs>
                                        {!isRecovering && (
                                            <Link href="#" variant="body2" onClick={switchToRecover}>
                                                ¿Olvidaste tu contraseña?
                                            </Link>
                                        )}
                                    </Grid>
                                    <Grid item>
                                        {!isRegistering && !isRecovering && (
                                            <Link href="#" variant="body2" onClick={switchToRegister}>
                                                {"¿No tienes una cuenta? Regístrate"}
                                            </Link>
                                        )}
                                        {(isRegistering || isRecovering) && (
                                            <Link href="#" variant="body2" onClick={switchToLogin}>
                                                {"Volver a iniciar sesión"}
                                            </Link>
                                        )}
                                    </Grid>
                                </Grid>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </Container>
    );
};

export default Auth;

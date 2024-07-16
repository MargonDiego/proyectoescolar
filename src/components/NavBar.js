import React, { useContext } from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout(navigate);
    };

    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" style={{ flexGrow: 1 }}>
                    School Management
                </Typography>
                {user && (
                    <>
                        <Button color="inherit" component={Link} to="/dashboard">
                            Dashboard
                        </Button>
                        <Button color="inherit" component={Link} to="/profile">
                            Perfil
                        </Button>
                        {(user.role === 'admin' || user.role === 'usuario' || user.role === 'viewer') && (
                            <>
                                <Button color="inherit" component={Link} to="/students">
                                    Ver Fichas
                                </Button>
                            </>
                        )}
                        {user.role === 'admin' && (
                            <>
                                <Button color="inherit" component={Link} to="/users">
                                    Gestión de Usuarios
                                </Button>
                                <Button color="inherit" component={Link} to="/students/add">
                                    Añadir Estudiante
                                </Button>
                            </>
                        )}
                        <Button color="inherit" onClick={handleLogout}>
                            Cerrar Sesión
                        </Button>
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;

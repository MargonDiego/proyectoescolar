import React, { useContext, useState } from 'react';
import { AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

// Componente de barra de navegación
const NavBar = () => {
    const { user, logout } = useContext(AuthContext); // Obtener usuario y función de cierre de sesión del contexto de autenticación
    const navigate = useNavigate(); // Hook para navegación
    const [drawerOpen, setDrawerOpen] = useState(false); // Estado para controlar la apertura del cajón (drawer)

    // Función para manejar el cierre de sesión
    const handleLogout = () => {
        logout(navigate); // Llama a la función de cierre de sesión y redirige al usuario
    };

    // Función para alternar la apertura del cajón (drawer)
    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    // Lista de elementos del cajón (drawer)
    const drawerList = (
        <List>
            <ListItem button component={Link} to="/dashboard" onClick={toggleDrawer(false)}>
                <ListItemText primary="Dashboard" />
            </ListItem>
            {(user.role === 'admin' || user.role === 'usuario' || user.role === 'viewer') && (
                <ListItem button component={Link} to="/students" onClick={toggleDrawer(false)}>
                    <ListItemText primary="Ver Fichas" />
                </ListItem>
            )}
            {user.role === 'admin' && (
                <>
                    <ListItem button component={Link} to="/users" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Gestión de Usuarios" />
                    </ListItem>
                    <ListItem button component={Link} to="/students/add" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Añadir Estudiante" />
                    </ListItem>
                </>
            )}
            <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
                <ListItemText primary="Perfil" />
            </ListItem>
            <ListItem button onClick={() => { handleLogout(); toggleDrawer(false); }}>
                <ListItemText primary="Cerrar Sesión" />
            </ListItem>
        </List>
    );

    // Estilos para los botones
    const buttonStyles = {
        color: 'black',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        borderRadius: '8px',
        margin: '0 8px',
        border: '1px solid #ccc', // Borde gris leve
        '&:hover': {
            boxShadow: '0 6px 10px rgba(0, 0, 0, 0.15)',
            transform: 'translateY(-1px)',
        }
    };

    return (
        <div>
            {/* Barra de aplicación */}
            <AppBar position="static" sx={{ backgroundColor: 'white', borderBottom: '2px solid red', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)', width: '100%' }}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', maxWidth: '1200px' }}>
                        <img src="/Escudocolegio.png" alt="Logo Colegio" style={{ width: 50, height: 50, marginRight: 16 }} />
                        <Typography variant="h6" sx={{ flexGrow: 1, color: 'black', textAlign: 'center' }}>
                            Colegio Siglo XXI Lampa
                        </Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            {user && (
                                <>
                                    <Button component={Link} to="/dashboard" sx={buttonStyles}>
                                        Dashboard
                                    </Button>
                                    {(user.role === 'admin' || user.role === 'usuario' || user.role === 'viewer') && (
                                        <Button component={Link} to="/students" sx={buttonStyles}>
                                            Ver Fichas
                                        </Button>
                                    )}
                                    {user.role === 'admin' && (
                                        <>
                                            <Button component={Link} to="/users" sx={buttonStyles}>
                                                Gestión de Usuarios
                                            </Button>
                                            <Button component={Link} to="/students/add" sx={buttonStyles}>
                                                Añadir Estudiante
                                            </Button>
                                        </>
                                    )}
                                    <Button component={Link} to="/profile" sx={buttonStyles}>
                                        Perfil
                                    </Button>
                                    <Button onClick={handleLogout} sx={buttonStyles}>
                                        Cerrar Sesión
                                    </Button>
                                </>
                            )}
                        </Box>
                        {/* Botón de menú para dispositivos móviles */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="end"
                            onClick={toggleDrawer(true)}
                            sx={{ display: { xs: 'block', md: 'none' }, color: 'black' }}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
            {/* Cajón (drawer) para dispositivos móviles */}
            <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
                {drawerList}
            </Drawer>
        </div>
    );
};

export default NavBar;

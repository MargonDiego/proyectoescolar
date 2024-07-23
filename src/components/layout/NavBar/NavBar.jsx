import React, { useContext, useState } from 'react';
import styled from 'styled-components';
import {
    AppBar, Toolbar, Typography, Button, IconButton, Drawer, List, ListItem, ListItemText, Box,
    Avatar, Menu, MenuItem, ListItemIcon, Tooltip, Badge, Divider, useMediaQuery, Popover
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { 
    Menu as MenuIcon,
    Dashboard as DashboardIcon,
    Person as PersonIcon,
    ExitToApp as LogoutIcon,
    School as SchoolIcon,
    GroupAdd as GroupAddIcon,
    Notifications as NotificationsIcon
} from '@mui/icons-material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../../contexts/AuthContext/AuthContext';
import { useNotifications } from '../../../contexts/NotificationContext/NotificationContext';
import Notifications from '../../integrated/Notifications/Notifications';

const StyledAppBar = styled(AppBar)`
    background-color: white;
    border-bottom: 2px solid red;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoImg = styled.img`
    width: 50px;
    height: 50px;
    margin-right: 16px;
`;

const NavButton = styled(Button)`
    color: ${props => props.active ? props.theme.palette.primary.main : 'black'};
    margin: 0 8px;
    border-radius: 8px;
    &:hover {
        background-color: ${props => props.theme.palette.action.hover};
    }
    font-weight: ${props => props.active ? 'bold' : 'normal'};
`;

const NotificationBell = styled(IconButton)`
    color: ${props => props.theme.palette.text.primary};
    margin-left: ${props => props.theme.spacing(2)};
`;

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);
    const { notifications } = useNotifications();
    const navigate = useNavigate();
    const location = useLocation();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleLogout = () => {
        logout(navigate);
        setDrawerOpen(false);
    };

    const toggleDrawer = (open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const handleNotificationsOpen = (event) => {
        setNotificationsAnchorEl(event.currentTarget);
    };

    const handleNotificationsClose = () => {
        setNotificationsAnchorEl(null);
    };

    const isActive = (path) => location.pathname === path;

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
        { text: 'Ver Fichas', icon: <SchoolIcon />, path: '/students', roles: ['admin', 'usuario', 'viewer'] },
        { text: 'Gestión de Usuarios', icon: <GroupAddIcon />, path: '/users', roles: ['admin'] }
    ];

    const renderMenuItems = (isMobile = false) => 
        menuItems.map((item) => {
            if (!item.roles || item.roles.includes(user.role)) {
                return isMobile ? (
                    <ListItem button key={item.text} component={Link} to={item.path} onClick={toggleDrawer(false)}>
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.text} />
                    </ListItem>
                ) : (
                    <NavButton
                        key={item.text}
                        component={Link}
                        to={item.path}
                        active={isActive(item.path)}
                        startIcon={item.icon}
                    >
                        {item.text}
                    </NavButton>
                );
            }
            return null;
        });

    const drawerContent = (
        <Box sx={{ width: 250 }} role="presentation">
            <List>
                {renderMenuItems(true)}
                <Divider />
                <ListItem button component={Link} to="/profile" onClick={toggleDrawer(false)}>
                    <ListItemIcon><PersonIcon /></ListItemIcon>
                    <ListItemText primary="Perfil" />
                </ListItem>
                <ListItem button onClick={handleNotificationsOpen}>
                    <ListItemIcon>
                        <Badge badgeContent={notifications.length} color="secondary">
                            <NotificationsIcon />
                        </Badge>
                    </ListItemIcon>
                    <ListItemText primary="Notificaciones" />
                </ListItem>
                <ListItem button onClick={handleLogout}>
                    <ListItemIcon><LogoutIcon /></ListItemIcon>
                    <ListItemText primary="Cerrar Sesión" />
                </ListItem>
            </List>
        </Box>
    );

    return (
        <>
            <StyledAppBar position="fixed">
                <Toolbar sx={{ justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LogoImg src="/Escudocolegio.png" alt="Logo Colegio" />
                        <Typography variant="h6" sx={{ color: 'black', display: { xs: 'none', sm: 'block' } }}>
                            Colegio Siglo XXI Lampa
                        </Typography>
                    </Box>
                    
                    <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
                        {renderMenuItems()}
                        <NotificationBell onClick={handleNotificationsOpen}>
                            <Badge badgeContent={notifications.length} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </NotificationBell>
                        <Tooltip title="Perfil">
                            <IconButton onClick={handleMenuOpen} size="small" sx={{ ml: 2 }}>
                                <Avatar alt={user.name} src={user.avatar} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                    
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="end"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { md: 'none' }, color: 'black' }}
                    >
                        <MenuIcon />
                    </IconButton>
                    
                    <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                        onClick={handleMenuClose}
                    >
                        <MenuItem component={Link} to="/profile">
                            <ListItemIcon>
                                <PersonIcon fontSize="small" />
                            </ListItemIcon>
                            Perfil
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                            <ListItemIcon>
                                <LogoutIcon fontSize="small" />
                            </ListItemIcon>
                            Cerrar Sesión
                        </MenuItem>
                    </Menu>
                </Toolbar>
            </StyledAppBar>
            
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                {drawerContent}
            </Drawer>

            {isMobile ? (
                <Drawer
                    anchor="bottom"
                    open={Boolean(notificationsAnchorEl)}
                    onClose={handleNotificationsClose}
                >
                    <Box sx={{ height: '70vh', overflowY: 'auto' }}>
                        <Notifications onClose={handleNotificationsClose} compact={true} />
                    </Box>
                </Drawer>
            ) : (
                <Popover
                    open={Boolean(notificationsAnchorEl)}
                    anchorEl={notificationsAnchorEl}
                    onClose={handleNotificationsClose}
                    anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                >
                    <Notifications onClose={handleNotificationsClose} compact={false} />
                </Popover>
            )}
        </>
    );
};

export default NavBar;
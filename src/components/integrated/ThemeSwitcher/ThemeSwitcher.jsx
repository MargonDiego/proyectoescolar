// src/components/ThemeSwitcher/ThemeSwitcher.jsx
import React from 'react';
import { Box, IconButton, Menu, MenuItem } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeSwitcher = ({ toggleTheme, theme }) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <Box sx={{ position: 'fixed', bottom: 16, right: 16 }}>
            <IconButton onClick={handleClick} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
                <MenuItem onClick={toggleTheme}>
                    {theme.palette.mode === 'dark' ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
                </MenuItem>
            </Menu>
        </Box>
    );
};

export default ThemeSwitcher;

import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, 
  Typography, useTheme, Fab
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';

const drawerWidth = 240;

const Root = styled.div`
  display: flex;
  min-height: 100vh;
  background: ${({ theme }) => theme.palette.background.default};
`;

const StyledDrawer = styled(Drawer)`
  width: ${drawerWidth}px;
  flex-shrink: 0;
  & .MuiDrawer-paper {
    width: ${drawerWidth}px;
    box-sizing: border-box;
    background: ${({ theme }) => theme.palette.primary.main};
    color: ${({ theme }) => theme.palette.primary.contrastText};
  }
`;

const Content = styled.main`
  flex-grow: 1;
  padding: ${({ theme }) => theme.spacing(3)};
`;

const MenuFab = styled(Fab)`
  position: fixed;
  right: ${({ theme }) => theme.spacing(3)};
  top: 50%;
  transform: translateY(-50%);
  z-index: ${({ theme }) => theme.zIndex.drawer - 1};
`;

const DrawerHeader = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: ${({ theme }) => theme.spacing(0, 1)};
  ${({ theme }) => theme.mixins.toolbar}
`;

const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: ${({ theme }) => theme.palette.action.hover};
  }
`;

const UserManagementLayout = ({ children }) => {
  const [open, setOpen] = useState(false);
  const theme = useTheme();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon /> },
    { text: 'Users', icon: <PeopleIcon /> },
    { text: 'Settings', icon: <SettingsIcon /> },
  ];

  return (
    <Root>
      <Content>
        {children}
      </Content>
      <MenuFab color="primary" aria-label="menu" onClick={toggleDrawer}>
        <MenuIcon />
      </MenuFab>
      <StyledDrawer
        anchor="right"
        open={open}
        onClose={toggleDrawer}
      >
        <DrawerHeader>
          <Typography variant="h6" noWrap>
            User Management
          </Typography>
        </DrawerHeader>
        <List>
          {menuItems.map((item) => (
            <StyledListItem button key={item.text}>
              <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          ))}
        </List>
      </StyledDrawer>
    </Root>
  );
};

export default UserManagementLayout;
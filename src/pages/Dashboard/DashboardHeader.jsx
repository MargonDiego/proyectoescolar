import React from 'react';
import styled from 'styled-components';
import { Box, Typography, Chip, Avatar, Button, Divider } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import QuickActions from './QuickActions';

const HeaderPaper = styled(Box)`
  padding: ${({ theme }) => theme.spacing(3)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  background-color: ${({ theme }) => theme.palette.background.paper};
`;

const TitleRow = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ActionRow = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

const StyledChip = styled(Chip)`
  font-weight: bold;
`;

const HelpButton = styled(Button)`
  margin-right: ${({ theme }) => theme.spacing(2)};
`;

const DashboardHeader = ({ user, notificationCount }) => {
  return (
    <HeaderPaper>
      <TitleRow>
        <Box display="flex" alignItems="center">
          <DashboardIcon color="primary" sx={{ fontSize: 40, mr: 2 }} />
          <Typography variant="h4" component="h1">
            Dashboard de Convivencia Escolar
          </Typography>
        </Box>
        <StyledChip
          avatar={<Avatar alt={user?.name} src={user?.avatar} />}
          label={`${user?.role || 'Usuario'}`}
          variant="outlined"
          color="primary"
        />
      </TitleRow>
      
      <Typography variant="subtitle1" color="text.secondary">
        Bienvenido, {user?.name}. Aquí tienes un resumen de la situación actual.
      </Typography>
      
      <Divider sx={{ my: 2 }} />
      
      <ActionRow>
        <QuickActions />
        <Box display="flex" alignItems="center">
          <HelpButton
            variant="outlined"
            startIcon={<HelpOutlineIcon />}
            size="small"
          >
            Ayuda
          </HelpButton>
          <Typography variant="body2" color="text.secondary">
            Última actualización: {new Date().toLocaleString()}
          </Typography>
        </Box>
      </ActionRow>
    </HeaderPaper>
  );
};

export default DashboardHeader;
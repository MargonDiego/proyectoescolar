import React from 'react';
import styled from 'styled-components';
import { Box, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';

const ActionButton = styled(Button)`
  background-color: ${props => props.customcolor};
  &:hover {
    background-color: ${props => props.customcolor};
    opacity: 0.9;
  }
  color: white;
  min-width: auto;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  margin: 0 ${({ theme }) => theme.spacing(1)};
`;

const QuickActions = () => {
  const actions = [
    { icon: <AddIcon />, label: 'Nuevo Incidente', color: '#4caf50' },
    { icon: <AssessmentIcon />, label: 'Generar Informe', color: '#2196f3' },
    { icon: <GroupAddIcon />, label: 'Añadir Estudiante', color: '#ff9800' },
    { icon: <SettingsIcon />, label: 'Configuración', color: '#9e9e9e' },
  ];

  return (
    <Box display="flex">
      {actions.map((action, index) => (
        <Tooltip title={action.label} key={index}>
          <ActionButton customcolor={action.color}>
            {action.icon}
          </ActionButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default QuickActions;
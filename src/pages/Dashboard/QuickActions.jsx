// src/pages/Dashboard/QuickActions.jsx
import React from 'react';
import styled from 'styled-components';
import { Box, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import AssessmentIcon from '@mui/icons-material/Assessment';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from 'react-router-dom';
import { useStudents } from '../../hooks/useStudents/useStudents';
import { useInterventions } from '../../hooks/useInterventions/useInterventions';

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
  const navigate = useNavigate();
  const { addStudent } = useStudents();
  const { addIntervention } = useInterventions();

  const handleNewIncident = () => {
    // Aquí podrías abrir un modal para seleccionar un estudiante
    // o navegar a una página para crear una nueva intervención
    navigate('/new-intervention');
  };

  const handleGenerateReport = () => {
    // Aquí podrías generar un informe basado en los datos actuales
    console.log("Generando informe...");
  };

  const handleAddStudent = () => {
    navigate('/students/add');
  };

  const handleSettings = () => {
    navigate('/settings');
  };

  const actions = [
    { icon: <AddIcon />, label: 'Nuevo Incidente', color: '#4caf50', onClick: handleNewIncident },
    { icon: <AssessmentIcon />, label: 'Generar Informe', color: '#2196f3', onClick: handleGenerateReport },
    { icon: <GroupAddIcon />, label: 'Añadir Estudiante', color: '#ff9800', onClick: handleAddStudent },
    { icon: <SettingsIcon />, label: 'Configuración', color: '#9e9e9e', onClick: handleSettings },
  ];

  return (
    <Box display="flex">
      {actions.map((action, index) => (
        <Tooltip title={action.label} key={index}>
          <ActionButton 
            customcolor={action.color}
            onClick={action.onClick}
          >
            {action.icon}
          </ActionButton>
        </Tooltip>
      ))}
    </Box>
  );
};

export default QuickActions;
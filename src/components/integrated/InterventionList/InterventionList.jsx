import React from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import {
  Typography, List, ListItem, ListItemText, ListItemSecondaryAction,
  IconButton, Box, Chip, Paper, Grid, Divider, Card, CardContent, Button
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon, Visibility as VisibilityIcon, Add as AddIcon, PriorityHigh as PriorityHighIcon, CheckCircle as CheckCircleIcon, AccessTime as AccessTimeIcon } from '@mui/icons-material';
import styled from 'styled-components';
import { useInterventions } from '../../../hooks/useInterventions/useInterventions';

const StyledContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(2)};
  background-color: #f0f4f8;
  border-radius: 8px;
`;

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
}));

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  background: linear-gradient(to right bottom, #ffffff, #f8f9fa);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 25px rgba(0,0,0,0.2);
  }
`;

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const PriorityChip = styled(Chip)(({ theme, priority }) => {
  const colors = {
    Alta: theme.palette.error.main,
    Media: theme.palette.warning.main,
    Baja: theme.palette.success.main,
  };
  return {
    backgroundColor: colors[priority] || theme.palette.grey[500],
    color: theme.palette.getContrastText(colors[priority] || theme.palette.grey[500]),
  };
});

const ActionButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing(1)};
  background-color: #3f51b5;
  color: white;
  &:hover {
    background-color: #303f9f;
  }
`;

const statusIcons = {
  'Iniciado': <AccessTimeIcon />,
  'En Progreso': <PriorityHighIcon />,
  'Completado': <CheckCircleIcon />
};

const InterventionList = ({ interventions, handleDelete, studentId }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { interventions: fetchedInterventions, isLoading, error } = useInterventions();

  if (isLoading) return <Typography>Cargando intervenciones...</Typography>;
  if (error) return <Typography color="error">Error al cargar las intervenciones: {error.message}</Typography>;

  const studentInterventions = fetchedInterventions.filter(intervention => intervention.studentId.toString() === id);

  return (
    <StyledContainer>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          Intervenciones del Estudiante
        </Typography>
        <ActionButton 
          variant="contained" 
          component={Link} 
          to={`/students/${studentId}/AddIntervention`}
          startIcon={<AddIcon />}
        >
          Nueva Intervención
        </ActionButton>
      </Box>
      {studentInterventions.length === 0 ? (
        <Typography>No hay intervenciones registradas.</Typography>
      ) : (
        <List>
          {studentInterventions.map((intervention) => (
            <StyledListItem key={intervention.id}>
              <ListItemText
                primary={intervention.title}
                secondary={
                  <Box>
                    <Typography variant="body2" component="span">
                      {intervention.description.length > 100 
                        ? `${intervention.description.substring(0, 100)}...` 
                        : intervention.description}
                    </Typography>
                    <Box mt={1}>
                      <Chip label={intervention.category} size="small" style={{ marginRight: 8 }} />
                      <PriorityChip label={intervention.priority} size="small" priority={intervention.priority} style={{ marginRight: 8 }} />
                      <Chip label={intervention.status} size="small" icon={statusIcons[intervention.status]} style={{ marginRight: 8 }} />
                      <Typography variant="caption" display="block" mt={1}>
                        Fecha límite: {new Date(intervention.dueDate).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </Box>
                }
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" onClick={() => navigate(`/students/${studentId}/EditIntervention/${intervention.id}`)}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => handleDelete(intervention.id)}>
                  <DeleteIcon />
                </IconButton>
                <IconButton 
                  edge="end" 
                  aria-label="view" 
                  onClick={() => navigate(`/students/${studentId}/EditIntervention/${intervention.id}`)}
                  color="primary"
                >
                  <VisibilityIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </StyledListItem>
          ))}
        </List>
      )}
    </StyledContainer>
  );
};

export default InterventionList;

import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useNavigate } from 'react-router-dom';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const getIncidentSeverityColor = (severity) => {
  switch (severity) {
    case 'Alta': return 'error';
    case 'Media': return 'warning';
    case 'Baja': return 'success';
    default: return 'default';
  }
};

const RecentInterventions = ({ interventions }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const userInterventions = interventions.filter(intervention => intervention.createdBy === user.id)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, 5);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Mis Intervenciones Recientes
      </Typography>
      {userInterventions.length > 0 ? (
        <List>
          {userInterventions.map((intervention) => (
            <StyledListItem key={intervention.id}>
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Typography variant="subtitle1">
                    {intervention.title}
                    <Chip
                      size="small"
                      label={intervention.priority}
                      color={getIncidentSeverityColor(intervention.priority)}
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {intervention.studentName}
                    </Typography>
                    {" — "}{intervention.description.substring(0, 50)}...
                    <br />
                    Fecha: {new Date(intervention.createdAt).toLocaleString()}
                  </React.Fragment>
                }
              />
              <Box>
                <Tooltip title="Ver detalles">
                  <IconButton size="small" onClick={() => navigate(`/students/${intervention.studentId}/EditIntervention/${intervention.id}`)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar intervención">
                  <IconButton size="small" onClick={() => navigate(`/students/${intervention.studentId}/EditIntervention/${intervention.id}`)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </StyledListItem>
          ))}
        </List>
      ) : (
        <Typography variant="body1">No has registrado intervenciones recientes.</Typography>
      )}
    </Box>
  );
};

export default RecentInterventions;
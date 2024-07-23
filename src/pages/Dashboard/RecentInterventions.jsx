import React, { useContext } from 'react';
import { Box, Typography, List, ListItem, ListItemText, ListItemAvatar, Avatar, Chip, IconButton, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import PersonIcon from '@mui/icons-material/Person';
import WarningIcon from '@mui/icons-material/Warning';
import InfoIcon from '@mui/icons-material/Info';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  marginBottom: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const getIncidentSeverityColor = (severity) => {
  switch (severity) {
    case 'alta':
      return 'error';
    case 'media':
      return 'warning';
    case 'baja':
      return 'success';
    default:
      return 'default';
  }
};

const RecentInterventions = ({ interventions }) => {
  const { user } = useContext(AuthContext);

  // Filtramos las intervenciones para mostrar solo las del usuario actual
  const userInterventions = interventions.filter(intervention => intervention.createdBy === user.id);

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
                      label={intervention.type}
                      color={getIncidentSeverityColor(intervention.severity)}
                      sx={{ ml: 1 }}
                    />
                  </Typography>
                }
                secondary={
                  <React.Fragment>
                    <Typography component="span" variant="body2" color="text.primary">
                      {intervention.studentName}
                    </Typography>
                    {" — "}{intervention.description}
                    <br />
                    Fecha: {new Date(intervention.start).toLocaleString()}
                  </React.Fragment>
                }
              />
              <Box>
                <Tooltip title="Ver detalles">
                  <IconButton size="small" onClick={() => console.log('Ver detalles', intervention.id)}>
                    <VisibilityIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Editar intervención">
                  <IconButton size="small" onClick={() => console.log('Editar', intervention.id)}>
                    <EditIcon />
                  </IconButton>
                </Tooltip>
              </Box>
            </StyledListItem>
          ))}
        </List>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" height={200}>
          <InfoIcon color="info" sx={{ mr: 1 }} />
          <Typography variant="body1">No has registrado intervenciones recientes.</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecentInterventions;
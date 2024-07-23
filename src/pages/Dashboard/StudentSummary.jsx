import React from 'react';
import { Typography, Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider, Chip, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import SchoolIcon from '@mui/icons-material/School';
import WarningIcon from '@mui/icons-material/Warning';

const StyledListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  '&:hover': {
    backgroundColor: theme.palette.action.hover,
  },
}));

const StudentSummary = ({ totalStudents, courses, students }) => {
  const studentsWithIncidents = students.filter(student => student.incidentsCount > 0).length;
  const percentageWithIncidents = ((studentsWithIncidents / totalStudents) * 100).toFixed(1);

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Resumen de Estudiantes
      </Typography>
      
      <Grid container spacing={2} sx={{ mb: 2 }}>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'primary.main', mr: 1 }}>
              <PeopleAltIcon />
            </Avatar>
            <Box>
              <Typography variant="h4">{totalStudents}</Typography>
              <Typography variant="body2" color="text.secondary">Total Estudiantes</Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box display="flex" alignItems="center">
            <Avatar sx={{ bgcolor: 'warning.main', mr: 1 }}>
              <WarningIcon />
            </Avatar>
            <Box>
              <Typography variant="h4">{percentageWithIncidents}%</Typography>
              <Typography variant="body2" color="text.secondary">Con Incidentes</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Estudiantes por Curso
      </Typography>
      <List>
        {Object.entries(courses).map(([course, count]) => (
          <StyledListItem key={course}>
            <ListItemAvatar>
              <Avatar>
                <SchoolIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText 
              primary={course} 
              secondary={`${count} estudiantes`}
            />
            <Chip 
              label={`${((count / totalStudents) * 100).toFixed(1)}%`} 
              color="primary" 
              size="small" 
            />
          </StyledListItem>
        ))}
      </List>

      <Divider sx={{ my: 2 }} />

      <Typography variant="subtitle1" gutterBottom>
        Estudiantes con más Incidentes
      </Typography>
      <List>
        {students
          .sort((a, b) => b.incidentsCount - a.incidentsCount)
          .slice(0, 3)
          .map((student) => (
            <StyledListItem key={student.id}>
              <ListItemAvatar>
                <Avatar>{student.name.charAt(0)}</Avatar>
              </ListItemAvatar>
              <ListItemText 
                primary={student.name} 
                secondary={`${student.course} - ${student.incidentsCount} incidentes`}
              />
              <Chip 
                label={student.incidentsCount} 
                color={student.incidentsCount > 2 ? "error" : "warning"} 
                size="small" 
              />
            </StyledListItem>
          ))}
      </List>
    </Box>
  );
};

export default StudentSummary;
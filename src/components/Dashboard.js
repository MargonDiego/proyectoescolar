import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import RecentInterventions from './RecentInterventions';
import InterventionStats from './InterventionStats';
import InterventionCalendar from './InterventionCalendar';
import StudentSummary from './StudentSummary';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);

  useEffect(() => {
    const eventsData = [
      { id: 1, title: 'Intervention 1', start: new Date(), end: new Date(), studentName: 'Estudiante Uno', description: 'Intervención inicial' },
      { id: 2, title: 'Intervention 2', start: new Date(), end: new Date(), studentName: 'Estudiante Dos', description: 'Evaluación' },
      { id: 3, title: 'Intervention 3', start: new Date(), end: new Date(), studentName: 'Estudiante Tres', description: 'Seguimiento' }
    ];
    setEvents(eventsData);

    const studentsData = [
      { id: 1, name: 'Estudiante Uno', course: 'Curso 1' },
      { id: 2, name: 'Estudiante Dos', course: 'Curso 1' },
      { id: 3, name: 'Estudiante Tres', course: 'Curso 2' }
    ];
    setStudents(studentsData);
  }, []);

  const totalInterventions = events.length;
  const interventionsToday = events.filter(event => new Date(event.start).toDateString() === new Date().toDateString()).length;
  const totalStudents = students.length;
  const courses = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  const paperStyle = {
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const gridItemStyle = {
    height: '450px', // Define una altura fija
  };

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper style={paperStyle}>
            <InterventionCalendar events={events} />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper style={paperStyle}>
            <RecentInterventions interventions={events} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} style={gridItemStyle}>
          <Paper style={{...paperStyle, width: '100%', height: '100%' }}>
            <InterventionStats total={totalInterventions} today={interventionsToday} />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6} style={gridItemStyle}>
          <Paper style={{...paperStyle, width: '100%', height: '100%' }}>
            <StudentSummary totalStudents={totalStudents} courses={courses} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
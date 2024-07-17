import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import RecentInterventions from './RecentInterventions';
import InterventionStats from './InterventionStats';
import InterventionCalendar from './InterventionCalendar';
import StudentSummary from './StudentSummary';

const Dashboard = () => {
  const { user } = useContext(AuthContext); // Obtener el usuario del contexto de autenticación
  const [events, setEvents] = useState([]); // Estado para los eventos de intervenciones
  const [students, setStudents] = useState([]); // Estado para los estudiantes

  useEffect(() => {
    // Datos simulados de eventos de intervenciones
    const eventsData = [
      { id: 1, title: 'Intervention 1', start: new Date(), end: new Date(), studentName: 'Estudiante Uno', description: 'Intervención inicial' },
      { id: 2, title: 'Intervention 2', start: new Date(), end: new Date(), studentName: 'Estudiante Dos', description: 'Evaluación' },
      { id: 3, title: 'Intervention 3', start: new Date(), end: new Date(), studentName: 'Estudiante Tres', description: 'Seguimiento' }
    ];
    setEvents(eventsData);

    // Datos simulados de estudiantes
    const studentsData = [
      { id: 1, name: 'Estudiante Uno', course: 'Curso 1' },
      { id: 2, name: 'Estudiante Dos', course: 'Curso 1' },
      { id: 3, name: 'Estudiante Tres', course: 'Curso 2' }
    ];
    setStudents(studentsData);
  }, []); // Ejecutar una vez al montar el componente

  // Calcular el total de intervenciones
  const totalInterventions = events.length;
  // Calcular el número de intervenciones de hoy
  const interventionsToday = events.filter(event => new Date(event.start).toDateString() === new Date().toDateString()).length;
  // Calcular el total de estudiantes
  const totalStudents = students.length;
  // Calcular el número de estudiantes por curso
  const courses = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  // Estilos para los elementos Paper
  const paperStyle = {
    padding: '16px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  // Estilos para los elementos Grid
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

import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Grid, Button } from '@mui/material';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
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

  return (
    <Container>
      <Typography variant="h4" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <InterventionStats total={totalInterventions} today={interventionsToday} />
        </Grid>
        <Grid item xs={12} md={6}>
          <StudentSummary totalStudents={totalStudents} courses={courses} />
        </Grid>
        <Grid item xs={12}>
          <RecentInterventions interventions={events} />
        </Grid>
        <Grid item xs={12}>
          <InterventionCalendar events={events} />
        </Grid>
      </Grid>
      {(user.role === 'admin' || user.role === 'user') && (
        <Button
          component={Link}
          to="/students/add"
          variant="contained"
          color="primary"
          style={{ marginTop: 16 }}
        >
          Añadir Ficha Clínica
        </Button>
      )}
    </Container>
  );
};

export default Dashboard;

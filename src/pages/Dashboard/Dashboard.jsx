import React, { useContext, useState, useEffect } from 'react';
import styled from 'styled-components';
import { Container, Typography, Grid, useTheme } from '@mui/material';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import RecentInterventions from './RecentInterventions';
import InterventionStats from './InterventionStats';
import InterventionCalendar from '../../components/integrated/InterventionCalendar/InterventionCalendar';
import StudentSummary from './StudentSummary';
import IncidentTypeChart from './IncidentTypeChart';
import TrendAnalysis from './TrendAnalysis';
import DashboardHeader from './DashboardHeader';

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledPaper = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: ${({ theme }) => theme.shape.borderRadius * 2}px;
  box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.palette.background.paper};
  transition: box-shadow 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 6px 30px 0 rgba(0, 0, 0, 0.1);
  }
`;

const ComponentWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Dashboard = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const [events, setEvents] = useState([]);
  const [students, setStudents] = useState([]);
  const [incidentTypes, setIncidentTypes] = useState({});

  useEffect(() => {
    // Simulación de datos
    const eventsData = [
      { id: 1, title: 'Bullying Verbal', start: new Date(), end: new Date(), studentName: 'Estudiante Uno', description: 'Insultos en clase', type: 'Bullying' },
      { id: 2, title: 'Conflicto entre Estudiantes', start: new Date(), end: new Date(), studentName: 'Estudiante Dos', description: 'Discusión en el patio', type: 'Conflicto' },
      { id: 3, title: 'Daño a Propiedad Escolar', start: new Date(), end: new Date(), studentName: 'Estudiante Tres', description: 'Grafiti en baños', type: 'Vandalismo' }
    ];
    setEvents(eventsData);

    const studentsData = [
      { id: 1, name: 'Estudiante Uno', course: 'Curso 1', incidentsCount: 2 },
      { id: 2, name: 'Estudiante Dos', course: 'Curso 1', incidentsCount: 1 },
      { id: 3, name: 'Estudiante Tres', course: 'Curso 2', incidentsCount: 3 }
    ];
    setStudents(studentsData);

    const incidentTypesData = {
      'Bullying': 10,
      'Conflicto': 5,
      'Vandalismo': 3,
      'Absentismo': 7,
      'Otros': 2
    };
    setIncidentTypes(incidentTypesData);
  }, []);

  const totalInterventions = events.length;
  const interventionsToday = events.filter(event => new Date(event.start).toDateString() === new Date().toDateString()).length;
  const totalStudents = students.length;
  const courses = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  return (
    <StyledContainer maxWidth="xl">
      <DashboardHeader user={user} notificationCount={3} />

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <ComponentWrapper>
              <InterventionStats total={totalInterventions} today={interventionsToday} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <ComponentWrapper>
              <IncidentTypeChart incidentTypes={incidentTypes} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Calendario de Incidentes</Typography>
            <div style={{ height: '100%', width: '100%' }}>
              <InterventionCalendar events={events} />
            </div>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <ComponentWrapper>
              <RecentInterventions interventions={events} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <ComponentWrapper>
              <TrendAnalysis events={events} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper>
            <ComponentWrapper>
              <StudentSummary totalStudents={totalStudents} courses={courses} students={students} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Dashboard;
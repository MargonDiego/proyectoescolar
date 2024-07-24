import React, { useContext, useState, useMemo } from 'react';
import styled from 'styled-components';
import { 
  Container, Typography, Grid, useTheme, CircularProgress, Dialog, 
  DialogTitle, DialogContent, DialogActions, Button, Select, MenuItem, 
  FormControl, InputLabel, Snackbar, Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import RecentInterventions from './RecentInterventions';
import InterventionStats from './InterventionStats';
import InterventionCalendar from '../../components/integrated/InterventionCalendar/InterventionCalendar';
import StudentSummary from './StudentSummary';
import IncidentTypeChart from './IncidentTypeChart';
import TrendAnalysis from './TrendAnalysis';
import DashboardHeader from './DashboardHeader';
import { useStudents } from '../../hooks/useStudents/useStudents';
import { useInterventions } from '../../hooks/useInterventions/useInterventions';

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
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const { students, isLoading: studentsLoading, error: studentsError } = useStudents();
  const { interventions, isLoading: interventionsLoading, error: interventionsError } = useInterventions();
  const [openStudentDialog, setOpenStudentDialog] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState('');
  const [selectedIntervention, setSelectedIntervention] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const userInterventions = useMemo(() => 
    user && interventions ? (
      user.role === 'admin' 
        ? interventions 
        : interventions.filter(intervention => intervention.createdBy === user.id)
    ) : [],
    [user, interventions]
  );

  const calendarEvents = useMemo(() => 
    userInterventions.map(intervention => ({
      id: intervention.id,
      title: intervention.title,
      start: new Date(intervention.createdAt),
      end: new Date(intervention.createdAt),
      resource: intervention
    })),
    [userInterventions]
  );

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  if (!user) {
    return <Typography>No se ha encontrado un usuario conectado. Por favor, inicie sesión.</Typography>;
  }

  if (studentsLoading || interventionsLoading) {
    return (
      <StyledContainer maxWidth="xl">
        <CircularProgress />
        <Typography>Cargando datos del dashboard...</Typography>
      </StyledContainer>
    );
  }

  if (studentsError || interventionsError) {
    return (
      <StyledContainer maxWidth="xl">
        <Typography color="error">Error al cargar los datos: {studentsError || interventionsError}</Typography>
      </StyledContainer>
    );
  }

  const totalInterventions = interventions.length;
  const interventionsToday = interventions.filter(event => 
    new Date(event.createdAt).toDateString() === new Date().toDateString()
  ).length;
  const totalStudents = students.length;
  const courses = students.reduce((acc, student) => {
    acc[student.course] = (acc[student.course] || 0) + 1;
    return acc;
  }, {});

  const handleEventSelect = (event) => {
    setSelectedIntervention(event.resource);
  };

  const handleAddEvent = () => {
    setOpenStudentDialog(true);
  };

  const handleCloseStudentDialog = () => {
    setOpenStudentDialog(false);
    setSelectedStudent('');
  };

  const handleStudentSelect = () => {
    if (selectedStudent) {
      navigate(`/students/${selectedStudent}/AddIntervention`);
    }
    handleCloseStudentDialog();
  };

  const handleViewIntervention = () => {
    if (selectedIntervention) {
      navigate(`/students/${selectedIntervention.studentId}/EditIntervention/${selectedIntervention.id}`);
    }
  };

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
              <IncidentTypeChart interventions={userInterventions} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>

        <Grid item xs={12}>
          <StyledPaper>
            <Typography variant="h6" gutterBottom>Calendario de Incidentes</Typography>
            <div style={{ height: '100%', width: '100%' }}>
              <InterventionCalendar 
                events={calendarEvents}
                onSelectEvent={handleEventSelect}
                onAddEvent={handleAddEvent}
              />
            </div>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <ComponentWrapper>
              <RecentInterventions interventions={userInterventions} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <ComponentWrapper>
              <TrendAnalysis interventions={userInterventions} />
            </ComponentWrapper>
          </StyledPaper>
        </Grid>

        {user.role === 'admin' && (
          <Grid item xs={12}>
            <StyledPaper>
              <ComponentWrapper>
                <StudentSummary totalStudents={totalStudents} courses={courses} students={students} />
              </ComponentWrapper>
            </StyledPaper>
          </Grid>
        )}
      </Grid>

      <Dialog open={openStudentDialog} onClose={handleCloseStudentDialog}>
        <DialogTitle>Seleccionar Estudiante</DialogTitle>
        <DialogContent>
          <FormControl fullWidth>
            <InputLabel id="student-select-label">Estudiante</InputLabel>
            <Select
              labelId="student-select-label"
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
            >
              {students.map((student) => (
                <MenuItem key={student.id} value={student.id}>
                  {`${student.firstName} ${student.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseStudentDialog}>Cancelar</Button>
          <Button onClick={handleStudentSelect} color="primary">
            Continuar
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(selectedIntervention)} onClose={() => setSelectedIntervention(null)}>
        <DialogTitle>Resumen de Intervención</DialogTitle>
        <DialogContent>
          {selectedIntervention && (
            <>
              <Typography><strong>Título:</strong> {selectedIntervention.title}</Typography>
              <Typography><strong>Fecha:</strong> {new Date(selectedIntervention.createdAt).toLocaleDateString()}</Typography>
              <Typography><strong>Descripción:</strong> {selectedIntervention.description}</Typography>
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setSelectedIntervention(null)}>Cerrar</Button>
          <Button onClick={handleViewIntervention} color="primary">
            Ver Detalles
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default Dashboard;
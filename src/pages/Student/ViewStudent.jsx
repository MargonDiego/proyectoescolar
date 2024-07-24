import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { 
  Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Grid, Box, Snackbar, Alert, Tabs, Tab, Fade, CircularProgress, 
  TextField, Stepper, Step, StepLabel, StepContent, IconButton, 
  Tooltip, Zoom, Fab, Paper, Chip, Avatar, Card, CardContent, CardHeader,MenuItem
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MiniInterventionCalendar from '../../components/integrated/MiniInterventionCalendar/MiniInterventionCalendar';
import StudentCard from '../../components/integrated/StudentCard/StudentCard';
import InterventionList from '../../components/integrated/InterventionList/InterventionList';
import { useStudents } from '../../hooks/useStudents/useStudents';
import { useInterventions } from '../../hooks/useInterventions/useInterventions';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

const StyledContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  padding: ${({ theme }) => theme.spacing(3)};
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledTextField = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ScrollTop = styled(Fab)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing(2)};
  right: ${({ theme }) => theme.spacing(2)};
`;

const LoadingContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.palette.background.default};
`;

const InterventionSummary = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(2)};
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  background-color: ${({ theme }) => theme.palette.background.paper};
  border-radius: 8px;
`;

const ViewStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { students, updateStudent, isLoading: studentsLoading, error: studentsError } = useStudents();
    const { interventions, isLoading: interventionsLoading, error: interventionsError, deleteIntervention, addIntervention } = useInterventions(id);
    const [student, setStudent] = useState(null);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedIntervention, setSelectedIntervention] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
    const [tabValue, setTabValue] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        if (students.length > 0) {
            const currentStudent = students.find(s => s.id.toString() === id);
            setStudent(currentStudent || null);
        }
    }, [id, students]);

    useEffect(() => {
        const handleScroll = () => setShowScrollTop(window.pageYOffset > 300);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDelete = (interventionId) => {
        setSelectedIntervention(interventionId);
        setOpenDeleteDialog(true);
    };

    const confirmDelete = async () => {
        try {
            await deleteIntervention(selectedIntervention);
            setSnackbar({ open: true, message: 'Intervención eliminada exitosamente', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error al eliminar la intervención', severity: 'error' });
        } finally {
            setOpenDeleteDialog(false);
            setSelectedIntervention(null);
        }
    };

    const handleEventSelect = (event) => {
        navigate(`/students/${id}/EditIntervention/${event.id}`);
    };


    const handleCloseSnackbar = () => {
        setSnackbar(prev => ({ ...prev, open: false }));
    };

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
        setActiveStep(0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudent(student);
            setSnackbar({ open: true, message: 'Estudiante actualizado exitosamente', severity: 'success' });
        } catch (error) {
            setSnackbar({ open: true, message: 'Error al actualizar el estudiante', severity: 'error' });
        }
    };

    const handleNext = () => {
        setActiveStep(prevActiveStep => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep(prevActiveStep => prevActiveStep - 1);
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };


    if (studentsLoading || interventionsLoading) {
        return (
            <LoadingContainer>
                <CircularProgress size={60} />
                <Typography variant="h6" style={{ marginTop: '20px' }}>
                    Cargando información del estudiante...
                </Typography>
            </LoadingContainer>
        );
    }

    if (studentsError || interventionsError) {
        return (
            <LoadingContainer>
                <Typography variant="h6" color="error">
                    Error al cargar la información: {studentsError || interventionsError}
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ marginTop: '20px' }}
                    onClick={() => navigate('/students')}
                >
                    Volver a la lista de estudiantes
                </Button>
            </LoadingContainer>
        );
    }

    if (!student) {
        return (
            <LoadingContainer>
                <Typography variant="h6" color="error">
                    No se pudo encontrar la información del estudiante.
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    style={{ marginTop: '20px' }}
                    onClick={() => navigate('/students')}
                >
                    Volver a la lista de estudiantes
                </Button>
            </LoadingContainer>
        );
    }

    const steps = [
        {
            label: 'Información Personal',
            icon: <PersonIcon />,
            content: (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Nombre"
                            name="firstName"
                            value={student.firstName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Apellido"
                            name="lastName"
                            value={student.lastName}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="RUT"
                            name="rut"
                            value={student.rut}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Curso"
                            name="course"
                            value={student.course}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField
                            label="Dirección"
                            name="address"
                            value={student.address}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Teléfono"
                            name="phone"
                            value={student.phone}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Fecha de Nacimiento"
                            name="dob"
                            type="date"
                            value={student.dob}
                            onChange={handleChange}
                            fullWidth
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                </Grid>
            ),
        },
        {
            label: 'Información Médica',
            icon: <LocalHospitalIcon />,
            content: (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <StyledTextField
                            label="Historia Médica"
                            name="medicalHistory"
                            value={student.medicalHistory}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <StyledTextField
                            label="Alergias"
                            name="allergies"
                            value={student.allergies}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Tipo de Sangre"
                            name="bloodType"
                            value={student.bloodType}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Medicamentos"
                            name="medications"
                            value={student.medications}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                </Grid>
            ),
        },
        {
            label: 'Contacto de Emergencia',
            icon: <ContactPhoneIcon />,
            content: (
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Contacto de Emergencia"
                            name="emergencyContact"
                            value={student.emergencyContact}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <StyledTextField
                            label="Teléfono de Emergencia"
                            name="emergencyPhone"
                            value={student.emergencyPhone}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
                    </Grid>
                </Grid>
            ),
        },
        {
            label: 'Notas Adicionales',
            icon: <SchoolIcon />,
            content: (
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <StyledTextField
                            label="Notas"
                            name="notes"
                            value={student.notes}
                            onChange={handleChange}
                            fullWidth
                            multiline
                            rows={4}
                        />
                    </Grid>
                </Grid>
            ),
        },
    ];

    return (
        <StyledContainer>
            <Box display="flex" alignItems="center" mb={3}>
                <Tooltip title="Volver">
                    <IconButton onClick={() => navigate('/students')} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="h4" component="h1" ml={2}>
                    Perfil del Estudiante
                </Typography>
            </Box>
            <StyledCard>
                <CardContent>
                    <Tabs value={tabValue} onChange={handleChangeTab} centered>
                        <Tab icon={<PersonIcon />} label="Información Personal" />
                        <Tab icon={<CalendarTodayIcon />} label="Intervenciones" />
                        <Tab icon={<AssessmentIcon />} label="Análisis" />
                        <Tab icon={<EditIcon />} label="Editar Perfil" />
                    </Tabs>

                    <Fade in={tabValue === 0}>
                        <Box hidden={tabValue !== 0} mt={3}>
                            <StudentCard student={student} />
                        </Box>
                    </Fade>

                    <Fade in={tabValue === 1}>
                        <Box hidden={tabValue !== 1} mt={3}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={8}>
                                    <InterventionList 
                                        interventions={interventions}
                                        handleDelete={handleDelete}
                                        studentId={id}
                                    />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <Typography variant="h6" gutterBottom>Calendario de Intervenciones</Typography>
                                    <MiniInterventionCalendar 
                                        interventions={interventions}
                                        onSelectEvent={handleEventSelect}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Fade>

                    <Fade in={tabValue === 2}>
                        <Box hidden={tabValue !== 2} mt={3}>
                            <Typography variant="h5" gutterBottom>Análisis de Intervenciones</Typography>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <InterventionSummary>
                                        <Typography variant="h6" gutterBottom>Resumen de Intervenciones</Typography>
                                        <Typography>Total de intervenciones: {interventions.length}</Typography>
                                        <Typography>Intervenciones activas: {interventions.filter(i => i.status !== 'Completada').length}</Typography>
                                        <Typography>Intervenciones completadas: {interventions.filter(i => i.status === 'Completada').length}</Typography>
                                    </InterventionSummary>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <InterventionSummary>
                                        <Typography variant="h6" gutterBottom>Categorías de Intervenciones</Typography>
                                        {Object.entries(interventions.reduce((acc, i) => {
                                            acc[i.category] = (acc[i.category] || 0) + 1;
                                            return acc;
                                        }, {})).map(([category, count]) => (
                                            <Chip 
                                                key={category}
                                                label={`${category}: ${count}`}
                                                style={{ margin: '4px' }}
                                            />
                                        ))}
                                    </InterventionSummary>
                                </Grid>
                            </Grid>
                            {/* Aquí puedes agregar más visualizaciones y análisis */}
                        </Box>
                    </Fade>

                    <Fade in={tabValue === 3}>
                        <Box hidden={tabValue !== 3} mt={3}>
                            <Typography variant="h5" gutterBottom>Editar Perfil del Estudiante</Typography>
                            <form onSubmit={handleSubmit}>
                                <Stepper activeStep={activeStep} orientation="vertical">
                                    {steps.map((step, index) => (
                                        <Step key={step.label}>
                                            <StepLabel
                                                StepIconComponent={() => (
                                                    <Avatar
                                                        sx={{
                                                            bgcolor: activeStep === index ? 'primary.main' : 'grey.300',
                                                            color: activeStep === index ? 'primary.contrastText' : 'text.primary',
                                                        }}
                                                    >
                                                        {step.icon}
                                                    </Avatar>
                                                )}
                                            >
                                                {step.label}
                                            </StepLabel>
                                            <StepContent>
                                                <Box sx={{ mb: 2 }}>
                                                    {step.content}
                                                    <Box sx={{ mb: 2, mt: 1 }}>
                                                        <Button
                                                            disabled={index === 0}
                                                            onClick={handleBack}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            Atrás
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                                                            sx={{ mr: 1 }}
                                                        >
                                                            {index === steps.length - 1 ? 'Guardar' : 'Siguiente'}
                                                        </Button>
                                                    </Box>
                                                </Box>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                            </form>
                        </Box>
                    </Fade>
                </CardContent>
            </StyledCard>
            
            <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
                <DialogTitle>Eliminar Intervención</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        ¿Estás seguro de que quieres eliminar esta intervención? Esta acción no se puede deshacer.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpenDeleteDialog(false)} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={confirmDelete} color="secondary">
                        Eliminar
                    </Button>
                </DialogActions>
            </Dialog>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
                    {snackbar.message}
                </Alert>
            </Snackbar>

            <Zoom in={showScrollTop}>
                <ScrollTop onClick={scrollToTop} color="primary" size="small" aria-label="scroll back to top">
                    <KeyboardArrowUp />
                </ScrollTop>
            </Zoom>
        </StyledContainer>
    );
};

export default ViewStudent;
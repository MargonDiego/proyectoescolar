import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Typography, Button, Dialog, DialogActions, DialogContent, DialogContentText, 
  DialogTitle, Grid, Box, Snackbar, Alert, Tabs, Tab, Fade, CircularProgress, 
  TextField, Stepper, Step, StepLabel, StepContent, IconButton, 
  Tooltip, Zoom, Fab
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import PersonIcon from '@mui/icons-material/Person';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ListAltIcon from '@mui/icons-material/ListAlt';
import EditIcon from '@mui/icons-material/Edit';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import InterventionCalendar from '../../components/integrated/InterventionCalendar/InterventionCalendar';
import StudentCard from '../../components/integrated/StudentCard/StudentCard';
import InterventionList from '../../components/integrated/InterventionList/InterventionList';
import { useStudents } from '../../hooks/useStudents/useStudents';
import { useInterventions } from '../../hooks/useInterventions/useInterventions';

const StyledContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledCard = styled.div`
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
  padding: ${({ theme }) => theme.spacing(3)};
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

const ViewStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { students = [], updateStudent, isLoading: studentsLoading } = useStudents();
    const { interventions = [], deleteIntervention, isLoading: interventionsLoading } = useInterventions();
    const [student, setStudent] = useState(null);
    const [open, setOpen] = useState(false);
    const [selectedIntervention, setSelectedIntervention] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [tabValue, setTabValue] = useState(0);
    const [activeStep, setActiveStep] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);

    useEffect(() => {
        if (students && students.length > 0) {
            const currentStudent = students.find(s => s.id.toString() === id);
            if (currentStudent) {
                setStudent(currentStudent);
            }
        }
    }, [id, students]);

    useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDelete = (interventionId) => {
        setOpen(true);
        setSelectedIntervention(interventionId);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedIntervention(null);
    };

    const confirmDelete = async () => {
        try {
            await deleteIntervention(selectedIntervention);
            setOpen(false);
            setSelectedIntervention(null);
            setOpenSnackbar(true);
            setSnackbarMessage('Intervención eliminada exitosamente!');
        } catch (error) {
            console.error('Error deleting intervention:', error);
            setSnackbarMessage('Error al eliminar la intervención');
            setOpenSnackbar(true);
        }
    };

    const handleEventSelect = (event) => {
        navigate(`/students/${id}/Editintervention/${event.interventionId}`);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleChangeTab = (event, newValue) => {
        setTabValue(newValue);
        setActiveStep(0);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateStudent(student);
            setSnackbarMessage('Estudiante actualizado exitosamente!');
            setOpenSnackbar(true);
        } catch (error) {
            console.error('Error updating student:', error);
        }
    };

    const handleNext = () => {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevActiveStep) => prevActiveStep - 1);
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
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

    if (!student) {
        return (
            <LoadingContainer>
                <Typography variant="h6" color="error">
                    No se pudo cargar la información del estudiante.
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

    const events = interventions.filter(i => i.studentId.toString() === id).map(intervention => ({
        title: intervention.title,
        start: new Date(intervention.createdAt),
        end: new Date(intervention.createdAt),
        interventionId: intervention.id
    }));

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
                    Ver Estudiante
                </Typography>
            </Box>
            <StyledCard>
                <Tabs value={tabValue} onChange={handleChangeTab} centered>
                    <Tab icon={<PersonIcon />} label="Información del Estudiante" />
                    <Tab icon={<CalendarTodayIcon />} label="Calendario de Intervenciones" />
                    <Tab icon={<ListAltIcon />} label="Lista de Intervenciones" />
                    <Tab icon={<EditIcon />} label="Editar Estudiante" />
                </Tabs>

                <Fade in={tabValue === 0}>
                    <Box hidden={tabValue !== 0}>
                        <StudentCard student={student} />
                    </Box>
                </Fade>

                <Fade in={tabValue === 1}>
                    <Box hidden={tabValue !== 1}>
                        <InterventionCalendar events={events} onSelectEvent={handleEventSelect} />
                    </Box>
                </Fade>

                <Fade in={tabValue === 2}>
                    <Box hidden={tabValue !== 2}>
                        <InterventionList 
                            interventions={interventions.filter(i => i.studentId.toString() === id)} 
                            handleDelete={handleDelete} 
                            studentId={id}
                        />
                    </Box>
                </Fade>

                <Fade in={tabValue === 3}>
                    <Box hidden={tabValue !== 3}>
                        <form onSubmit={handleSubmit}>
                            <Stepper activeStep={activeStep} orientation="vertical">
                                {steps.map((step, index) => (
                                    <Step key={step.label}>
                                        <StepLabel
                                            StepIconComponent={() => (
                                                <Box
                                                    sx={{
                                                        backgroundColor: activeStep === index ? 'primary.main' : 'grey.300',
                                                        borderRadius: '50%',
                                                        width: 40,
                                                        height: 40,
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        alignItems: 'center',
                                                        color: activeStep === index ? 'primary.contrastText' : 'text.primary',
                                                    }}
                                                >
                                                    {step.icon}
                                                </Box>
                                            )}
                                        >
                                            {step.label}
                                        </StepLabel>
                                        <StepContent>
                                            <Box sx={{ mb: 2 }}>
                                                {step.content}
                                                <Box sx={{ mb: 2 }}>
                                                    <div>
                                                        <Button
                                                            disabled={index === 0}
                                                            onClick={handleBack}
                                                            sx={{ mt: 1, mr: 1 }}
                                                        >
                                                            Atrás
                                                        </Button>
                                                        <Button
                                                            variant="contained"
                                                            onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                                                            sx={{ mt: 1, mr: 1 }}
                                                            >
                                                                {index === steps.length - 1 ? 'Guardar' : 'Siguiente'}
                                                            </Button>
                                                        </div>
                                                    </Box>
                                                </Box>
                                            </StepContent>
                                        </Step>
                                    ))}
                                </Stepper>
                            </form>
                        </Box>
                    </Fade>
                </StyledCard>
    
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Confirmar Eliminación</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            ¿Estás seguro de que deseas eliminar esta intervención? Esta acción no se puede deshacer.
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={confirmDelete} color="secondary">
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
    
                <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                    <Alert onClose={handleCloseSnackbar} severity="success">
                        {snackbarMessage}
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
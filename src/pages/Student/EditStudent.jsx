import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Typography, TextField, Button, Box, Snackbar, Alert,
  Grid, IconButton, Tooltip, Stepper, Step, StepLabel,
  StepContent, Fab, Zoom
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';

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

const SectionTitle = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
  display: flex;
  align-items: center;
  & svg {
    margin-right: ${({ theme }) => theme.spacing(1)};
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

const EditStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [activeStep, setActiveStep] = useState(0);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        // Simulated API call
        const fetchStudent = async () => {
            const studentData = {
                id: 1,
                firstName: 'Juan',
                lastName: 'Pérez',
                rut: '12345678-9',
                course: 'Primero Medio',
                phone: '123456789',
                dob: '2005-05-20',
                medicalHistory: 'Asma, Diabetes',
                address: 'Calle Falsa 123',
                emergencyContact: 'María Pérez',
                emergencyPhone: '987654321',
                bloodType: 'O+',
                medications: 'Insulina',
                notes: 'Ninguna',
                allergies: 'Polen'
            };
            setStudent(studentData);
        };
        fetchStudent();

        const handleScroll = () => {
            setShowScrollTop(window.pageYOffset > 300);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Estudiante editado:', student);
        setOpenSnackbar(true);
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
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

    if (!student) return <Typography variant="h6">Cargando...</Typography>;

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
                    Editar Estudiante
                </Typography>
            </Box>
            <StyledCard>
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
            </StyledCard>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert onClose={handleCloseSnackbar} severity="success">
                    Estudiante editado exitosamente!
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

export default EditStudent;
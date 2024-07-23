import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Typography, TextField, Button, Container, Step, StepLabel, Snackbar, Alert,
  Paper, CircularProgress, Stepper, Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Person, School, LocalHospital, ContactPhone } from '@mui/icons-material';
import { useStudents } from '../../hooks/useStudents/useStudents';

const StyledContainer = styled(Container)`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  background: linear-gradient(to right bottom, #ffffff, #f8f9fa);
`;

const StyledTextField = styled(TextField)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const steps = [
  { label: 'Información Personal', icon: <Person /> },
  { label: 'Información Médica', icon: <LocalHospital /> },
  { label: 'Contacto de Emergencia', icon: <ContactPhone /> },
  { label: 'Notas', icon: <School /> }
];

const AddStudent = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [student, setStudent] = useState({
    firstName: '',
    lastName: '',
    rut: '',
    course: '',
    address: '',
    phone: '',
    dob: '',
    medicalHistory: '',
    allergies: '',
    emergencyContact: '',
    emergencyPhone: '',
    bloodType: '',
    medications: '',
    notes: ''
  });

  const navigate = useNavigate();
  const { addStudent, isLoading } = useStudents();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStudent({ ...student, [name]: value });
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addStudent(student);
      setOpenSnackbar(true);
      setTimeout(() => navigate('/students'), 2000);
    } catch (error) {
      console.error('Error adding student:', error);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={2}>
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
        );
      case 1:
        return (
          <Grid container spacing={2}>
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
        );
      case 2:
        return (
          <Grid container spacing={2}>
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
        );
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <StyledTextField
                label="Notas Adicionales"
                name="notes"
                value={student.notes}
                onChange={handleChange}
                fullWidth
                multiline
                rows={4}
              />
            </Grid>
          </Grid>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <StyledContainer>
      <StyledPaper elevation={6}>
        <Typography variant="h4" gutterBottom>
          Añadir Estudiante
        </Typography>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel StepIconComponent={() => step.icon}>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}
          <ButtonContainer>
            <Button 
              disabled={activeStep === 0} 
              onClick={handleBack}
            >
              Atrás
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? handleSubmit : handleNext}
              disabled={isLoading}
              startIcon={isLoading ? <CircularProgress size={20} /> : null}
            >
              {activeStep === steps.length - 1 ? (isLoading ? 'Enviando...' : 'Añadir Estudiante') : 'Siguiente'}
            </Button>
          </ButtonContainer>
        </form>
      </StyledPaper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success">
          Estudiante añadido exitosamente!
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default AddStudent;

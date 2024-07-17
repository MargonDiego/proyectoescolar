import React, { useState } from 'react';
import { 
    Box, 
    Grid, 
    Typography, 
    TextField, 
    Button, 
    Paper, 
    Container 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
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

    const navigate = useNavigate(); // Hook para la navegación

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value }); // Actualiza el estado con los valores del formulario
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Estudiante añadido:', student); // Simula la adición del estudiante
        navigate('/students'); // Redirige a la página de estudiantes
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Añadir Estudiante
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <Typography variant="h6" gutterBottom>
                                Información Personal
                            </Typography>
                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                    <TextField
                                        label="Nombre"
                                        name="firstName"
                                        value={student.firstName}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Box>
                                <Box flex={1} ml="0.5em">
                                    <TextField
                                        label="Apellido"
                                        name="lastName"
                                        value={student.lastName}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                    />
                                </Box>
                            </Box>
                            <TextField
                                label="RUT"
                                name="rut"
                                value={student.rut}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Curso"
                                name="course"
                                value={student.course}
                                onChange={handleChange}
                                fullWidth
                                required
                                margin="normal"
                            />
                            <TextField
                                label="Dirección"
                                name="address"
                                value={student.address}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                    <TextField
                                        label="Teléfono"
                                        name="phone"
                                        value={student.phone}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Box>
                                <Box flex={1} ml="0.5em">
                                    <TextField
                                        label="Fecha de Nacimiento"
                                        name="dob"
                                        type="date"
                                        value={student.dob}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                        InputLabelProps={{ shrink: true }}
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12} md={4}>
                            <Typography variant="h6" gutterBottom>
                                Información Médica
                            </Typography>
                            <TextField
                                label="Antecedentes Médicos"
                                name="medicalHistory"
                                value={student.medicalHistory}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={2}
                                margin="normal"
                            />
                            <TextField
                                label="Alergias"
                                name="allergies"
                                value={student.allergies}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Grupo Sanguíneo"
                                name="bloodType"
                                value={student.bloodType}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Medicamentos"
                                name="medications"
                                value={student.medications}
                                onChange={handleChange}
                                fullWidth
                                margin="normal"
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Typography variant="h6" gutterBottom>
                                Contacto de Emergencia
                            </Typography>
                            <Box display="flex">
                                <Box flex={1} mr="0.5em">
                                    <TextField
                                        label="Contacto de Emergencia"
                                        name="emergencyContact"
                                        value={student.emergencyContact}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Box>
                                <Box flex={1} ml="0.5em">
                                    <TextField
                                        label="Teléfono de Emergencia"
                                        name="emergencyPhone"
                                        value={student.emergencyPhone}
                                        onChange={handleChange}
                                        fullWidth
                                        margin="normal"
                                    />
                                </Box>
                            </Box>
                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                label="Notas"
                                name="notes"
                                value={student.notes}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={3}
                                margin="normal"
                            />
                        </Grid>
                    </Grid>

                    <Box mt={3} display="flex" justifyContent="flex-end">
                        <Button variant="contained" color="primary" type="submit">
                            Añadir Estudiante
                        </Button>
                    </Box>
                </form>
            </Paper>
        </Container>
    );
};

export default AddStudent;

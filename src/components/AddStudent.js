// src/components/AddStudent.js
import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [student, setStudent] = useState({
        name: '',
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Estudiante añadido:', student);
        navigate('/students');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Añadir Estudiante
            </Typography>
            <Paper style={{ padding: '16px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Nombre" name="name" value={student.name} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Curso" name="course" value={student.course} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Dirección" name="address" value={student.address} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Teléfono" name="phone" value={student.phone} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Fecha de Nacimiento" name="dob" type="date" value={student.dob} onChange={handleChange} fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
                    <TextField label="Antecedentes Médicos" name="medicalHistory" value={student.medicalHistory} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Alergias" name="allergies" value={student.allergies} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Contacto de Emergencia" name="emergencyContact" value={student.emergencyContact} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Teléfono de Emergencia" name="emergencyPhone" value={student.emergencyPhone} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Grupo Sanguíneo" name="bloodType" value={student.bloodType} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Medicamentos" name="medications" value={student.medications} onChange={handleChange} fullWidth margin="normal" />
                    <TextField label="Notas" name="notes" value={student.notes} onChange={handleChange} fullWidth margin="normal" />
                    <Button variant="contained" color="primary" type="submit">
                        Añadir
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddStudent;

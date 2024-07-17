import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditStudent = () => {
    const { id } = useParams();
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

    useEffect(() => {
        // Datos simulados de estudiantes
        const studentData = [
            {
                id: 1,
                firstName: 'Juan',
                lastName: 'Pérez',
                rut: '12345678-9',
                course: 'Primero Medio',
                address: 'Calle Falsa 123',
                phone: '123456789',
                dob: '2005-05-20',
                avatar: 'https://via.placeholder.com/150',
                medicalHistory: 'Asma, Diabetes',
                allergies: 'Polen, Polvo',
                emergencyContact: 'María Pérez',
                emergencyPhone: '987654321',
                bloodType: 'O+',
                medications: 'Inhalador de Asma',
                notes: 'Paciente requiere chequeo cada 6 meses'
            },
            {
                id: 2,
                firstName: 'María',
                lastName: 'García',
                rut: '98765432-1',
                course: 'Segundo Medio',
                address: 'Calle Verdadera 456',
                phone: '987654321',
                dob: '2004-04-15',
                avatar: 'https://via.placeholder.com/150',
                medicalHistory: 'Alergias a Polen',
                allergies: 'Ninguna',
                emergencyContact: 'José García',
                emergencyPhone: '123456789',
                bloodType: 'A+',
                medications: 'Antihistamínicos',
                notes: 'Paciente con seguimiento anual'
            },
        ];

        // Encontrar el estudiante correspondiente por ID y establecerlo en el estado
        const selectedStudent = studentData.find(s => s.id === parseInt(id));
        setStudent(selectedStudent);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setStudent({ ...student, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Estudiante actualizado:', student);
        // Redirige a la vista del estudiante actualizado
        navigate(`/students/${id}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Editar Estudiante
            </Typography>
            <Paper style={{ padding: '16px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Nombre" name="firstName" value={student.firstName} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Apellido" name="lastName" value={student.lastName} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="RUT" name="rut" value={student.rut} onChange={handleChange} fullWidth margin="normal" required />
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
                        Actualizar
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditStudent;

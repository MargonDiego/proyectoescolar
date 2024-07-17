// src/components/ViewStudent.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Box } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InterventionCalendar from './InterventionCalendar';
import StudentCard from './StudentCard';
import InterventionList from './InterventionList';

const ViewStudent = () => {
    const { id } = useParams();  // Obtener el parámetro 'id' de la URL
    const navigate = useNavigate();  // Hook para la navegación programática
    const [student, setStudent] = useState(null);  // Estado para almacenar los datos del estudiante
    const [interventions, setInterventions] = useState([]);  // Estado para almacenar las intervenciones del estudiante
    const [events, setEvents] = useState([]);  // Estado para almacenar los eventos del calendario
    const [open, setOpen] = useState(false);  // Estado para controlar la apertura del diálogo de confirmación
    const [selectedIntervention, setSelectedIntervention] = useState(null);  // Estado para almacenar la intervención seleccionada

    useEffect(() => {
        // Datos simulados de estudiantes
        const studentsData = [
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

        // Encontrar el estudiante por ID
        const studentData = studentsData.find(s => s.id === parseInt(id));
        setStudent(studentData);

        // Datos simulados de intervenciones
        const interventionsData = [
            { id: 1, studentId: 1, date: new Date(), description: 'Intervención inicial' },
            { id: 2, studentId: 1, date: new Date(), description: 'Seguimiento' },
        ];
        setInterventions(interventionsData);

        // Mapear las intervenciones a eventos del calendario
        const eventsData = interventionsData.map(intervention => ({
            title: intervention.description,
            start: new Date(intervention.date),
            end: new Date(intervention.date),
            interventionId: intervention.id
        }));
        setEvents(eventsData);
    }, [id]);

    const handleDelete = (interventionId) => {
        setOpen(true);  // Abrir el diálogo de confirmación
        setSelectedIntervention(interventionId);  // Establecer la intervención seleccionada para eliminar
    };

    const handleClose = () => {
        setOpen(false);  // Cerrar el diálogo de confirmación
        setSelectedIntervention(null);  // Limpiar la intervención seleccionada
    };

    const confirmDelete = () => {
        setInterventions(interventions.filter(intervention => intervention.id !== selectedIntervention));  // Eliminar la intervención seleccionada
        setOpen(false);  // Cerrar el diálogo de confirmación
        setSelectedIntervention(null);  // Limpiar la intervención seleccionada
    };

    const handleEventSelect = (event) => {
        navigate(`/students/${id}/edit-intervention/${event.interventionId}`);  // Navegar a la página de edición de la intervención seleccionada
    };

    if (!student) return <Typography>Cargando...</Typography>;  // Mostrar mensaje de carga si los datos del estudiante no están disponibles

    return (
        <Container>
            <Box sx={{ p: 2, backgroundColor: '#f5f5f5', borderRadius: 2, boxShadow: 3, mb: 3 }}>
                <Typography variant="h4" gutterBottom>
                    Ver Estudiante
                </Typography>
            </Box>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <StudentCard student={student} />  
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper style={{ padding: '16px', height: '100%', display: 'flex', flexDirection: 'column' }}>
                        <Box style={{ flexGrow: 1, overflowY: 'auto' }}>
                            <InterventionCalendar events={events} onSelectEvent={handleEventSelect} />  
                        </Box>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ padding: '16px' }}>
                        <Button variant="contained" color="primary" component={Link} to={`/students/${id}/add-intervention`} style={{ marginBottom: '16px' }}>
                            Añadir Intervención
                        </Button>
                        <Typography variant="h6" gutterBottom>
                            Lista de Intervenciones
                        </Typography>
                        <InterventionList interventions={interventions} handleDelete={handleDelete} />  
                    </Paper>
                </Grid>
            </Grid>
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
        </Container>
    );
};

export default ViewStudent;

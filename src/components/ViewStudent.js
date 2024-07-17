// src/components/ViewStudent.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, List, ListItem, ListItemText, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Box } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import InterventionCalendar from './InterventionCalendar';
import StudentCard from './StudentCard';

const ViewStudent = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [student, setStudent] = useState(null);
    const [interventions, setInterventions] = useState([]);
    const [events, setEvents] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedIntervention, setSelectedIntervention] = useState(null);

    useEffect(() => {
        const studentData = {
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
        };
        setStudent(studentData);

        const interventionsData = [
            { id: 1, studentId: 1, date: new Date(), description: 'Intervención inicial' },
            { id: 2, studentId: 1, date: new Date(), description: 'Seguimiento' },
        ];
        setInterventions(interventionsData);

        const eventsData = interventionsData.map(intervention => ({
            title: intervention.description,
            start: new Date(intervention.date),
            end: new Date(intervention.date),
            interventionId: intervention.id
        }));
        setEvents(eventsData);
    }, [id]);

    const handleDelete = (interventionId) => {
        setOpen(true);
        setSelectedIntervention(interventionId);
    };

    const handleClose = () => {
        setOpen(false);
        setSelectedIntervention(null);
    };

    const confirmDelete = () => {
        setInterventions(interventions.filter(intervention => intervention.id !== selectedIntervention));
        setOpen(false);
        setSelectedIntervention(null);
    };

    const handleEventSelect = (event) => {
        navigate(`/students/${id}/edit-intervention/${event.interventionId}`);
    };

    if (!student) return <Typography>Cargando...</Typography>;

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
                        <List>
                            {interventions.map(intervention => (
                                <ListItem key={intervention.id}>
                                    <ListItemText 
                                        primary={intervention.description} 
                                        secondary={<span>{new Date(intervention.date).toLocaleString()}</span>}
                                    />
                                    <Button variant="contained" color="secondary" component={Link} to={`/students/${id}/edit-intervention/${intervention.id}`} style={{ marginRight: '8px' }}>
                                        Editar
                                    </Button>
                                    <Button variant="contained" color="error" onClick={() => handleDelete(intervention.id)}>
                                        Eliminar
                                    </Button>
                                </ListItem>
                            ))}
                        </List>
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

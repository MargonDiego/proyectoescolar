// src/components/ViewStudent.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper, Button, List, ListItem, ListItemText } from '@mui/material';
import { useParams, Link } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import StudentCard from './StudentCard';

const localizer = momentLocalizer(moment);

const ViewStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);
    const [interventions, setInterventions] = useState([]);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const studentData = {
            id: 1,
            name: 'Juan Pérez',
            course: 'Primero Medio',
            address: 'Calle Falsa 123',
            phone: '123456789',
            dob: '2005-05-20',
            avatar: 'https://via.placeholder.com/150', // Imagen de ejemplo
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

    if (!student) return <Typography>Cargando...</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Ver Estudiante
            </Typography>
            <StudentCard student={student} />
            <Button variant="contained" color="primary" component={Link} to={`/students/edit/${id}`} style={{ marginTop: '16px' }}>
                Editar Estudiante
            </Button>
            <Button variant="contained" color="primary" component={Link} to={`/students/${id}/add-intervention`} style={{ marginLeft: '16px', marginTop: '16px' }}>
                Añadir Intervención
            </Button>
            <Typography variant="h6" style={{ marginTop: '16px' }}>
                Calendario de Intervenciones
            </Typography>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500, margin: '16px 0' }}
                selectable
                onSelectEvent={(event) => console.log(event)}
            />
            <Typography variant="h6" style={{ marginTop: '16px' }}>
                Lista de Intervenciones
            </Typography>
            <Paper style={{ padding: '16px' }}>
                <List>
                    {interventions.map(intervention => (
                        <ListItem key={intervention.id}>
                            <ListItemText primary={intervention.description} secondary={new Date(intervention.date).toLocaleString()} />
                            <Button variant="contained" color="secondary" component={Link} to={`/students/${id}/edit-intervention/${intervention.id}`}>
                                Editar
                            </Button>
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Container>
    );
};

export default ViewStudent;

import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuración de Moment.js para react-big-calendar
const localizer = momentLocalizer(moment);

const Dashboard = () => {
    const [students, setStudents] = useState([]);
    const [interventions, setInterventions] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar datos de estudiantes e intervenciones, por ahora usamos datos simulados
        const studentsData = [
            { id: 1, name: 'Juan Pérez' },
            { id: 2, name: 'María García' },
        ];
        const interventionsData = [
            { id: 1, studentId: 1, date: new Date(), description: 'Intervención inicial' },
            { id: 2, studentId: 2, date: new Date(), description: 'Seguimiento' },
        ];
        setStudents(studentsData);
        setInterventions(interventionsData);

        // Convertir intervenciones a eventos para el calendario
        const eventsData = interventionsData.map(intervention => {
            const student = studentsData.find(student => student.id === intervention.studentId);
            return {
                title: `${student.name}: ${intervention.description}`,
                start: new Date(intervention.date),
                end: new Date(intervention.date),
                studentId: intervention.studentId,
                interventionId: intervention.id
            };
        });
        setEvents(eventsData);
    }, []);

    const handleSelectEvent = (event) => {
        navigate(`/fichas/${event.studentId}/edit-intervention/${event.interventionId}`);
    };

    const handleSelectSlot = (slotInfo) => {
        // Redirigir a la página de añadir intervención con la fecha seleccionada
        navigate(`/fichas/add-intervention`, { state: { date: slotInfo.start } });
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Dashboard
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: '16px' }}>
                        <Typography variant="h6">Resumen de Estudiantes</Typography>
                        <Typography>Total de Estudiantes: {students.length}</Typography>
                        <Typography>Total de Intervenciones: {interventions.length}</Typography>
                    </Paper>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Paper style={{ padding: '16px' }}>
                        <Typography variant="h6">Acciones Rápidas</Typography>
                        <Button variant="contained" color="primary" component={Link} to="/fichas/add">
                            Añadir Ficha Clínica
                        </Button>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper style={{ padding: '16px' }}>
                        <Typography variant="h6">Calendario de Intervenciones</Typography>
                        <Calendar
                            localizer={localizer}
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ height: 500, margin: '16px 0' }}
                            selectable
                            onSelectEvent={handleSelectEvent}
                            onSelectSlot={handleSelectSlot}
                        />
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Dashboard;

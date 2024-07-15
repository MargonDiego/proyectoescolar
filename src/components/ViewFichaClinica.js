import React, { useState, useEffect } from 'react';
import { Container, Typography, Button, Paper } from '@mui/material';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configuración de Moment.js para react-big-calendar
const localizer = momentLocalizer(moment);

const ViewFichaClinica = () => {
    const { id } = useParams();
    const [ficha, setFicha] = useState(null);
    const [interventions, setInterventions] = useState([]);
    const [events, setEvents] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar la ficha desde el backend o datos simulados
        const fichaData = {
            studentName: 'Juan',
            studentSurname: 'Pérez',
            studentDOB: '2005-05-20',
            studentAddress: 'Calle Falsa 123',
            studentPhone: '123456789',
            studentCourse: 'Primero Medio',
            creationDate: '2023-07-01',
            status: 'Abierta',
        };
        setFicha(fichaData);

        // Cargar intervenciones desde el backend o datos simulados
        const interventionsData = [
            { id: 1, studentId: 1, date: new Date(), description: 'Intervención inicial' },
            { id: 2, studentId: 1, date: new Date(), description: 'Seguimiento' },
        ];
        setInterventions(interventionsData);

        // Convertir intervenciones a eventos para el calendario
        const eventsData = interventionsData.map(intervention => ({
            title: intervention.description,
            start: new Date(intervention.date),
            end: new Date(intervention.date),
            interventionId: intervention.id
        }));
        setEvents(eventsData);
    }, [id]);

    const handleSelectEvent = (event) => {
        // Implementar lógica para manejar la selección del evento
        navigate(`/fichas/${id}/edit-intervention/${event.interventionId}`);
    };

    const handleSelectSlot = (slotInfo) => {
        // Redirigir a la página de añadir intervención con la fecha seleccionada
        navigate(`/fichas/${id}/add-intervention`, { state: { date: slotInfo.start } });
    };

    if (!ficha) return <Typography>Cargando...</Typography>;

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Ver Ficha Clínica
            </Typography>
            <Paper style={{ padding: '16px', marginBottom: '16px' }}>
                <Typography variant="h6">{ficha.studentName} {ficha.studentSurname}</Typography>
                <Typography>Fecha de Nacimiento: {ficha.studentDOB}</Typography>
                <Typography>Dirección: {ficha.studentAddress}</Typography>
                <Typography>Teléfono: {ficha.studentPhone}</Typography>
                <Typography>Curso: {ficha.studentCourse}</Typography>
                <Typography>Fecha de Creación: {ficha.creationDate}</Typography>
                <Typography>Estado: {ficha.status}</Typography>
            </Paper>
            <Button variant="contained" color="primary" component={Link} to={`/fichas/edit/${id}`}>
                Editar Ficha Clínica
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
                onSelectEvent={handleSelectEvent}
                onSelectSlot={handleSelectSlot}
            />
        </Container>
    );
};

export default ViewFichaClinica;

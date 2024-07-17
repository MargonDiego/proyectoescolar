import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Configura el localizador de fechas utilizando Moment.js
const localizer = momentLocalizer(moment);

// Componente que muestra el calendario de intervenciones
const InterventionCalendar = ({ events, onSelectEvent }) => {
    return (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
            {/* Título del calendario */}
            <Typography variant="h6" gutterBottom>
                Calendario de Intervenciones
            </Typography>
            {/* Componente de calendario */}
            <Calendar
                localizer={localizer} // Define el localizador de fechas
                events={events} // Lista de eventos a mostrar en el calendario
                startAccessor="start" // Propiedad que define el inicio de un evento
                endAccessor="end" // Propiedad que define el final de un evento
                style={{ height: 500 }} // Estilo del calendario (altura)
                onSelectEvent={onSelectEvent} // Función que se llama al seleccionar un evento
            />
        </Paper>
    );
};

export default InterventionCalendar;

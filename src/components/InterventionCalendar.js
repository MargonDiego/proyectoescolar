import React from 'react';
import { Paper, Typography } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);

const InterventionCalendar = ({ events, onSelectEvent }) => {
    return (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
                Calendario de Intervenciones
            </Typography>
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                onSelectEvent={onSelectEvent}
            />
        </Paper>
    );
};

export default InterventionCalendar;

import React, { useContext, useState, useEffect } from 'react';
import { Container, Typography, Paper, Button } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const localizer = momentLocalizer(moment);

const Dashboard = () => {
    const { user } = useContext(AuthContext);
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const eventsData = [
            { id: 1, title: 'Intervention 1', start: new Date(), end: new Date(), studentName: 'Estudiante Uno' },
            { id: 2, title: 'Intervention 2', start: new Date(), end: new Date(), studentName: 'Estudiante Dos' },
            { id: 3, title: 'Intervention 3', start: new Date(), end: new Date(), studentName: 'Estudiante Tres' }
        ];
        setEvents(eventsData);
    }, []);

    const handleSelectEvent = (event) => {
        alert(`Intervención de: ${event.studentName}\n${event.title}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>Dashboard</Typography>
            <Paper style={{ padding: 16 }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    style={{ height: 500 }}
                    onSelectEvent={handleSelectEvent}
                />
            </Paper>
            {(user.role === 'admin' || user.role === 'user') && (
                <Button
                    component={Link}
                    to="/fichas/add"
                    variant="contained"
                    color="primary"
                    style={{ marginTop: 16 }}
                >
                    Añadir Ficha Clínica
                </Button>
            )}
        </Container>
    );
};

export default Dashboard;

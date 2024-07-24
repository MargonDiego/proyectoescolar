// src/components/integrated/MiniInterventionCalendar/MiniInterventionCalendar.jsx
import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

moment.locale('es');
const localizer = momentLocalizer(moment);

const StyledCalendar = styled(Calendar)`
  height: 400px;
  .rbc-calendar {
    background-color: white;
  }
  .rbc-event {
    border-radius: 4px;
    padding: 2px 4px;
    font-size: 0.8em;
  }
`;

const priorityColors = {
  Low: '#4caf50',
  Medium: '#ff9800',
  High: '#f44336',
};

const MiniInterventionCalendar = ({ interventions, onSelectEvent }) => {
  const events = interventions.map(intervention => ({
    id: intervention.id,
    title: intervention.title,
    start: new Date(intervention.createdAt),
    end: new Date(intervention.createdAt),
    resource: intervention,
    priorityColor: priorityColors[intervention.priority] || '#2196f3',
  }));

  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.priorityColor,
      }
    };
  };

  return (
    <StyledCalendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={onSelectEvent}
      views={['month']}
      messages={{
        next: "Sig",
        previous: "Ant",
        today: "Hoy",
        month: "Mes",
        date: "Fecha",
      }}
      eventPropGetter={eventStyleGetter}
    />
  );
};

export default MiniInterventionCalendar;
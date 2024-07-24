import React, { useState } from 'react';
import styled from 'styled-components';
import { Paper, Typography, Box, Button, IconButton, Grid, Card, CardContent } from '@mui/material';
import { Calendar, momentLocalizer, Views } from 'react-big-calendar';
import moment from 'moment';
import 'moment/locale/es';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import TodayIcon from '@mui/icons-material/Today';
import ViewModuleIcon from '@mui/icons-material/ViewModule';
import ViewWeekIcon from '@mui/icons-material/ViewWeek';
import ViewDayIcon from '@mui/icons-material/ViewDay';
import ViewAgendaIcon from '@mui/icons-material/ViewAgenda';
import { useInterventions } from '../../../hooks/useInterventions/useInterventions';

moment.locale('es');
const localizer = momentLocalizer(moment);

const StyledPaper = styled(Paper)`
  padding: ${({ theme }) => theme.spacing(3)};
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  background: #f0f0f0;
`;

const StyledCalendar = styled(Calendar)`
  & .rbc-header {
    background-color: ${({ theme }) => theme.palette.grey[300]}80;
    color: ${({ theme }) => theme.palette.text.primary};
    padding: ${({ theme }) => theme.spacing(1)};
    font-weight: bold;
    border-bottom: none;
    border-radius: 8px 8px 0 0;
  }
  & .rbc-month-view, & .rbc-time-view, & .rbc-agenda-view {
    border: none;
    background-color: #f5f5f5;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
  }
  & .rbc-day-bg {
    border-right: none;
  }
  & .rbc-off-range-bg {
    background-color: ${({ theme }) => theme.palette.grey[200]}80;
  }
  & .rbc-date-cell {
    padding: ${({ theme }) => theme.spacing(1)};
    text-align: center;
  }
  & .rbc-event {
    background-color: ${({ theme }) => theme.palette.secondary.main};
    border-radius: 20px;
    padding: 2px 8px;
    font-size: 0.85rem;
    border: none;
    &:hover {
      background-color: ${({ theme }) => theme.palette.secondary.dark};
    }
  }
  & .rbc-today {
    background-color: ${({ theme }) => theme.palette.secondary.light}33;
    border-radius: 8px;
  }
  & .rbc-toolbar button {
    color: ${({ theme }) => theme.palette.text.primary};
    border-radius: 20px;
    padding: 6px 12px;
    &:hover {
      background-color: ${({ theme }) => theme.palette.secondary.main}1A;
      color: ${({ theme }) => theme.palette.secondary.main};
    }
    &:active, &.rbc-active {
      background-color: ${({ theme }) => theme.palette.secondary.main}33;
      color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;

const ViewButton = styled(Button)`
  border-radius: 20px;
  padding: 6px 12px;
  min-width: 40px;
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

const CustomToolbar = styled(Grid)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;

const ToolbarCard = styled(Card)`
  background-color: #e0e0e0;
`;

const InterventionCalendar = ({ studentId, onSelectEvent, onAddEvent }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState(Views.MONTH);
  const { interventions, isLoading, error } = useInterventions();

  if (isLoading) return <Typography>Cargando calendario...</Typography>;
  if (error) return <Typography>Error al cargar el calendario: {error.message}</Typography>;

  const filteredInterventions = studentId
    ? interventions.filter(intervention => intervention.studentId.toString() === studentId.toString())
    : interventions;

  const events = filteredInterventions.map(intervention => ({
    id: intervention.id,
    title: intervention.title,
    start: new Date(intervention.createdAt),
    end: new Date(intervention.createdAt),
    resource: intervention
  }));

  const CustomToolbarContent = ({ label, onNavigate, onView }) => {
    return (
      <CustomToolbar container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <ToolbarCard elevation={2}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <IconButton onClick={() => onNavigate('PREV')} size="small">
                <ArrowBackIosNewIcon fontSize="small" />
              </IconButton>
              <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                {label}
              </Typography>
              <IconButton onClick={() => onNavigate('NEXT')} size="small">
                <ArrowForwardIosIcon fontSize="small" />
              </IconButton>
            </CardContent>
          </ToolbarCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <ToolbarCard elevation={2}>
            <CardContent sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Button variant="contained" color="secondary" startIcon={<AddIcon />} onClick={onAddEvent}>
                Añadir Incidente
              </Button>
              <Box>
                <Button onClick={() => onNavigate('TODAY')} startIcon={<TodayIcon />}>Hoy</Button>
                <ViewButton 
                  onClick={() => onView(Views.MONTH)}
                  variant={view === Views.MONTH ? "contained" : "outlined"}
                  color="secondary"
                >
                  <ViewModuleIcon />
                </ViewButton>
                <ViewButton 
                  onClick={() => onView(Views.WEEK)}
                  variant={view === Views.WEEK ? "contained" : "outlined"}
                  color="secondary"
                >
                  <ViewWeekIcon />
                </ViewButton>
                <ViewButton 
                  onClick={() => onView(Views.DAY)}
                  variant={view === Views.DAY ? "contained" : "outlined"}
                  color="secondary"
                >
                  <ViewDayIcon />
                </ViewButton>
                <ViewButton 
                  onClick={() => onView(Views.AGENDA)}
                  variant={view === Views.AGENDA ? "contained" : "outlined"}
                  color="secondary"
                >
                  <ViewAgendaIcon />
                </ViewButton>
              </Box>
            </CardContent>
          </ToolbarCard>
        </Grid>
      </CustomToolbar>
    );
  };

  return (
    <StyledPaper elevation={3}>
      <StyledCalendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 700 }}
        onSelectEvent={onSelectEvent}
        date={currentDate}
        onNavigate={(date) => setCurrentDate(date)}
        view={view}
        onView={setView}
        components={{
          toolbar: CustomToolbarContent,
        }}
        views={['month', 'week', 'day', 'agenda']}
        popup
        selectable
        messages={{
          next: "Siguiente",
          previous: "Anterior",
          today: "Hoy",
          month: "Mes",
          week: "Semana",
          day: "Día",
          agenda: "Agenda",
          date: "Fecha",
          time: "Hora",
          event: "Evento",
          allDay: "Todo el día",
          noEventsInRange: "No hay eventos en este rango.",
        }}
      />
    </StyledPaper>
  );
};

export default InterventionCalendar;
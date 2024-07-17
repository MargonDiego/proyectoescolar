import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

// Componente para mostrar las intervenciones recientes
const RecentInterventions = ({ interventions }) => {
    return (
        // Contenedor principal con estilo de Material-UI
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
            {/* Título del apartado de intervenciones recientes */}
            <Typography variant="h6" gutterBottom>
                Intervenciones Recientes
            </Typography>
            {/* Lista de intervenciones */}
            <List>
                {interventions.map((intervention) => (
                    // Cada intervención es un elemento de la lista
                    <ListItem key={intervention.id}>
                        {/* Texto principal y secundario de la intervención */}
                        <ListItemText
                            primary={intervention.description}
                            secondary={`Estudiante: ${intervention.studentName} - Fecha: ${new Date(intervention.date).toLocaleDateString()}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default RecentInterventions;

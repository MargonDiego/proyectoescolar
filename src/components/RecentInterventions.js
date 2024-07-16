import React from 'react';
import { Paper, Typography, List, ListItem, ListItemText } from '@mui/material';

const RecentInterventions = ({ interventions }) => {
    return (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
                Intervenciones Recientes
            </Typography>
            <List>
                {interventions.map((intervention) => (
                    <ListItem key={intervention.id}>
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

import React from 'react';
import { Paper, Typography } from '@mui/material';

const InterventionStats = ({ total, today }) => {
    return (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
                Estadísticas de Intervenciones
            </Typography>
            <Typography variant="body1">
                Total de Intervenciones: {total}
            </Typography>
            <Typography variant="body1">
                Intervenciones Hoy: {today}
            </Typography>
        </Paper>
    );
};

export default InterventionStats;

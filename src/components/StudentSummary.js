import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const StudentSummary = ({ totalStudents, courses }) => {
    const data = {
        labels: Object.keys(courses),
        datasets: [
            {
                data: Object.values(courses),
                backgroundColor: ['#3f51b5', '#f50057', '#ff9800', '#4caf50', '#00bcd4'],
            },
        ],
    };

    return (
        <Paper style={{ padding: '16px', height: '100%' }}>
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            style={{ height: '100%' }}
        >
            <Typography variant="h6" gutterBottom>
            Resumen de Estudiantes
            </Typography>
            <Box style={{ flex: 1 }}>
            <Doughnut data={data} />
            </Box>
            <Typography variant="body1" style={{ marginTop: '32px' }}>
            Total de Estudiantes: {totalStudents}
            </Typography>
        </Box>
        </Paper>
    );
};

export default StudentSummary;

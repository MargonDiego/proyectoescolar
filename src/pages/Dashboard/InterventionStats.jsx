import React from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

const ChartContainer = styled(Box)`
  height: 100%;
  display: flex;
  flex-direction: column;
`;

const InterventionStats = ({ total, today }) => {
    const data = {
        labels: ['Total', 'Hoy'],
        datasets: [
            {
                label: 'Intervenciones',
                data: [total, today],
                backgroundColor: ['#3f51b5', '#f50057'],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1
                }
            },
        },
    };

    return (
        <ChartContainer>
            <Typography variant="h6" gutterBottom align="center">
                Estadísticas de Intervenciones
            </Typography>
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <Bar data={data} options={options} />
            </Box>
        </ChartContainer>
    );
};

export default InterventionStats;
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Typography, Box } from '@mui/material';
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend } from 'chart.js';

// Registramos los componentes necesarios de ChartJS
ChartJS.register(BarElement, CategoryScale, LinearScale, Title, Tooltip, Legend);

// Componente que muestra las estadísticas de intervenciones en un gráfico de barras
const InterventionStats = ({ total, today }) => {
    // Datos para el gráfico
    const data = {
        labels: ['Total', 'Hoy'],
        datasets: [
            {
                label: 'Intervenciones',
                data: [total, today],
                backgroundColor: ['#3f51b5', '#f50057'], // Colores de las barras
            },
        ],
    };

    // Opciones de configuración del gráfico
    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1 // Incremento de 1 en el eje y
                }
            },
        },
    };

    return (
        // Contenedor principal del componente
        <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            {/* Título del gráfico */}
            <Typography variant="h6" gutterBottom sx={{ textAlign: 'center' }}>
                Estadísticas de Intervenciones
            </Typography>
            {/* Contenedor del gráfico de barras */}
            <Box sx={{ flexGrow: 1, position: 'relative' }}>
                <Bar data={data} options={options} />
            </Box>
        </Box>
    );
};

export default InterventionStats;

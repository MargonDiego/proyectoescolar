import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Paper, Typography, Box } from '@mui/material';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(ArcElement, Tooltip, Legend);

// Componente que muestra un resumen de estudiantes con un gráfico de dona
const StudentSummary = ({ totalStudents, courses }) => {
    // Configuración de los datos para el gráfico de dona
    const data = {
        labels: Object.keys(courses), // Nombres de los cursos
        datasets: [
            {
                data: Object.values(courses), // Cantidad de estudiantes por curso
                backgroundColor: ['#3f51b5', '#f50057', '#ff9800', '#4caf50', '#00bcd4'], // Colores para cada segmento del gráfico
            },
        ],
    };

    return (
        // Contenedor principal con estilo de Paper de Material-UI
        <Paper style={{ padding: '16px', height: '100%' }}>
            <Box
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                style={{ height: '100%' }}
            >
                {/* Título del resumen */}
                <Typography variant="h6" gutterBottom>
                    Resumen de Estudiantes
                </Typography>
                {/* Contenedor del gráfico de dona */}
                <Box style={{ flex: 1 }}>
                    <Doughnut data={data} />
                </Box>
                {/* Texto que muestra el total de estudiantes */}
                <Typography variant="body1" style={{ marginTop: '32px' }}>
                    Total de Estudiantes: {totalStudents}
                </Typography>
            </Box>
        </Paper>
    );
};

export default StudentSummary;

import React from 'react';
import { Line } from 'react-chartjs-2';
import { Typography, Box } from '@mui/material';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TrendAnalysis = ({ events }) => {
  // Procesamos los eventos para obtener datos por mes
  const monthlyData = events.reduce((acc, event) => {
    const month = new Date(event.start).toLocaleString('default', { month: 'short' });
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const data = {
    labels: Object.keys(monthlyData),
    datasets: [
      {
        label: 'Incidentes por Mes',
        data: Object.values(monthlyData),
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
        tension: 0.1
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tendencia de Incidentes'
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Número de Incidentes'
        }
      }
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Análisis de Tendencias</Typography>
      <Box sx={{ height: 300 }}>
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default TrendAnalysis;
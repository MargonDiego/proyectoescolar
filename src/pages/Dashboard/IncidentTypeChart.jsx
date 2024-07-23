import React from 'react';
import styled from 'styled-components';
import { Typography, Box } from '@mui/material';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const ChartContainer = styled(Box)`
  height: 300px;
`;

const IncidentTypeChart = ({ incidentTypes }) => {
  const data = {
    labels: Object.keys(incidentTypes),
    datasets: [
      {
        data: Object.values(incidentTypes),
        backgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ],
        hoverBackgroundColor: [
          '#FF6384',
          '#36A2EB',
          '#FFCE56',
          '#4BC0C0',
          '#9966FF'
        ]
      }
    ]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>Tipos de Incidentes</Typography>
      <ChartContainer>
        <Pie data={data} options={options} />
      </ChartContainer>
    </Box>
  );
};

export default IncidentTypeChart;
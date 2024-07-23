import React from 'react';
import { Grid, Paper, Typography, Box, Avatar, Tooltip } from '@mui/material';
import { styled } from '@mui/material/styles';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Legend } from 'recharts';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonOffIcon from '@mui/icons-material/PersonOff';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const StatBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
}));

const StatAvatar = styled(Avatar)(({ theme, bgcolor }) => ({
  backgroundColor: bgcolor,
  marginRight: theme.spacing(2),
}));

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const DashboardSummary = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'active').length;
  const inactiveUsers = users.filter(u => u.status === 'inactive').length;

  const roleData = [
    { name: 'Admin', value: users.filter(u => u.role === 'admin').length },
    { name: 'User', value: users.filter(u => u.role === 'user').length },
    { name: 'Viewer', value: users.filter(u => u.role === 'viewer').length },
    { name: 'Student', value: users.filter(u => u.role === 'student').length },
  ];

  const statusData = [
    { name: 'Activos', value: activeUsers },
    { name: 'Inactivos', value: inactiveUsers },
  ];

  // Simulación de datos de registro de usuarios por mes
  const monthlyRegistrationData = [
    { name: 'Ene', usuarios: 4 },
    { name: 'Feb', usuarios: 3 },
    { name: 'Mar', usuarios: 2 },
    { name: 'Abr', usuarios: 5 },
    { name: 'May', usuarios: 7 },
    { name: 'Jun', usuarios: 6 },
  ];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>Estadísticas de Usuarios</Typography>
          <StatBox>
            <StatAvatar bgcolor="#3f51b5">
              <PeopleAltIcon />
            </StatAvatar>
            <Box>
              <Typography variant="h4">{totalUsers}</Typography>
              <Typography variant="subtitle1">Total de usuarios</Typography>
            </Box>
          </StatBox>
          <StatBox>
            <StatAvatar bgcolor="#4caf50">
              <PersonAddIcon />
            </StatAvatar>
            <Box>
              <Typography variant="h4">{activeUsers}</Typography>
              <Typography variant="subtitle1">Usuarios activos</Typography>
            </Box>
          </StatBox>
          <StatBox>
            <StatAvatar bgcolor="#f44336">
              <PersonOffIcon />
            </StatAvatar>
            <Box>
              <Typography variant="h4">{inactiveUsers}</Typography>
              <Typography variant="subtitle1">Usuarios inactivos</Typography>
            </Box>
          </StatBox>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>Distribución de Roles</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={roleData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                {roleData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </StyledPaper>
      </Grid>
      <Grid item xs={12} md={4}>
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>Estado de Usuarios</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              >
                <Cell fill="#4caf50" />
                <Cell fill="#f44336" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </StyledPaper>
      </Grid>
      <Grid item xs={12}>
        <StyledPaper elevation={3}>
          <Typography variant="h6" gutterBottom>Registro de Usuarios por Mes</Typography>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyRegistrationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="usuarios" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </StyledPaper>
      </Grid>
    </Grid>
  );
};

export default DashboardSummary;
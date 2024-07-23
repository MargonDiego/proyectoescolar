import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  Typography, Paper, Table, TableBody, TableCell, TableContainer, 
  TableHead, TableRow, Button, Chip, IconButton, Box, Tooltip, Card, CardContent,
  Grid, Divider
} from '@mui/material';
import { Link, useParams, useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const StyledContainer = styled.div`
  margin-top: ${({ theme }) => theme.spacing(4)};
  margin-bottom: ${({ theme }) => theme.spacing(4)};
`;

const StyledCard = styled(Card)`
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
  background: linear-gradient(to right bottom, #ffffff, #f8f9fa);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
  }
`;

const StyledTableContainer = styled(TableContainer)`
  margin-top: ${({ theme }) => theme.spacing(3)};
`;

const StyledTableCell = styled(TableCell)`
  font-weight: bold;
`;

const StyledChip = styled(Chip)`
  font-weight: bold;
`;

const ActionButton = styled(Button)`
  margin: ${({ theme }) => theme.spacing(1)};
`;

const priorityColors = {
  'Alta': 'error',
  'Media': 'warning',
  'Baja': 'success'
};

const statusIcons = {
  'Iniciado': <AccessTimeIcon />,
  'En Progreso': <PriorityHighIcon />,
  'Completado': <CheckCircleIcon />
};

const InterventionList = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [interventions, setInterventions] = useState([]);

    useEffect(() => {
        const fetchInterventions = async () => {
            // Simulated API call
            const interventionData = [
                {
                    id: 1,
                    studentId: id,
                    title: 'Intervención 1',
                    description: 'Descripción detallada de la Intervención 1. Esta intervención se centra en...',
                    priority: 'Alta',
                    status: 'Iniciado',
                    createdBy: 'Juan Pérez',
                    createdAt: new Date().toISOString()
                },
                {
                    id: 2,
                    studentId: id,
                    title: 'Intervención 2',
                    description: 'Descripción detallada de la Intervención 2. Los objetivos principales son...',
                    priority: 'Media',
                    status: 'En Progreso',
                    createdBy: 'María López',
                    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
                }
            ];
            setInterventions(interventionData);
        };

        fetchInterventions();
    }, [id]);

    return (
        <StyledContainer>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Intervenciones del Estudiante
                </Typography>
                <ActionButton 
                    variant="contained" 
                    color="primary" 
                    component={Link} 
                    to={`/students/${id}/Addintervention`}
                    startIcon={<AddIcon />}
                >
                    Nueva Intervención
                </ActionButton>
            </Box>
            <Grid container spacing={3}>
                {interventions.map((intervention) => (
                    <Grid item xs={12} md={6} key={intervention.id}>
                        <StyledCard>
                            <CardContent>
                                <Typography variant="h6" gutterBottom>{intervention.title}</Typography>
                                <Typography variant="body2" color="textSecondary" paragraph>
                                    {intervention.description.length > 100 
                                        ? `${intervention.description.substring(0, 100)}...` 
                                        : intervention.description}
                                </Typography>
                                <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                                    <StyledChip 
                                        label={intervention.priority} 
                                        color={priorityColors[intervention.priority]}
                                        size="small"
                                    />
                                    <StyledChip 
                                        icon={statusIcons[intervention.status]}
                                        label={intervention.status} 
                                        variant="outlined"
                                        size="small"
                                    />
                                </Box>
                                <Divider />
                                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                                    <Typography variant="body2" color="textSecondary">
                                        Creado por: {intervention.createdBy}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        {new Date(intervention.createdAt).toLocaleDateString()}
                                    </Typography>
                                </Box>
                                <Box mt={2} display="flex" justifyContent="flex-end">
                                    <Tooltip title="Ver detalles">
                                        <IconButton 
                                            onClick={() => navigate(`/students/${id}/Editintervention/${intervention.id}`)}
                                            color="primary"
                                        >
                                            <VisibilityIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </CardContent>
                        </StyledCard>
                    </Grid>
                ))}
            </Grid>
        </StyledContainer>
    );
};

export default InterventionList;
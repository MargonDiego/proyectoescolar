import React, { useState, useEffect } from 'react';
import { Container, Typography, List, ListItem, ListItemText } from '@mui/material';
import { useParams } from 'react-router-dom';

const ViewInterventions = () => {
    const { id } = useParams();
    const [interventions, setInterventions] = useState([]);

    useEffect(() => {
        // Cargar intervenciones del estudiante, por ahora usamos datos simulados
        const interventionsData = [
            { date: '2023-07-01', description: 'Intervención inicial' },
            { date: '2023-07-10', description: 'Seguimiento' },
        ];
        setInterventions(interventionsData);
    }, [id]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Intervenciones de la Ficha {id}
            </Typography>
            <List>
                {interventions.map((intervention, index) => (
                    <ListItem key={index}>
                        <ListItemText primary={intervention.date} secondary={intervention.description} />
                    </ListItem>
                ))}
            </List>
        </Container>
    );
};

export default ViewInterventions;


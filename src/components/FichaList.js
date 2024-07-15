import React, { useState } from 'react';
import { Container, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const FichaList = () => {
    const [fichas, setFichas] = useState([
        // Datos de prueba
        { id: 1, studentName: 'Juan Pérez', creationDate: '2023-07-01', status: 'Abierta' },
        { id: 2, studentName: 'María García', creationDate: '2023-07-02', status: 'Cerrada' },
    ]);

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Lista de Fichas Clínicas
            </Typography>
            <List>
                {fichas.map((ficha) => (
                    <ListItem key={ficha.id} button component={Link} to={`/fichas/${ficha.id}`}>
                        <ListItemText primary={ficha.studentName} secondary={`Fecha de Creación: ${ficha.creationDate}, Estado: ${ficha.status}`} />
                    </ListItem>
                ))}
            </List>
            <Button variant="contained" color="primary" component={Link} to="/fichas/add">
                Añadir Ficha Clínica
            </Button>
        </Container>
    );
};

export default FichaList;

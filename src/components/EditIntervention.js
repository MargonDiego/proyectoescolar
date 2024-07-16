// src/components/EditIntervention.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditIntervention = () => {
    const { id, interventionId } = useParams();
    const [intervention, setIntervention] = useState({ description: '', date: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Reemplazar con lógica para obtener datos reales
        const interventionData = { id: 1, studentId: 1, date: '2023-07-01', description: 'Intervención inicial' };
        setIntervention(interventionData);
    }, [interventionId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention({ ...intervention, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intervención actualizada:', intervention);
        navigate(`/students/${id}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Editar Intervención
            </Typography>
            <Paper style={{ padding: '16px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField
                        label="Descripción"
                        name="description"
                        value={intervention.description}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Fecha"
                        name="date"
                        type="date"
                        value={intervention.date}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                        InputLabelProps={{ shrink: true }}
                    />
                    <Button variant="contained" color="primary" type="submit">
                        Actualizar
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default EditIntervention;

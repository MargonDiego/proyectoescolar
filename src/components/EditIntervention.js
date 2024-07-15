import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditIntervention = () => {
    const { id, interventionId } = useParams();
    const [intervention, setIntervention] = useState({
        date: '',
        description: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar la intervención desde el backend o datos simulados
        const interventionData = {
            date: '2023-07-01',
            description: 'Intervención inicial'
        };
        setIntervention(interventionData);
    }, [id, interventionId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention({ ...intervention, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intervención actualizada:', intervention);
        navigate(`/fichas/${id}/view-interventions`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Editar Intervención
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Fecha"
                    type="date"
                    name="date"
                    value={intervention.date}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                <TextField
                    label="Descripción"
                    name="description"
                    value={intervention.description}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    multiline
                    rows={4}
                    required
                />
                <Button variant="contained" color="primary" type="submit">
                    Actualizar
                </Button>
            </form>
        </Container>
    );
};

export default EditIntervention;

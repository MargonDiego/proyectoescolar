import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const AddIntervention = () => {
    const { id } = useParams();
    const location = useLocation();
    const [intervention, setIntervention] = useState({
        date: location.state?.date || '',
        description: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention({ ...intervention, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intervención añadida:', intervention);
        navigate(`/fichas/${id}/view-interventions`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Añadir Intervención
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
                    Añadir
                </Button>
            </form>
        </Container>
    );
};

export default AddIntervention;

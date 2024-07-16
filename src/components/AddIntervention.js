import React, { useState } from 'react';
import { Container, Typography, TextField, Button, Paper } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const AddIntervention = () => {
    const { id } = useParams();
    const [intervention, setIntervention] = useState({ description: '', date: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention({ ...intervention, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intervención añadida:', intervention);
        navigate(`/students/${id}`);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Añadir Intervención
            </Typography>
            <Paper style={{ padding: '16px' }}>
                <form onSubmit={handleSubmit}>
                    <TextField label="Descripción" name="description" value={intervention.description} onChange={handleChange} fullWidth margin="normal" required />
                    <TextField label="Fecha" name="date" type="date" value={intervention.date} onChange={handleChange} fullWidth margin="normal" required InputLabelProps={{ shrink: true }} />
                    <Button variant="contained" color="primary" type="submit">
                        Añadir
                    </Button>
                </form>
            </Paper>
        </Container>
    );
};

export default AddIntervention;

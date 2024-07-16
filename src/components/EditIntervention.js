import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, Paper, MenuItem, Input } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const EditIntervention = () => {
    const { id, interventionId } = useParams();
    const [intervention, setIntervention] = useState({
        description: '',
        date: '',
        type: '',
        notes: '',
        file: null,
    });
    const navigate = useNavigate();
    const interventionTypes = ['Consulta', 'Evaluación', 'Seguimiento'];

    useEffect(() => {
        // Reemplazar con lógica para obtener datos reales
        const fetchIntervention = async () => {
            // Simulación de datos obtenidos del backend
            const interventionData = {
                id: interventionId,
                studentId: id,
                date: '2023-07-01',
                description: 'Intervención inicial',
                type: 'Consulta',
                notes: 'Notas iniciales'
            };
            setIntervention(interventionData);
        };

        fetchIntervention();
    }, [interventionId, id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention({ ...intervention, [name]: value });
    };

    const handleFileChange = (e) => {
        setIntervention({ ...intervention, file: e.target.files[0] });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intervención actualizada:', intervention);
        // Aquí puedes añadir la lógica para actualizar la intervención en el backend
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
                    <TextField
                        select
                        label="Tipo de Intervención"
                        name="type"
                        value={intervention.type}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    >
                        {interventionTypes.map((option) => (
                            <MenuItem key={option} value={option}>
                                {option}
                            </MenuItem>
                        ))}
                    </TextField>
                    <TextField
                        label="Notas"
                        name="notes"
                        value={intervention.notes}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        multiline
                        rows={4}
                    />
                    <Input 
                        type="file" 
                        onChange={handleFileChange} 
                        fullWidth 
                        margin="normal" 
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

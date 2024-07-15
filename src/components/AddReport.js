import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddReport = () => {
    const [report, setReport] = useState({ title: '', date: '', student: '', content: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setReport({ ...report, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Informe añadido', report);
        navigate('/reports');
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Añadir Informe
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '8px' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="title"
                        label="Título"
                        name="title"
                        autoComplete="title"
                        autoFocus
                        value={report.title}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="date"
                        label="Fecha"
                        type="date"
                        id="date"
                        autoComplete="date"
                        InputLabelProps={{ shrink: true }}
                        value={report.date}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="student"
                        label="Estudiante"
                        id="student"
                        autoComplete="student"
                        value={report.student}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="content"
                        label="Contenido"
                        id="content"
                        autoComplete="content"
                        multiline
                        rows={4}
                        value={report.content}
                        onChange={handleChange}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        style={{ marginTop: '24px' }}
                    >
                        Añadir
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default AddReport;

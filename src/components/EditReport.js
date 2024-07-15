import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';

const EditReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState({ title: '', date: '', student: '', content: '' });
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar datos del informe a editar, por ahora usamos datos simulados
        const reportToEdit = { id: id, title: 'Informe 1', date: '2024-07-01', student: 'Juan Perez', content: 'Contenido del informe' };
        setReport(reportToEdit);
    }, [id]);

    const handleChange = (e) => {
        setReport({ ...report, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Informe actualizado', report);
        navigate('/reports');
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Editar Informe
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
                        Actualizar
                    </Button>
                </form>
            </div>
        </Container>
    );
};

export default EditReport;

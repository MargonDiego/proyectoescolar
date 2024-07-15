import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const ViewReport = () => {
    const { id } = useParams();
    const [report, setReport] = useState(null);

    useEffect(() => {
        // Cargar datos del informe a visualizar, por ahora usamos datos simulados
        const reportToView = { id: id, title: 'Informe 1', date: '2024-07-01', student: 'Juan Perez', content: 'Contenido del informe' };
        setReport(reportToView);
    }, [id]);

    if (!report) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Container component="main" maxWidth="sm">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Detalles del Informe
                </Typography>
                <Paper style={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant="h6">Título:</Typography>
                    <Typography variant="body1">{report.title}</Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>Fecha:</Typography>
                    <Typography variant="body1">{report.date}</Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>Estudiante:</Typography>
                    <Typography variant="body1">{report.student}</Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>Contenido:</Typography>
                    <Typography variant="body1">{report.content}</Typography>
                </Paper>
            </div>
        </Container>
    );
};

export default ViewReport;

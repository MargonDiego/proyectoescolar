import React, { useState, useEffect } from 'react';
import { Container, Typography, Paper } from '@mui/material';
import { useParams } from 'react-router-dom';

const ViewStudent = () => {
    const { id } = useParams();
    const [student, setStudent] = useState(null);

    useEffect(() => {
        // Aquí deberías cargar los datos del estudiante a visualizar, por ahora usamos datos simulados
        const studentToView = { id: id, name: 'Nombre del Estudiante', age: 16, grade: '10th', address: 'Dirección del Estudiante' };
        setStudent(studentToView);
    }, [id]);

    if (!student) {
        return <Typography>Cargando...</Typography>;
    }

    return (
        <Container component="main" maxWidth="sm">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Detalles del Estudiante
                </Typography>
                <Paper style={{ padding: '16px', marginTop: '16px' }}>
                    <Typography variant="h6">Nombre:</Typography>
                    <Typography variant="body1">{student.name}</Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>Edad:</Typography>
                    <Typography variant="body1">{student.age}</Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>Grado:</Typography>
                    <Typography variant="body1">{student.grade}</Typography>
                    <Typography variant="h6" style={{ marginTop: '8px' }}>Dirección:</Typography>
                    <Typography variant="body1">{student.address}</Typography>
                </Paper>
            </div>
        </Container>
    );
};

export default ViewStudent;

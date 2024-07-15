import React, { useState, useEffect } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';

const cursos = [
    'Primero Básico',
    'Segundo Básico',
    'Tercero Básico',
    'Cuarto Básico',
    'Quinto Básico',
    'Sexto Básico',
    'Séptimo Básico',
    'Octavo Básico',
    'Primero Medio',
    'Segundo Medio',
    'Tercero Medio',
    'Cuarto Medio',
];

const EditFichaClinica = () => {
    const { id } = useParams();
    const [ficha, setFicha] = useState({
        studentName: '',
        studentSurname: '',
        studentDOB: '',
        studentAddress: '',
        studentPhone: '',
        studentCourse: '',
        creationDate: '',
        status: '',
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Cargar la ficha desde el backend o datos simulados
        const fichaData = {
            studentName: 'Juan',
            studentSurname: 'Pérez',
            studentDOB: '2005-05-20',
            studentAddress: 'Calle Falsa 123',
            studentPhone: '123456789',
            studentCourse: 'Primero Medio',
            creationDate: '2023-07-01',
            status: 'Abierta',
        };
        setFicha(fichaData);
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFicha({ ...ficha, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Ficha Clínica actualizada:', ficha);
        navigate('/fichas');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Editar Ficha Clínica
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Nombre"
                    name="studentName"
                    value={ficha.studentName}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Apellido"
                    name="studentSurname"
                    value={ficha.studentSurname}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Fecha de Nacimiento"
                    type="date"
                    name="studentDOB"
                    value={ficha.studentDOB}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                <TextField
                    label="Dirección"
                    name="studentAddress"
                    value={ficha.studentAddress}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    label="Teléfono"
                    name="studentPhone"
                    value={ficha.studentPhone}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <TextField
                    select
                    label="Curso"
                    name="studentCourse"
                    value={ficha.studentCourse}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                >
                    {cursos.map((curso) => (
                        <MenuItem key={curso} value={curso}>
                            {curso}
                        </MenuItem>
                    ))}
                </TextField>
                <TextField
                    label="Fecha de Creación"
                    type="date"
                    name="creationDate"
                    value={ficha.creationDate}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    InputLabelProps={{
                        shrink: true,
                    }}
                    required
                />
                <TextField
                    label="Estado"
                    name="status"
                    value={ficha.status}
                    onChange={handleChange}
                    fullWidth
                    margin="normal"
                    required
                />
                <Button variant="contained" color="primary" type="submit">
                    Actualizar
                </Button>
            </form>
        </Container>
    );
};

export default EditFichaClinica;

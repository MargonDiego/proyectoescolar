import React, { useState } from 'react';
import { Container, Typography, TextField, Button, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

const AddFichaClinica = () => {
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFicha({ ...ficha, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Ficha Clínica añadida:', ficha);
        navigate('/fichas');
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Añadir Ficha Clínica
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
                    Añadir
                </Button>
            </form>
        </Container>
    );
};

export default AddFichaClinica;

import React, { useState } from 'react';
import { Container, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const AddStudent = () => {
    const [student, setStudent] = useState({ name: '', age: '', grade: '', address: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setStudent({ ...student, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí deberías agregar el nuevo estudiante al estado global o enviarlo a un backend
        console.log('Estudiante añadido', student);
        navigate('/students');
    };

    return (
        <Container component="main" maxWidth="xs">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Añadir Estudiante
                </Typography>
                <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: '8px' }}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Nombre"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={student.name}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="age"
                        label="Edad"
                        type="number"
                        id="age"
                        autoComplete="age"
                        value={student.age}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="grade"
                        label="Grado"
                        id="grade"
                        autoComplete="grade"
                        value={student.grade}
                        onChange={handleChange}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        name="address"
                        label="Dirección"
                        id="address"
                        autoComplete="address"
                        value={student.address}
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

export default AddStudent;

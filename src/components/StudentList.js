import React, { useState, useEffect } from 'react';
import { Container, Typography, Card, CardContent, CardMedia, Grid, TextField, MenuItem, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([]);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [search, setSearch] = useState('');
    const [course, setCourse] = useState('');
    const [age, setAge] = useState('');

    useEffect(() => {
        const studentsData = [
            {
                id: 1,
                name: 'Juan Pérez',
                course: 'Primero Medio',
                phone: '123456789',
                dob: '2005-05-20',
                medicalHistory: 'Asma, Diabetes',
                avatar: 'https://via.placeholder.com/150'
            },
            {
                id: 2,
                name: 'María García',
                course: 'Segundo Medio',
                phone: '987654321',
                dob: '2004-04-15',
                medicalHistory: 'Alergias a Polen',
                avatar: 'https://via.placeholder.com/150'
            },
        ];
        setStudents(studentsData);
        setFilteredStudents(studentsData);
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        filterStudents(e.target.value, course, age);
    };

    const handleCourseChange = (e) => {
        setCourse(e.target.value);
        filterStudents(search, e.target.value, age);
    };

    const handleAgeChange = (e) => {
        setAge(e.target.value);
        filterStudents(search, course, e.target.value);
    };

    const calculateAge = (dob) => {
        const birthDate = new Date(dob);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const monthDifference = today.getMonth() - birthDate.getMonth();
        if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
            age--;
        }
        return age;
    };

    const filterStudents = (search, course, age) => {
        let filtered = students.filter(student =>
            student.name.toLowerCase().includes(search.toLowerCase()) &&
            (course === '' || student.course === course) &&
            (age === '' || calculateAge(student.dob) === parseInt(age))
        );
        setFilteredStudents(filtered);
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Lista de Estudiantes
            </Typography>
            <Button variant="contained" color="primary" component={Link} to="/students/add" style={{ marginBottom: '16px' }}>
                Añadir Estudiante
            </Button>
            <Paper style={{ padding: '16px', marginBottom: '16px' }}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Buscar por nombre"
                            variant="outlined"
                            fullWidth
                            value={search}
                            onChange={handleSearchChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Filtrar por curso"
                            variant="outlined"
                            fullWidth
                            select
                            value={course}
                            onChange={handleCourseChange}
                        >
                            <MenuItem value="">Todos</MenuItem>
                            <MenuItem value="Primero Medio">Primero Medio</MenuItem>
                            <MenuItem value="Segundo Medio">Segundo Medio</MenuItem>
                            {/* Añadir otros cursos según sea necesario */}
                        </TextField>
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Filtrar por edad"
                            variant="outlined"
                            fullWidth
                            type="number"
                            value={age}
                            onChange={handleAgeChange}
                        />
                    </Grid>
                </Grid>
            </Paper>
            <Grid container spacing={3}>
                {filteredStudents.map(student => (
                    <Grid item xs={12} md={6} lg={4} key={student.id}>
                        <Card>
                            <CardMedia
                                component="img"
                                height="140"
                                image={student.avatar}
                                alt={student.name}
                            />
                            <CardContent>
                                <Typography variant="h6" component={Link} to={`/students/${student.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                    {student.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Curso:</strong> {student.course}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Teléfono:</strong> {student.phone}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Historia Médica:</strong> {student.medicalHistory}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Edad:</strong> {calculateAge(student.dob)}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default StudentList;

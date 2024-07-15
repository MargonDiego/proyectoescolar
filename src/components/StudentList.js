import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentList = () => {
    const [students, setStudents] = useState([
        { id: 1, name: 'Juan Perez', age: 15, grade: '10th', address: '123 Main St' },
        { id: 2, name: 'Maria Gomez', age: 14, grade: '9th', address: '456 Maple Ave' }
    ]);

    const [open, setOpen] = useState(false);
    const [deleteId, setDeleteId] = useState(null);

    const handleClickOpen = (id) => {
        setDeleteId(id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        setStudents(students.filter(student => student.id !== deleteId));
        handleClose();
    };

    return (
        <Container component="main" maxWidth="md">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Lista de Estudiantes
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/students/add" style={{ marginTop: '16px', marginBottom: '16px' }}>
                    Añadir Estudiante
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Edad</TableCell>
                                <TableCell>Grado</TableCell>
                                <TableCell>Dirección</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map(student => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.id}</TableCell>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.age}</TableCell>
                                    <TableCell>{student.grade}</TableCell>
                                    <TableCell>{student.address}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" component={Link} to={`/students/${student.id}`}>
                                            Ver
                                        </Button>
                                        <Button variant="contained" color="secondary" component={Link} to={`/students/edit/${student.id}`} style={{ marginLeft: '8px' }}>
                                            Editar
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleClickOpen(student.id)} style={{ marginLeft: '8px' }}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Eliminar Estudiante</DialogTitle>
                    <DialogContent>
                        <Typography>¿Estás seguro de que quieres eliminar este estudiante?</Typography>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleDelete} color="error">
                            Eliminar
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>
    );
};

export default StudentList;

import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import { Link } from 'react-router-dom';

const ReportList = () => {
    const [reports, setReports] = useState([
        { id: 1, title: 'Informe 1', date: '2024-07-01', student: 'Juan Perez' },
        { id: 2, title: 'Informe 2', date: '2024-07-02', student: 'Maria Gomez' }
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
        setReports(reports.filter(report => report.id !== deleteId));
        handleClose();
    };

    return (
        <Container component="main" maxWidth="md">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Lista de Informes
                </Typography>
                <Button variant="contained" color="primary" component={Link} to="/reports/add" style={{ marginTop: '16px', marginBottom: '16px' }}>
                    Añadir Informe
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Título</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Estudiante</TableCell>
                                <TableCell>Acciones</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {reports.map(report => (
                                <TableRow key={report.id}>
                                    <TableCell>{report.id}</TableCell>
                                    <TableCell>{report.title}</TableCell>
                                    <TableCell>{report.date}</TableCell>
                                    <TableCell>{report.student}</TableCell>
                                    <TableCell>
                                        <Button variant="contained" color="primary" component={Link} to={`/reports/${report.id}`}>
                                            Ver
                                        </Button>
                                        <Button variant="contained" color="secondary" component={Link} to={`/reports/edit/${report.id}`} style={{ marginLeft: '8px' }}>
                                            Editar
                                        </Button>
                                        <Button variant="contained" color="error" onClick={() => handleClickOpen(report.id)} style={{ marginLeft: '8px' }}>
                                            Eliminar
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Eliminar Informe</DialogTitle>
                    <DialogContent>
                        <Typography>¿Estás seguro de que quieres eliminar este informe?</Typography>
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

export default ReportList;

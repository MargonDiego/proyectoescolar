import React, { useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, TextField, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

const UserManagement = () => {
    const [users, setUsers] = useState([
        { id: 1, firstName: 'John', lastName: 'Doe', email: 'john@example.com', rut: '12345678-9' },
        { id: 2, firstName: 'Jane', lastName: 'Doe', email: 'jane@example.com', rut: '98765432-1' },
    ]);
    const [open, setOpen] = useState(false);
    const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', rut: '' });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleAddUser = () => {
        setUsers([...users, { ...newUser, id: users.length + 1 }]);
        setNewUser({ firstName: '', lastName: '', email: '', rut: '' });
        handleClose();
    };

    return (
        <Container component="main" maxWidth="md">
            <div style={{ marginTop: '8px' }}>
                <Typography component="h1" variant="h5">
                    Gestión de Usuarios
                </Typography>
                <Button variant="contained" color="primary" onClick={handleClickOpen} style={{ marginTop: '16px', marginBottom: '16px' }}>
                    Añadir Usuario
                </Button>
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Nombre</TableCell>
                                <TableCell>Apellido</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>RUT</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell>{user.id}</TableCell>
                                    <TableCell>{user.firstName}</TableCell>
                                    <TableCell>{user.lastName}</TableCell>
                                    <TableCell>{user.email}</TableCell>
                                    <TableCell>{user.rut}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Añadir Usuario</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            name="firstName"
                            label="Nombre"
                            type="text"
                            fullWidth
                            value={newUser.firstName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="lastName"
                            label="Apellido"
                            type="text"
                            fullWidth
                            value={newUser.lastName}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="email"
                            label="Correo Electrónico"
                            type="email"
                            fullWidth
                            value={newUser.email}
                            onChange={handleChange}
                        />
                        <TextField
                            margin="dense"
                            name="rut"
                            label="RUT"
                            type="text"
                            fullWidth
                            value={newUser.rut}
                            onChange={handleChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancelar
                        </Button>
                        <Button onClick={handleAddUser} color="primary">
                            Añadir
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </Container>
    );
};

export default UserManagement;

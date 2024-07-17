import React, { useState } from 'react';
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  TablePagination,
  DialogContentText
} from '@mui/material';
import { MoreVert as MoreVertIcon, Add as AddIcon, GetApp as GetAppIcon } from '@mui/icons-material';

const UserManagement = () => {
  const initialUsers = [
    { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', rut: '12345678-9', role: 'admin', avatar: 'https://via.placeholder.com/150' },
    { id: 2, firstName: 'Regular', lastName: 'User', email: 'user@example.com', rut: '98765432-1', role: 'user', avatar: 'https://via.placeholder.com/150' },
    { id: 3, firstName: 'View', lastName: 'Only', email: 'view@example.com', rut: '11223344-5', role: 'viewer',   avatar: 'https://via.placeholder.com/150' },
    { id: 4, firstName: 'Estudiante', lastName: 'Uno', email: 'estudiante1@example.com', rut: '66778899-1', role: 'student',  avatar: 'https://via.placeholder.com/150' },
    { id: 5, firstName: 'Estudiante', lastName: 'Dos', email: 'estudiante2@example.com', rut: '77889900-2', role: 'student', avatar: 'https://via.placeholder.com/150' },
    { id: 6, firstName: 'Estudiante', lastName: 'Tres', email: 'estudiante3@example.com', rut: '88990011-3', role: 'student',  avatar: 'https://via.placeholder.com/150' }
  ];

  const [users, setUsers] = useState(initialUsers);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', rut: '', role: '',  avatar: '' });
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleClickOpen = () => {
    setEditMode(false);
    setNewUser({ firstName: '', lastName: '', email: '', rut: '', role: '',  avatar: '' });
    setOpen(true);
  };

  const handleEditClickOpen = (user) => {
    setEditMode(true);
    setCurrentUser(user);
    setNewUser(user);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setDeleteOpen(false);
  };

  const handleChange = (e) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const handleAddUser = () => {
    setUsers([...users, { ...newUser, id: users.length + 1 }]);
    setNewUser({ firstName: '', lastName: '', email: '', rut: '', role: '', avatar: '' });
    handleClose();
  };

  const handleEditUser = () => {
    setUsers(users.map(user => user.id === currentUser.id ? newUser : user));
    setNewUser({ firstName: '', lastName: '', email: '', rut: '', role: '',   avatar: '' });
    handleClose();
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== currentUser.id));
    setDeleteOpen(false);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClickOpen = (user) => {
    setCurrentUser(user);
    setDeleteOpen(true);
  };

  const filteredUsers = users.filter((user) =>
    user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.rut.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Container component="main" maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" gutterBottom>
          Gestión de Usuarios
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Buscar usuarios"
            variant="outlined"
            size="small"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Box>
            <Button variant="contained" color="primary" startIcon={<AddIcon />} sx={{ mr: 2 }} onClick={handleClickOpen}>
              Añadir Usuario
            </Button>
            <Button variant="outlined" color="primary" startIcon={<GetAppIcon />}>
              Exportar
            </Button>
          </Box>
        </Box>
        <Paper>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Apellido</TableCell>
                  <TableCell>Email</TableCell>
                  <TableCell>RUT</TableCell>
                  <TableCell>ROL</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((user) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.id}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Avatar src={user.avatar} sx={{ mr: 2 }}>{user.firstName[0]}</Avatar>
                        <Typography>{user.firstName}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{user.lastName}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.rut}</TableCell>
                    <TableCell>{user.role}</TableCell>
                    <TableCell>
                      <IconButton onClick={(event) => handleMenuClick(event)}>
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleMenuClose}
                      >
                        <MenuItem onClick={() => handleEditClickOpen(user)}>Editar</MenuItem>
                        <MenuItem onClick={() => handleDeleteClickOpen(user)}>Eliminar</MenuItem>
                      </Menu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={filteredUsers.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <Dialog
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              border: '2px solid red',
              boxShadow: '0px 0px 10px red',
            },
          }}
        >
          <DialogTitle>{editMode ? 'Editar Usuario' : 'Añadir Usuario'}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="firstName"
              label="Nombre"
              type="text"
              fullWidth
              required
              value={newUser.firstName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="lastName"
              label="Apellido"
              type="text"
              fullWidth
              required
              value={newUser.lastName}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="email"
              label="Correo Electrónico"
              type="email"
              fullWidth
              required
              value={newUser.email}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="rut"
              label="RUT"
              type="text"
              fullWidth
              required
              value={newUser.rut}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="role"
              label="ROL"
              type="text"
              fullWidth
              required
              value={newUser.role}
              onChange={handleChange}
            />
            <TextField
              margin="dense"
              name="avatar"
              label="Avatar URL"
              type="text"
              fullWidth
              value={newUser.avatar}
              onChange={handleChange}
            />
            <Button
              variant="outlined"
              component="label"
              sx={{ mt: 2 }}
            >
              Cargar Fotografía
              <input
                type="file"
                hidden
                onChange={(e) => {
                  const file = e.target.files[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onloadend = () => {
                      setNewUser({ ...newUser, avatar: reader.result });
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </Button>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={editMode ? handleEditUser : handleAddUser} color="primary">
              {editMode ? 'Guardar Cambios' : 'Añadir'}
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={deleteOpen}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Eliminar Usuario"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              ¿Está seguro que desea eliminar este usuario? Esta acción no se puede deshacer.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancelar
            </Button>
            <Button onClick={handleDeleteUser} color="primary" autoFocus>
              Eliminar
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Container>
  );
};

export default UserManagement;

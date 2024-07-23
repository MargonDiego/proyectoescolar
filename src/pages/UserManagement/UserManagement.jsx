import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import {
  Typography, Box, TextField, Button, Paper, Dialog, DialogContent, DialogTitle, DialogActions, DialogContentText,
  Grid, Card, CardContent, Chip, Avatar, Select, MenuItem, FormControl, InputLabel, useTheme, Fade, Zoom
} from '@mui/material';
import { Add as AddIcon, GetApp as GetAppIcon, FilterList as FilterListIcon, Refresh as RefreshIcon, Person as PersonIcon } from '@mui/icons-material';
import UserTable from './UserTable';
import UserFormDialog from './UserFormDialog';
import UserCard from '../../components/integrated/UserCard/UserCard';
import DashboardSummary from './DashboardSummary';

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
}));

const SearchBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
}));

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [newUser, setNewUser] = useState({ firstName: '', lastName: '', email: '', rut: '', role: '', avatar: '', status: 'active' });
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [filterDialogOpen, setFilterDialogOpen] = useState(false);
  const [filters, setFilters] = useState({ role: '', status: '' });
  const [loading, setLoading] = useState(true);

  const theme = useTheme();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    // Simulación de llamada a API
    setTimeout(() => {
      setUsers([
        { id: 1, firstName: 'Admin', lastName: 'User', email: 'admin@example.com', rut: '12345678-9', role: 'admin', avatar: 'https://via.placeholder.com/150', status: 'active' },
        { id: 2, firstName: 'Regular', lastName: 'User', email: 'user@example.com', rut: '98765432-1', role: 'user', avatar: 'https://via.placeholder.com/150', status: 'active' },
        { id: 3, firstName: 'View', lastName: 'Only', email: 'view@example.com', rut: '11223344-5', role: 'viewer', avatar: 'https://via.placeholder.com/150', status: 'inactive' },
      ]);
      setLoading(false);
    }, 1000);
  };

  const handleClickOpen = () => {
    setEditMode(false);
    setNewUser({ firstName: '', lastName: '', email: '', rut: '', role: '', avatar: '', status: 'active' });
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
    handleClose();
  };

  const handleEditUser = () => {
    setUsers(users.map(user => user.id === currentUser.id ? newUser : user));
    handleClose();
  };

  const handleDeleteUser = () => {
    setUsers(users.filter(user => user.id !== currentUser.id));
    setDeleteOpen(false);
  };

  const exportUsers = () => {
    // Lógica para exportar usuarios
    console.log("Exportando usuarios...");
  };

  const filteredUsers = users.filter((user) =>
    (user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.rut.toLowerCase().includes(searchTerm.toLowerCase())) &&
    (filters.role === '' || user.role === filters.role) &&
    (filters.status === '' || user.status === filters.status)
  );

  return (
    <Box sx={{ width: '100%', p: 3 }}>
      <Paper 
        elevation={3} 
        sx={{ 
          borderRadius: '12px', 
          overflow: 'hidden', 
          mb: 4,
          transition: 'box-shadow 0.3s',
          '&:hover': {
            boxShadow: 6,
          },
        }}
      >
        <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', bgcolor: 'primary.main', color: 'white' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Avatar sx={{ bgcolor: 'white', color: 'primary.main', mr: 2 }}>
              <PersonIcon />
            </Avatar>
            <Typography variant="h5" component="div">
              Gestión de Usuarios
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ p: 2 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={6} md={4}>
              <TextField
                fullWidth
                label="Buscar usuarios"
                variant="outlined"
                size="small"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8}>
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                  variant="outlined"
                  color="primary"
                  startIcon={<FilterListIcon />}
                  onClick={() => setFilterDialogOpen(true)}
                  sx={{ mr: 1 }}
                >
                  Filtros
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<AddIcon />}
                  onClick={handleClickOpen}
                  sx={{ mr: 1 }}
                >
                  Añadir Usuario
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  startIcon={<GetAppIcon />}
                  onClick={exportUsers}
                >
                  Exportar
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        
        <Fade in={!loading}>
          <Box>
            <UserTable
              users={filteredUsers}
              handleEditClickOpen={handleEditClickOpen}
              handleDeleteClickOpen={(user) => {
                setCurrentUser(user);
                setDeleteOpen(true);
              }}
              handleUserSelect={setSelectedUser}
            />
          </Box>
        </Fade>
      </Paper>
      
      <Zoom in={!loading}>
        <Box mb={4}>
          <DashboardSummary users={users} />
        </Box>
      </Zoom>
      
      <UserFormDialog
        open={open}
        editMode={editMode}
        newUser={newUser}
        handleClose={handleClose}
        handleChange={handleChange}
        handleAddUser={handleAddUser}
        handleEditUser={handleEditUser}
      />
      
      <Dialog
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
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
          <Button onClick={() => setDeleteOpen(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handleDeleteUser} color="primary" autoFocus>
            Eliminar
          </Button>
        </DialogActions>
      </Dialog>
      
      {selectedUser && (
        <Dialog open={Boolean(selectedUser)} onClose={() => setSelectedUser(null)} maxWidth="md" fullWidth>
          <DialogContent>
            <UserCard user={selectedUser} onClose={() => setSelectedUser(null)} />
          </DialogContent>
        </Dialog>
      )}
      
      <Dialog open={filterDialogOpen} onClose={() => setFilterDialogOpen(false)}>
        <DialogTitle>Filtros Avanzados</DialogTitle>
        <DialogContent>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="role-filter-label">Rol</InputLabel>
            <Select
              labelId="role-filter-label"
              id="role-filter"
              value={filters.role}
              label="Rol"
              name="role"
              onChange={(e) => setFilters({ ...filters, role: e.target.value })}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="admin">Admin</MenuItem>
              <MenuItem value="user">Usuario</MenuItem>
              <MenuItem value="viewer">Visualizador</MenuItem>
            </Select>
          </FormControl>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel id="status-filter-label">Estado</InputLabel>
            <Select
              labelId="status-filter-label"
              id="status-filter"
              value={filters.status}
              label="Estado"
              name="status"
              onChange={(e) => setFilters({ ...filters, status: e.target.value })}
            >
              <MenuItem value="">Todos</MenuItem>
              <MenuItem value="active">Activo</MenuItem>
              <MenuItem value="inactive">Inactivo</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setFilterDialogOpen(false)}>Cancelar</Button>
          <Button onClick={() => setFilterDialogOpen(false)} color="primary">Aplicar Filtros</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default UserManagement;
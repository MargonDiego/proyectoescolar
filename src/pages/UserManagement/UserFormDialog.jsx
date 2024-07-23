import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  TextField,
  Button,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Avatar,
  IconButton,
  Typography,
  Box,
  CircularProgress
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { PhotoCamera, Close } from '@mui/icons-material';

const Input = styled('input')({
  display: 'none',
});

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(12),
  height: theme.spacing(12),
  margin: 'auto',
}));

const UserFormDialog = ({ open, editMode, newUser, handleClose, handleChange, handleAddUser, handleEditUser }) => {
  const [errors, setErrors] = useState({});
  const [uploading, setUploading] = useState(false);

  const validateForm = () => {
    let tempErrors = {};
    tempErrors.firstName = newUser.firstName ? "" : "El nombre es requerido";
    tempErrors.lastName = newUser.lastName ? "" : "El apellido es requerido";
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newUser.email) ? "" : "El email no es válido";
    tempErrors.rut = /^\d{1,2}\.\d{3}\.\d{3}[-][0-9kK]{1}$/.test(newUser.rut) ? "" : "El RUT no es válido";
    tempErrors.role = newUser.role ? "" : "El rol es requerido";
    setErrors(tempErrors);
    return Object.values(tempErrors).every(x => x === "");
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (editMode) {
        handleEditUser();
      } else {
        // Aquí es donde se manejaría la creación del nuevo usuario y el envío del correo
        handleAddUser();
        // TODO: Implementar la lógica para generar una contraseña aleatoria
        // const randomPassword = generateRandomPassword();
        
        // TODO: Implementar el envío de correo con la contraseña
        // sendWelcomeEmail(newUser.email, randomPassword);
        
        // TODO: Guardar la contraseña hasheada en la base de datos
        // saveUserWithHashedPassword(newUser, randomPassword);
      }
    }
  }

  const handleFileChange = (event) => {
    setUploading(true);
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange({ target: { name: 'avatar', value: reader.result } });
        setUploading(false);
      };
      reader.readAsDataURL(file);
    }
  };

  // TODO: Implementar estas funciones
  // function generateRandomPassword() {
  //   // Lógica para generar una contraseña aleatoria segura
  // }

  // function sendWelcomeEmail(email, password) {
  //   // Lógica para enviar un correo electrónico de bienvenida con la contraseña
  // }

  // function saveUserWithHashedPassword(user, password) {
  //   // Lógica para guardar el usuario con la contraseña hasheada en la base de datos
  // }

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        style: {
          borderRadius: '12px',
        },
      }}
    >
      <DialogTitle>
        {editMode ? 'Editar Usuario' : 'Añadir Usuario'}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent dividers>
          <Grid container spacing={2}>
            <Grid item xs={12} align="center">
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={handleFileChange}
                style={{ display: 'none' }}
              />
              <label htmlFor="icon-button-file">
                <IconButton component="span">
                  {uploading ? (
                    <CircularProgress size={96} />
                  ) : (
                    <StyledAvatar src={newUser.avatar} alt={newUser.firstName}>
                      {newUser.firstName ? newUser.firstName[0].toUpperCase() : <PhotoCamera />}
                    </StyledAvatar>
                  )}
                </IconButton>
              </label>
              <Typography variant="caption" display="block">
                Click para cambiar la foto
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                autoFocus
                margin="dense"
                name="firstName"
                label="Nombre"
                type="text"
                fullWidth
                value={newUser.firstName}
                onChange={handleChange}
                error={Boolean(errors.firstName)}
                helperText={errors.firstName}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                margin="dense"
                name="lastName"
                label="Apellido"
                type="text"
                fullWidth
                value={newUser.lastName}
                onChange={handleChange}
                error={Boolean(errors.lastName)}
                helperText={errors.lastName}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="email"
                label="Correo Electrónico"
                type="email"
                fullWidth
                value={newUser.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                name="rut"
                label="RUT"
                type="text"
                fullWidth
                value={newUser.rut}
                onChange={handleChange}
                error={Boolean(errors.rut)}
                helperText={errors.rut}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="role-label">Rol</InputLabel>
                <Select
                  labelId="role-label"
                  name="role"
                  value={newUser.role}
                  onChange={handleChange}
                  error={Boolean(errors.role)}
                >
                  <MenuItem value="admin">Admin</MenuItem>
                  <MenuItem value="user">Usuario</MenuItem>
                  <MenuItem value="viewer">Visualizador</MenuItem>
                  <MenuItem value="student">Estudiante</MenuItem>
                </Select>
                {errors.role && <Typography color="error" variant="caption">{errors.role}</Typography>}
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancelar
          </Button>
          <Button type="submit" color="primary" variant="contained">
            {editMode ? 'Guardar Cambios' : 'Añadir'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default UserFormDialog;
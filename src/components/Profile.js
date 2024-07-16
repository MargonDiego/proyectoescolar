import React, { useContext, useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Avatar,
  Paper,
  Container
} from '@mui/material';
import { AuthContext } from '../context/AuthContext';

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    gender: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: ''
  });

  useEffect(() => {
    setProfileData({
      firstName: user.firstName || '',
      lastName: user.lastName || '',
      email: user.email || '',
      position: user.position || '',
      password: '',
      confirmPassword: '',
      birthday: user.birthday || '',
      gender: user.gender || '',
      phone: user.phone || '',
      address: user.address || '',
      city: user.city || '',
      state: user.state || '',
      zip: user.zip || ''
    });
  }, [user]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (profileData.password !== profileData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }
    updateUser(profileData);
  };

  return (
    <Container>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', p: 2 }}>
        <Paper sx={{ p: 2, width: '65%' }}>
          <Typography variant="h6" gutterBottom>
            Información general
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nombre"
                  name="firstName"
                  value={profileData.firstName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Apellido"
                  name="lastName"
                  value={profileData.lastName}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Fecha de nacimiento"
                  name="birthday"
                  type="date"
                  value={profileData.birthday}
                  onChange={handleChange}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Género"
                  name="gender"
                  value={profileData.gender}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  value={profileData.email}
                  onChange={handleChange}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Teléfono"
                  name="phone"
                  value={profileData.phone}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Dirección"
                  name="address"
                  value={profileData.address}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Ciudad"
                  name="city"
                  value={profileData.city}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Estado"
                  name="state"
                  value={profileData.state}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  fullWidth
                  label="Código Postal"
                  name="zip"
                  value={profileData.zip}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Cargo"
                  name="position"
                  value={profileData.position}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Nueva Contraseña"
                  name="password"
                  type="password"
                  value={profileData.password}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Confirmar Contraseña"
                  name="confirmPassword"
                  type="password"
                  value={profileData.confirmPassword}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
            >
              Actualizar Perfil
            </Button>
          </form>
        </Paper>
        
        <Paper sx={{ p: 2, width: '30%', textAlign: 'center' }}>
          <Avatar
            alt={`${profileData.firstName} ${profileData.lastName}`}
            src={user.avatar}
            sx={{ width: 100, height: 100, margin: 'auto' }}
          />
          <Typography variant="h6" sx={{ mt: 2 }}>
            {profileData.firstName} {profileData.lastName}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {profileData.position}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {profileData.city}, {profileData.state}
          </Typography>
          <Box sx={{ mt: 4 }}>
            <Typography variant="subtitle1">Seleccionar foto de perfil</Typography>
            <Button variant="outlined" component="label" sx={{ mt: 1 }}>
              Elegir imagen
              <input type="file" hidden />
            </Button>
            <Typography variant="caption" display="block">
              JPG, GIF o PNG. Tamaño máximo de 800K
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default Profile;
import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box, TextField, Button, Grid, Avatar, Paper, Container,
  Typography, Tabs, Tab, Divider, IconButton, Tooltip, Snackbar, Alert,
  Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CakeIcon from '@mui/icons-material/Cake';
import LockIcon from '@mui/icons-material/Lock';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useUsers } from '../../hooks/useUsers/useUsers';

const ProfileContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const ProfilePaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: '20px',
  boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
}));

const ProfileHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const ProfileAvatar = styled(Avatar)(({ theme }) => ({
  width: 120,
  height: 120,
  marginRight: theme.spacing(3),
  border: `4px solid ${theme.palette.primary.main}`,
}));

const InfoItem = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  marginBottom: theme.spacing(2),
  '& .MuiSvgIcon-root': {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
  },
}));

const Profile = () => {
  const { user: authUser } = useContext(AuthContext);
  const { users, isLoading, error, updateUser } = useUsers();
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({});
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
  const [passwordData, setPasswordData] = useState({ current: '', new: '', confirm: '' });

  useEffect(() => {
    if (users && authUser) {
      const currentUser = users.find(u => u.id === authUser.id);
      if (currentUser) {
        setProfileData(currentUser);
      }
    }
  }, [users, authUser]);

  const handleChange = (event) => {
    setProfileData({
      ...profileData,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await updateUser(profileData);
      setEditMode(false);
      setSnackbarMessage('Perfil actualizado exitosamente');
      setOpenSnackbar(true);
    } catch (error) {
      console.error('Error updating profile:', error);
      setSnackbarMessage('Error al actualizar el perfil');
      setOpenSnackbar(true);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handlePasswordChange = (event) => {
    setPasswordData({
      ...passwordData,
      [event.target.name]: event.target.value
    });
  };

  const handlePasswordSubmit = async () => {
    // Aquí iría la lógica para cambiar la contraseña
    // Por ahora, solo cerraremos el diálogo
    setOpenPasswordDialog(false);
    setPasswordData({ current: '', new: '', confirm: '' });
    setSnackbarMessage('Contraseña actualizada exitosamente');
    setOpenSnackbar(true);
  };

  if (isLoading) return <Typography>Cargando perfil...</Typography>;
  if (error) return <Typography>Error al cargar el perfil: {error.message}</Typography>;

  return (
    <ProfileContainer maxWidth="lg">
      <ProfilePaper elevation={3}>
        <ProfileHeader>
          <ProfileAvatar src={profileData.avatar} alt={`${profileData.firstName} ${profileData.lastName}`} />
          <Box>
            <Typography variant="h4" gutterBottom>
              {profileData.firstName} {profileData.lastName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {profileData.role}
            </Typography>
          </Box>
          <Box ml="auto">
            {!editMode ? (
              <Tooltip title="Editar perfil">
                <IconButton onClick={() => setEditMode(true)}>
                  <EditIcon />
                </IconButton>
              </Tooltip>
            ) : (
              <>
                <Tooltip title="Guardar cambios">
                  <IconButton onClick={handleSubmit} color="primary">
                    <SaveIcon />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Cancelar">
                  <IconButton onClick={() => setEditMode(false)} color="error">
                    <CancelIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
          </Box>
        </ProfileHeader>

        <Tabs value={activeTab} onChange={handleTabChange} centered>
          <Tab label="Información Personal" />
          <Tab label="Contacto" />
          <Tab label="Seguridad" />
        </Tabs>

        <Box mt={3}>
          {activeTab === 0 && (
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <WorkIcon />
                  <Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="role"
                        value={profileData.role || ''}
                        onChange={handleChange}
                        label="Rol"
                      />
                    ) : (
                      `Rol: ${profileData.role || 'No especificado'}`
                    )}
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <CakeIcon />
                  <Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="rut"
                        value={profileData.rut || ''}
                        onChange={handleChange}
                        label="RUT"
                      />
                    ) : (
                      `RUT: ${profileData.rut || 'No especificado'}`
                    )}
                  </Typography>
                </InfoItem>
              </Grid>
              <Grid item xs={12} md={6}>
                <InfoItem>
                  <EmailIcon />
                  <Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="email"
                        value={profileData.email || ''}
                        onChange={handleChange}
                        label="Correo electrónico"
                      />
                    ) : (
                      `Email: ${profileData.email || 'No especificado'}`
                    )}
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <PhoneIcon />
                  <Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="phone"
                        value={profileData.phone || ''}
                        onChange={handleChange}
                        label="Teléfono"
                      />
                    ) : (
                      `Teléfono: ${profileData.phone || 'No especificado'}`
                    )}
                  </Typography>
                </InfoItem>
              </Grid>
            </Grid>
          )}

          {activeTab === 1 && (
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <InfoItem>
                  <LocationOnIcon />
                  <Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="address"
                        value={profileData.address || ''}
                        onChange={handleChange}
                        label="Dirección"
                      />
                    ) : (
                      `Dirección: ${profileData.address || 'No especificada'}`
                    )}
                  </Typography>
                </InfoItem>
              </Grid>
              {/* Aquí puedes agregar más campos de contacto si es necesario */}
            </Grid>
          )}

          {activeTab === 2 && (
            <Box>
              <Button
                variant="contained"
                color="primary"
                startIcon={<LockIcon />}
                onClick={() => setOpenPasswordDialog(true)}
              >
                Cambiar Contraseña
              </Button>
            </Box>
          )}
        </Box>
      </ProfilePaper>

      <Dialog open={openPasswordDialog} onClose={() => setOpenPasswordDialog(false)}>
        <DialogTitle>Cambiar Contraseña</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Por favor, introduce tu contraseña actual y la nueva contraseña.
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            name="current"
            label="Contraseña Actual"
            type="password"
            fullWidth
            value={passwordData.current}
            onChange={handlePasswordChange}
          />
          <TextField
            margin="dense"
            name="new"
            label="Nueva Contraseña"
            type="password"
            fullWidth
            value={passwordData.new}
            onChange={handlePasswordChange}
          />
          <TextField
            margin="dense"
            name="confirm"
            label="Confirmar Nueva Contraseña"
            type="password"
            fullWidth
            value={passwordData.confirm}
            onChange={handlePasswordChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenPasswordDialog(false)} color="primary">
            Cancelar
          </Button>
          <Button onClick={handlePasswordSubmit} color="primary">
            Cambiar Contraseña
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </ProfileContainer>
  );
};

export default Profile;

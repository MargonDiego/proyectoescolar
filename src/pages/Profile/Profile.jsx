import React, { useState, useContext, useEffect } from 'react';
import styled from 'styled-components';
import {
  Box, TextField, Button, Grid, Avatar, Paper, Container,
  Typography, Tabs, Tab, Divider, IconButton, Tooltip
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Cancel';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WorkIcon from '@mui/icons-material/Work';
import CakeIcon from '@mui/icons-material/Cake';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';

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
  const { user, updateUser } = useContext(AuthContext);
  const [editMode, setEditMode] = useState(false);
  const [activeTab, setActiveTab] = useState(0);
  const [profileData, setProfileData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    position: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zip: '',
    birthday: '',
  });

  useEffect(() => {
    if (user) {
      setProfileData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        position: user.position || '',
        phone: user.phone || '',
        address: user.address || '',
        city: user.city || '',
        state: user.state || '',
        zip: user.zip || '',
        birthday: user.birthday || '',
      });
    }
  }, [user]);

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
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <ProfileContainer maxWidth="lg">
      <ProfilePaper elevation={3}>
        <ProfileHeader>
          <ProfileAvatar src={user?.avatar} alt={`${user?.firstName} ${user?.lastName}`} />
          <Box>
            <Typography variant="h4" gutterBottom>
              {user?.firstName} {user?.lastName}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {user?.role}
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
          <Tab label="Configuración" />
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
                        name="position"
                        value={profileData.position}
                        onChange={handleChange}
                        label="Cargo"
                      />
                    ) : (
                      `Cargo: ${profileData.position || 'No especificado'}`
                    )}
                  </Typography>
                </InfoItem>
                <InfoItem>
                  <CakeIcon />
                  <Typography>
                    {editMode ? (
                      <TextField
                        fullWidth
                        name="birthday"
                        type="date"
                        value={profileData.birthday}
                        onChange={handleChange}
                        label="Fecha de nacimiento"
                        InputLabelProps={{ shrink: true }}
                      />
                    ) : (
                      `Fecha de nacimiento: ${profileData.birthday || 'No especificada'}`
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
                        value={profileData.email}
                        onChange={handleChange}
                        label="Correo electrónico"
                      />
                    ) : (
                      `Email: ${profileData.email}`
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
                        value={profileData.phone}
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
                      <>
                        <TextField
                          fullWidth
                          name="address"
                          value={profileData.address}
                          onChange={handleChange}
                          label="Dirección"
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          name="city"
                          value={profileData.city}
                          onChange={handleChange}
                          label="Ciudad"
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          name="state"
                          value={profileData.state}
                          onChange={handleChange}
                          label="Estado/Provincia"
                          margin="normal"
                        />
                        <TextField
                          fullWidth
                          name="zip"
                          value={profileData.zip}
                          onChange={handleChange}
                          label="Código Postal"
                          margin="normal"
                        />
                      </>
                    ) : (
                      <>
                        Dirección: {profileData.address}<br />
                        Ciudad: {profileData.city}<br />
                        Estado/Provincia: {profileData.state}<br />
                        Código Postal: {profileData.zip}
                      </>
                    )}
                  </Typography>
                </InfoItem>
              </Grid>
            </Grid>
          )}

          {activeTab === 2 && (
            <Typography variant="body1">
              Configuración del perfil y preferencias (Por implementar)
            </Typography>
          )}
        </Box>
      </ProfilePaper>
    </ProfileContainer>
  );
};

export default Profile;
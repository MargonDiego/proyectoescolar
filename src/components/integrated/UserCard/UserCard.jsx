import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  Typography, Avatar, Box, Chip, Grid, 
  IconButton, Tooltip, Collapse, Button
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import BadgeIcon from '@mui/icons-material/Badge';
import WorkIcon from '@mui/icons-material/Work';
import PhoneIcon from '@mui/icons-material/Phone';
import ClassIcon from '@mui/icons-material/Class';
import CakeIcon from '@mui/icons-material/Cake';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SchoolIcon from '@mui/icons-material/School';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';

const StyledCard = styled.div`
  padding: ${({ theme }) => theme.spacing(4)};
  border-radius: 16px;
  background-color: #979898;
  color: #1565C0;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const StyledAvatar = styled(Avatar)`
  width: 120px;
  height: 120px;
  margin: 0 auto;
  border: 4px solid ${({ theme }) => theme.palette.background.paper};
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: scale(1.05);
  }
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  & .MuiSvgIcon-root {
    margin-right: ${({ theme }) => theme.spacing(1)};
    color: #1565C0;
  }
`;

const SpecialtyChip = styled(Chip)`
  margin: ${({ theme }) => theme.spacing(0.5)};
  background-color: #BBDEFB;
  color: #1565C0;
  transition: all 0.2s ease-in-out;
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: #90CAF9;
  }
`;

const ExpandButton = styled(Button)`
  margin-top: ${({ theme }) => theme.spacing(2)};
  color: #1565C0;
  &:hover {
    background-color: rgba(21, 101, 192, 0.1);
  }
`;

const UserCard = ({ user }) => {
  const [expanded, setExpanded] = useState(false);

  if (!user) return null;

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <StyledCard>
      <Box textAlign="center" mb={3}>
        <StyledAvatar
          alt={`${user.firstName} ${user.lastName}`}
          src={user.avatar}
        />
        <Typography variant="h4" gutterBottom fontWeight="bold" mt={2}>
          {user.firstName} {user.lastName}
        </Typography>
        <Chip 
          label={user.role.toUpperCase()} 
          color="primary"
          sx={{ mb: 1, fontSize: '0.9rem', padding: '4px 8px' }}
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <InfoItem>
            <BadgeIcon />
            <Typography variant="body1">ID: {user.id}</Typography>
          </InfoItem>
          <InfoItem>
            <EmailIcon />
            <Typography variant="body1">{user.email}</Typography>
          </InfoItem>
          <InfoItem>
            <WorkIcon />
            <Typography variant="body1">{user.role}</Typography>
          </InfoItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <InfoItem>
            <PhoneIcon />
            <Typography variant="body1">{user.phone || 'No disponible'}</Typography>
          </InfoItem>
          <InfoItem>
            <ClassIcon />
            <Typography variant="body1">Curso: {user.class || 'No asignado'}</Typography>
          </InfoItem>
          <InfoItem>
            <CakeIcon />
            <Typography variant="body1">{user.birthdate || 'No especificado'}</Typography>
          </InfoItem>
        </Grid>
      </Grid>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Box mt={3}>
          <Typography variant="h6" gutterBottom>
            Especialidades
          </Typography>
          <Box mb={2}>
            {user.specialties && user.specialties.map((specialty) => (
              <SpecialtyChip key={specialty} label={specialty} />
            ))}
          </Box>
        </Box>

        {user.role === 'Profesor' && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Asignaturas
            </Typography>
            <Box mb={2}>
              {user.subjects && user.subjects.map((subject) => (
                <SpecialtyChip key={subject} label={subject} icon={<SchoolIcon />} />
              ))}
            </Box>
          </Box>
        )}

        {user.role === 'Enfermero' && (
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              Información Médica
            </Typography>
            <InfoItem>
              <LocalHospitalIcon />
              <Typography variant="body1">Licencia: {user.medicalLicense}</Typography>
            </InfoItem>
            <InfoItem>
              <LocalHospitalIcon />
              <Typography variant="body1">Especialidad: {user.medicalSpecialty}</Typography>
            </InfoItem>
          </Box>
        )}
      </Collapse>

      <ExpandButton
        onClick={toggleExpand}
        endIcon={expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      >
        {expanded ? 'Ver menos' : 'Ver más'}
      </ExpandButton>
    </StyledCard>
  );
};

export default UserCard;
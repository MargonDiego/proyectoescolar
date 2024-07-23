import React from 'react';
import styled from 'styled-components';
import { Typography, Grid, Chip, Box } from '@mui/material';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PhoneIcon from '@mui/icons-material/Phone';
import HomeIcon from '@mui/icons-material/Home';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import SchoolIcon from '@mui/icons-material/School';

const StyledCard = styled.div`
  padding: ${({ theme }) => theme.spacing(3)};
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 16px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  background: linear-gradient(145deg, #ffffff, #f0f0f0);
  transition: transform 0.3s ease-in-out;
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
  }
`;

const InfoItem = styled(Box)`
  display: flex;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing(1.5)};
  padding: ${({ theme }) => theme.spacing(1)};
  border-radius: 8px;
  background-color: rgba(0, 0, 0, 0.03);
  transition: background-color 0.3s ease;
  &:hover {
    background-color: rgba(0, 0, 0, 0.06);
  }
`;

const InfoIcon = styled(Box)`
  margin-right: ${({ theme }) => theme.spacing(1.5)};
  color: ${({ theme }) => theme.palette.primary.main};
`;

const SectionTitle = styled(Typography)`
  font-weight: 600;
  color: ${({ theme }) => theme.palette.primary.main};
  margin-bottom: ${({ theme }) => theme.spacing(1)};
`;

const StudentCard = ({ student }) => {
  if (!student) return null;

  return (
    <StyledCard>
      <Box mb={3}>
        <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
          {student.firstName} {student.lastName}
        </Typography>
        <Chip 
          icon={<SchoolIcon />} 
          label={student.course} 
          color="primary" 
          size="small" 
          sx={{ fontWeight: 'bold' }} 
        />
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <SectionTitle variant="subtitle1">Información Personal</SectionTitle>
          <InfoItem>
            <InfoIcon><CalendarTodayIcon /></InfoIcon>
            <Typography variant="body2">
              <strong>Nacimiento:</strong> {new Date(student.dob).toLocaleDateString()}
            </Typography>
          </InfoItem>
          <InfoItem>
            <InfoIcon><PhoneIcon /></InfoIcon>
            <Typography variant="body2">
              <strong>Teléfono:</strong> {student.phone}
            </Typography>
          </InfoItem>
          <InfoItem>
            <InfoIcon><HomeIcon /></InfoIcon>
            <Typography variant="body2">
              <strong>Dirección:</strong> {student.address}
            </Typography>
          </InfoItem>
        </Grid>
        <Grid item xs={12} sm={6}>
          <SectionTitle variant="subtitle1">Información Médica</SectionTitle>
          <InfoItem>
            <InfoIcon><LocalHospitalIcon /></InfoIcon>
            <Typography variant="body2">
              <strong>Historia:</strong> {student.medicalHistory}
            </Typography>
          </InfoItem>
          <InfoItem>
            <InfoIcon><LocalHospitalIcon /></InfoIcon>
            <Typography variant="body2">
              <strong>Alergias:</strong> {student.allergies}
            </Typography>
          </InfoItem>
          <InfoItem>
            <InfoIcon><LocalHospitalIcon /></InfoIcon>
            <Typography variant="body2">
              <strong>Tipo de sangre:</strong> {student.bloodType}
            </Typography>
          </InfoItem>
        </Grid>
      </Grid>

      <Box mt={2}>
        <SectionTitle variant="subtitle1">Contacto de Emergencia</SectionTitle>
        <InfoItem>
          <InfoIcon><ContactPhoneIcon /></InfoIcon>
          <Typography variant="body2">
            <strong>{student.emergencyContact}</strong> - {student.emergencyPhone}
          </Typography>
        </InfoItem>
      </Box>

      {student.notes && (
        <Box mt={2}>
          <SectionTitle variant="subtitle1">Notas</SectionTitle>
          <Typography variant="body2" sx={{ fontStyle: 'italic', color: 'text.secondary' }}>
            {student.notes}
          </Typography>
        </Box>
      )}
    </StyledCard>
  );
};

export default StudentCard;
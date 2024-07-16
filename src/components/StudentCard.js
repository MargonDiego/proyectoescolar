// src/components/StudentCard.js
import React from 'react';
import { Card, Typography, Avatar, Box } from '@mui/material';

const StudentCard = ({ student }) => {
  if (!student) return null;

  return (
    <Card sx={{
      display: 'flex',
      m: 2,
      p: 2,
    }}>
      <Avatar 
        alt={student.name} 
        src={student.avatar} 
        sx={{
          width: 56,
          height: 56,
          mr: 2,
        }}
      />
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="h5" sx={{ mb: 1 }}>{student.name}</Typography>
        <Typography variant="body1"><strong>Curso:</strong> {student.course}</Typography>
        <Typography variant="body1"><strong>Dirección:</strong> {student.address}</Typography>
        <Typography variant="body1"><strong>Teléfono:</strong> {student.phone}</Typography>
        <Typography variant="body1"><strong>Fecha de Nacimiento:</strong> {student.dob}</Typography>
        <Typography variant="body1"><strong>Antecedentes Médicos:</strong> {student.medicalHistory}</Typography>
        <Typography variant="body1"><strong>Alergias:</strong> {student.allergies}</Typography>
        <Typography variant="body1"><strong>Contacto de Emergencia:</strong> {student.emergencyContact}</Typography>
        <Typography variant="body1"><strong>Teléfono de Emergencia:</strong> {student.emergencyPhone}</Typography>
        <Typography variant="body1"><strong>Grupo Sanguíneo:</strong> {student.bloodType}</Typography>
        <Typography variant="body1"><strong>Medicamentos:</strong> {student.medications}</Typography>
        <Typography variant="body1"><strong>Notas:</strong> {student.notes}</Typography>
      </Box>
    </Card>
  );
};

export default StudentCard;
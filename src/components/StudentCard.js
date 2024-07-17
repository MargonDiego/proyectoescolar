import React from 'react';
import { Paper, Typography, Avatar, Button } from '@mui/material';
import { Link } from 'react-router-dom';

const StudentCard = ({ student }) => {
  if (!student) return null;

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <Paper sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Avatar
        alt={`${student.firstName} ${student.lastName}`}
        src={student.avatar}
        sx={{ width: 100, height: 100, marginBottom: 2 }}
      />
      <Typography variant="h6">
        {student.firstName} {student.lastName}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Curso: {student.course}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        RUT: {student.rut}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Edad: {calculateAge(student.dob)}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Teléfono: {student.phone}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Historia Médica: {student.medicalHistory}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Alergias: {student.allergies}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Contacto de Emergencia: {student.emergencyContact}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Teléfono de Emergencia: {student.emergencyPhone}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Grupo Sanguíneo: {student.bloodType}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Medicamentos: {student.medications}
      </Typography>
      <Typography variant="body2" color="textSecondary">
        Notas: {student.notes}
      </Typography>
      <Button variant="contained" color="primary" component={Link} to={`/students/edit/${student.id}`} sx={{ mt: 2 }}>
        Editar Estudiante
      </Button>
    </Paper>
  );
};

export default StudentCard;

import React from 'react';
import { Paper, Typography } from '@mui/material';

const StudentSummary = ({ totalStudents, courses }) => {
    return (
        <Paper style={{ padding: '16px', marginTop: '16px' }}>
            <Typography variant="h6" gutterBottom>
                Resumen de Estudiantes
            </Typography>
            <Typography variant="body1">
                Total de Estudiantes: {totalStudents}
            </Typography>
            {Object.keys(courses).map(course => (
                <Typography key={course} variant="body1">
                    {course}: {courses[course]} estudiantes
                </Typography>
            ))}
        </Paper>
    );
};

export default StudentSummary;

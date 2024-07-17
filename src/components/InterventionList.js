// src/components/InterventionList.js
import React, { useState } from 'react';
import { Card, CardContent, Grid, Typography, Button, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { Link } from 'react-router-dom';

// Componente para mostrar una lista de intervenciones
const InterventionList = ({ interventions, handleDelete }) => {
    // Estado para la intervención seleccionada
    const [selectedIntervention, setSelectedIntervention] = useState(null);
    // Estado para controlar la apertura del diálogo
    const [open, setOpen] = useState(false);

    // Función para abrir el diálogo con la intervención seleccionada
    const handleClickOpen = (intervention) => {
        setSelectedIntervention(intervention);
        setOpen(true);
    };

    // Función para cerrar el diálogo
    const handleClose = () => {
        setOpen(false);
        setSelectedIntervention(null);
    };

    return (
        <>
            <Grid container spacing={3}>
                {interventions.map(intervention => (
                    <Grid item xs={12} md={6} lg={4} key={intervention.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">
                                    {intervention.description}
                                </Typography>
                                <Typography variant="body2" color="textSecondary">
                                    <strong>Fecha:</strong> {new Date(intervention.date).toLocaleString()}
                                </Typography>
                                <Button variant="contained" color="secondary" onClick={() => handleClickOpen(intervention)} style={{ marginRight: '8px' }}>
                                    Ver
                                </Button>
                                <Button variant="contained" color="secondary" component={Link} to={`/students/${intervention.studentId}/edit-intervention/${intervention.id}`} style={{ marginRight: '8px' }}>
                                    Editar
                                </Button>
                                <Button variant="contained" color="error" onClick={() => handleDelete(intervention.id)}>
                                    Eliminar
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            {selectedIntervention && (
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Detalles de la Intervención</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            <strong>Descripción:</strong> {selectedIntervention.description}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Fecha:</strong> {new Date(selectedIntervention.date).toLocaleString()}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Asignado a:</strong> {selectedIntervention.assignedTo || 'N/A'}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Prioridad:</strong> {selectedIntervention.priority}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Estado:</strong> {selectedIntervention.status}
                        </DialogContentText>
                        <DialogContentText>
                            <strong>Archivos:</strong> {selectedIntervention.files ? selectedIntervention.files.join(', ') : 'N/A'}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cerrar
                        </Button>
                    </DialogActions>
                </Dialog>
            )}
        </>
    );
};

export default InterventionList;

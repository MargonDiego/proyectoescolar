import React, { useState, useEffect, useContext } from 'react';
import { Container, Typography, TextField, Button, Paper, MenuItem, Input, Box, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider } from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const EditIntervention = () => {
    const { id, interventionId } = useParams(); // Obtener parámetros de la URL
    const navigate = useNavigate();
    const { user } = useContext(AuthContext); // Obtener el usuario autenticado del contexto

    const [intervention, setIntervention] = useState({
        titulo: '',
        descripcion: '',
        asignadoA: '',
        prioridad: 'Media',
        archivos: [],
        estado: 'Iniciado',
        actualizadoPor: user?.name || 'Desconocido',
    }); // Estado para los datos de la intervención
    const [comentarios, setComentarios] = useState([]); // Estado para los comentarios
    const [nuevoComentario, setNuevoComentario] = useState(''); // Estado para el nuevo comentario

    const prioridades = ['Baja', 'Media', 'Alta']; // Opciones de prioridad
    const estados = ['Iniciado', 'En Progreso', 'Resuelto', 'Cerrado']; // Opciones de estado

    useEffect(() => {
        const fetchIntervention = async () => {
            // Datos simulados de la intervención
            const interventionData = {
                id: interventionId,
                studentId: id,
                titulo: 'Título de la Intervención',
                descripcion: 'Intervención Inicial',
                asignadoA: 'Juan Pérez',
                prioridad: 'Media',
                estado: 'Iniciado',
                archivos: [],
                comentarios: [
                    { texto: 'Comentario inicial', autor: 'Usuario1', fecha: new Date().toISOString() }
                ]
            };
            setIntervention(interventionData);
            setComentarios(interventionData.comentarios);
        };

        fetchIntervention();
    }, [interventionId, id]); // Ejecutar efecto cuando cambien los parámetros

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention({ ...intervention, [name]: value }); // Actualizar el estado de la intervención
    };

    const handleFileChange = (e) => {
        setIntervention({ ...intervention, archivos: [...intervention.archivos, ...e.target.files] }); // Añadir archivos al estado
    };

    const sendComment = () => {
        if (nuevoComentario.trim()) {
            const comentario = {
                texto: nuevoComentario,
                autor: user?.name || 'Desconocido',
                fecha: new Date().toISOString()
            };
            setComentarios([...comentarios, comentario]);
            setNuevoComentario('');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Intervención actualizada:', intervention);
        console.log('Comentarios:', comentarios);
        navigate(`/students/${id}`); // Redirigir a la vista del estudiante
    };

    return (
        <Container>
            <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {intervention.titulo || 'Editar Intervención'}
                </Typography>
                <form onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                label="Título"
                                name="titulo"
                                value={intervention.titulo}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                label="Descripción"
                                name="descripcion"
                                value={intervention.descripcion}
                                onChange={handleChange}
                                fullWidth
                                multiline
                                rows={4}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                label="Asignado a"
                                name="asignadoA"
                                value={intervention.asignadoA}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Prioridad"
                                name="prioridad"
                                value={intervention.prioridad}
                                onChange={handleChange}
                                fullWidth
                            >
                                {prioridades.map((opcion) => (
                                    <MenuItem key={opcion} value={opcion}>
                                        {opcion}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                select
                                label="Estado"
                                name="estado"
                                value={intervention.estado}
                                onChange={handleChange}
                                fullWidth
                            >
                                {estados.map((opcion) => (
                                    <MenuItem key={opcion} value={opcion}>
                                        {opcion}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12}>
                            <Input
                                type="file"
                                inputProps={{ multiple: true }}
                                onChange={handleFileChange}
                                fullWidth
                            />
                            <Typography variant="caption">
                                Archivos adjuntos: {intervention.archivos.length}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">Comentarios</Typography>
                            <List>
                                {comentarios.map((comentario, index) => (
                                    <React.Fragment key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemAvatar>
                                                <Avatar>{comentario.autor[0]}</Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={comentario.autor}
                                                secondary={
                                                    <>
                                                        <Typography component="span" variant="body2" color="textPrimary">
                                                            {new Date(comentario.fecha).toLocaleString()}
                                                        </Typography>
                                                        {" — " + comentario.texto}
                                                    </>
                                                }
                                            />
                                        </ListItem>
                                        {index < comentarios.length - 1 && <Divider variant="inset" component="li" />}
                                    </React.Fragment>
                                ))}
                            </List>
                            <TextField
                                label="Añadir comentario"
                                value={nuevoComentario}
                                onChange={(e) => setNuevoComentario(e.target.value)}
                                fullWidth
                                multiline
                                rows={2}
                                margin="normal"
                            />
                            <Button onClick={sendComment} variant="outlined">
                                Añadir Comentario
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Box display="flex" justifyContent="flex-end">
                                <Button variant="contained" color="primary" type="submit">
                                    Guardar Intervención
                                </Button>
                            </Box>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default EditIntervention;

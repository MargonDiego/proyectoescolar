import React, { useState, useEffect, useContext } from 'react';
import styled from 'styled-components';
import { 
  Container, Typography, TextField, Button, MenuItem, Box, Grid, List,  
  ListItemText, ListItemAvatar, Avatar, Divider, Chip, IconButton, Tooltip, Snackbar, Alert,
  Card, CardContent, CardHeader, CardActions, Accordion, AccordionSummary, AccordionDetails,
  Paper, FormControl, InputLabel, Select
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import { useStudents } from '../../hooks/useStudents/useStudents';
import { useInterventions } from '../../hooks/useInterventions/useInterventions';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EditIcon from '@mui/icons-material/Edit';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import FlagIcon from '@mui/icons-material/Flag';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import EventIcon from '@mui/icons-material/Event';
import UpdateIcon from '@mui/icons-material/Update';
import CategoryIcon from '@mui/icons-material/Category';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
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

const FileInput = styled('input')({
  display: 'none',
});

const StyledAccordion = styled(Accordion)(({ theme }) => ({
  background: 'transparent',
  boxShadow: 'none',
  '&:before': {
    display: 'none',
  },
  '& .MuiAccordionSummary-root': {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
}));

const EditIntervention = () => {
    const { id, interventionId } = useParams(); 
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { students } = useStudents();
    const { interventions, updateIntervention, isLoading, categories, priorities, statuses } = useInterventions();
    const [intervention, setIntervention] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newCommentFiles, setNewCommentFiles] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const isAdmin = user && user.role === 'admin';

    useEffect(() => {
        if (interventions) {
            const currentIntervention = interventions.find(i => i.id.toString() === interventionId);
            if (currentIntervention) {
                setIntervention(currentIntervention);
                setComments(currentIntervention.comments || []);
            }
        }
    }, [interventionId, interventions]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setIntervention({ ...intervention, [name]: value });
    };

    const handleFileChange = (e) => {
        setNewCommentFiles([...newCommentFiles, ...e.target.files]);
    };

    const sendComment = async () => {
        if (newComment.trim()) {
            const comment = {
                id: Date.now(),
                text: newComment,
                author: user?.name || 'Unknown',
                date: new Date().toISOString(),
                files: newCommentFiles
            };
            const updatedComments = [...comments, comment];
            setComments(updatedComments);
            setNewComment('');
            setNewCommentFiles([]);
            try {
                await updateIntervention({ ...intervention, comments: updatedComments });
                setOpenSnackbar(true);
                setSnackbarMessage('Comentario añadido exitosamente');
            } catch (error) {
                console.error('Error al añadir comentario:', error);
                setSnackbarMessage('Error al añadir comentario');
                setOpenSnackbar(true);
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateIntervention(intervention);
            setIsEditing(false);
            setOpenSnackbar(true);
            setSnackbarMessage('Intervención actualizada exitosamente');
        } catch (error) {
            console.error('Error al actualizar intervención:', error);
            setSnackbarMessage('Error al actualizar intervención');
            setOpenSnackbar(true);
        }
    };

    if (isLoading) {
        return <Typography>Cargando...</Typography>;
    }

    if (!intervention) {
        return <Typography>Intervención no encontrada</Typography>;
    }

    return (
        <StyledContainer>
            <Box display="flex" alignItems="center" mb={3}>
                <Tooltip title="Volver">
                    <IconButton onClick={() => navigate(`/students/${id}`)} color="primary">
                        <ArrowBackIcon />
                    </IconButton>
                </Tooltip>
                <Typography variant="h4" component="h1" ml={2}>
                    Detalles de la Intervención
                </Typography>
                {isAdmin && !isEditing && (
                    <Tooltip title="Editar">
                        <IconButton onClick={() => setIsEditing(true)} color="primary" sx={{ ml: 'auto' }}>
                            <EditIcon />
                        </IconButton>
                    </Tooltip>
                )}
            </Box>
            <StyledCard>
                <CardContent>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                {isEditing ? (
                                    <TextField
                                        label="Título"
                                        name="title"
                                        value={intervention.title}
                                        onChange={handleChange}
                                        fullWidth
                                        required
                                        variant="outlined"
                                    />
                                ) : (
                                    <Typography variant="h5" gutterBottom color="primary">{intervention.title}</Typography>
                                )}
                            </Grid>
                            <Grid item xs={12}>
                                {isEditing ? (
                                    <TextField
                                        label="Descripción"
                                        name="description"
                                        value={intervention.description}
                                        onChange={handleChange}
                                        fullWidth
                                        multiline
                                        rows={4}
                                        required
                                        variant="outlined"
                                    />
                                ) : (
                                    <Paper elevation={0} sx={{ p: 2, bgcolor: 'background.default' }}>
                                        <Typography variant="body1">{intervention.description}</Typography>
                                    </Paper>
                                )}
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoItem>
                                    <CategoryIcon />
                                    {isEditing ? (
                                        <FormControl fullWidth>
                                            <InputLabel>Categoría</InputLabel>
                                            <Select
                                                name="category"
                                                value={intervention.category}
                                                onChange={handleChange}
                                                label="Categoría"
                                            >
                                                {categories.map((category) => (
                                                    <MenuItem key={category} value={category}>
                                                        {category}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <Typography variant="body2"><strong>Categoría:</strong> {intervention.category}</Typography>
                                    )}
                                </InfoItem>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoItem>
                                    <AssignmentIndIcon />
                                    {isEditing ? (
                                        <TextField
                                            label="Asignado a"
                                            name="assignedTo"
                                            value={intervention.assignedTo}
                                            onChange={handleChange}
                                            fullWidth
                                            variant="outlined"
                                        />
                                    ) : (
                                        <Typography variant="body2"><strong>Asignado a:</strong> {intervention.assignedTo}</Typography>
                                    )}
                                </InfoItem>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoItem>
                                    <FlagIcon />
                                    {isEditing ? (
                                        <FormControl fullWidth>
                                            <InputLabel>Prioridad</InputLabel>
                                            <Select
                                                name="priority"
                                                value={intervention.priority}
                                                onChange={handleChange}
                                                label="Prioridad"
                                            >
                                                {priorities.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <Chip label={`Prioridad: ${intervention.priority}`} color="primary" variant="outlined" />
                                    )}
                                </InfoItem>
                            </Grid>
                            <Grid item xs={12} md={6}>
                                <InfoItem>
                                    <EventIcon />
                                    {isEditing ? (
                                        <FormControl fullWidth>
                                            <InputLabel>Estado</InputLabel>
                                            <Select
                                                name="status"
                                                value={intervention.status}
                                                onChange={handleChange}
                                                label="Estado"
                                            >
                                                {statuses.map((option) => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    ) : (
                                        <Chip label={`Estado: ${intervention.status}`} color="secondary" variant="outlined" />
                                    )}
                                </InfoItem>
                            </Grid>
                            <Grid item xs={12}>
                                <InfoItem>
                                    <UpdateIcon />
                                    <Box>
                                        <Typography variant="body2"><strong>Creado:</strong> {new Date(intervention.createdAt).toLocaleString()}</Typography>
                                        <Typography variant="body2"><strong>Última actualización:</strong> {new Date(intervention.updatedAt).toLocaleString()} por {intervention.updatedBy}</Typography>
                                    </Box>
                                </InfoItem>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>Archivos adjuntos</Typography>
                                <Box display="flex" flexWrap="wrap" gap={1}>
                                    {intervention.files.map((file, index) => (
                                        <Chip
                                            key={index}
                                            label={file.name}
                                            onClick={() => window.open(file.url, '_blank')}
                                            onDelete={isEditing ? () => {/* Lógica para eliminar archivo */} : undefined}
                                            variant="outlined"
                                        />
                                    ))}
                                </Box>
                                {isEditing && (
                                    <Box mt={2}>
                                        <label htmlFor="intervention-file-input">
                                            <Button
                                                variant="outlined"
                                                component="span"
                                                startIcon={<AttachFileIcon />}
                                            >
                                                Adjuntar archivos
                                            </Button>
                                            <FileInput
                                                id="intervention-file-input"
                                                type="file"
                                                inputProps={{ multiple: true }}
                                                onChange={handleFileChange}
                                            />
                                        </label>
                                    </Box>
                                )}
                            </Grid>
                        </Grid>
                        {isEditing && (
                            <Box mt={3} display="flex" justifyContent="flex-end">
                                <Button onClick={() => setIsEditing(false)} sx={{ mr: 1 }}>
                                    Cancelar
                                </Button>
                                <Button type="submit" color="primary" variant="contained">
                                    Guardar Cambios
                                </Button>
                            </Box>
                        )}
                    </form>
                </CardContent>
            </StyledCard>

            <StyledCard sx={{ mt: 3 }}>
                <CardHeader title="Historial de Comentarios" />
                <CardContent>
                    <List>
                        {comments.map((comment, index) => (
                            <StyledAccordion key={comment.id}>
                                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                    <Typography><strong>{comment.author}</strong> - {new Date(comment.date).toLocaleString()}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography dangerouslySetInnerHTML={{ __html: comment.text }} />
                                    {comment.files.length > 0 && (
                                        <Box mt={1}>
                                            <Typography variant="subtitle2">Archivos adjuntos:</Typography>
                                            <Box display="flex" flexWrap="wrap" gap={1}>
                                                {comment.files.map((file, fileIndex) => (
                                                    <Chip
                                                        key={fileIndex}
                                                        label={file.name}
                                                        onClick={() => window.open(file.url, '_blank')}
                                                        variant="outlined"
                                                        size="small"
                                                    />
                                                ))}
                                            </Box>
                                        </Box>
                                    )}
                                </AccordionDetails>
                            </StyledAccordion>
                        ))}
                    </List>
                </CardContent>
                <CardActions>
                    <Box width="100%">
                        <ReactQuill 
                            value={newComment}
                            onChange={setNewComment}
                            style={{ marginBottom: '10px' }}
                        />
                        <Box display="flex" alignItems="center" justifyContent="space-between">
                            <Box>
                                <label htmlFor="comment-file-input">
                                    <Button
                                        variant="outlined"
                                        component="span"
                                        startIcon={<AttachFileIcon />}
                                    >
                                        Adjuntar
                                    </Button>
                                </label>
                                <FileInput
                                    id="comment-file-input"
                                    type="file"
                                    inputProps={{ multiple: true }}
                                    onChange={handleFileChange}
                                />
                            </Box>
                            <Box display="flex" flexWrap="wrap" gap={1}>
                                {newCommentFiles.map((file, index) => (
                                    <Chip
                                        key={index}
                                        label={file.name}
                                        onDelete={() => {
                                            const newFiles = [...newCommentFiles];
                                            newFiles.splice(index, 1);
                                            setNewCommentFiles(newFiles);
                                        }}
                                        variant="outlined"
                                        size="small"
                                    />
                                ))}
                            </Box>
                            <Button
                                variant="contained"
                                color="primary"
                                endIcon={<SendIcon />}
                                onClick={sendComment}
                            >
                                Enviar
                            </Button>
                        </Box>
                    </Box>
                </CardActions>
            </StyledCard>

            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
                <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </StyledContainer>
    );
};

export default EditIntervention;
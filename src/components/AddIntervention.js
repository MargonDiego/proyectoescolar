import React, { useState, useContext } from 'react';
import {
  Container, Typography, TextField, Button, Paper, MenuItem, Input, Box, Grid, List, ListItem, ListItemText, ListItemAvatar, Avatar, Divider
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const AddIntervention = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [intervention, setIntervention] = useState({
    title: '',
    description: '',
    assignedTo: '',
    priority: 'Medium',
    files: [],
    status: 'Started',
    createdBy: user?.name || 'Unknown',
  });

  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['Started', 'In Progress', 'Resolved', 'Closed'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntervention({ ...intervention, [name]: value });
  };

  const handleFileChange = (e) => {
    setIntervention({ ...intervention, files: [...intervention.files, ...e.target.files] });
  };

  const sendComment = () => {
    if (newComment.trim()) {
      const comment = {
        text: newComment,
        author: user?.name || 'Unknown', // Reemplazar con el usuario real
        date: new Date().toISOString()
      };
      setComments([...comments, comment]);
      setNewComment('');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Intervención añadida:', intervention);
    console.log('Comentarios:', comments);
    // Lógica para guardar la intervención en el backend
    navigate(`/students/${id}`);
  };

  return (
    <Container>
      <Paper elevation={3} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          {intervention.title || 'Nueva Intervención'}
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Título"
                name="title"
                value={intervention.title}
                onChange={handleChange}
                fullWidth
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                label="Descripción"
                name="description"
                value={intervention.description}
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
                name="assignedTo"
                value={intervention.assignedTo}
                onChange={handleChange}
                fullWidth
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Prioridad"
                name="priority"
                value={intervention.priority}
                onChange={handleChange}
                fullWidth
              >
                {priorities.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                select
                label="Estado"
                name="status"
                value={intervention.status}
                onChange={handleChange}
                fullWidth
              >
                {statuses.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
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
                Archivos adjuntos: {intervention.files.length}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="h6">Comentarios</Typography>
              <List>
                {comments.map((comment, index) => (
                  <React.Fragment key={index}>
                    <ListItem alignItems="flex-start">
                      <ListItemAvatar>
                        <Avatar>{comment.author[0]}</Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={comment.author}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="textPrimary">
                              {new Date(comment.date).toLocaleString()}
                            </Typography>
                            {" — " + comment.text}
                          </>
                        }
                      />
                    </ListItem>
                    {index < comments.length - 1 && <Divider variant="inset" component="li" />}
                  </React.Fragment>
                ))}
              </List>
              <TextField
                label="Añadir comentario"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
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

export default AddIntervention;

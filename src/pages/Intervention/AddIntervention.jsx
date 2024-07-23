import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import {
  Container, Typography, TextField, Button, MenuItem, Box, List, ListItem, ListItemText, 
  ListItemAvatar, Avatar, Divider, Chip, IconButton, Tooltip, Snackbar, Alert, Card, CardContent, Stepper, 
  Step, StepLabel, StepContent
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext/AuthContext';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import SendIcon from '@mui/icons-material/Send';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const StyledContainer = styled(Container)(({ theme }) => ({
  marginTop: theme.spacing(4),
  marginBottom: theme.spacing(4),
}));

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '16px',
  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
  background: 'linear-gradient(to right bottom, #ffffff, #f8f9fa)',
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const FileInput = styled('input')({
  display: 'none',
});

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
  const [activeStep, setActiveStep] = useState(0);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');

  const priorities = ['Low', 'Medium', 'High'];
  const statuses = ['Started', 'In Progress', 'Resolved', 'Closed'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setIntervention({ ...intervention, [name]: value });
  };

  const handleFileChange = (e) => {
    setIntervention({ ...intervention, files: [...intervention.files, ...e.target.files] });
  };

  const removeFile = (index) => {
    const newFiles = [...intervention.files];
    newFiles.splice(index, 1);
    setIntervention({ ...intervention, files: newFiles });
  };

  const sendComment = () => {
    if (newComment.trim()) {
      const comment = {
        text: newComment,
        author: user?.name || 'Unknown',
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
    setOpenSnackbar(true);
    setSnackbarMessage('Intervención guardada exitosamente');
    // Aquí debería ir la lógica para guardar la intervención en el backend
    setTimeout(() => navigate(`/students/${id}`), 2000);
  };

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const steps = [
    {
      label: 'Información básica',
      content: (
        <>
          <StyledTextField
            label="Título"
            name="title"
            value={intervention.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />
          <StyledTextField
            label="Descripción"
            name="description"
            value={intervention.description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={4}
            required
            margin="normal"
          />
        </>
      ),
    },
    {
      label: 'Detalles de la intervención',
      content: (
        <>
          <StyledTextField
            label="Asignado a"
            name="assignedTo"
            value={intervention.assignedTo}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <StyledTextField
            select
            label="Prioridad"
            name="priority"
            value={intervention.priority}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {priorities.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </StyledTextField>
          <StyledTextField
            select
            label="Estado"
            name="status"
            value={intervention.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            {statuses.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </StyledTextField>
        </>
      ),
    },
    {
      label: 'Archivos y comentarios',
      content: (
        <>
          <Box mb={2}>
            <label htmlFor="file-input">
              <Button
                variant="outlined"
                component="span"
                startIcon={<AttachFileIcon />}
              >
                Adjuntar archivos
              </Button>
            </label>
            <FileInput
              id="file-input"
              type="file"
              inputProps={{ multiple: true }}
              onChange={handleFileChange}
            />
          </Box>
          <Box mb={2}>
            {intervention.files.map((file, index) => (
              <Chip
                key={index}
                label={file.name}
                onDelete={() => removeFile(index)}
                variant="outlined"
                style={{ margin: '4px' }}
              />
            ))}
          </Box>
          <Typography variant="h6" gutterBottom>Comentarios</Typography>
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
          <Box display="flex" alignItems="center">
            <StyledTextField
              label="Añadir comentario"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              fullWidth
              multiline
              rows={2}
              margin="normal"
            />
            <IconButton onClick={sendComment} color="primary">
              <SendIcon />
            </IconButton>
          </Box>
        </>
      ),
    },
  ];

  return (
    <StyledContainer>
      <Box display="flex" alignItems="center" mb={3}>
        <Tooltip title="Volver">
          <IconButton onClick={() => navigate(`/students/${id}`)} color="primary">
            <ArrowBackIcon />
          </IconButton>
        </Tooltip>
        <Typography variant="h4" component="h1" ml={2}>
          Nueva Intervención
        </Typography>
      </Box>
      <StyledCard>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <Stepper activeStep={activeStep} orientation="vertical">
              {steps.map((step, index) => (
                <Step key={step.label}>
                  <StepLabel>{step.label}</StepLabel>
                  <StepContent>
                    {step.content}
                    <Box sx={{ mb: 2 }}>
                      <div>
                        <Button
                          disabled={index === 0}
                          onClick={handleBack}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          Atrás
                        </Button>
                        <Button
                          variant="contained"
                          onClick={index === steps.length - 1 ? handleSubmit : handleNext}
                          sx={{ mt: 1, mr: 1 }}
                        >
                          {index === steps.length - 1 ? 'Guardar Intervención' : 'Siguiente'}
                        </Button>
                      </div>
                    </Box>
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </form>
        </CardContent>
      </StyledCard>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => setOpenSnackbar(false)}>
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </StyledContainer>
  );
};

export default AddIntervention;
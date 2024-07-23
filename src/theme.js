// src/theme.js
import { createTheme } from '@mui/material/styles';

const lightTheme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#5e0b15',
    },
    secondary: {
      main: '#90323d',
    },
    background: {
      default: '#d9cab3',
      paper: '#bc8034',
    },
    text: {
      primary: '#5e0b15', // Ajustar para mejorar contraste
      secondary: '#90323d', // Ajustar para mejorar contraste
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#0d0630',
    },
    secondary: {
      main: '#18314f',
    },
    background: {
      default: '#384e77',
      paper: '#8bbeb2',
    },
    text: {
      primary: '#e6f9af',
      secondary: '#8bbeb2',
    },
  },
  typography: {
    fontFamily: '"Open Sans", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export { lightTheme, darkTheme };

import React, { useState, useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, Box, IconButton } from '@mui/material';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { lightTheme, darkTheme } from './theme';
import Auth from './pages/Auth/Auth';
import NavBar from './components/layout/NavBar/NavBar';
import Dashboard from './pages/Dashboard/Dashboard';
import Profile from './pages/Profile/Profile';
import StudentList from './pages/Student/StudentList';
import AddStudent from './pages/Student/AddStudent';
import EditStudent from './pages/Student/EditStudent';
import ViewStudent from './pages/Student/ViewStudent';
import AddIntervention from './pages/Intervention/AddIntervention';
import EditIntervention from './pages/Intervention/EditIntervention';
import UserManagement from './pages/UserManagement/UserManagement';
import { AuthContext } from './contexts/AuthContext/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext/NotificationContext';

const navBarHeight = 64;

const AppContent = ({ toggleTheme, theme }) => {
    const { user } = useContext(AuthContext);

    return (
        <Box sx={{ backgroundColor: 'background.default', minHeight: '100vh' }}>
            <CssBaseline />
            {user && <NavBar />}
            <Box sx={{ pt: `${navBarHeight}px` }}>
                <IconButton sx={{ ml: 1 }} onClick={toggleTheme} color="inherit">
                    {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                </IconButton>
                <Routes>
                    <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
                    <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                    <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
                    <Route path="/students" element={user ? <StudentList /> : <Navigate to="/" />} />
                    <Route path="/students/add" element={user && (user.role === 'admin' || user.role === 'usuario') ? <AddStudent /> : <Navigate to="/" />} />
                    <Route path="/students/edit/:id" element={user && (user.role === 'admin' || user.role === 'usuario') ? <EditStudent /> : <Navigate to="/" />} />
                    <Route path="/students/:id" element={user ? <ViewStudent /> : <Navigate to="/" />} />
                    <Route path="/students/:id/AddIntervention" element={user && (user.role === 'admin' || user.role === 'usuario') ? <AddIntervention /> : <Navigate to="/" />} />
                    <Route path="/students/:id/EditIntervention/:interventionId" element={user && (user.role === 'admin' || user.role === 'usuario') ? <EditIntervention /> : <Navigate to="/" />} />
                    <Route path="/users" element={user && user.role === 'admin' ? <UserManagement /> : <Navigate to="/" />} />
                </Routes>
            </Box>
        </Box>
    );
};

const App = () => {
    const [theme, setTheme] = useState(lightTheme);

    const toggleTheme = () => {
        setTheme(prevTheme => prevTheme === lightTheme ? darkTheme : lightTheme);
    };

    return (
        <MuiThemeProvider theme={theme}>
            <StyledThemeProvider theme={theme}>
                <NotificationProvider>
                    <AppContent toggleTheme={toggleTheme} theme={theme} />
                </NotificationProvider>
            </StyledThemeProvider>
        </MuiThemeProvider>
    );
};

export default App;
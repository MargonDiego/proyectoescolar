// src/App.js

import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { CssBaseline, Box } from '@mui/material';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import StudentList from './components/StudentList';
import AddStudent from './components/AddStudent';
import EditStudent from './components/EditStudent';
import ViewStudent from './components/ViewStudent';
import AddIntervention from './components/AddIntervention';
import EditIntervention from './components/EditIntervention';
import UserManagement from './components/UserManagement';
import { AuthContext } from './context/AuthContext';

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <Box sx={{ backgroundColor: '#ced4da', minHeight: '100vh' }}>
            <CssBaseline />
            {user && <NavBar />}
            <Routes>
                {/* Ruta para la página de autenticación */}
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
                
                {/* Ruta para el dashboard, visible solo para usuarios autenticados */}
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                
                {/* Ruta para el perfil del usuario, visible solo para usuarios autenticados */}
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
                
                {/* Ruta para la lista de estudiantes, visible solo para usuarios autenticados */}
                <Route path="/students" element={user ? <StudentList /> : <Navigate to="/" />} />
                
                {/* Ruta para añadir un estudiante, visible solo para administradores y usuarios */}
                <Route path="/students/add" element={user && (user.role === 'admin' || user.role === 'usuario') ? <AddStudent /> : <Navigate to="/" />} />
                
                {/* Ruta para editar un estudiante, visible solo para administradores y usuarios */}
                <Route path="/students/edit/:id" element={user && (user.role === 'admin' || user.role === 'usuario') ? <EditStudent /> : <Navigate to="/" />} />
                
                {/* Ruta para ver el perfil de un estudiante, visible solo para usuarios autenticados */}
                <Route path="/students/:id" element={user ? <ViewStudent /> : <Navigate to="/" />} />
                
                {/* Ruta para añadir una intervención, visible solo para administradores y usuarios */}
                <Route path="/students/:id/add-intervention" element={user && (user.role === 'admin' || user.role === 'usuario') ? <AddIntervention /> : <Navigate to="/" />} />
                
                {/* Ruta para editar una intervención, visible solo para administradores y usuarios */}
                <Route path="/students/:id/edit-intervention/:interventionId" element={user && (user.role === 'admin' || user.role === 'usuario') ? <EditIntervention /> : <Navigate to="/" />} />
                
                {/* Ruta para la gestión de usuarios, visible solo para administradores */}
                <Route path="/users" element={user && user.role === 'admin' ? <UserManagement /> : <Navigate to="/" />} />
            </Routes>
        </Box>
    );
};

export default App;

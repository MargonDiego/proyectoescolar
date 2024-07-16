// src/App.js
import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
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
        <div>
            {user && <NavBar />}
            <Routes>
                <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Auth />} />
                <Route path="/dashboard" element={user ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/profile" element={user ? <Profile /> : <Navigate to="/" />} />
                <Route path="/students" element={user ? <StudentList /> : <Navigate to="/" />} />
                <Route path="/students/add" element={user && (user.role === 'admin' || user.role === 'usuario') ? <AddStudent /> : <Navigate to="/" />} />
                <Route path="/students/edit/:id" element={user && (user.role === 'admin' || user.role === 'usuario') ? <EditStudent /> : <Navigate to="/" />} />
                <Route path="/students/:id" element={user ? <ViewStudent /> : <Navigate to="/" />} />
                <Route path="/students/:id/add-intervention" element={user && (user.role === 'admin' || user.role === 'usuario') ? <AddIntervention /> : <Navigate to="/" />} />
                <Route path="/students/:id/edit-intervention/:interventionId" element={user && (user.role === 'admin' || user.role === 'usuario') ? <EditIntervention /> : <Navigate to="/" />} />
                <Route path="/users" element={user && user.role === 'admin' ? <UserManagement /> : <Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default App;

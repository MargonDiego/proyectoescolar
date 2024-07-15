import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import NavBar from './components/NavBar';
import Dashboard from './components/Dashboard';
import Profile from './components/Profile';
import FichaList from './components/FichaList';
import AddFichaClinica from './components/AddFichaClinica';
import EditFichaClinica from './components/EditFichaClinica';
import ViewFichaClinica from './components/ViewFichaClinica';
import AddIntervention from './components/AddIntervention';
import EditIntervention from './components/EditIntervention';
import ViewInterventions from './components/ViewInterventions';
import { AuthContext } from './context/AuthContext';

const App = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            {isAuthenticated && <NavBar />}
            <Routes>
                <Route path="/" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Auth />} />
                <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/" />} />
                <Route path="/profile" element={isAuthenticated ? <Profile /> : <Navigate to="/" />} />
                <Route path="/fichas" element={isAuthenticated ? <FichaList /> : <Navigate to="/" />} />
                <Route path="/fichas/add" element={isAuthenticated ? <AddFichaClinica /> : <Navigate to="/" />} />
                <Route path="/fichas/edit/:id" element={isAuthenticated ? <EditFichaClinica /> : <Navigate to="/" />} />
                <Route path="/fichas/:id" element={isAuthenticated ? <ViewFichaClinica /> : <Navigate to="/" />} />
                <Route path="/fichas/:id/add-intervention" element={isAuthenticated ? <AddIntervention /> : <Navigate to="/" />} />
                <Route path="/fichas/:id/edit-intervention/:interventionId" element={isAuthenticated ? <EditIntervention /> : <Navigate to="/" />} />
                <Route path="/fichas/:id/view-interventions" element={isAuthenticated ? <ViewInterventions /> : <Navigate to="/" />} />
            </Routes>
        </div>
    );
};

export default App;

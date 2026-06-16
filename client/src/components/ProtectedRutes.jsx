// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UseAuth } from '../context/AuthContext';
import { Box, CircularProgress } from '@mui/material';

const ProtectedRoute = ({ allowedRoles }) => {
    const { isAuthenticated, role, loading } = UseAuth();

    // Mientras Firebase y Firestore responden, mostramos una pantalla de carga limpia de MUI
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    // Si no está logueado, al login
    if (!isAuthenticated) {
        return <Navigate to='/login' replace />;
    }

    // Si su rol no está dentro de los permitidos para esta ruta, lo mandamos a una página de acceso denegado o a su dashboard base
    if (allowedRoles && !allowedRoles.includes(role)) {
        return <Navigate to='/unauthorized' replace />;
    }

    // Si todo está en orden, renderiza los componentes hijos (vistas protegidas)
    return <Outlet />;
};

export default ProtectedRoute;

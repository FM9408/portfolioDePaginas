// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRutes'; // Mantengo tu typo exacto
import { UseAuth } from '../context/AuthContext.jsx';

// Componentes de tu app
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import SignUpPage from '../pages/SignupPage';
import Settings from '../pages/Settings';
import AdminDashboard from '../pages/Admin/Admindashboard.jsx';

const AppRoutes = () => {
    const { isAuthenticated, role, loading } = UseAuth();

    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '100vh',
                    bgcolor: 'background.default',
                }}
            >
                <CircularProgress color='primary' />
            </Box>
        );
    }

    return (
        <Routes>
            {/* ================= RUTAS GENERALES (PÚBLICAS) ================= */}
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUpPage />} />


            {/* ================= RUTAS PROTEGIDAS (USUARIOS NORMALES) ================= */}
            <Route
                element={
                    <ProtectedRoute
                        isAllowed={isAuthenticated}
                        redirectTo='/login'
                    />
                }
            >
                {/* 🔴 LA SOLUCIÓN AQUÍ: 
                  Si el formulario te manda a /dashboard pero eres admin, 
                  esta condicional te redirige de inmediato a la ruta correcta sin romper nada.
                */}
                <Route
                    path='/dashboard'
                    element={
                        role === 'admin' ?
                            <Navigate to='/admin/dashboard' replace />
                        :   <Dashboard />
                    }
                />
                <Route path='/settings' element={<Settings />} />
            </Route>

            {/* ================= RUTAS PROTEGIDAS (SÓLO ADMINISTRADORES) ================= */}
            <Route
                element={
                    <ProtectedRoute
                        isAllowed={isAuthenticated && role === 'admin'}
                        redirectTo='/dashboard'
                    />
                }
            >
                <Route path='/admin/dashboard' element={<AdminDashboard />} />
            </Route>

            {/* Ruta para manejar el error 404 Not Found */}
            <Route path='*' element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
};

export default AppRoutes;

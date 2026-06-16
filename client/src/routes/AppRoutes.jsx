// src/routes/AppRoutes.jsx
import { Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress } from '@mui/material';
import ProtectedRoute from '../components/ProtectedRutes'; // Mantengo tu typo exacto
import { useSelector } from 'react-redux'
;import { UseAuth } from '../context/AuthContext.jsx';
// Componentes de tu app
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import SignUpPage from '../pages/SignupPage';
import Settings from '../pages/Settings';
import AdminDashboard from '../pages/Admin/Admindashboard.jsx';

const AppRoutes = () => {
    const { isAuthenticated, role, loading } = UseAuth();
    const {user} = useSelector((state) => state.userAuth);

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
            <Route path='/' element={<LandingPage />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<SignUpPage />} />


            {/* ================= RUTAS PROTEGIDAS (USUARIOS NORMALES) ================= */}
            <Route
                element={
                    <ProtectedRoute
                        isAllowed={isAuthenticated}
                       
                    />
                }
            >
                {/* 🔴 LA SOLUCIÓN AQUÍ: 
                  Si el formulario te manda a /dashboard pero eres admin, 
                  esta condicional te redirige de inmediato a la ruta correcta sin romper nada.
                */}
                <Route
                    path='/:userId/dashboard'
                    element={
                        role === 'admin' ?
                            <Navigate to={`/${user.uid}/admin/dashboard`} replace />
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
                        redirectTo={`/${user.uid}/admin/dashboard`}                    />
                }
            >
                <Route path='/:userId/admin/dashboard' element={<AdminDashboard />} />
            </Route>

            {/* Ruta para manejar el error 404 Not Found */}
            <Route path='*' element={<h1>404 - Página no encontrada</h1>} />
        </Routes>
    );
};

export default AppRoutes;

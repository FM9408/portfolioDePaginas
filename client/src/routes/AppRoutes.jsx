// src/routes/AppRoutes.jsx
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRutes';
import { AuthProvider } from '../context/AuthContext';

// Componentes ejemplo de tu app
import Home from '../pages/Home';
import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import Settings from '../pages/Settings';

const AppRoutes = () => {
    // Simulamos un estado de sesión (cámbialo por tu lógica real de auth)
    const isAuthenticated = true;

    return (
        <AuthProvider>
            <BrowserRouter>
                <Routes>
                    {/* ================= RUTAS GENERALES (PÚBLICAS) ================= */}
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />

                    {/* ================= RUTAS PROTEGIDAS (PRIVADAS) ================= */}
                    {/* Envolvemos las rutas privadas con nuestro componente guardián */}
                    <Route
                        element={
                            <ProtectedRoute
                                isAllowed={isAuthenticated}
                                redirectTo='/login'
                            />
                        }
                    >
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path='/settings' element={<Settings />} />
                    </Route>

                    {/* Ruta para manejar el error 404 Not Found */}
                    <Route
                        path='*'
                        element={<h1>404 - Página no encontrada</h1>}
                    />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    );
};

export default AppRoutes;

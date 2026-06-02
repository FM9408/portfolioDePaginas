// src/components/ProtectedRoute.jsx
import { Navigate, Outlet } from 'react-router-dom';

const ProtectedRoute = ({ isAllowed, redirectTo = '/login' }) => {
    // Si la condición de autenticación no se cumple, redirige al usuario
    if (!isAllowed) {
        return <Navigate to={redirectTo} replace />;
    }

    // Si está permitido, renderiza los componentes hijos declarados en el router
    return <Outlet />;
};

export default ProtectedRoute;

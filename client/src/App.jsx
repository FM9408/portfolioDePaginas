import React from 'react';
import AppRoutes from './routes/AppRoutes';
// O como se llame tu proveedor
import './App.css';
import Navbar from './components/Navbar';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';

function App() {
    const { user } = useSelector((state) => state.userAuth);

    const navigate = useNavigate();

    React.useEffect(() => {
        // Si ya hay sesión iniciada de antes, dejamos que el router decida dónde colocarlo
        if (user.uid !== '' && user.uid !== undefined) {
            if (user.role === 'admin') {
                navigate(`/${user.uid}/admin/dashboard`, { replace: true });
            } else {
                navigate(`/${user.uid}/dashboard`, { replace: true });
            }
        } else if(globalThis.location.pathname.endsWith("/dashboard") || globalThis.location.pathname.endsWith("/admin/dashboard")) {
            navigate("/", { replace: true });
        }
    }, [user, navigate]);

    return (
        <Box
            sx={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                overflow: 'hidden',
            }}
        >
            <Navbar />
            <AppRoutes />
        </Box>
    );
}

export default App;

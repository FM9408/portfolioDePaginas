// src/pages/Login/index.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../../components/LogIn.jsx';
import { Container, Box } from '@mui/material';
import { UseAuth } from '../../context/AuthContext';

export default function Login() {
    const { role, user, loading } = UseAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loading) return;

        // Si ya hay sesión iniciada de antes, dejamos que el router decida dónde colocarlo
        if (user) {
            if (role === 'admin') {
                navigate('/admin/dashboard', { replace: true });
            } else {
                navigate('/dashboard', { replace: true });
            }
        }
    }, [role, user, loading, navigate]);

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 4 }}>
                <LogInForm />
            </Box>
        </Container>
    );
}

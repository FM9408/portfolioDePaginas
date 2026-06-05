import React from 'react';
import { useNavigate } from 'react-router-dom';
import LogInForm from '../../components/Login';
import { Container, Box } from '@mui/material';
import { UseAuth } from '../../context/AuthContext';

export default function Login() {
    const { user, loading } = UseAuth();
    const navigate = useNavigate();

    React.useEffect(() => {
        if (!loading && user) {
            // Si el usuario ya está autenticado, redirige al dashboard
            navigate('/dashboard');
        }
    }, [loading, user, navigate]);

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 4 }}>
                <LogInForm />
            </Box>
        </Container>
    );
}

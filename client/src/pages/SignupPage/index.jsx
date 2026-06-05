// src/pages/SignUpPage.jsx
import React from 'react';
import { Container, Box, Divider, Typography } from '@mui/material';
import { RegisterForm } from '../../components/RegisterForm';
import { GoogleLoginButton } from '../../components/GoogleLoginButton';
import { UseAuth } from '../../context/AuthContext'; //

export default function SignUpPage() {
    const { isAnonymous, user } = UseAuth(); //

    return (
        <Container maxWidth='xs' sx={{ mt: 8, mb: 4 }}>
            {/* Formulario de Registro */}
            <RegisterForm />

            {/* Separador visual de Material UI */}
            <Box sx={{ my: 3, display: 'flex', alignItems: 'center', px: 4 }}>
                <Divider sx={{ flexGrow: 1 }} />
                <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ px: 2 }}
                >
                    O CONTINÚA CON
                </Typography>
                <Divider sx={{ flexGrow: 1 }} />
            </Box>

            {/* Botón de Google */}
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
                <GoogleLoginButton />
            </Box>

            {/* Panel de Depuración en Entorno de Desarrollo */}
            {import.meta.env.DEV && user && (
                <Box
                    sx={{
                        mt: 4,
                        p: 2,
                        bgcolor: '#f5f5f5',
                        borderRadius: 1,
                        border: '1px dashed #ccc',
                    }}
                >
                    <Typography
                        variant='caption'
                        display='block'
                        color='text.secondary'
                        align='center'
                    >
                        <strong>Modo Dev (Estado de Auth):</strong>
                    </Typography>
                    <Typography
                        variant='caption'
                        display='block'
                        color='text.secondary'
                        align='center'
                        sx={{ fontFamily: 'monospace' }}
                    >
                        UID Actual: {user.uid}
                    </Typography>
                    <Typography
                        variant='caption'
                        display='block'
                        color={isAnonymous ? 'warning.main' : 'success.main'}
                        align='center'
                        sx={{ fontWeight: 'bold' }}
                    >
                        Tipo de Sesión:{' '}
                        {isAnonymous ?
                            'Anónima (Temporal)'
                        :   'Cuenta Vinculada (Real)'}
                    </Typography>
                </Box>
            )}
        </Container>
    );
}

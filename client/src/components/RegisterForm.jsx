// src/components/RegisterForm.jsx
import React, { useState } from 'react';
import {
    TextField,
    Button,
    Box,
    Typography,
    Alert,
    Paper,
    IconButton,
} from '@mui/material';
import { UseAuth } from '../context/AuthContext';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


export function RegisterForm() {
    const { registerAndLinkAccount } = UseAuth();
    const [showPassword, setShowPassword] = useState(false);
    // NUEVO: Estado para almacenar el username
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
 const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const handleMouseUpPassword = (event) => {
        event.preventDefault();
    };
    const [errors, setErrors] = useState({});
    const [firebaseError, setFirebaseError] = useState('');
    const [success, setSuccess] = useState(false);

    const validateForm = () => {
        const tempErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Validación local del username
        if (!username)
            tempErrors.username = 'El nombre de usuario es obligatorio';
        else if (username.length < 3)
            tempErrors.username = 'Debe tener al menos 3 caracteres';

        if (!email) tempErrors.email = 'El correo es obligatorio';
        else if (!emailRegex.test(email))
            tempErrors.email = 'El formato de correo no es válido';

        if (!password) tempErrors.password = 'La contraseña es obligatoria';
        else if (password.length < 6)
            tempErrors.password = 'Debe tener al menos 6 caracteres';

        if (password !== confirmPassword)
            tempErrors.confirmPassword = 'Las contraseñas no coinciden';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFirebaseError('');
        setSuccess(false);

        if (!validateForm()) return;

        try {
            // Enviamos los 3 campos al contexto
            await registerAndLinkAccount(email, password, username);
            setSuccess(true);
            setUsername('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
        } catch (error) {
            console.error('Error capturado:', error);

            // Interceptamos de forma segura los errores devueltos por la Cloud Function u Auth
            const errorCode = error?.code || '';
            const errorMessage = error?.message || '';

            if (
                errorCode === 'functions/already-exists' ||
                errorMessage.includes('ya está ocupado')
            ) {
                setFirebaseError(
                    'Ese nombre de usuario ya está registrado. Elige otro.'
                );
            } else if (errorCode === 'auth/email-already-in-use') {
                setFirebaseError(
                    'Este correo electrónico ya está registrado en otra cuenta.'
                );
            } else {
                setFirebaseError(
                    errorMessage || 'Ocurrió un error al procesar el registro.'
                );
            }
        }
    };

    return (
        <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Typography
                variant='h5'
                component='h1'
                align='center'
                gutterBottom
                sx={{ fontWeight: 'bold' }}
            >
                Crear Cuenta
            </Typography>
            <Typography
                variant='body2'
                color='textSecondary'
                align='center'
                sx={{ mb: 3 }}
            >
                Tu progreso actual se guardará en tu nueva cuenta.
            </Typography>

            {firebaseError && (
                <Alert severity='error' sx={{ mb: 2 }}>
                    {firebaseError}
                </Alert>
            )}
            {success && (
                <Alert severity='success' sx={{ mb: 2 }}>
                    ¡Cuenta creada e integrada con éxito!
                </Alert>
            )}

            <Box component='form' onSubmit={handleSubmit} noValidate>
                {/* NUEVO: Campo para el Username */}
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    autoComplete='username'
                    id='username'
                    label='Username'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    error={!!errors.username}
                    helperText={errors.username}
                    autoFocus
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Correo Electrónico'
                    value={email}
                    autoComplete='email'
                    autoFocus
                    onChange={(e) => setEmail(e.target.value)}
                    error={!!errors.email}
                    helperText={errors.email}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    type={showPassword ? 'text' : 'password'}
                    id='password'
                    label='Contraseña'
                    autoComplete='new-password'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={!!errors.password}
                    helperText={errors.password}
                    slotProps={{
                        input: {
                            endAdornment: (
                                <IconButton
                                    aria-label={
                                        showPassword ? 'hide password' : (
                                            'display password'
                                        )
                                    }
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    onMouseUp={handleMouseUpPassword}
                                    edge='end'
                                >
                                    {
                                        showPassword ?
                                            <VisibilityOff />
                                            : 
                                                <Visibility />
                                     }
                                </IconButton>
                            ),
                        },
                    }}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    type='password'
                    id='confirmPassword'
                    label='Confirmar Contraseña'
                    autoComplete='new-password'
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword}
                />
                <Button
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{
                        mt: 3,
                        mb: 2,
                        p: 1.2,
                        fontWeight: 'bold',
                        textTransform: 'none',
                        bgcolor: '#1b5e20',
                    }}
                >
                    Completar Registro
                </Button>
            </Box>
        </Paper>
    );
}

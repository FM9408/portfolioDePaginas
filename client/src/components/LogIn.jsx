// src/components/Login.jsx
import { useState } from 'react';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import {
    Container,
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    CircularProgress,
} from '@mui/material';

const Login = () => {
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            // Aquí manejas la redirección o el estado global
            if (userCredential.user) {
                navigate('/dashboard'); // Redirige a la página de dashboard después del inicio de sesión
            }
            console.log('Inicio de sesión exitoso:', userCredential.user.email);
            setLoading(false);
        } catch (err) {
            console.error('Error de Firebase:', err.code);
            switch (err.code) {
                case 'auth/invalid-email':
                    setError('El formato del correo electrónico no es válido.');
                    break;
                case 'auth/user-disabled':
                    setError('Este usuario ha sido deshabilitado.');
                    break;
                case 'auth/invalid-credential':
                    setError(
                        'Credenciales incorrectas. Verifica tu correo y contraseña.'
                    );
                    break;
                default:
                    setError(
                        'Ocurrió un error inesperado. Inténtalo de nuevo.'
                    );
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        // Container limita el ancho máximo y centra el contenido horizontalmente
        <Container component='main' maxWidth='xs'>
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    padding: 4,
                    borderRadius: 2,
                    // Utiliza sombras y colores heredados del tema de MUI
                    boxShadow: 3,
                    backgroundColor: 'background.paper',
                }}
            >
                <Typography
                    component='h1'
                    variant='h5'
                    sx={{ mb: 3, fontWeight: 'bold' }}
                >
                    Iniciar Sesión
                </Typography>

                {error && (
                    <Alert severity='error' sx={{ width: '100%', mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box
                    component='form'
                    onSubmit={handleLogin}
                    noValidate
                    sx={{ width: '100%' }}
                >
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Correo Electrónico'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={loading}
                    />
                    <TextField
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Contraseña'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        disabled={loading}
                    />
                    <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary' // Se engancha automáticamente al color principal de tu ThemeProvider
                        disabled={loading}
                        sx={{ mt: 3, mb: 2, py: 1.25, fontWeight: 'bold' }}
                    >
                        {loading ?
                            <CircularProgress size={24} color='inherit' />
                        :   'Ingresar'}
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;

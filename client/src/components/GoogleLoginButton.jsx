import React from 'react';
import { IconButton } from '@mui/material';
import { UseAuth } from '../context/AuthContext'; //

export function GoogleLoginButton() {
    const { loginWithGoogle } = UseAuth(); //

    const handleLogin = async () => {
        try {
            const result = await loginWithGoogle();
            const user = result.user;
            console.log('¡Login exitoso con Google!', user.displayName);
        } catch (error) {
            console.error('Error al iniciar sesión con Google:', error.message);
        }
    };

    return (
        <IconButton
            onClick={handleLogin}
            aria-label='Iniciar sesión con Google'
            sx={{
                width: 50,
                height: 50,
                backgroundColor: '#ffffff',
                border: '1px solid #e0e0e0',
                boxShadow: '0px 2px 4px rgba(0,0,0,0.1)',
                transition: 'all 0.2s ease-in-out',
                '&:hover': {
                    backgroundColor: '#f8f9fa',
                    boxShadow: '0px 4px 8px rgba(0,0,0,0.15)',
                    transform: 'scale(1.04)', // Un pequeño efecto de escala al pasar el mouse
                },
            }}
        >
            {/* Logo oficial SVG de Google */}
            <svg
                xmlns='http://www.w3.org/2000/svg'
                width='24'
                height='24'
                viewBox='0 0 48 48'
            >
                <path
                    fill='#EA4335'
                    d='M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z'
                />
                <path
                    fill='#4285F4'
                    d='M46.5 24c0-1.55-.15-3.24-.47-4.77H24v9.03h12.75c-.55 2.97-2.22 5.5-4.73 7.18l7.35 5.69C43.68 37.56 46.5 31.46 46.5 24z'
                />
                <path
                    fill='#FBBC05'
                    d='M10.54 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.98-6.19z'
                />
                <path
                    fill='#34A853'
                    d='M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.35-5.69c-2.03 1.36-4.64 2.18-8.54 2.18-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z'
                />
            </svg>
        </IconButton>
    );
}

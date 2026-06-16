import { useState } from 'react';
import {
    AppBar,
    Box,
    Toolbar,
    IconButton,
    Typography,
    Menu,
    Container,
    Avatar,
    Button,
    Tooltip,
    MenuItem,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';
import AdbIcon from '@mui/icons-material/Adb';

// IMPORTA TU CONTEXTO AQUÍ
// (Ajusta la ruta de importación si es necesario para llegar a tu carpeta context)
import { UseAuth } from '../context/AuthContext';

const pages = ['Proyectos', 'Habilidades', 'Contacto'];

export default function Navbar() {
    const [anchorElNav, setAnchorElNav] = useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const navigate = useNavigate();
    // Traemos TODO el objeto del contexto de forma segura sin romper nada
    const authContextValues = UseAuth() || {};

    // Mapeo seguro: Si tus variables se llaman diferente, solo cámbialas aquí a la derecha:
    const user =
        authContextValues.user || authContextValues.currentUser || null;

    const logout =
        authContextValues.logout || (() => console.error('Falta logout'));

    const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget);
    const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget);
    const handleCloseNavMenu = () => setAnchorElNav(null);
    const handleCloseUserMenu = () => setAnchorElUser(null);
    const handleLoginClick = () => {
        navigate('/login'); // Redirige a la página de login (ajusta la ruta si es diferente)
    };
    const handleLogoutClick = async () => {
        try {
            await logout();
            navigate('/');
            handleCloseUserMenu();
        } catch (error) {
            console.error('Error al cerrar sesión:', error);
        }
    };

    return (
        <AppBar
            position='static'
            sx={{
                backgroundColor: '#1b5e20',
                height: '48px',
                justifyContent: 'center',
                boxShadow: 1,
            }}
        >
            <Container maxWidth='xl'>
                <Toolbar
                    disableGutters
                    sx={{
                        height: '48px',
                        minHeight: '48px !important',
                        padding: 0,
                    }}
                >
                    {/* LOGO ESCRITORIO */}
                    <AdbIcon
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            mr: 1,
                            fontSize: '1.1rem',
                        }}
                    />
                    <Typography
                        variant='subtitle2'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 3,
                            display: { xs: 'none', md: 'flex' },
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.15rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            lineHeight: 1,
                        }}
                    >
                        PORTFOLIO
                    </Typography>

                    {/* HAMBURGUESA MÓVIL */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'flex', md: 'none' },
                            alignItems: 'center',
                        }}
                    >
                        <IconButton
                            size='small'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                            sx={{ p: 0.5 }}
                        >
                            <MenuIcon fontSize='small' />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page}
                                    onClick={() => {
                                        handleCloseNavMenu();
                                        navigate(`/${page.toLowerCase()}`); // Redirige a la página correspondiente (ajusta la ruta si es diferente)
                                    }}
                                >
                                    <Typography sx={{ fontSize: '0.85rem' }}>
                                        {page}
                                    </Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* LOGO MÓVIL */}
                    <AdbIcon
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            mr: 1,
                            fontSize: '1.1rem',
                        }}
                    />
                    <Typography
                        variant='subtitle1'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            fontWeight: 700,
                            letterSpacing: '.15rem',
                            color: 'inherit',
                            textDecoration: 'none',
                            fontSize: '1rem',
                            lineHeight: 1,
                        }}
                    >
                        PORTFOLIO
                    </Typography>

                    {/* ENLACES ESCRITORIO */}
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: { xs: 'none', md: 'flex' },
                            height: '100%',
                            alignItems: 'center',
                            gap: 0.5,
                        }}
                    >
                        {pages.map((page) => (
                            <Button
                                key={page}
                                onClick={() => {
                                    handleCloseNavMenu();
                                    navigate(`/${page.toLowerCase()}`);
                                }}
                                sx={{
                                    color: 'white',
                                    fontSize: '0.8rem',
                                    textTransform: 'none',
                                    height: '32px',
                                    py: 0,
                                    px: 1.5,
                                }}
                            >
                                {page}
                            </Button>
                        ))}
                    </Box>

                    {/* SECCIÓN DEL USUARIO CONECTADA AL CONTEXTO */}
                    <Box
                        sx={{
                            flexGrow: 0,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        {user ?
                            <>
                                <Tooltip title='Opciones'>
                                    <IconButton
                                        onClick={handleOpenUserMenu}
                                        sx={{ p: 0 }}
                                    >
                                        <Avatar
                                            alt={user.displayName || 'User'}
                                            src={user.photoURL || ''}
                                            sx={{ width: 28, height: 28 }}
                                        />
                                    </IconButton>
                                </Tooltip>
                                <Menu
                                    sx={{ mt: '30px' }}
                                    id='menu-usuario'
                                    anchorEl={anchorElUser}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={Boolean(anchorElUser)}
                                    onClose={handleCloseUserMenu}
                                >
                                    <MenuItem disabled>
                                        <Typography
                                            variant='caption'
                                            sx={{ color: 'text.secondary' }}
                                        >
                                            {user.email}
                                        </Typography>
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate(`${user.uid}/dashboard`)}>Dashboard</MenuItem>
                                    <MenuItem onClick={handleLogoutClick}>
                                        <Typography variant='body2'>
                                            Cerrar Sesión
                                        </Typography>
                                    </MenuItem>
                                </Menu>
                            </>
                        :   
                        globalThis.location.pathname !== "/login" &&
                            <Button
                               color='secondary.main'
                                variant='outlined'
                                onClick={handleLoginClick} // Ejecuta la función de tu contexto
                                sx={{
                                    fontSize: '0.75rem',
                                    textTransform: 'none',
                                    height: '28px',
                                    py: 0,
                                    px: 1.2,
                                    borderColor: 'rgba(255, 255, 255, 0.5)',
                                    '&:hover': {
                                        borderColor: 'white',
                                        backgroundColor:
                                            'rgba(255,255,255,0.08)',
                                    },
                                }}
                            >
                                Iniciar Sesión
                            </Button>
                        }
                    </Box>
                </Toolbar>
            </Container>
        </AppBar>
    );
}

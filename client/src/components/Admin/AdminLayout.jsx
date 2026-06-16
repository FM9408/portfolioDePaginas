// src/components/Admin/AdminLayout.jsx
import React from 'react';
import PropTypes from 'prop-types';
import {
    Box,
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Drawer,
} from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';

const drawerWidth = 260;

const AdminLayout = ({
    children,
    activeSection,
    mobileOpen,
    onDrawerToggle,
    menuRender,
}) => {
    return (
        <Box
            sx={{
                display: 'flex',
                overflowX: 'auto',
                bgcolor: 'background.default',
                minHeight: '100vh',
            }}
        >
            {/* Barra de navegación superior */}
            <AppBar
                position='fixed'
                elevation={0}
                sx={{
                    width: { md: `calc(100% - ${drawerWidth}px)` },
                    ml: { md: `${drawerWidth}px` },
                    bgcolor: 'background.paper',
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Toolbar>
                    <IconButton
                        color='inherit'
                        aria-label='open drawer'
                        edge='start'
                        onClick={onDrawerToggle}
                        sx={{
                            mr: 2,
                            display: { md: 'none' },
                            color: 'text.primary',
                        }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        variant='h6'
                        noWrap
                        component='div'
                        sx={{ color: 'text.primary', fontWeight: 'bold' }}
                    >
                        {activeSection}
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Menú Lateral (Drawer Responsive) */}
            <Box
                component='nav'
                sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
            >
                {/* Vista Móvil */}
                <Drawer
                    variant='temporary'
                    open={mobileOpen}
                    onClose={onDrawerToggle}
                    ModalProps={{ keepMounted: true }}
                    sx={{
                        display: { xs: 'block', md: 'none' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                        },
                    }}
                >
                    {menuRender}
                </Drawer>
                {/* Vista Escritorio */}
                <Drawer
                    variant='permanent'
                    sx={{
                        display: { xs: 'none', md: 'block' },
                        '& .MuiDrawer-paper': {
                            boxSizing: 'border-box',
                            width: drawerWidth,
                            borderRight: '1px solid',
                            borderColor: 'divider',
                        },
                    }}
                    open
                >
                    {menuRender}
                </Drawer>
            </Box>

            {/* Contenedor de Módulos Dinámicos */}
            <Box
                component='main'
                sx={{
                    flexGrow: 1,
                    p: 1,
                    overflowX:"auto",
                    width: {xs:"100%", md: `calc(100% - ${drawerWidth}px)` },
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
    activeSection: PropTypes.string.isRequired,
    mobileOpen: PropTypes.bool.isRequired,
    onDrawerToggle: PropTypes.func.isRequired,
    menuRender: PropTypes.node.isRequired,
};

export default AdminLayout;

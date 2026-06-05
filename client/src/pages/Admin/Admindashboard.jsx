// src/pages/Admin/Admindashboard.jsx
import React, { useState } from 'react';
import { UseAuth } from '../../context/AuthContext';

// Importación de subcomponentes estructurados
import AdminLayout from '../../components/Admin/AdminLayout.jsx';
import  AdminMenu  from '../../components/Admin/AdminMenu.jsx';
import AdminHome from '../../components/Admin/AdminHome.jsx';
import AdminUsers from './AdminUsers.jsx';

// Componentes de UI de Material
import { Box, Paper, Typography } from '@mui/material';
import {
    Dashboard as DashboardIcon,
    People as PeopleIcon,
    ShoppingBag as ProductsIcon,
    Settings as SettingsIcon,
} from '@mui/icons-material';

const AdminDashboard = () => {
    const { user, logout } = UseAuth();
    const [mobileOpen, setMobileOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('Dashboard');

    const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
    const handleSectionChange = (section) => {
        setActiveSection(section);
        setMobileOpen(false); // Cierra automáticamente el panel colapsable en móviles
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error('Error al cerrar sesión:', error.message);
        }
    };

    const menuItems = [
        { text: 'Dashboard', icon: <DashboardIcon /> },
        { text: 'Usuarios', icon: <PeopleIcon /> },
        { text: 'Productos', icon: <ProductsIcon /> },
        { text: 'Configuración', icon: <SettingsIcon /> },
    ];

    // Renderizado del menú lateral empaquetado para enviarse al Layout
    const renderMenu = (
        <AdminMenu
            userEmail={user?.email}
            userDisplayName={user?.displayName}
            menuItems={menuItems}
            userPhoto={user?.photoURL} // 🔴 PASAMOS LA URL DE LA FOTO DESDE EL CONTEXTO
            activeSection={activeSection}
            onSectionChange={handleSectionChange}
            onLogout={handleLogout}
        />
    );

    return (
        <AdminLayout
            activeSection={activeSection}
            mobileOpen={mobileOpen}
            onDrawerToggle={handleDrawerToggle}
            menuRender={renderMenu}
        >
            {/* Control exacto y limpio de módulos según la sección activa */}
            {activeSection === 'Dashboard' && <AdminHome />}
            {activeSection === 'Usuarios' && <AdminUsers />}

            {activeSection !== 'Dashboard' && activeSection !== 'Usuarios' && (
                <Box sx={{ p: 3, textAlign: 'center' }}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 5,
                            borderRadius: '12px',
                            border: '1px solid',
                            borderColor: 'divider',
                        }}
                    >
                        <Typography variant='h6' color='text.secondary'>
                            Sección de {activeSection} en desarrollo.
                        </Typography>
                    </Paper>
                </Box>
            )}
        </AdminLayout>
    );
};

export default AdminDashboard;

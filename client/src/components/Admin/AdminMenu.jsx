// src/components/Admin/AdminMenu.jsx
import React from 'react';
import PropTypes from 'prop-types';
import { Toolbar, Avatar, Typography, Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Box, Button } from '@mui/material';
import { ExitToApp as LogoutIcon } from '@mui/icons-material';

const AdminMenu = ({ userEmail, userPhoto, menuItems, activeSection, onSectionChange, onLogout, userDisplayName }) => {
    // Obtenemos la inicial del correo para el fallback visual si no hay foto
    const initialLetter = userEmail ? userEmail.charAt(0).toUpperCase() : 'A';

    return (
        <div>
            <Toolbar sx={{ display: 'flex', flexDirection: 'column', pt: 3, pb: 2, gap: 1 }}>
                <Avatar 
                    src={userPhoto || undefined} 
                    sx={{ bgcolor: 'secondary.main', width: 56, height: 56, fontSize: '1.25rem', fontWeight: 600 }}
                >
                    {!userPhoto && initialLetter}
                </Avatar>
                <Typography variant="subtitle1" sx={{ fontWeight: 'bold', mt: 1 }}>
                    Panel de Control
                </Typography>
                <Typography variant='subtitle1' sx={{ fontWeight: 'bold', mt: 1 }}>{userDisplayName}</Typography>
                <Typography variant="caption" color="text.secondary" noWrap sx={{ maxWidth: '220px' }}>
                    {userEmail}
                </Typography>
            </Toolbar>
            <Divider sx={{ my: 1 }} />
            <List sx={{ px: 1 }}>
                {/* 🔴 CORREGIDO: 'menuItems' ahora tiene las mayúsculas correctas (CamelCase) */}
                {menuItems && menuItems.map((item) => (
                    <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
                        <ListItemButton
                            onClick={() => onSectionChange(item.text)}
                            selected={activeSection === item.text}
                            sx={{
                                borderRadius: '8px',
                                '&.Mui-selected': {
                                    bgcolor: 'primary.light',
                                    color: 'primary.main',
                                    '& .MuiListItemIcon-root': { color: 'primary.main' },
                                    '&:hover': { bgcolor: 'primary.light' }
                                }
                            }}
                        >
                            <ListItemIcon sx={{ minWidth: 40 }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.text} primaryTypographyProps={{ fontSize: '14px', fontWeight: 500 }} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ px: 2, position: 'absolute', bottom: 16, width: '100%', boxSizing: 'border-box' }}>
                <Button
                    fullWidth
                    variant="outlined"
                    color="error"
                    startIcon={<LogoutIcon />}
                    onClick={onLogout}
                    sx={{ borderRadius: '8px', textTransform: 'none' }}
                >
                    Cerrar Sesión
                </Button>
            </Box>
        </div>
    );
};

AdminMenu.propTypes = {
    userEmail: PropTypes.string,
    userDisplayName: PropTypes.string,
    userPhoto: PropTypes.string,
    menuItems: PropTypes.arrayOf(
        PropTypes.shape({
            text: PropTypes.string.isRequired,
            icon: PropTypes.element.isRequired,
        })
    ).isRequired,
    activeSection: PropTypes.string.isRequired,
    onSectionChange: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired,
};

export default AdminMenu;
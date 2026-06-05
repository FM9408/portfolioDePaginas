// src/components/Admin/AdminHome.jsx
import React from 'react';
import { Grid, Paper, Box, Typography, Avatar } from '@mui/material';
import {
    People as PeopleIcon,
    TrendingUp as TrendingUpIcon,
    AttachMoney as MoneyIcon,
    Assignment as TaskIcon,
} from '@mui/icons-material';

const AdminHome = () => {
    const cardsData = [
        {
            title: 'Ventas Totales',
            value: '$12,450.00',
            icon: <MoneyIcon color='primary' />,
            percent: '+12% este mes',
        },
        {
            title: 'Usuarios Nuevos',
            value: '48',
            icon: <PeopleIcon color='secondary' />,
            percent: '+4% esta semana',
        },
        {
            title: 'Órdenes Activas',
            value: '25',
            icon: <TaskIcon color='success' />,
            percent: '5 pendientes de envío',
        },
        {
            title: 'Rendimiento',
            value: '94.2%',
            icon: <TrendingUpIcon color='warning' />,
            percent: '+2.1% vs mes anterior',
        },
    ];

    return (
        <Box sx={{ animation: 'fadeIn 0.3s ease-in-out' }}>
            <Grid container spacing={3} sx={{ mb: 4 }}>
                {cardsData.map((card, index) => (
                    <Grid item xs={12} sm={6} lg={3} key={index}>
                        <Paper
                            elevation={0}
                            sx={{
                                p: 2.5,
                                borderRadius: '12px',
                                border: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 1,
                                bgcolor: 'background.paper',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                }}
                            >
                                <Typography
                                    variant='body2'
                                    color='text.secondary'
                                    sx={{ fontWeight: 500 }}
                                >
                                    {card.title}
                                </Typography>
                                <Avatar
                                    sx={{
                                        bgcolor: 'action.hover',
                                        width: 40,
                                        height: 40,
                                    }}
                                >
                                    {card.icon}
                                </Avatar>
                            </Box>
                            <Typography
                                variant='h4'
                                sx={{ fontWeight: 'bold' }}
                            >
                                {card.value}
                            </Typography>
                            <Typography
                                variant='caption'
                                color='text.secondary'
                                sx={{ display: 'block', mt: 0.5 }}
                            >
                                {card.percent}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>

            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Paper
                        elevation={0}
                        sx={{
                            p: 3,
                            borderRadius: '12px',
                            border: '1px solid',
                            borderColor: 'divider',
                            minHeight: '300px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            bgcolor: 'background.paper',
                        }}
                    >
                        <Typography
                            variant='body1'
                            color='text.secondary'
                            sx={{ fontStyle: 'italic' }}
                        >
                            Espacio designado para gráficas analíticas o tablas
                            de control de datos generales.
                        </Typography>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default AdminHome;

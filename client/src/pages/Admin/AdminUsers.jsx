// src/pages/Admin/AdminUsers.jsx
import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config'; // Tu db configurada con el emulador
import { collection, getDocs } from 'firebase/firestore';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Chip,
    CircularProgress,
    Alert,
    Avatar,
} from '@mui/material';
import { People as PeopleIcon } from '@mui/icons-material';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                setLoading(true);
                setError(null);

                // Referencia a la colección 'users' en Firestore
                const usersCollectionRef = collection(db, 'users');
                const querySnapshot = await getDocs(usersCollectionRef);

                // Mapeamos los documentos recuperados incluyendo el ID del documento (UID)
                const usersList = querySnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }));

                setUsers(usersList);
            } catch (err) {
                console.error('Error al obtener la lista de usuarios:', err);
                setError(
                    'No se pudo cargar la lista de usuarios desde el servidor local.'
                );
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    // 1. Estado de carga asíncrona
    if (loading) {
        return (
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    minHeight: '300px',
                }}
            >
                <CircularProgress color='primary' />
            </Box>
        );
    }

    // 2. Estado de error
    if (error) {
        return (
            <Box sx={{ p: 2 }}>
                <Alert severity='error'>{error}</Alert>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            {/* Encabezado de la sección */}
            <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}
            >
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <PeopleIcon />
                </Avatar>
                <Box>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        Control de Usuarios
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Lista de cuentas registradas en el sistema y sus roles
                        asignados.
                    </Typography>
                </Box>
            </Box>

            {/* Tabla de Datos Principal */}
            <TableContainer
                component={Paper}
                elevation={0}
                sx={{
                    
                    borderRadius: '12px',
                    border: '1px solid',
                    borderColor: 'divider',
                    overflow: 'auto',
                }}
            >
                <Table aria-label='tabla de usuarios'>
                    <TableHead sx={{ bgcolor: 'action.hover' }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Usuario
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold' }}>
                                Correo Electrónico
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold' }}
                                align='center'
                            >
                                Rol
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {users.length === 0 ?
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    align='center'
                                    sx={{
                                        py: 6,
                                        color: 'text.secondary',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    No hay usuarios registrados en esta
                                    colección de Firestore.
                                </TableCell>
                            </TableRow>
                        :   users.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        '&:hover': { bgcolor: 'action.hover' },
                                    }}
                                >
                                    {/* UID del documento */}
                                    <TableCell
                                        component='th'
                                        scope='row'
                                        sx={{
                                            fontFamily: 'monospace',
                                            color: 'text.secondary',
                                        }}
                                    >
                                        {row.displayName}
                                    </TableCell>

                                    {/* Email */}
                                    <TableCell sx={{ fontWeight: 500 }}>
                                        {row.email || 'Sin correo registrado'}
                                    </TableCell>

                                    {/* Etiqueta de Rol Estilizada */}
                                    <TableCell align='center'>
                                        <Chip
                                            label={
                                                row.role ?
                                                    row.role.toUpperCase()
                                                :   'USER'
                                            }
                                            color={
                                                row.role === 'admin' ?
                                                    'secondary'
                                                :   'default'
                                            }
                                            size='small'
                                            sx={{
                                                fontWeight: 'bold',
                                                borderRadius: '6px',
                                                minWidth: '70px',
                                            }}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default AdminUsers;

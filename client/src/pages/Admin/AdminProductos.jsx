import React from "react";
import { useSelector } from "react-redux";
import{Box, Rating, TableBody, TableContainer, TableHead, Table, TableRow, TableCell, Paper, Avatar, Typography, alpha, useTheme } from "@mui/material"
import { StoreMallDirectory} from "@mui/icons-material"

function getRandomStock(e) {
    return Math.floor(Math.random()*e.price)
}

export default function AdminProductos(){
    const {productos} = useSelector(state => state.productos.getProducts)
    const theme =  useTheme()
    
    

    return (
         <Box sx={{ p: 3 }}>
            {/* Encabezado de la sección */}
            <Box
                sx={{ display: 'flex', alignItems: 'center', mb: 3, gap: 1.5 }}
            >
                <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
                    <StoreMallDirectory />
                </Avatar>
                <Box>
                    <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                        Control de Productos
                    </Typography>
                    <Typography variant='body2' color='text.secondary'>
                        Lista de productos registradas en el sistema, su stock, popularidad, ventas y más
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
                <Table aria-label='tabla de productos'>
                    <TableHead sx={{ bgcolor: 'primary.light', color:"primary.contrastText" }}>
                        <TableRow>
                            <TableCell sx={{ fontWeight: 'bold',color:"primary.contrastText" }}>
                                Producto
                            </TableCell>
                            <TableCell sx={{ fontWeight: 'bold',color:"primary.contrastText" }}>
                                Stock
                            </TableCell>
                            <TableCell
                                sx={{ fontWeight: 'bold', color:"primary.contrastText" }}
                                align='center'
                            >
                               Rate
                            </TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productos.length === 0 ?
                            <TableRow>
                                <TableCell
                                    colSpan={3}
                                    align='center'
                                    sx={{
                                        py: 6,
                                        border: ``,
                                        color: 'text.secondary',
                                        fontStyle: 'italic',
                                    }}
                                >
                                    No hay productos registrados en esta
                                    colección de Firestore.
                                </TableCell>
                            </TableRow>
                        :   productos.map((row) => (
                                <TableRow
                                    key={row.id}
                                    sx={{
                                        transition: "background-color .3s ease-in-out ",
                                        border: `solid 1px ${theme.palette.primary.dark}`,
                                        '&:last-child td, &:last-child th': {
                                            border: 0,
                                        },
                                        '&:hover': { bgcolor: `${alpha(theme.palette.secondary.lighter, .7)}` },
                                    }}
                                >
                                    {/* UID del documento */}
                                    <TableCell
                                        component='th'
                                        scope='row'
                                        
                                        sx={{
                                            color: 'text.secondary',
                                             borderBottom: `solid 1px ${theme.palette.primary.light}`
                                        }}
                                    >
                                        {row.title}
                                    </TableCell>

                                    {/* Stock de los productos*/}
                                    <TableCell sx={{ fontWeight: 500, borderBottom: `solid 1px ${theme.palette.primary.light}` }}>
                                        {getRandomStock(row)}
                                    </TableCell>

                                    {/* Número de estrellas */}
                                    <TableCell align='center' sx={{borderBottom: `solid 1px ${theme.palette.primary.light}`}}>
                                        <Rating 
                                            size="small"
                                            sx={{
                                                color:"primary.main"
                                            }}
                                            name="product-readOnly-rating"
                                            value={row.rating.rate}
                                            precision={0.1}
                                            readOnly
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
    
}
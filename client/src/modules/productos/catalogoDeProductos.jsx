import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Grid,  CircularProgress, Box, Alert } from '@mui/material';
import { getProductsFromDB } from '../../store/slices/productos/getProducts';
import ProductCard from '../../components/ProductCard';

const Catalogo = () => {
  const dispatch = useDispatch();
  
  // 1. Consumimos las variables directamente desde la estructura de tu store
  const { productos, loading, error } = useSelector((state) => state.productos.getProducts);

  // 2. Único useEffect necesario: Disparar la petición al montar el componente
  useEffect(() => {
    if(loading) dispatch(getProductsFromDB());
  }, [dispatch,  productos.length, loading]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="md" sx={{ mt: 5 }}>
        <Alert severity="error">Hubo un error al cargar el catálogo: {error}</Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 5 }}>
      {/* 3. Leemos directamente la longitud del array de Redux */}
      

      <Grid container spacing={3}>
        {/* 4. Mapeo directo sobre el estado global de Redux */}
        {productos && productos.map((producto) => (
          <Grid item key={producto.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCard producto={producto} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default Catalogo;
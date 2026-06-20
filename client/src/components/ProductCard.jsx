import React, { useEffect } from 'react';
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box, Rating } from '@mui/material';
import { useDispatch } from 'react-redux';
import {useNavigate} from "react-router-dom" 
import { queryProductById } from '../store/slices/productos/getProducts';
import { setProduct } from '../store/slices/productos/product';


const ProductCard = ({ producto }) => {
  const dispatch = useDispatch()
  const { title, price, description, image } = producto;
  const navigate = useNavigate()

  // SOLUCIÓN DEFINITIVA A LAS IMÁGENES:
  // Como inyectamos un píxel transparente de 1x1, Firebase Storage te devuelve una URL real pero invisible.
  // Con este mapa de palabras clave, si el producto dice "Mouse", le asignará una foto real de un mouse de Unsplash.
//   const obtenerImagenReal = () => {
//     if (!imageUrl || imageUrl === "" || imageUrl.includes("base64")) {
//       return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80"; // Laptop/Escritorio por defecto
//     }
    
// //     const titleMinuscula = title.toLowerCase();
// //     if (titleMinuscula.includes("audífonos") || titleMinuscula.includes("headset")) 
// //       return "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&q=80";
// //     if (titleMinuscula.includes("teclado")) 
// //       return "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=500&q=80";
// //     if (titleMinuscula.includes("mouse") || titleMinuscula.includes("óptico")) 
// //       return "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&q=80";
// //     if (titleMinuscula.includes("monitor") || titleMinuscula.includes("pantalla")) 
// //       return "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&q=80";
// //     if (titleMinuscula.includes("memoria") || titleMinuscula.includes("tarjeta") || titleMinuscula.includes("componentes")) 
// //       return "https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=500&q=80";
      
// //     return imageUrl; // Si subes una imagen tuya real en el futuro, usará esa.
// //   };
  function redirectHandle() {
      const  queriedProduct = dispatch(queryProductById(producto)).payload
      console.log(queriedProduct)
    dispatch(setProduct(queriedProduct))
    navigate(`product/${producto.id}/${producto.title}`, { replace: false })
  }

  useEffect(() =>{

  }, [image,title, price, description])

  return (
    <Card
    onClick={() => redirectHandle()}
     sx={{ 
      height: '100%', 
      maxWidth:"30vh",
      display: 'flex', 
      flexDirection: 'column', 
      justifyContent: 'space-between',
      borderRadius: 3,
      transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
      '&:hover': {
        transform: 'translateY(-4px)',
        boxShadow: 6
      }
    }}>
      {/* Caja de la imagen con tamaño fijo controlado de 180px */}
      <Box sx={{ width: '100%', height: 180, overflow: 'hidden', backgroundColor: 'grey.100' }}>
        <CardMedia
          component="img"
          image={producto.image}
          alt={title}
          sx={{ 
            width: '100%', 
            height: '100%', 
            objectFit: 'cover'
          }}
        />
      </Box>
      <CardContent sx={{ p: 2, flexGrow: 1 }}>
        {/* Título adaptado al Theme */}
        <Box sx={{display: "flex", justifyContent:"right", alignItems:"baseline", flexDirection:"row"}}>
          <Box>
            <Rating 
          precision={0.1}
          readOnly
          size='small'
          value={producto.rating.rate}

        />
          </Box>
          <Box>
            <Typography variant="caption">
              /{producto.rating.count} 
            </Typography>
          </Box>
        </Box>
        <Typography 
          gutterBottom 
          variant="subtitle1" 
          component="h2" 
          sx={{ fontWeight: 'bold', lineHeight: 1.2, mb: 1, minHeight: '2.4em', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}
        >
          {title}
        </Typography>

        {/* Descripción limpia y limitada */}
        <Typography 
          variant="body2" 
          color="text.secondary"
          sx={{
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '40px',
            mb: 2
          }}
        >
          {description}
        </Typography>

        {/* Precio destacado */}
        <Typography variant="h6" sx={{ fontWeight: '700', color: 'success.main' }}>
          ${price.toFixed(2)}
        </Typography>
      </CardContent>

      {/* Botones de acción compactos */}
      <CardActions sx={{ p: 2, pt: 0 }}>
        <Button 
          fullWidth 
          variant="contained" 
          color="primary"
          sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 'bold' }}
        >
          Comprar
        </Button>
      </CardActions>
    </Card>
  );
};

export default ProductCard;



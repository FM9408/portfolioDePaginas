import React from "react";
import { Box, Container, Grid, Typography, Rating, Button, Divider, IconButton } from "@mui/material";
import { ShoppingCart as ShoppingCartIcon, FavoriteBorder as FavoriteIcon } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setProduct } from "../../store/slices/productos/product";
import {useNavigate} from "react-router-dom"

// import {useParams} from "react-router-dom"

// Simulamos los datos del producto basándonos en los atributos solicitados

export default function ProductPage() {
  const productId = globalThis.location.pathname.split("/")[2]
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {productos, loading} = useSelector((state) => state.productos.getProducts)
  const { producto} = useSelector((state) => state.productos.product);
  
  
  const lookFor = React.useCallback(() => {
    for(const q of productos) {
      if(q.id === productId) {
        return q
      }
    }
  }, [productId, productos])
  
  
  const updateLay = React.useCallback(() => {
    
    if(!productId) {
      navigate("/")
    }
    
        if(producto?.id !== productId || producto?.id === "") {
          const q = lookFor()
         
          dispatch(setProduct(q))
        }
    
    
      
    
  }, [producto, dispatch, productId, navigate, lookFor])


  React.useEffect(() => {
    return() => updateLay()
  }, [updateLay])
  // Formateador de moneda para el precio
  const formatter = new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
  });

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Grid container direction={"row"} spacing={{ xs: 4, md: 8 }}>
        {/* COLUMNA IZQUIERDA: IMAGEN */}
        <Grid item sx={{minwidth:{xs:"80%", md:"43%"}, maxWidth:{xs:"100%", md:"45%"}}}>
          <Box
            sx={{
              width: "100%",
              backgroundColor: "#f9f9f9",
              borderRadius: 4,
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 20px rgba(0,0,0,0.05)",
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.02)",
              },
            }}
          >
            <Box
              component="img"
              src={producto?.image}
              alt={producto?.title}
              sx={{
                width: "100%",
                height: "auto",
                maxHeight: 500,
                objectFit: "contain",
              }}
            />
          </Box>
        </Grid>

        {/* COLUMNA DERECHA: INFORMACIÓN Y ACCIONES */}
        <Grid item sx={{minwidth:{xs:"80%", md:"43%"}, maxWidth:{xs:"100%", md:"45%"}}}>
          <Grid container>
          <Grid item xs={12} md={6} sx={{ display: "flex", flexDirection: "column" }}>
          {/* Categoría o Identificador */}
         

          {/* Título del Producto */}
          <Typography variant="h3" component="h1" fontWeight="700" sx={{ mt: 1, mb: 2, color: "#1a1a1a" }}>
            {producto?.title}
          </Typography>

          {/* Bloque de Calificación (Rating) del Producto */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.5, mb: 3 }}>
            <Rating name="product-rating" value={producto?.rating.rate} precision={0.1} readOnly size="medium" />
            <Typography variant="subtitle2" fontWeight="600" color="text.primary">
              {producto?.rating.rate}
            </Typography>
            <Divider orientation="vertical" flexItem />
            <Typography variant="body2" color="text.secondary">
              {producto?.rating.count} opiniones de clientes
            </Typography>
          </Box>

          <Divider sx={{ mb: 3 }} />

          {/* Precio */}
       <Grid container direction={"row"} sx={{display: "flex", alignItems:"center", justifyContent:"space-between", mb:2}}>
              <Grid item >
                   <Typography variant="h4" component="p" fontWeight="600" color="primary.main" sx={{ mb: 3 }}>
            {formatter.format(producto?.price)}
          </Typography>
              </Grid>
              <Grid item>
              <Box sx={{ display: "flex", gap: 2, mt: "auto" }}>
            <Button
              variant="contained"
              size="large"
              startIcon={<ShoppingCartIcon />}
              fullWidth
              sx={{
                py: 1.8,
                borderRadius: 3,
                textTransform: "none",
                fontWeight: "bold",
                fontSize: "1rem",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(25, 118, 210, 0.3)",
                },
              }}
            >
              Añadir al carrito
            </Button>

            <IconButton
              color="primary"
              aria-label="añadir a favoritos"
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 3,
                p: 1.8,
              }}
            >
              <FavoriteIcon />
            </IconButton>
          </Box>
              </Grid>
       </Grid>

          {/* Descripción */}
         <Grid container>
          <Grid Item>
            <Typography variant="body1">
              Descripción:
            </Typography>
          </Grid>
          <Grid item>
            <Divider />
          </Grid>
          <Grid item>
             <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, mb: 4 }}>
            {producto?.description}
          </Typography>
          </Grid>
         </Grid>

          <Divider sx={{ mb: 4 }} />

          {/* Sección Interactiva: Tu Opinión */}
          <Box sx={{ mb: 4, p: 2, bgcolor: "#f5f5f5", borderRadius: 2 }}>
            <Typography variant="body2" fontWeight="600" sx={{ mb: 1 }}>
              ¿Tienes este producto? Califícalo:
            </Typography>
            <Rating name="user-interaction-rating" value={producto?.rating.rate} precision={1} />
          </Box>

          {/* Botones de Acción */}
          
        </Grid>
        </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

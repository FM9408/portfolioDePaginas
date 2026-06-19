// src/components/Login.jsx
import React, { useState } from "react";
import { auth } from "../firebase/config";
import { NavLink } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import { signInWithEmailAndPassword } from "firebase/auth";
import { StatusIcon } from "../hooks/animaciones/iconAnimation";
import { Container, Box, Typography, TextField, Button, Alert, Divider, Grid } from "@mui/material";
import { GoogleLoginButton } from "./GoogleLoginButton";

const LogInForm = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const handleMouseUpPassword = (event) => {
    event.preventDefault();
  };
  const [password, setPassword] = useState("");
  const [error, setError] = useState({
    general: "",
    email: "",
    password: "",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);


  const handleLogin = (e) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        auth
          .beforeAuthStateChanged(() => {
            setStatus("success");
          })
          
      })
      .catch((error) => {
        setStatus("error");

        switch (error.code) {
          case "auth/invalid-email":
            setError({
              ...error,
              email: "El formato del correo electrónico no es válido.",
            });
            break;
          case "auth/user-disabled":
            setError({
              ...error,
              general: "Este usuario ha sido deshabilitado.",
            });
            break;
          case "auth/invalid-credential":
            setError({
              ...error,
              general: "Credenciales incorrectas. Verifica tu correo y contraseña.",
            });
            break;
          case "auth/wrong-password":
            setError({
              ...error,
              password: "Contraseña incorrecta.",
            });
            break;
          case "auth/user-not-found":
            setError({
              ...error,
              email: "No se encontró un usuario con ese correo electrónico.",
            });
            break;
          default:
            setError({
              ...error,
              general: "Ocurrió un error inesperado. Inténtalo de nuevo.",
            });
        }
      })
      .finally(() => {
        setLoading(false);
        setTimeout(() => {
          setStatus("");
          setError({
            general: "",
            email: "",
            password: "",
          });
        }, 3000);
      });

    // Aquí manejas la redirección o el estado global
  };

  return (
    // Container limita el ancho máximo y centra el contenido horizontalmente
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          padding: 4,
          borderRadius: 2,
          // Utiliza sombras y colores heredados del tema de MUI
          boxShadow: 3,
          backgroundColor: "background.paper",
        }}
      >
        <Typography component="h1" variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
          Iniciar Sesión
        </Typography>

        {error.general && (
          <Alert severity="error" sx={{ width: "100%", mb: 2 }}>
            {error.general}
          </Alert>
        )}

        <Box component="form" onError={() => setStatus("error")} noValidate sx={{ width: "100%" }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            error={!!error.email}
            helperText={error.email}
            label="Correo Electrónico"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            error={!!error.password}
            helperText={error.password}
            disabled={loading}
            type={showPassword ? "text" : "password"}
            id="password"
            label="Contraseña"
            autoComplete="current-password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            slotProps={{
              input: {
                endAdornment: (
                  <IconButton
                    aria-label={showPassword ? "hide password" : "display password"}
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    onMouseUp={handleMouseUpPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              },
            }}
          />
          <Button
            onClick={(e) => {
              setStatus("info");
              setTimeout(() => handleLogin(e), 3000);
            }}
            fullWidth
            variant="contained"
            color={status || "primary"} // Se engancha automáticamente al color principal de tu ThemeProvider
            disabled={status !== "" || loading || password.length === 0 || email.length === 0}
            sx={{ mt: 3, mb: 2, py: 1.25, fontWeight: "bold" }}
          >
            <StatusIcon status={status} />
          </Button>
        </Box>
      </Box>
      <Divider sx={{ my: 2 }}>
        <Typography variant="caption">Ingresa con</Typography>
      </Divider>
      <Grid container direction="column">
        <Grid
          xs={12}
          sx={{
            textAlign: "center",
            justifyContent: "center",
            alignItems: "center",
            display: "flex",
          }}
        >
          <Grid container direction={"row"} spacing={2}>
            <Grid xs={6}>
              <GoogleLoginButton />
            </Grid>
          </Grid>
        </Grid>
        <Grid>
          <Typography>
            ¿No tienes cuenta?
            {<NavLink to="/signup">Crear una</NavLink>}
          </Typography>
        </Grid>
      </Grid>
    </Container>
  );
};

export default LogInForm;

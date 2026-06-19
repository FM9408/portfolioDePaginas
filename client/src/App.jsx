import React from "react";
import AppRoutes from "./routes/AppRoutes";
// O como se llame tu proveedor
import "./App.css";
import Navbar from "./components/Navbar";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
import { UseAuth } from "./context/AuthContext";

function App() {
  const { userState, isAuthenticated } = UseAuth()
  

  const navigate = useNavigate();

  React.useLayoutEffect(() => {
    // Si ya hay sesión iniciada de antes, dejamos que el router decida dónde colocarlo
    if (userState?.uid && isAuthenticated) {
        if (userState.role === "admin") {
         return  navigate(`/${userState.uid}/admin/dashboard`, { replace: true });
        } else {
          return  navigate(`/${userState.uid}/dashboard`, { replace: true });
        }
      }else if(!isAuthenticated && globalThis.location.pathname.endsWith("/dashboard")){
        return navigate("/")
    }
    else {
      return;
    }
  }, [userState, isAuthenticated, navigate]);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
      }}
    >
      <Navbar />
      <AppRoutes />
    </Box>
  );
}

export default App;

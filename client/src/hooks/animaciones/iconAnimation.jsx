import { keyframes } from "@mui/system";
import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import {Login as HelpOutlineIcon} from "@mui/icons-material";
import { Typography} from "@mui/material";



// 1. El progreso se encoge hacia el centro de golpe al terminar
const shrinkOut = keyframes`
0% { transform: scale(1); opacity: 1; }
100% { transform: scale(0); opacity: 0; }
`;

// 2. El ícono explota hacia afuera con un rebote elástico exagerado
const popBounce = keyframes`
0% { transform: scale(0); opacity: 0; }
70% { transform: scale(1.3); } /* Se pasa del tamaño original */
90% { transform: scale(0.9); } /* Se encoge un poco */
100% { transform: scale(1); opacity: 1; } /* Estabiliza */
`;

export function StatusIcon({ status }) {
    
  
  // Si está cargando, muestra el CircularProgress normal corriendo
  if (status === "info") {
    return (
      <Box sx={{ display: "inline-flex", width: 28, height: 28 }}>
        <CircularProgress size={28} thickness={5} color="info.darker" />
      </Box>
    );
  }

  // Configuración de los íconos finales
  const iconConfig = {
    success: { component: CheckCircleIcon, color: "success.darker" },
    error: { component: CancelIcon, color: "error.darker" },
    idle: { component: HelpOutlineIcon, color: "primary.contrastText" },
  };

  const current = iconConfig[status] || iconConfig.idle;
  const IconComponent = current.component;

  return (
    <Box
      sx={{
        position: "relative",
        display: "inline-flex",
        alignItems: "center",
        
        justifyContent: "center",
        width: 28,
        height: 28,
      }}
    >
      {/* GHOST PROGRESS: Un círculo estático que se encoge para simular la transformación */}
      <CircularProgress
        variant="determinate"
        value={100}
        size={28}
        thickness={5}
        sx={{
          position: "absolute",
          color: "info.darker",
          animation: `${shrinkOut} 0.25s cubic-bezier(0.6, -0.28, 0.735, 0.045) forwards`,
        }}
      />

      {/* ÍCONO FINAL: Brota desde el centro exacto donde se encogió el círculo */}
      <IconComponent
        sx={{
          fontSize: 32, // Un poco más grande para el impacto visual
          color: current.color,
          transform: "scale(0)",
          opacity: 0,
          // Retrasamos la aparición 0.15s para que el círculo empiece a encogerse primero
          animation: `${popBounce} 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) 0.15s forwards`,
        }}
      />{
        current === iconConfig.idle && <Typography variant="button" sx={{color: current.color}}>Acceder</Typography>
      }
    </Box>
  );
}

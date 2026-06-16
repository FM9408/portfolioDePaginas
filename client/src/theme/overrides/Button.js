export default function Button(theme) {
  return {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: 600,
          paddingTop: "10px",
          paddingBottom: "10px",
          boxShadow: "none",
          "&:hover": {
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          },
          // 👇 ESTA ES LA SOLUCIÓN REAL
          // Forzamos a q
        },
        // Aseguramos que las variantes contenidas mantengan su color base bajo el filtro
        contained: {
          backgroundColor: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
          },
          "&.MuiButton-colorInfo": {
            backgroundColor: theme.palette.info.main,
            color: theme.palette.info.darker,
            "&:hover": {
              backgroundColor: theme.palette.info.dark,
            },
            "&.Mui-disabled": {
              backgroundColor: "hsla(120, 30%, 60%, 0.4)",
              color: theme.palette.info.ligther,
            },
          },
          "&.MuiButton-colorError": {
            backgroundColor: theme.palette.error.main,
            color: theme.palette.error.contrastText,
            "&:hover": {
              backgroundColor: theme.palette.error.dark,
            },
            "&.Mui-disabled": {
              color: theme.palette.error.darker,
              backgroundColor: "hsla(0, 70%, 60%, 0.4)"
              
            },
          },
        },
        outlined: {
         
          color: theme.palette.primary.contrastText,
          border: `1px solid ${theme.palette.primary.main}`,
          "&:hover": {},
        },
      },
    },
  };
}

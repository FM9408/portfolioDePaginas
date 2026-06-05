export default function Button() {
    return {
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: '8px',
                    textTransform: 'none', // Evita que el texto del botón se convierta en mayúsculas
                    fontWeigth: 600,
                    paddingTop: '10px',
                    paddingBottom: '10px',
                    boxShadow: 'none',
                    '&:hover': {
                        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)', // Sombra suave al hacer hover
                    },
                },
            },
        },
    };
}

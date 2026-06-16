import React from "react";
import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import palette from "./palette.jsx";
import Typography from "./typography.js";
import ComponentsOverrides from "./overrides/index.js";
import GlobalStyle from "./GlobalStyle.jsx";
import { node} from "prop-types"



export default function ThemeProviderWrapper ({ children }) {
    const themeOptions = React.useMemo(
        () => ({
            palette,
            typography: Typography,
            breakpoints: {
                values: {
                    xs: 0, // Teléfonos muy pequeños (vertical)
                    sm: 600, // Teléfonos grandes (horizontal) y Tablets pequeñas
                    md: 900, // Tablets grandes (iPad Pro) y Laptops pequeñas
                    lg: 1200, // Pantallas de escritorio estándar (El contenedor principal de tu portafolio suele llegar hasta aquí)
                    xl: 1536, // Monitores grandes y pantallas de alta resolución
                },
            },
            spacing: 8,
            shape: {
                borderRadius: 8,
            },
        }),
        []
    );
    const theme = createTheme(themeOptions);
    theme.components = ComponentsOverrides(theme);

return (
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyle />
            {children}
        </ThemeProvider>
    </StyledEngineProvider>
);
}


ThemeProviderWrapper.propTypes = {
    children: node.isRequired,
}


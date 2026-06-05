const palette = {
  // 1. COLORES PRIMARIOS (Verde Esmeralda Orgánico / Bosque)
  primary: {
    lighter: '#e8f5e9',    // Grado 1: Fondos sutiles de bloques o tarjetas
    light: '#4caf50',      // Grado 2: Bordes dinámicos o estados hover suaves
    main: '#1b5e20',       // Grado 3: Color de seriedad estructural (Navbar, botones)
    dark: '#0d3c12',       // Grado 4: Títulos e iconos principales
    darker: '#052008',     // Grado 5: Fondos premium ultra oscuros
    contrastText: '#ffffff',
  },
  // 2. COLORES SECUNDARIOS (Ámbar / Dorado Energético)
  secondary: {
    lighter: '#fff8e1',    // Grado 1: Resaltados de texto elegantes
    light: '#ffd54f',      // Grado 2: Hover de botones de acción
    main: '#ffb300',       // Grado 3: Puntos de atención (Links, CTAs, proyectos destacados)
    dark: '#ff8f00',       // Grado 4: Elementos activos enfocados
    darker: '#c43e00',     // Grado 5: Bordes de contraste cálido
    contrastText: '#111827',
  },
  // 3. CAPAS DE FONDO (Corregido: 5 grados semánticos uniformes)
  background: {
    lighter: '#faf9f6',    // Grado 1: Fondo general limpio (Blanco cálido muy elegante)
    light: '#f4f3ef',      // Grado 2: Separación de secciones secundarias
    main: '#eae8e1',       // Grado 3: Zonas de formularios o bloques de código
    dark: '#dcd9cf',       // Grado 4: Líneas divisorias delgadas o bordes estructurales
    darker: '#ffffff',     // Grado 5: Blanco puro clásico (Equivalente semántico a tu "paper" para tarjetas)
    default: '#f4f3ef',    // Mapeo obligatorio requerido por el núcleo de MUI
    paper: '#ffffff',      // Mapeo obligatorio requerido por el núcleo de MUI
  },
  // 4. CAPAS DE TEXTO (5 grados semánticos de alta legibilidad)
  text: {
    lighter: '#9e9e9e',    // Grado 1: Fechas o tecnologías usadas (Tags)
    light: '#5c5c5c',      // Grado 2: Descripciones largas de proyectos
    main: '#3c3c3c',       // Grado 3: Texto de lectura principal
    dark: '#1a1a1a',       // Grado 4: Nombre principal y títulos de secciones
    darker: '#0a0a0a',     // Grado 5: Énfasis máximo o negritas extremas
    primary: '#242424',    // Mapeo obligatorio requerido por el núcleo de MUI
    secondary: '#5c5c5c',  // Mapeo obligatorio requerido por el núcleo de MUI
  },
  // 5. ESTADOS (Estructura semántica uniforme de 5 grados)
  error: {
    lighter: '#fbe9e7', light: '#ff8a65', main: '#d84315', dark: '#bf360c', darker: '#870000',
    contrastText: '#ffffff',
  },
  info: {
    lighter: '#e0f2f1', light: '#4db6ac', main: '#00796b', dark: '#004d40', darker: '#00251a',
    contrastText: '#ffffff',
  },
  success: {
    lighter: '#efebe9', light: '#a1887f', main: '#6d4c41', dark: '#4e342e', darker: '#3e2723',
    contrastText: '#ffffff',
  },
};

export default palette;
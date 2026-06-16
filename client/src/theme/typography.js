// typography.js
const typography = {
    fontFamily: [
        'Inter',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
    ].join(','),

    // Título principal (Ej: Tu nombre en la sección de inicio)
    h1: {
        fontSize: '2.5rem',
        fontWeight: 700,
        lineHeight: 1.2,
        letterSpacing: '-0.02em', // Un espaciado ligeramente cerrado da un toque premium
    },

    // Títulos de secciones principales (Ej: "Experiencia", "Proyectos")
    h2: {
        fontSize: '2rem',
        fontWeight: 600,
        lineHeight: 1.3,
        letterSpacing: '-0.01em',
    },

    // Títulos de tarjetas o subsecciones (Ej: Nombre del puesto o del proyecto)
    h3: {
        fontSize: '1.5rem',
        fontWeight: 600,
        lineHeight: 1.4,
    },

    // Títulos menores o encabezados de formularios
    h4: {
        fontSize: '1.25rem',
        fontWeight: 500,
        lineHeight: 1.4,
    },

    // Texto de lectura principal (Biografías, descripciones de proyectos)
    body1: {
        fontSize: '1rem',
        fontWeight: 400,
        lineHeight: 1.6, // Altura de línea óptima para que la lectura sea descansada
    },

    // Texto secundario (Fechas de empleo, etiquetas/tags de tecnologías, subtítulos)
    body2: {
        fontSize: '0.875rem',
        fontWeight: 400,
        lineHeight: 1.5,
    },

    // Botones de llamada a la acción
    button: {
        fontSize: '0.875rem',
        fontWeight: 600,
        textTransform: 'none', // IMPORTANTE: Quita las mayúsculas automáticas de MUI para un look más serio y moderno
        lineHeight: 1.75,
    },

    // Texto ultra pequeño (Pie de página o notas de derechos de autor)
    caption: {
        fontSize: '0.75rem',
        fontWeight: 400,
        lineHeight: 1.4,
    },
};

export default typography;

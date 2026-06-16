import PropTypes from 'prop-types';

export default function Container(theme) {
    return {
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(2),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '100%',
                    width: '100%', // <--- Añadimos esto para centrar el login verticalmente en pantalla

                    // sm (Móvil horizontal / Tablet pequeña): 24px.
                    [theme.breakpoints.up('sm')]: {
                        padding: theme.spacing(1),
                    },

                    // md (Tablets grandes / Laptops compactas): 40px. Aquí el diseño empieza a respirar.
                    [theme.breakpoints.up('md')]: {
                        padding: theme.spacing(2),
                    },

                    // lg (Escritorio estándar): 64px. Da un aspecto muy premium y ordenado a tus secciones.
                    [theme.breakpoints.up('lg')]: {
                        padding: theme.spacing(4),
                    },

                    // xl (Monitores grandes / Ultrawide): 96px. Evita que el contenido se pegue a los extremos masivos.
                    [theme.breakpoints.up('xl')]: {
                        padding: theme.spacing(6),
                    },
                },
            },
        },
    };
}

Container.propTypes = {
    theme: PropTypes.object.isRequired,
};

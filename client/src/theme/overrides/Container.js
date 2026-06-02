import PropTypes from 'prop-types';


export default function Component (theme) {
    return {
        MuiContainer: {
            styleOverrides: {
                root: {
                    padding: theme.spacing(2),
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',

                    // sm (Móvil horizontal / Tablet pequeña): 24px.
                    [theme.breakpoints.up('sm')]: {
                        padding: theme.spacing(3),
                    },

                    // md (Tablets grandes / Laptops compactas): 40px. Aquí el diseño empieza a respirar.
                    [theme.breakpoints.up('md')]: {
                        padding: theme.spacing(5),
                    },

                    // lg (Escritorio estándar): 64px. Da un aspecto muy premium y ordenado a tus secciones.
                    [theme.breakpoints.up('lg')]: {
                        padding: theme.spacing(8),
                    },

                    // xl (Monitores grandes / Ultrawide): 96px. Evita que el contenido se pegue a los extremos masivos.
                    [theme.breakpoints.up('xl')]: {
                        padding: theme.spacing(12),
                    },
                },
            },
        },
    };
}

Component.propTypes = {
    theme: PropTypes.object.isRequired,

}
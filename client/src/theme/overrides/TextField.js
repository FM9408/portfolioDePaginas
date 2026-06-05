export default function TextField(theme) {
    return {
        MuiTextField: {
            defaultProps: {
                margin: 'normal',
                fullWidth: true,
                variant: 'outlined',
            },
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: '8px',
                        '& fieldset': {
                            borderColor: theme.palette.grey[400],
                        },
                        '&:hover fieldset': {
                            borderColor: theme.palette.primary.main,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.primary.main,
                        },
                    },
                },
            },
        },
    };
}

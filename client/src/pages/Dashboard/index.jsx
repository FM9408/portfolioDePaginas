import { Container, Box, Typography } from '@mui/material';



export default function Dashboard () {
    
   

    return (
        <Container>
            <Box sx={{ mt: 4 }}>
                <Typography variant="h1">Bienvenido al Dashboard</Typography>
                <Typography variant="body1">Este es un área protegida. Solo los usuarios autenticados pueden verla.</Typography>
            </Box>
        </Container>
    );
}


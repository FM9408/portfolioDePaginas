// src/pages/Login/index.jsx


import LogInForm from '../../components/LogIn.jsx';
import { Container, Box } from '@mui/material';


export default function Login() {
   

    return (
        <Container maxWidth='sm'>
            <Box sx={{ mt: 4 }}>
                <LogInForm />
            </Box>
        </Container>
    );
}

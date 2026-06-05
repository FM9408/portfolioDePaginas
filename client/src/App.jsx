import AppRoutes from './routes/AppRoutes';
import { AuthProvider } from './context/AuthContext'; // O como se llame tu proveedor
import './App.css';
import Navbar from './components/Navbar';
import { Container } from '@mui/material';

function App() {
    return (
        <AuthProvider>
            <Navbar />
            <Container maxWidth='lg'>
                <AppRoutes />
            </Container>
        </AuthProvider>
    );
}

export default App;

import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.jsx';
import ThemeProviderWrapper from './theme/index.jsx';
import store from './store/store';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <AuthProvider>
                <Provider store={store}>
                    <ThemeProviderWrapper>
                        <App />
                    </ThemeProviderWrapper>
                </Provider>
            </AuthProvider>
        </BrowserRouter>
    </StrictMode>
);

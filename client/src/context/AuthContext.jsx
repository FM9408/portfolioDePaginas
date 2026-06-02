// src/context/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from 'react';
// Importamos las herramientas de Firebase (asumiendo que ya configuraste tu archivo firebase.js)
import { auth } from '../firebase/config';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // onAuthStateChanged se queda "escuchando" a Firebase de fondo
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser); // Si hay usuario, guarda el objeto de Firebase. Si no, guarda null.
            setLoading(false); // Firebase ya respondió, dejamos de mostrar la pantalla de carga
        });

        // Limpieza del escuchador cuando el componente se desmonte
        return () => unsubscribe();
    }, []);

    // Función para iniciar sesión con Firebase
    const loginWithEmail = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Función para cerrar sesión con Firebase
    const logout = () => {
        return signOut(auth);
    };

    return (
        <AuthContext.Provider value={{ user, loginWithEmail, logout, loading }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

// src/context/AuthContext.jsx
import {
    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { auth } from '../firebase/config';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Derivamos el estado de autenticación de forma limpia
    const isAuthenticated = !!user;

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    // useCallback memoriza las referencias de las funciones para que no cambien en cada render
    const loginWithEmail = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const logout = useCallback(() => {
        return signOut(auth);
    }, []);

    const loginWithGoogle = useCallback(() => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
    }, []);

    // useMemo asegura que el objeto de contexto solo mute si realmente cambian sus dependencias
    const contextValue = useMemo(
        () => ({
            user,
            loginWithEmail,
            logout,
            loginWithGoogle,
            loading,
            isAuthenticated,
        }),
        [
            user,
            loginWithEmail,
            logout,
            loginWithGoogle,
            loading,
            isAuthenticated,
        ]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('UseAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};

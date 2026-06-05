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
import { auth, db } from '../firebase/config'; // Usamos la db configurada con el emulador
import { doc, getDoc } from 'firebase/firestore';
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);

    const isAuthenticated = !!user;
    const isAdmin = role === 'admin';

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            // Mantenemos o activamos el estado de carga al detectar un cambio de usuario
            setLoading(true);

            if (currentUser) {
                setUser(currentUser);

                try {
                    const userDocRef = doc(db, 'users', currentUser.uid);
                    const userDoc = await getDoc(userDocRef);

                    if (userDoc.exists()) {
                        setRole(userDoc.data().role || 'user');
                    } else {
                        setRole('user');
                    }
                } catch (error) {
                    console.error('Error al obtener el rol:', error);
                    setRole('user');
                }
            } else {
                setUser(null);
                setRole(null);
            }

            // CRÍTICO: loading solo pasa a false cuando ya tenemos el usuario Y su rol definidos
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const loginWithEmail = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const logout = useCallback(() => {
        return signOut(auth);
    }, []);

    const contextValue = useMemo(
        () => ({
            user,
            role,
            isAdmin,
            loading,
            isAuthenticated,
            loginWithEmail,
            logout,
        }),
        [user, role, isAdmin, loading, isAuthenticated, loginWithEmail, logout]
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
        throw new Error('useAuth debe ser utilizado dentro de un AuthProvider');
    }
    return context;
};

AuthProvider.propTypes = {
    children: PropTypes.node.isRequired,
};



import {

    createContext,
    useContext,
    useState,
    useEffect,
    useMemo,
    useCallback,
} from 'react';
import PropTypes from 'prop-types';
import { setUserinStore, cleanUserStore} from '../store/slices/user/userAuthSlice';
import { useDispatch } from 'react-redux';
import { auth } from '../firebase/config';
import { getUserImage } from '../firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
import { getFunctions, httpsCallable } from 'firebase/functions'; // <-- Importamos llamador de functions
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    signInAnonymously,
    linkWithCredential,
    EmailAuthProvider,
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState({
        role:"user",
        isAuthenticated: false,
        isAnonymous: true,
        image: null,
    });
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const isAuthenticated = !!user && !user.isAnonymous;
    const isAnonymous = !!user && user.isAnonymous;
    const isAdmin = role === 'admin';

    
    
    
    
    useEffect(() => {
        const setUserinStorefn = (currentUser) => {
            if (currentUser) {
                dispatch(setUserinStore({ ...currentUser.toJSON(), isAuthenticated: true, role: role || 'user' }));
            }
        }
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
          setUserinStorefn(currentUser);

         

            if (currentUser && !currentUser.isAnonymous) {
                // Aquí usamos la DB local solo para leer el rol, no para escribir
                const { db } = await import('../firebase/config');
                try {
                    const userDoc = await getDoc(
                        doc(db, 'users', currentUser.uid)
                    );
                    const userPic = await getUserImage(currentUser.uid);
                    setUser({
                        ...currentUser.toJSON(),
                        ...userDoc.data(),
                        role: userDoc.exists() ? userDoc.data().role || 'user' : 'user',
                        photoURL: userPic,
                    });
                    setRole(user.role);
                } catch (e) {
                    setRole('user');
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });

        return () => unsubscribe();
    }, [dispatch, role]);

    const loginWithEmail = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const loginWithGoogle = useCallback(() => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return signInWithPopup(auth, provider);
    }, []);

  const registerAndLinkAccount = useCallback(
      async (email, password, username) => {
          if (!auth.currentUser) {
              await signInAnonymously(auth);
          }

          const currentUser = auth.currentUser;

          if (currentUser.isAnonymous) {
              const credential = EmailAuthProvider.credential(email, password);

              // 1. Vinculamos de forma local en Auth
              const userCredential = await linkWithCredential(
                  currentUser,
                  credential
              );

              // 2. Despertamos la Cloud Function pasándole email y el nuevo username
              const functions = getFunctions();
              const llamarFuncionServidor = httpsCallable(
                  functions,
                  'registrarDocumentoDesdeServidor'
              );

              await llamarFuncionServidor({ email: email, username: username });

              return userCredential;
          } else {
              throw new Error('Ya hay una sesión real activa.');
          }
      },
      []
  );

    const logout = useCallback(() => {
        dispatch(cleanUserStore());
        return signOut(auth);
    }, [dispatch]);

    const contextValue = useMemo(
        () => ({
            user,
            role,
            isAdmin,
            loading,
            isAuthenticated,
            isAnonymous,
            loginWithEmail,
            loginWithGoogle,
            registerAndLinkAccount,
            logout,
        }),
        [
            user,
            role,
            isAdmin,
            loading,
            isAuthenticated,
            isAnonymous,
            loginWithEmail,
            loginWithGoogle,
            registerAndLinkAccount,
            logout,
        ]
    );

    return (
        <AuthContext.Provider value={contextValue}>
            {!loading && children}
        </AuthContext.Provider>
    );
};

export const UseAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth debe usarse dentro de AuthProvider');
    return context;
};

AuthProvider.propTypes = { children: PropTypes.node.isRequired };

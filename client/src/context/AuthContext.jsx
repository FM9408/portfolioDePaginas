

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
import { useSelector } from 'react-redux';
import { getUserImage } from '../firebase/storage';
import { doc, getDoc } from 'firebase/firestore';
// <-- Importamos llamador de functions
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    GoogleAuthProvider,
    signInWithPopup,
    createUserWithEmailAndPassword,
    updateProfile
} from 'firebase/auth';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const {user} = useSelector(state => state.userAuth)
    const [userState, setUserState] = useState({
        role:"user",
        isAuthenticated: false,
        isAnonymous: true,
        image: null,
    });
    const [role, setRole] = useState(null);
    const [loading, setLoading] = useState(true);
    const dispatch = useDispatch();

    const isAuthenticated = !!userState && !userState.isAnonymous;
    const isAnonymous = !!userState && userState.isAnonymous;
    const isAdmin = role === 'admin';

    
    
    const setUserinStorefn = (user) => {
        if (user && user.uid !== "") {
            dispatch(setUserinStore({ ...user}));
        }
    }
    
    
    useMemo(() => {
        
        return () => {  setUserinStorefn(userState)};
    }, [userState])



    
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            
         

         

            if (currentUser) {
                // Aquí usamos la DB local solo para leer el rol, no para escribir
                const { db } = await import('../firebase/config');
                try {
                    const userDoc = await getDoc(
                        doc(db, 'users', currentUser.uid)
                    );
                    const userPic = await getUserImage(currentUser.uid);
                    setUserState({
                        ...currentUser.toJSON(),
                        ...userDoc.data(),
                        role: userDoc.exists() ? userDoc.data().role || 'user' : 'user',
                        photoURL: userPic,
                    });
                    setRole(userState.role);
                } catch (e) {
                    console.log(e)
                    setRole('user');
                }
            } else {
                setRole(null);
            }
            setLoading(false);
        });
        
        return() => {
            unsubscribe();
        }
        
    }, [dispatch, role, userState.role]);

    const loginWithEmail = useCallback((email, password) => {
        return signInWithEmailAndPassword(auth, email, password);
    }, []);

    const loginWithGoogle = useCallback(() => {
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: 'select_account' });
        return signInWithPopup(auth, provider);
    }, []);

    const registerWithEmail = useCallback(
        async (regiteredUser) => {
         try {
            const user = (await createUserWithEmailAndPassword(auth, regiteredUser.email, regiteredUser.password)).user;
            await updateProfile(user, {
             displayName: regiteredUser.displayName,
             photoURL: regiteredUser.photoURL || "",
            })
            
           
            return user.toJSON();
         } catch (error) {
          throw  new Error(error.message);
         ;
         }
      },
      []
  );

  const logout = useCallback(async() => {
        await signOut(auth);
        dispatch(cleanUserStore());
        setUserState({
            role:"user",
            isAuthenticated: false,
            isAnonymous: true,
            image: null,
        })
    }, [dispatch]);

    const contextValue = useMemo(
        () => ({
            userState,
            role,
            isAdmin,
            loading,
            isAuthenticated,
            isAnonymous,
            loginWithEmail,
            loginWithGoogle,
            registerWithEmail,
            logout,
        }),
        [
            userState,
            role,
            isAdmin,
            loading,
            isAuthenticated,
            isAnonymous,
            loginWithEmail,
            loginWithGoogle,
            registerWithEmail,
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

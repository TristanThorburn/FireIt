import app from '../firebase'
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react';

const AuthContext = React.createContext();

export const useAuth =() => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [ currentUser, setCurrentUser ] = useState();
    const [ loading, setLoading ] = useState(true)

    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async (email, password) => {
        signOut(auth);
    }

    useEffect ( () => {
        const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
        return unsubscribe;
    }, [auth])

    const value = {
        currentUser,
        login,
        logout,
    }

    return(
        <div>
            <AuthContext.Provider value={value}>
                {!loading && children}
            </AuthContext.Provider>
        </div>
    )
}

export default AuthProvider;

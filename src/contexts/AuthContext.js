import app from '../firebase'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react';
import { employeeCollectionRef } from '../library/firestoreCollections';
import { onSnapshot, query, where } from 'firebase/firestore';

const AuthContext = React.createContext();

export const useAuth =() => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [ currentUser, setCurrentUser ] = useState();
    const [ employeeContext, setEmployeeContext ] = useState([]);
    const [ fireitID, setFireitID ] = useState();
    const [ loading, setLoading ] = useState(true)

    const signUp = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email, password) => {
        return await signInWithEmailAndPassword(auth, email, password);
    }

    const logout = async (email, password) => {
        signOut(auth);
    }

    // Session Persistence, log out on tab close
    useEffect(() => {
        setPersistence(auth, browserSessionPersistence)
        .then((email, password) => {
            return signInWithEmailAndPassword(auth, email, password)
        })
        .catch((error) => {
            console.log(error.code, error.message)
        });
    },[auth])

    // Get user info from firebase auth on sign in/out etc
    useEffect ( () => {
            const unsubscribe = onAuthStateChanged(auth, user => {
            setCurrentUser(user);
            setLoading(false);
        });
            return unsubscribe;
    }, [auth])

    // get userID from user login
    useEffect(() => {
        const logInEmail = currentUser?.email.split('')
        const removeEmail = ['@', 'f', 'i','r','e','i','t','.','c','a']
        const currentUserId = logInEmail?.filter((word) => 
            !removeEmail.includes(word)).join().replace(/,/g, '')
            setFireitID(currentUserId)
    }, [currentUser?.email])

    // Query firestore by userID to get employee#
    useEffect(() => {
        const q = query(employeeCollectionRef, where('userID', '==', `${fireitID}`));
        const unsubscribe = onSnapshot(q, snapshot => {
            setEmployeeContext(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    }, [fireitID])

    const value = {
        currentUser,
        login,
        logout,
        signUp,
        employeeContext,
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

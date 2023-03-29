import app from '../firebase'
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, setPersistence, browserSessionPersistence } from 'firebase/auth'
import React, { useContext, useState, useEffect } from 'react';
import { employeeCollectionRef } from '../library/firestoreCollections';
import { query, where, getDocs } from 'firebase/firestore';

const AuthContext = React.createContext();

export const useAuth =() => {
    return useContext(AuthContext)
}

const AuthProvider = ({children}) => {
    const auth = getAuth(app);
    const [ currentUser, setCurrentUser ] = useState();
    const [ employeeContext, setEmployeeContext ] = useState([]);
    const [ managerContext, setManagerContext ] = useState(false)
    const [ fireitID, setFireitID ] = useState('');
    const [ loading, setLoading ] = useState(true)

    const signUp = async (email, password) => {
        return await createUserWithEmailAndPassword(auth, email, password)
    }

    const login = async (email, password) => {
            return await signInWithEmailAndPassword(auth, email, password);
    }

    // Set user database persistence
    useEffect(() => {
        if(currentUser){
            setPersistence(auth, browserSessionPersistence)
            .catch(error => {
                console.log(error.code, error.message)
            })
        }
    }, [auth, currentUser])

    const logout = async (email, password) => {
        signOut(auth);
    }

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
        if(currentUser){
            const logInEmail = currentUser?.email.split('')
            const removeEmail = ['@', 'f', 'i','r','e','i','t','.','c','a']
            const currentUserId = logInEmail?.filter((word) => 
                !removeEmail.includes(word)).join().replace(/,/g, '')
                setFireitID(currentUserId)
            }
    }, [currentUser?.email, currentUser])

    // Query firestore by userID to get employee#
    useEffect(() => {
        if(fireitID !== ''){
            const q = query(employeeCollectionRef, where('userID', '==', `${fireitID}`));
            
            const loggedInUserCheck = async () => {
                setEmployeeContext([])
                const result = await getDocs(q)
                let user = []
                result.forEach((doc) => {
                    user.push(doc.data());
                })
                setEmployeeContext(user[0])
            }
            loggedInUserCheck()
        }
    }, [fireitID])

    const value = {
        currentUser,
        login,
        logout,
        signUp,
        employeeContext,
        setManagerContext,
        managerContext
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

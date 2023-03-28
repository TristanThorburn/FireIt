import { useAuth } from '../../../contexts/AuthContext';
import { getAuth, fetchSignInMethodsForEmail, deleteUser } from 'firebase/auth';
import { useState, useEffect } from 'react';

const EmployeeFirebase = (props) => {
    const { signUp, logout, login } = useAuth();
    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')
    const [ loading, setLoading ] = useState(false);
    const [ userExistsFireAuth, setUserExistsFireAuth ] = useState('')
    const [ deleteFireAuth, setDeleteFireAuth ] = useState(false)
    const { email, pw, setFirebaseAuthWarning } = props
    const password = pw + 'fireit'

    // Notify user of loading
    useEffect(() => {
        if(loading){
            setSuccess('Loading')
        }
        if(!loading){
            setSuccess('')
        }
    }, [loading])

    // Check firebase auth to confirm if email exists in the system already
    useEffect(() => {
        if(email !== ''
            && email !== undefined
            && email !== 'tristanthorburn@gmail.com'
            && email !== '@fireit.ca'){
            const auth = getAuth();
            const checkFirebaseAuthStatus = async () => {
                    try{
                        let signInMethods = await fetchSignInMethodsForEmail(auth, email);
                            if (signInMethods.length > 0) {
                                setUserExistsFireAuth(true)
                                setFirebaseAuthWarning(true)
                            } else {
                                setUserExistsFireAuth(false)
                                setFirebaseAuthWarning(false)
                            }
                    } catch (error) {
                        setError(error.message)
                    }
            }
            checkFirebaseAuthStatus()
        }
    }, [email, setFirebaseAuthWarning])

    // Delete user from firebase authentication after temporary log in
    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser
        if(user && deleteFireAuth){
            deleteUser(user)
            setUserExistsFireAuth(false)
            setFirebaseAuthWarning(false)
            setDeleteFireAuth(false)
            setLoading(false)
            setError('')
        }
    }, [deleteFireAuth, setFirebaseAuthWarning])
    
    const handleActivate = async () => {
        try{
            setError('')
            setLoading(true)
            await signUp (email, password)
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
        await logout()
    }

    const handleDeactivate = async () => {
        try{
            setError('')
            setLoading(true)
            await login(email, password)
            .then(setDeleteFireAuth(true))
        } catch (error) {
            setError(error.message)
        }
    }

    return(
        <div className='employeeActivateFirebase'>
            {email === 'tristanthorburn@gmail.com'
                    ? <h3>This Demo User is Always Active</h3>
                    : userExistsFireAuth
                        ? <>
                            <h3>Server Firebase Login Active</h3>
                            <button
                                className='newItemButton deleteItemButton'
                                onClick={handleDeactivate}
                                disabled={loading}
                                >Deactivate?
                            </button>
                        </>
                        : <>
                            <h3>Server Firebase Login Disabled</h3>
                            <button
                                className='newItemButton'
                                onClick={handleActivate}
                                disabled={loading}
                                >Activate?
                            </button>
                        </>
            }

            {success
                ? <div className='padSuccess'>{success}</div>
                : error
                    ? null
                    : <div className='padError'>{error}</div>
            }
        </div>
    )
}

export default EmployeeFirebase;
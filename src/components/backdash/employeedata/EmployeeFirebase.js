import { useAuth } from '../../../contexts/AuthContext';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const EmployeeFirebase = (props) => {
    const { signUp, logout } = useAuth();
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false);
    const [ userExistsFireAuth, setUserExistsFireAuth ] = useState('')
    const navigate = useNavigate()
    const { email, pw, setFirebaseAuthWarning } = props
    const password = pw + 'fireit'

    // Check firebase auth to confirm if email exists in the system already
    useEffect(() => {
        if(email !== ''
            && email !== undefined
            && email !== 'tristanthorburn@gmail.com'
            && email !== '@fireit.ca'){
            const checkFirebaseAuthStatus = async () => {
                const auth = getAuth();
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
        navigate('/login')
    }

    return(
        <div className='employeeActivateFirebase'>
            {email === undefined || pw === undefined
                ? <h3>Users require an ID & Password to activate</h3>
                : userExistsFireAuth || email === 'tristanthorburn@gmail.com'
                    ? <h3>Server UserID and UserPW are Active</h3>
                    : <>
                        <h3>Server UserID and UserPW are Disabled</h3>
                        <button
                            className='newItemButton'
                            onClick={handleActivate}
                            disabled={loading}
                            >Activate Employee?
                        </button>
                        <p>Returns to landing screen on submit</p>
                    </>
            }

            {error === 'Firebase: Error (auth/missing-identifier).'
                ? null
                : error === 'Firebase: Error (auth/invalid-email).'
                    ? null
                    : <div className='padError'>{error}</div>
            }
        </div>
    )
}

export default EmployeeFirebase;
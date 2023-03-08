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
    const email = props.user
    const password = props.pw + 'fireit'

    // Check firebase auth to confirm if email exists in the system already
    useEffect(() => {
        if(props.user !== ''){
            const checkFirebaseAuthStatus = async () => {
                const auth = getAuth();
                    try{
                        let signInMethods = await fetchSignInMethodsForEmail(auth, email);
                            if (signInMethods.length > 0) {
                                setUserExistsFireAuth(true)
                            } else {
                                setUserExistsFireAuth(false)
                            }
                    } catch (error) {
                        setError(error.message)
                    }
            }
            checkFirebaseAuthStatus()
        }
    }, [email, props.user])
    
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
            {userExistsFireAuth
                ? <h3>Server UserID and UserPW are Active</h3>
                : <>
                    <h3>Server UserID and UserPW are Disabled</h3>
                    <button
                        className='newItemButton'
                        onClick={handleActivate}
                        disabled={loading}
                        >Activate Employee?
                    </button>
                    <p>Logs out user upon submit</p>
                </>
            }

            {error === 'Firebase: Error (auth/missing-identifier).'
                ? null
                : <div className='padError'>{error}</div>
            }
        </div>
    )
}

export default EmployeeFirebase;
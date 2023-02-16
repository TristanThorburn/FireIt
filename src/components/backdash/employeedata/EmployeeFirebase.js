import { useAuth } from '../../../contexts/AuthContext';
import { getAuth, fetchSignInMethodsForEmail } from 'firebase/auth';
import { useState, useEffect } from 'react';

const EmployeeFirebase = (props) => {
    const { signUp } = useAuth();
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false);
    const [ userExistsFireAuth, setUserExistsFireAuth ] = useState('')
    const email = props.user
    const password = props.pw + 'fireit'

    // Check firebase auth to confirm if email exists in the system already
    useEffect(() => {
        const checkFirebaseAuthStatus = async () => {
            const auth = getAuth();
                let signInMethods = await fetchSignInMethodsForEmail(auth, props.user);
                    if (signInMethods.length > 0) {
                        setUserExistsFireAuth(true)
                    } else {
                        setUserExistsFireAuth(false)
                    }
        }
        checkFirebaseAuthStatus()
    }, [props.user])
    
    const handleActivate = async () => {
        try{
            setError('')
            setLoading(true)
            await signUp (email, password)
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }

    return(
        <div className='employeeActivateFirebase'>
            {userExistsFireAuth
                ? <h3>Server UserID and UserPW are Active</h3>
                : <>
                    <h3>Server UserID and UserPW are Disabled</h3>
                    <button onClick={handleActivate} disabled={loading}>Activate Employee?</button>
                </>
            }
            <div className='padError'>{error}</div>
        </div>
    )
}

export default EmployeeFirebase;
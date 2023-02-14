import { useAuth } from '../../../contexts/AuthContext';
import { useState } from 'react';

const EmployeeFirebase = (props) => {
    const { signUp, currentUser, logout } = useAuth();
    const [ error, setError ] = useState('')
    const [ loading, setLoading ] = useState(false);
    const email = props.user
    const password = props.pw + 'fireit'

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

    const handleNewActivate = async () => {
        try{
            setError('')
            setLoading(true)
            await logout()
        } catch {
            setError('failed user clear')
        }
        setLoading(false)
    }

    return(
        <div className='employeeActivateFirebase'>
            <h3>Activate Employee?</h3>
            <p>Work around to connect users to firebase authentication to allow log  in to the initial sever terminal, using UserID followed by UserPW</p>
            {error}
            {currentUser?.email
                ? <>
                    <button onClick={handleNewActivate}>Authenticate New User?</button>
                </>
                : <button onClick={handleActivate} disabled={loading}>Submit Activation?</button>
            }
        </div>
    )
}

export default EmployeeFirebase;
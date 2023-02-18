import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CheckTabNav = () => {
    const { currentUser, logout, employeeContext } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleTest = () => {
        console.log('test')
    }

    const handleLogout = async () => { 
        if(currentUser.email){
            try {
                await logout()
                navigate('/login')
            } catch (error) {
                setError(error.message)
            }
        }
    }

    return(
        <div className='frontLowerNav'>
            <ul>
                <li><button onClick={handleTest} className='testButton'>Test</button></li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>HELP</li>
                <li className='navCurrentUser'>{error
                        ? <p>{error}</p>
                            : employeeContext
                                ? <p>User: {employeeContext.firstName}</p>
                                : <p>No User</p>
                    }
                </li>
                <li><button onClick={handleLogout} className='workingButton'>LogOut</button></li>
            </ul>
        </div>
    )
}
export default CheckTabNav;
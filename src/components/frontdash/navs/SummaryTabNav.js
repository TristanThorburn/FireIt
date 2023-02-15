import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SummaryTabNav = () => {
    const { currentUser, logout } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

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
        <div className='summaryTabNav'>
            <ul>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>HELP</li>
                <li>{error
                        ? <>{error}</>
                        : <>{currentUser.email}</>
                    }
                </li>
                <li onClick={handleLogout}><button>LogOut</button></li>
            </ul>
        </div>
    )
}
export default SummaryTabNav;
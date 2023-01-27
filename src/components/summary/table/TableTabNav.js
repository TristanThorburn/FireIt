import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TableTabNav = () => {
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
        <div className="tableTabNav">
            <ul>
                <li>{currentUser.email}</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>Demo</li>
                <li>{error
                        ? <>{error}</>
                        : <>Demo</>
                    }
                </li>
                <li onClick={handleLogout}><button>LogOut</button></li>
            </ul>
        </div>
    )
}
export default TableTabNav;
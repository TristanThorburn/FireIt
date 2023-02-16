import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const CheckTabNav = () => {
    const { currentUser, logout, employeeContext } = useAuth();
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
        <div className='checkTabNav'>
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
                            : employeeContext[0]
                                ? <>User: {employeeContext[0]?.data.firstName}</>
                                : <>No User</>
                    }
                </li>
                <li onClick={handleLogout}><button>LogOut</button></li>
            </ul>
        </div>
    )
}
export default CheckTabNav;
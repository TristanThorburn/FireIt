import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TableTabNav = () => {
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

    const handleTest = () => {
        console.log(employeeContext[0])
    }

    return(
        <div className='tableTabNav'>
            <ul>
                <li onClick={handleTest}>Test</li>
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
export default TableTabNav;
import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MenuTabNav = (props) => {
    const { currentUser, logout, employeeContext } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleDirectory = () => {
        props.toDirectory(true)
        props.toApps(false);
        props.toMains(false);
        props.toDesserts(false);
        props.toNonAlch(false);
        props.toBeer(false);
        props.toCidSpr(false);
        props.toMixed(false);
        props.toLiquors(false);
        props.toWines(false);
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
        <div className='menuTabNav'>
            <ul>
                <li>SEND ORDER</li>
                <li>SEAT #?</li>
                <li>SEAT NAME</li>
                <li>HIDE OLD</li>
                <li onClick={handleDirectory}>DIRECTORY</li>
                <li>CHNG TBL</li>
                <li>HELP</li>
                <li>{error
                        ? <>{error}</>
                            : employeeContext
                                ? <>User: {employeeContext.firstName}</>
                                : <>No User</>
                    }
                </li>
                <li onClick={handleLogout}><button>LogOut</button></li>
            </ul>
        </div>
    )
}
export default MenuTabNav;
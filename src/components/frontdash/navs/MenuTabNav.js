import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MenuTabNav = (props) => {
    const { currentUser, logout, employeeContext } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleSeatNum = () => {
        props.setSeatKeyPadActive(true)
        props.setSelectedSeat('')
        props.setCurrentOrderData('')
    }
    
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
        <div className='frontLowerNav'>
            <ul>
                <li><button className='nonWorkingButton'>SEND ORDER</button></li>
                <li><button onClick={handleSeatNum} className='workingButton'>SEAT #?</button></li>
                <li><button className='nonWorkingButton'>SEAT NAME</button></li>
                <li><button className='nonWorkingButton'>HIDE OLD</button></li>
                <li><button onClick={handleDirectory} className='workingButton'>MAIN MENU</button></li>
                <li><button className='nonWorkingButton'>CHNG TBL</button></li>
                <li><button className='nonWorkingButton'>HELP</button></li>
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
export default MenuTabNav;
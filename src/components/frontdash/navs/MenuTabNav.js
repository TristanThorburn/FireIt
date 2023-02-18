import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MenuTabNav = (props) => {
    const { currentUser, logout, employeeContext } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleSeatNum = () => {
        props.setSeatKeyPadActive(true)
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
        <div className='menuTabNav'>
            <ul>
                <li><button className='nonWorkingButton'>SEND ORDER</button></li>
                <li><button onClick={handleSeatNum} className='workingButton'>SEAT #?</button></li>
                <li><button className='nonWorkingButton'>SEAT NAME</button></li>
                <li><button className='nonWorkingButton'>HIDE OLD</button></li>
                <li><button onClick={handleDirectory} className='workingButton'>DIRECTORY</button></li>
                <li><button className='nonWorkingButton'>CHNG TBL</button></li>
                <li><button className='nonWorkingButton'>HELP</button></li>
                <li>{error
                        ? <>{error}</>
                            : employeeContext
                                ? <>User: {employeeContext.firstName}</>
                                : <>No User</>
                    }
                </li>
                <li><button onClick={handleLogout} className='workingButton'>LogOut</button></li>
            </ul>
        </div>
    )
}
export default MenuTabNav;
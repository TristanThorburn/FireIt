import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const MenuTabNav = (props) => {
    const { currentUser, logout, employeeContext, managerContext, setManagerContext } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleSendOrder = () => {
        props.setSendOrder(true)
    }

    const handleSeatNum = () => {
        props.setSeatKeyPadActive(true)
        props.setSelectedSeat('')
        props.setCurrentOrderData('')
    }

    const handleChangeTable = () => {
        props.setAlphaNumericPadOpen(true)
    }

    const handleMgrOveride = () => {
        if(managerContext === false){
            props.setManagerKeyPadActive(true)
        }
        
        if(managerContext === true){
            setManagerContext(false)
        }
    }
    
    const handleDirectory = () => {
        props.setMenuCategory('directory')
    }
    
    const handleHelp = () => {
        props.setHelpModal(true)
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
                <li><button onClick={handleMgrOveride} className='workingButton'>
                    {managerContext
                        ? 'CANCEL MANAGER AUTH'
                        : 'GET MANAGER AUTH'
                    }
                    </button>
                </li>
                <li><button onClick={handleSendOrder} className='workingButton'>SEND ORDER</button></li>
                <li><button onClick={handleSeatNum} className='workingButton'>SEAT #?</button></li>
                <li>
                    <button onClick={handleChangeTable} className='workingButton'>CHNG TBL</button>
                </li>
                <li><button onClick={handleDirectory} className='workingButton'>MAIN MENU</button></li>
                <li><button className='nonWorkingButton'>DEMO</button></li>
                <li>
                    <button onClickCapture={handleHelp} className='infoButton'>
                        🔥
                        <p>INFO</p>
                    </button>
                </li>
                <li className='navCurrentUser'>{error
                        ? <p>{error}</p>
                            : employeeContext
                                ? <p>User:
                                    <br />
                                    {employeeContext.firstName}</p>
                                : <p>No User</p>
                    }
                </li>
                <li><button onClick={handleLogout} className='workingButton'>LogOut</button></li>
            </ul>
        </div>
    )
}
export default MenuTabNav;
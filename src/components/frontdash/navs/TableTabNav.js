import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const TableTabNav = (props) => {
    const { currentUser, logout, employeeContext, setManagerContext, managerContext } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleTest = () => {
        console.log(employeeContext)
    }
    
    const handleMgrOveride = () => {
        if(managerContext === false){
            props.setManagerKeyPadActive(true)
        }
        
        if(managerContext === true){
            setManagerContext(false)
        }
    }

    const handleWelcome = () => {
        props.setMessageOfTheDay(true)
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
                        ? 'CANCEL MGR'
                        : 'MGR OVER'
                    }
                    </button>
                </li>
                <li><button className='nonWorkingButton'>Demo</button></li>
                <li><button onClick={handleTest} className='testButton'>Test</button></li>
                <li>
                    <button 
                        onClick={handleWelcome}
                        className='workingButton'
                        >Welcome</button>
                </li>
                <li className='infoButton'>
                    <button onClick={handleHelp}>🔥</button>
                    <p onClick={handleHelp}>INFO</p>
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
export default TableTabNav;
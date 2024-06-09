import { useAuth } from '../../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const SummaryTabNav = (props) => {
    const { currentUser, logout, employeeContext, setManagerContext, managerContext } = useAuth();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleTest = () => {
        console.log('test')
    }
    
    const handleMgrOveride = () => {
        if(managerContext === false){
            props.setManagerKeyPadActive(true)
        }
        
        if(managerContext === true){
            setManagerContext(false)
        }
    }

    const handleNewTable = () => {
        props.setAlphaNumericPadOpen(true)
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
                <li>
                    <button onClick={handleNewTable} className='workingButton'>CHANGE TABLE</button>
                </li>
                <li><button className='nonWorkingButton'>Demo</button></li>
                <li><button className='nonWorkingButton'>Demo</button></li>
                <li><button onClick={handleTest} className='testButton'>Test</button></li>
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
export default SummaryTabNav;
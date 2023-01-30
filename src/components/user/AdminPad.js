import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPad = (props) => {
    let pinCombo = [];
    const [ error, setError ] = useState();
    const [ adminAuth, setAdminAuth ] = useState()
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (pinCombo.length <3){
            pinCombo.push(e.target.textContent)
        } else if(pinCombo.length === 3){
            pinCombo.push(e.target.textContent)
            const loginPass = new Array(pinCombo.join().replace(/,/g, '')).toString();
            setAdminAuth(loginPass);
        }
    }

    const handleClear = () => {
        pinCombo = [];
        setError('Combo Cleared')
        setTimeout(() => {
            setError('')
        }, 1000)
    }

    const handleAdminAuth = () => {
        if(adminAuth === '8829') {
            navigate('/backend-dash')
        } else {
            setError('Incorrect PIN')
            pinCombo = []
        }
    }

    const closeAdmin = () => {
        props.closeAdmin(!closeAdmin)
    }

    return(
        <div className='loginContainer adminPad'>
            <div className='keypad'>
                <button onClick={closeAdmin} className='closeAdmin'>X</button>
                    <table>
                        <thead>
                            <tr>
                                <th colSpan={3}>Admin PIN?</th>
                            </tr>
                        </thead>
                        <tbody>
                        <tr>
                                <td onClick={handleClick}><button>1</button></td>
                                <td onClick={handleClick}><button>2</button></td>
                                <td onClick={handleClick}><button>3</button></td>
                            </tr>
                            <tr>
                                <td onClick={handleClick}><button>4</button></td>
                                <td onClick={handleClick}><button>5</button></td>
                                <td onClick={handleClick}><button>6</button></td>
                            </tr>
                            <tr>
                                <td onClick={handleClick}><button>7</button></td>
                                <td onClick={handleClick}><button>8</button></td>
                                <td onClick={handleClick}><button>9</button></td>
                            </tr>
                            <tr>
                                <td onClick={handleClear}><button>⛔</button></td>
                                <td onClick={handleClick}><button>0</button></td>
                                <td onClick={handleAdminAuth}>
                                    <button>🔥</button></td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div className='padError'>{error}</div>
                </div>
            </div>
    )

}

export default AdminPad;
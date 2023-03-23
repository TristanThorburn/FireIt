import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const PassPad = (props) => {
    let pinCombo = [];
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] =useState('')
    const { login, setLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if(loading){
            setSuccess('Loading')
        }
        if(!loading){
            setSuccess('')
        }
    }, [loading])

    const handleClick = (e) => {
        if (pinCombo.length <3){
            pinCombo.push(e.target.textContent)
        } else if(pinCombo.length === 3){
            pinCombo.push(e.target.textContent)
            pinCombo.push('fireit')
            const loginPass = new Array(pinCombo.join().replace(/,/g, ''));
            props.setPassword(loginPass);
        }
    }

    const handleClear = () => {
        pinCombo = [];
        setError('Combo Cleared')
        setTimeout(() => {
            setError('')
        }, 1000)
    }

    const handleLogin = async () => {
        if(props.email && props.password){
            try {
                setError('')
                setLoading(true)
                await login(props.email.toString(), props.password.toString())
                setLoggedIn(true)
                navigate('/')
            } catch (error) {
                setError(error.message)
            }
        setLoading(false)}
    }

    const handleCloseModal = () => {
        props.setEmail('')
    }

    return(
        <div className='keypad'>
            <button onClick={handleCloseModal} className='closePad'>X</button>
            <table>
                <thead>
                    <tr>
                        <th colSpan={3}>Pass? (Demo:5555🔥)</th>
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
                        <td onClick={handleLogin} hidden={!props.password}>
                            <button disabled={loading}>🔥</button></td>
                    </tr>
                </tbody>
            </table>
            
            {success
                ? <div className='padSuccess'>{success}</div>
                : error
                    ? <div className='padError'>{error}</div>
                    : null
            }
        </div>
    )

}

export default PassPad;
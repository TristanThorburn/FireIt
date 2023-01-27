import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

const KeyPad = () => {
    let userCombo = [];
    let pinCombo = [];
    const [ error, setError ] = useState();
    const [ loading, setLoading ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleClick = (e) => {
        if (userCombo.length <=3){
            userCombo.push(e.target.textContent)
        } else if(userCombo.length === 4 && pinCombo.length <=3){
            pinCombo.push(e.target.textContent)
        }
        if(userCombo.length === 4 && pinCombo.length === 4){
            userCombo.push('@fireit.ca')
            pinCombo.push('fireit')
            const loginUser = userCombo.join().replace(/,/g, '');
            const loginPass = pinCombo.join().replace(/,/g, '');
            setEmail(loginUser)
            setPassword(loginPass)
        }
    }

    const handleClear = async () => {
            userCombo = [];
            pinCombo = [];
    }

    const handleLogin = async () => {
        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate('/')
        } catch (error) {
            setError(error.message)
        }
        setLoading(false)
    }


    return(
        <div className='loginContainer'>
            
            <div className='demoGuide'>To Demo User:5555, Password:5555, 🔥</div>
            <div>{error}</div>

            <div className='keypad'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>Fire It</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={handleClick}>1</td>
                            <td onClick={handleClick}>2</td>
                            <td onClick={handleClick}>3</td>
                        </tr>
                        <tr>
                            <td onClick={handleClick}>4</td>
                            <td onClick={handleClick}>5</td>
                            <td onClick={handleClick}>6</td>
                        </tr>
                        <tr>
                            <td onClick={handleClick}>7</td>
                            <td onClick={handleClick}>8</td>
                            <td onClick={handleClick}>9</td>
                        </tr>
                        <tr>
                            <td onClick={handleClear}>⛔</td>
                            <td onClick={handleClick}>0</td>
                            <td onClick={handleLogin} disabled={loading}>🔥</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default KeyPad;
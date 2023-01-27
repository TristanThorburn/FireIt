import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';

const KeyPad = () => {
    let userCombo = [];
    let pinCombo = [];
    const [ error, setError ] = useState();
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState()
    const { login, currentUser, logout } = useAuth();

    const handleClick = (e) => {
        if (userCombo.length <=3){
            userCombo.push(e.target.textContent)
            console.log("user", userCombo, "pin", pinCombo)
        } else if(userCombo.length === 4 && pinCombo.length <=3){
            pinCombo.push(e.target.textContent)
            console.log("user", userCombo, "pin", pinCombo)
        }
        if(userCombo.length === 4 && pinCombo.length === 4){
            userCombo.push('@fireit.ca')
            pinCombo.push('fireit')
            const loginUser = userCombo.join().replace(/,/g, '');
            const loginPass = pinCombo.join().replace(/,/g, '');
            console.log("loginUser:", loginUser, "loginPass:", loginPass);
            setEmail(loginUser)
            setPassword(loginPass)
        }
    }

    const handleClear = async () => {
            userCombo = [];
            pinCombo = [];
            if(currentUser.email){
                try {
                    await logout()
                } catch (error) {
                    setError(error.message)
                }
            }
    }

    const handleLogin = async () => {
        try {
            await login(email, password)
        } catch (error) {
            setError(error.message)
        }
    }


    return(
        <div className='loginContainer'>
            
            <div>{error}</div>
            <div>{currentUser?.email}</div>

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
                            <td onClick={handleLogin}>🔥</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )

}

export default KeyPad;
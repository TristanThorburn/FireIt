import KeyPad from './KeyPad';
import { useState } from 'react';

const Login = () => {
    const [ showButton, setShowButton ] = useState(false);
    const [ userId, setUserId ] = useState();
    const [ userPin, setUserPin ] = useState();

    const submitUser = () => {
        console.log("user:",userId, "pin:",userPin)
    }

    return(
        <div className='loginContainer'>
            <div className='keypad'>
                <KeyPad user={setUserId} pin={setUserPin} button={setShowButton}/>
                {showButton
                    ? <button onClick={submitUser} className='login'>🔥</button>
                    : null}
            </div>
        </div>
    )
}

export default Login;
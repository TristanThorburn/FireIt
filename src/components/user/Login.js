import { useState } from 'react';
import UserPad from './UserKeyPad';
import PassPad from './PassKeyPad';

const Login = () => {
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    return(
        <div className='loginContainer'>
            <div className='demoGuide'><p>To Demo User:5555🔥, Password:5555🔥</p></div>
            <h1>Fire it</h1>
                        
            {email
            ? <PassPad setEmail={setEmail} setPassword={setPassword} email={email} password={password}/>
            : <UserPad setEmail={setEmail}/>
            }

        </div>
    )
}

export default Login;
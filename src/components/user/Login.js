import { useState } from 'react';
import UserPad from './UserPad';
import PassPad from './PassPad';

const Login = () => {
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    return(
        <div className='loginContainer'>
            <div className='demoGuide'><p>To Demo User:5555🔥, Password:5555🔥</p></div>
            <h1>Fire it</h1>
                        
            {email
            ? <PassPad setPassword={setPassword} email={email} password={password}/>
            : <UserPad setEmail={setEmail}/>
            }

        </div>
    )
}

export default Login;
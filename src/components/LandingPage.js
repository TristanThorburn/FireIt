import { useState } from 'react';
import AppLandingInfo from './help/AppLandingInfo';
import UserPad from './user/UserKeyPad';
import PassPad from './user/PassKeyPad';

const Login = () => {
    const [ loginToApp, setLoginToApp ] = useState(false);
    const [ appInfo, setAppInfo ] = useState(false);
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();

    const handleLogin = () => {
        setLoginToApp(true)
    }

    const handleAppInfo = () => {
        setAppInfo(true)
    }

    return(
        <div className='loginContainer'>
            {appInfo
                ? <AppLandingInfo
                    setAppInfo={setAppInfo}
                    />
                : email
                    ? <PassPad 
                        setEmail={setEmail} 
                        setPassword={setPassword} 
                        email={email} 
                        password={password}
                        /> 
                    : loginToApp
                        ? <UserPad
                            setEmail={setEmail}
                            setLoginToApp={setLoginToApp}
                            />
                        : <div className='landingContainer'>
                            <div className='landingLogin'>
                                <button onClick={handleLogin}>🔥</button>
                                <h1 onClick={handleLogin}>FIRE IT</h1>
                            </div>
                            <div className='landingInfo'>
                                <button onClick={handleAppInfo}>🔥</button>
                                <h2 onClick={handleAppInfo}>INFO</h2>
                            </div>
                        </div>
            }

        </div>
    )
}

export default Login;
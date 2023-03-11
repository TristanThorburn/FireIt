import { useState } from 'react';
import AppLandingInfo from './help/AppLandingInfo';
import UserPad from './keypads/UserKeyPad';
import PassPad from './keypads/PassKeyPad';

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
        <div className='landingContainer'>
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
                        : <div className='loginPad'>
                            <div className='loginLogo'>
                                <button onClick={handleLogin}>🔥</button>
                                <h1 onClick={handleLogin}>FIRE IT</h1>
                            </div>
                            <div className='infoButton'>
                                <button onClick={handleAppInfo}>🔥</button>
                                <p onClick={handleAppInfo}>INFO</p>
                            </div>
                        </div>
            }

        </div>
    )
}

export default Login;
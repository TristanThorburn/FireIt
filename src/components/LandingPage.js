import { useState } from 'react';
import AppLandingInfo from './help/AppLandingInfo';
import UserPad from './keypads/UserKeyPad';
import PassPad from './keypads/PassKeyPad';
import BackDashHelp from './help/BackDashHelp';

const Login = () => {
    const [ loginToApp, setLoginToApp ] = useState(false);
    const [ appInfo, setAppInfo ] = useState(false);
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ loginHelp, setLoginHelp ] = useState(false);

    const handleLogin = () => {
        setLoginToApp(true)
    }

    const handleAppInfo = () => {
        setAppInfo(true)
    }

    const handleLoginHelp = () => {
        setLoginHelp(true)
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

            {loginToApp
                ? <div className='infoButton loginHelp'>
                    <button onClick={handleLoginHelp}>🔥</button>
                    <p onClick={handleLoginHelp}>INFO</p>
                </div>
                : null
            }

            {loginHelp
                ? <BackDashHelp
                    loginHelp={loginHelp}
                    setLoginHelp={setLoginHelp}
                    />
                : null
            }
        </div>
    )
}

export default Login;
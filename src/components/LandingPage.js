import { useState } from 'react';
import AppLandingInfo from './help/AppLandingInfo';
import UserPad from './keypads/UserKeyPad';
import PassPad from './keypads/PassKeyPad';
import BackDashHelp from './help/BackDashHelp';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [ loginToApp, setLoginToApp ] = useState(false);
    const [ appInfo, setAppInfo ] = useState(false);
    const [ email, setEmail ] = useState();
    const [ password, setPassword ] = useState();
    const [ loginHelp, setLoginHelp ] = useState(false);
    const navigate = useNavigate();

    const handleLogin = () => {
        setLoginToApp(true)
    }

    const handleAppInfo = () => {
        setAppInfo(true)
    }

    const handleLoginHelp = () => {
        setLoginHelp(true)
    }

    const handleAdminSkip = () => {
        navigate('/backend-dash')
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
                            <div className='landingLowerNav'>
                                <button onClickCapture={handleAppInfo} className='infoButton'>
                                    🔥
                                    <p>INFO</p>
                                </button>
                                <button onClickCapture={handleAdminSkip} className='infoButton'>
                                    🔥
                                    <p>ADMIN</p>
                                </button>
                            </div>
                        </div>
            }

            {loginToApp
                ? <button onClickCapture={handleLoginHelp} className='infoButton loginHelp'>
                    🔥
                    <p>INFO</p>
                </button>
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
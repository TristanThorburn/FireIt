import UserNumber from './UserNumber';
import UserPassword from './UserPassword';
import UserForm from './UserForm';
import { useState } from 'react';

const Login = () => {
    const [ showUserPad, setShowUserPad ] = useState(true);
    const [ showPasswordPad, setShowPasswordPad ] = useState(false);
    const [ showSubmitForm, setShowSubmitForm ] = useState(false);

    return(
        <div className='loginContainer'>
            {showUserPad 
                ? <UserNumber /> 
                : null}
            {showPasswordPad 
                ? <UserPassword /> 
                : null}
            {showSubmitForm
                ? <UserForm /> 
                : null}
        </div>
    )
}

export default Login;
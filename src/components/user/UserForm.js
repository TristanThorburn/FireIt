const UserForm = () => {
    return(
        <form action=''>
            <button type='submit' disabled={true}>🔥</button>
            <div>
                <label htmlFor='userNumber'></label>
                <input 
                    type='text'
                    name='userNumber'
                    id='userNumber'
                    required />
                <label htmlFor='usePassword'></label>
                <input 
                    type='text'
                    name='userPassword'
                    id='userNumber'
                    required />
            </div>    
        </form>
    )
}

export default UserForm;
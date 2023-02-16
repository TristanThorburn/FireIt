import { useState } from 'react';

const UserPad = (props) => {
    let userCombo = [];
    // let contextUser = []
    const [ userPin, setUserPin ] = useState()
    const [ submitable, setSubmitable ] = useState(false)
    const [ error, setError ] = useState('')
    
    const handleClick = (e) => {
        if (userCombo.length <3){
            userCombo.push(e.target.textContent)
        } else if(userCombo.length === 3){
            setSubmitable(true);
            userCombo.push(e.target.textContent)
            // contextUser.push(e.target.textContent)
            userCombo.push('@fireit.ca');
            const loginUser = new Array(userCombo.join().replace(/,/g, '')) 
            setUserPin(loginUser)
        }
    }
    const handleClear = () => {
        userCombo = [];
        // contextUser = []
        setError('Combo Cleared')
        setSubmitable(false);
        setTimeout(() => {
            setError('')
        }, 1000)
    }
    const handleUser = () => {
        props.setEmail(userPin);
    }
    return(
        <div className='keypad'>
                <table>
                    <thead>
                        <tr>
                            <th colSpan={3}>User?</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td onClick={handleClick}><button>1</button></td>
                            <td onClick={handleClick}><button>2</button></td>
                            <td onClick={handleClick}><button>3</button></td>
                        </tr>
                        <tr>
                            <td onClick={handleClick}><button>4</button></td>
                            <td onClick={handleClick}><button>5</button></td>
                            <td onClick={handleClick}><button>6</button></td>
                        </tr>
                        <tr>
                            <td onClick={handleClick}><button>7</button></td>
                            <td onClick={handleClick}><button>8</button></td>
                            <td onClick={handleClick}><button>9</button></td>
                        </tr>
                        <tr>
                            <td onClick={handleClear}><button>⛔</button></td>
                            <td onClick={handleClick}><button>0</button></td>
                            <td onClick={handleUser} hidden={!submitable}><button>🔥</button></td>
                        </tr>
                    </tbody>
                </table>

                <div className='padError'>{error}</div>
            </div>
    )

}

export default UserPad;
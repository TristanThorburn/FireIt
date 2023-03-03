import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ServerKeyPad = (props) => {
    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')
    const [ managerCombo, setManagerCombo ] =useState()
    const { setManagerContext } = useAuth()
    let numberCombo = []

    const handleCloseModal = () => {
        if(props.seatKeyPadActive){
            props.setSeatKeyPadActive(false)
        }

        if(props.managerKeyPadActive){
            props.setManagerKeyPadActive(false)
        }
    }

    const handleClick = (e) => {
        if (props.seatKeyPadActive){
            props.setSelectedSeat((previous) => previous + `${e.target.innerText}`)
        }

        if (props.managerKeyPadActive){
            if (numberCombo.length <3){
                numberCombo.push(e.target.textContent)
            } else if(numberCombo.length === 3){
                numberCombo.push(e.target.textContent)
                const managerPass = new Array(numberCombo.join().replace(/,/g, '')).toString();
                setManagerCombo(managerPass);
            }
        }
    }

    const handleClear = () => {
        if(props.seatKeyPadActive){
            props.setSelectedSeat('')
            setError('Seat Number Cleared')
        } else {
            setError('Combo Cleared')
        }
        setTimeout(() => {
            setError('')
        }, 1000)

        if(props.managerKeyPadActive){
            numberCombo = [];
            setError('Manager Pin Cleared')
        } else {
            setError('Combo Cleared')
        }
        setTimeout(() => {
            setError('')
        }, 1000)
    }

    const handleSubmit = () => {
        if(props.seatKeyPadActive){
            props.setSeatKeyPadActive(false)
        }
        if(props.managerKeyPadActive){
            if(managerCombo === '1985') {
                try{
                    setManagerContext(true)
                    setSuccess('Manager Authorized')
                    setTimeout(() => {
                        props.setManagerKeyPadActive(false)
                        setSuccess('')
                    }, 1000)
                } catch {
                    setError('failed log in')
                }
            } else {
                setError('Incorrect PIN')
                numberCombo = []
            }
        }
    }

    return(
        <div className='serverPad'>
            <div className='keypad'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <table>
                    <thead>
                        <tr>
                            {props.seatKeyPadActive
                                ? <th colSpan={3}>Seat Number? {props.selectedSeat}</th>
                                : null
                            }
                            {props.managerKeyPadActive
                                ? <th colSpan={3}>Manager Password?(1985)</th>
                                : null
                            }
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
                            <td><button onClick={handleSubmit}>🔥</button></td>
                        </tr>
                    </tbody>
                </table>
                
                {success
                    ? <div className='padSuccess'>{success}</div>
                    : error
                        ? <div className='padError'>{error}</div>
                        : null
                }
                
            </div>
        </div>
    )

}

export default ServerKeyPad;
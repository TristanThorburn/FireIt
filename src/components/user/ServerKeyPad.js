import { useState } from "react"

const ServerKeyPad = (props) => {
    const [ error, setError ] = useState('')
    // let numberCombo = []

    const handleCloseModal = () => {
        props.setSeatKeyPadActive(false)
    }

    const handleClick = (e) => {
        if (props.setSeatKeyPadActive){
            props.setSelectedSeat((previous) => previous + `${e.target.innerText}`)
        }
    }

    const handleClear = () => {
        // numberCombo = [];
        if(props.setSeatKeyPadActive){
            props.setSelectedSeat('')
            setError('Seat Number Cleared')
        } else {
            setError('Combo Cleared')
        }
        setTimeout(() => {
            setError('')
        }, 1000)
    }

    const handleSubmit = () => {
        if(props.setSeatKeyPadActive){
            props.setSeatKeyPadActive(false)
        }
    }

    return(
        <div className='serverPad'>
            <div className='keypad'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <table>
                    <thead>
                        <tr>
                            {props.setSeatKeyPadActive
                                ? <th colSpan={3}>Seat Number? {props.selectedSeat}</th>
                                : <th colSpan={3}>?</th>
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
                
                <div className='padError'>{error}</div>
            </div>
        </div>
    )

}

export default ServerKeyPad;
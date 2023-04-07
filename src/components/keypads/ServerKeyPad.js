import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

const ServerKeyPad = (props) => {
    const [ error, setError ] = useState('')
    const [ success, setSuccess ] = useState('')
    const [ managerCombo, setManagerCombo ] =useState()
    const [ tempSplitAmount, setTempSplitAmount ] = useState('')
    const { setManagerContext } = useAuth()
    let numberCombo = []

    const handleCloseModal = () => {
        if(props.seatKeyPadActive){
            props.setSeatKeyPadActive(false)
        }

        if(props.managerKeyPadActive){
            props.setManagerKeyPadActive(false)
        }

        if(props.selectReceiptTarget){
            props.setSelectReceiptTarget('false')
        }

        if(props.splitEven){
            props.setSplitEven(false)
        }
    }

    const handleClick = (e) => {
        if (props.seatKeyPadActive && props.selectedSeat.length < 2){
            props.setSelectedSeat((previous) => previous + `${e.target.innerText}`)
        } else if(props.seatKeyPadActive && props.selectedSeat.length === 2) {
            setError('Two digit maximum')
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

        if (props.selectReceiptTarget && props.targetReceiptNumber.length < 2){
            props.setTargetReceiptNumber((previous) => previous + `${e.target.innerText}`)
        } else if(props.selectReceiptTarget && props.targetReceiptNumber.length === 2) {
            setError('Two digit maximum')
        }

        if (props.splitEven && tempSplitAmount.length < 2){
            setTempSplitAmount((previous) => previous + `${e.target.innerText}`)
        } else if(props.splitEven && tempSplitAmount.length === 2){
            setError('Two digit maximum')
        }
    }

    const handleClear = () => {
        if(props.seatKeyPadActive){
            props.setSelectedSeat('')
            setError('Clearing Seat Number')
        } else {
            setError('Clearing Combo')
        }
        setTimeout(() => {
            setError('')
        }, 1000)

        if(props.managerKeyPadActive){
            numberCombo = [];
            setError('Clearing Manager PIN')
        } else {
            setError('Clearing Combo')
        }
        setTimeout(() => {
            setError('')
        }, 1000)

        if(props.selectReceiptTarget){
            props.setTargetReceiptNumber('')
            setError('Clearing Receipt Number')
        } else {
            setError('Clearing Combo')
        }
        setTimeout(() => {
            setError('')
        }, 1000)

        if(props.splitEven){
            setTempSplitAmount('')
            setError('Clearing receipt split amount')
        } else {
            setError('Clearing Combo')
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
            if(managerCombo === '1810') {
                try{
                    setManagerContext(true)
                    setSuccess('Manager Authorized')
                    setTimeout(() => {
                        props.setManagerKeyPadActive(false)
                        setSuccess('')
                    }, 1000)
                } catch {
                    setError('failed log in')
                    setTimeout(() => {
                        setError('')
                    }, 1000)
                }
            } else {
                numberCombo = []
                setError('Incorrect PIN')
                setTimeout(() => {
                    setError('')
                }, 1000)
            }
        }

        if(props.selectReceiptTarget){
            const receiptRangeConfirm = parseInt(props.targetReceiptNumber)
            if(receiptRangeConfirm <= 10){
                props.setSelectReceiptTarget('approved')
            }
            else {
                setError('Max receipt seperations is 10')
                setTimeout(() => {
                    setError('')
                }, 1000)
            }
        }

        if(props.splitEven){
           if(tempSplitAmount.length === 0){
                props.setDivisionAmount(1)
                props.setSplitEven(false)
           } else {
                props.setDivisionAmount(Number(tempSplitAmount))
                props.setSplitEven(false)
           }
        }
    }

    return(
        <div className='popUpModal'>
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
                                ? <th colSpan={3}>Manager Password?(1810)</th>
                                : null
                            }
                            {props.selectReceiptTarget
                                ? <th colSpan={3}>
                                    Seat: {props.seperatedSeatData?.seatNumber} to Receipt:
                                    &nbsp;{props.targetReceiptNumber}</th>
                                : null
                            }
                            {props.splitEven
                                ? <th colSpan={3}>
                                    Split Receipt by {tempSplitAmount}? 
                                </th>
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
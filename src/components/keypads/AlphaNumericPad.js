import { useState } from "react";
import { useTable } from "../../contexts/TableContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";

const AlphaNumericPad = (props) => {
    const { setContextTable } = useTable();
    const [ error, setError ] = useState('');
    const [ success, setSuccess ] = useState('');
    let padCombo = []

    const handleCloseModal = () => {
        if(props.menuTabActive || props.checkTabActive){
            props.setAlphaNumericPadOpen(false)
        }
    }

    const handleClick = (e) => {
        padCombo.push(e.currentTarget.textContent)
    }

    const handleSpace = () => {
        padCombo.push(' ')
    }

    const handleClear = () => {
        padCombo = [];
        setError('Combo Cleared')
        setTimeout(() => {
            setError('')
        }, 1000)
    }

    const handleSubmit = () => {
        const padInput = new Array(padCombo.join().replace(/[, ]+/g,'').trim()).toString()
        const approvedTable = props.serverTableList.filter(obj => obj.id === padInput)
        if(approvedTable.length >= 1){
            setSuccess(padInput)
            setContextTable(padInput)
            setTimeout(() => {
                setSuccess('')
            }, 1000)
        } else {
            const docRef = doc(db, 'tables', padInput)
            const getTableInfo = async () => {
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    if(docSnap.data().serverOwner === 'none'){
                        setSuccess(padInput)
                        setContextTable(padInput)
                        setTimeout(() => {
                            setSuccess('')
                        }, 1000)
                    } else {
                        setError('Another server is using that table')
                    }
                }
            }
            getTableInfo()
        }
    }

    return(
        <div className='popUpModal alphaNumModal'>
            <div className='alphaNumericPad'>
                <button onClick={handleCloseModal} className='closePad'>X</button>
                <table className='alphaNumPadTable'>
                    <thead>
                        <tr>
                            <th colSpan={10}>Alpha Numeric Pad</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td><button onClick={handleClick}>1</button></td>
                            <td><button onClick={handleClick}>2</button></td>
                            <td><button onClick={handleClick}>3</button></td>
                            <td><button onClick={handleClick}>4</button></td>
                            <td><button onClick={handleClick}>5</button></td>
                            <td><button onClick={handleClick}>6</button></td>
                            <td><button onClick={handleClick}>7</button></td>
                            <td><button onClick={handleClick}>8</button></td>
                            <td><button onClick={handleClick}>9</button></td>
                            <td><button onClick={handleClick}>0</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={handleClick}>q</button></td>
                            <td><button onClick={handleClick}>w</button></td>
                            <td><button onClick={handleClick}>e</button></td>
                            <td><button onClick={handleClick}>r</button></td>
                            <td><button onClick={handleClick}>t</button></td>
                            <td><button onClick={handleClick}>y</button></td>
                            <td><button onClick={handleClick}>u</button></td>
                            <td><button onClick={handleClick}>i</button></td>
                            <td><button onClick={handleClick}>o</button></td>
                            <td><button onClick={handleClick}>p</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={handleClick}>a</button></td>
                            <td><button onClick={handleClick}>s</button></td>
                            <td><button onClick={handleClick}>d</button></td>
                            <td><button onClick={handleClick}>f</button></td>
                            <td><button onClick={handleClick}>g</button></td>
                            <td><button onClick={handleClick}>h</button></td>
                            <td><button onClick={handleClick}>j</button></td>
                            <td><button onClick={handleClick}>k</button></td>
                            <td><button onClick={handleClick}>l</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={handleClick}>z</button></td>
                            <td><button onClick={handleClick}>x</button></td>
                            <td><button onClick={handleClick}>c</button></td>
                            <td><button onClick={handleClick}>v</button></td>
                            <td><button onClick={handleClick}>b</button></td>
                            <td><button onClick={handleClick}>n</button></td>
                            <td><button onClick={handleClick}>m</button></td>
                        </tr>
                        <tr>
                            <td><button onClick={handleClear}>⛔</button></td>
                            <td colSpan={8}><button onClick={handleSpace}>space</button></td>
                            <td><button onClick={handleSubmit}>🔥</button></td>
                        </tr>
                    </tbody>
                </table>

                {success
                    ? <p className='padSuccess'>{success}</p>
                    : error
                        ? <p className='padError'>{error}</p>
                        : null
                }
                
            </div>
        </div>
    )
}

export default AlphaNumericPad;
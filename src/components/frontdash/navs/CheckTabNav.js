import { useAuth } from '../../../contexts/AuthContext';
import { useTable } from '../../../contexts/TableContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const CheckTabNav = (props) => {
    const { currentUser, logout, employeeContext, setManagerContext, managerContext } = useAuth();
    const { contextTable } = useTable();
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleTest = () => {
        console.log(props.receiptNumber)
    }

    const handleMgrOveride = () => {
        if(managerContext === false){
            props.setManagerKeyPadActive(true)
        }
        
        if(managerContext === true){
            setManagerContext(false)
        }
    }

    const handlePrintReceipts = () => {
        props.setPrintReceipts(true)
    }

    const handleAddSeparate = () => {
        const receiptRef = 
                doc(db, 'receipts', `${props.employeeNumber}`, contextTable, `receipt${props.receiptsNumber + 1}`)
        const createSeperateReceipt = async () => {
            const docSnap = await getDoc(receiptRef)
            if(props.receiptsNumber < 10){
                if(!docSnap.exists()){
                    setDoc(receiptRef, {
                        receiptTotalCost:0,
                        receiptNumber:props.receiptsNumber + 1,
                    })
                }
            }
            if(props.receiptsNumber === 10){
                props.setFireItAlert('CheckTab more than ten')
            }
        }
        createSeperateReceipt()
    }

    const handleRemoveSeparate = () => {
        const receiptRef = 
            doc(db, 'receipts', `${props.employeeNumber}`, contextTable, `receipt${props.receiptsNumber}`)
        const removeSeperateReceipt = async () => {
            const docSnap = await getDoc(receiptRef)
            if(props.receiptsNumber > 0){
                if(docSnap.exists()){
                    deleteDoc(receiptRef)
                }
            }
            if(props.receiptsNumber === 0){
                props.setFireItAlert('CheckTab less than zero')
            }
        }
        removeSeperateReceipt()
    }

    const handleChangeTable = () => {
        props.setAlphaNumericPadOpen(true)
    }

    const handleHelp = () => {
        props.setHelpModal(true)
    }

    const handleLogout = async () => { 
        if(currentUser.email){
            try {
                await logout()
                navigate('/login')
            } catch (error) {
                setError(error.message)
            }
        }
    }

    return(
        <div className='frontLowerNav'>
            <ul>
                <li><button onClick={handleMgrOveride} className='workingButton'>
                    {managerContext
                        ? 'CANCEL MGR'
                        : 'MGR OVER'
                    }
                    </button>
                </li>
                <li><button onClick={handlePrintReceipts} className='workingButton'>PRINT RECEIPTS</button></li>
                <li>
                    <button onClick={handleAddSeparate} className='workingButton'>ADD SEPERATE</button>
                </li>
                <li>
                    <button onClick={handleRemoveSeparate} className='workingButton'>REMOVE SEPARATE</button>
                </li>
                <li>
                    <button onClick={handleChangeTable} className='workingButton'>CHNG TBL</button>
                </li>
                <li><button className='nonWorkingButton'>Demo</button></li>
                <li><button onClick={handleTest} className='testButton'>Test</button></li>
                <li className='infoButton'>
                    <button onClick={handleHelp}>🔥</button>
                    <p onClick={handleHelp}>INFO</p>
                </li>
                <li className='navCurrentUser'>{error
                        ? <p>{error}</p>
                            : employeeContext
                                ? <p>User:
                                    <br />
                                    {employeeContext.firstName}</p>
                                : <p>No User</p>
                    }
                </li>
                <li><button onClick={handleLogout} className='workingButton'>LogOut</button></li>
            </ul>
        </div>
    )
}
export default CheckTabNav;
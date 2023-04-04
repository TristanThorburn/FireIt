import { useAuth } from '../../../contexts/AuthContext';
import { useTable } from '../../../contexts/TableContext';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { db } from '../../../firebase';
import { doc, setDoc, getDoc, deleteDoc } from 'firebase/firestore';

const CheckTabNav = (props) => {
    const { currentUser, logout, employeeContext, setManagerContext, managerContext } = useAuth();
    const { contextTable } = useTable();
    const { receiptsList } = props
    const navigate = useNavigate();
    const [ error, setError ] = useState('')

    const handleTest = () => {
        console.log('test')
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

        const createSeperateReceipt = async () => {
            if(receiptsList.length === 0){
                const receiptRef = 
                        doc(db, 'receipts', `${props.employeeNumber}`, contextTable, 'receipt1')
                const docSnap = await getDoc(receiptRef)

                if(!docSnap.exists()){
                    setDoc(receiptRef, {
                        receiptTotalCost:0,
                        receiptNumber:1,
                        seatsList: [],
                        status:'unSettledReceipt'
                    })
                }
            }

            if(receiptsList.length > 0){
                const orderedReceipts = receiptsList.slice().sort((a, b) => a - b)
                let nextReceipt = null
                
                for( let i = 1; i < orderedReceipts.length; i++){
                    if(orderedReceipts[i] !== orderedReceipts[i - 1] + 1){
                        nextReceipt = orderedReceipts[i - 1] + 1;
                        break;
                    }
                }
        
                if(nextReceipt === null){
                    nextReceipt = orderedReceipts[orderedReceipts.length - 1] +1;
                }
                const receiptRef = 
                        doc(db, 'receipts', `${props.employeeNumber}`, contextTable, `receipt${nextReceipt}`)
                const docSnap = await getDoc(receiptRef)

                if(!docSnap.exists()){
                    setDoc(receiptRef, {
                        receiptTotalCost:0,
                        receiptNumber:nextReceipt,
                        seatsList: [],
                        status:'unSettledReceipt'
                    })
                }
            }
        }
        createSeperateReceipt()
    }

    const handleRemoveSeparate = () => {
        const receiptRef = 
            doc(db, 'receipts', `${props.employeeNumber}`, contextTable, `receipt${receiptsList.length}`)
        const removeSeperateReceipt = async () => {
            const docSnap = await getDoc(receiptRef)
            if(receiptsList.length > 0){
                if(docSnap.exists()){
                    deleteDoc(receiptRef)
                }
            }
            if(receiptsList.length === 0){
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
                        ? 'CANCEL MANAGER AUTH'
                        : 'GET MANAGER AUTH'
                    }
                    </button>
                </li>
                <li><button 
                    onClick={handlePrintReceipts} 
                    id='printReceipts' 
                    className='workingButton'
                    >"PRINT" ALL RECEIPTS</button></li>
                <li>
                    <button
                        onClick={handleAddSeparate}
                        id='addReceipt'
                        className='workingButton'
                        >ADD NEW RECEIPT</button>
                </li>
                <li>
                    <button
                        onClick={handleRemoveSeparate}
                        id='removeReceipt'
                        className='workingButton'
                        >REMOVE RECEIPT</button>
                </li>
                <li>
                    <button onClick={handleChangeTable} className='workingButton'>CHNG TBL</button>
                </li>
                <li><button className='nonWorkingButton'>ALL ON ONE</button></li>
                <li><button className='nonWorkingButton'>% SPLIT</button></li>
                <li><button onClick={handleTest} className='testButton'>Test</button></li>
                <li>
                    <button onClickCapture={handleHelp} className='infoButton'>
                        🔥
                        <p>INFO</p>
                    </button>
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
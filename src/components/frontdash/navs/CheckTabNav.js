import { useAuth } from '../../../contexts/AuthContext';
import { useTable } from '../../../contexts/TableContext';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { db } from '../../../firebase';
import { doc, setDoc, getDoc, deleteDoc, collection, getCountFromServer } from 'firebase/firestore';

const CheckTabNav = (props) => {
    const { currentUser, logout, employeeContext, setManagerContext, managerContext } = useAuth();
    const { contextTable } = useTable();
    const { receiptsList, allOnOne, setAllOnOne, setSplitEven, setDivisionAmount } = props
    const navigate = useNavigate();
    const [ error, setError ] = useState('')
    const [ seatCount, setSeatCount ] = useState('')

    // Get the count of seats on the table to limit number of receipts
    useEffect(() => {
        const getSeatCount = async () => {
            const docCollection = 
                    collection(db, 'orders', employeeContext.employeeNumber, contextTable)
            const collectionSnap = await getCountFromServer(docCollection)
            setSeatCount(collectionSnap.data().count)
        }
        getSeatCount()
    }, [employeeContext.employeeNumber, contextTable])

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

    const handleAllOnOne = () => {
        setDivisionAmount('')
        setAllOnOne(!allOnOne)
    }

    const handleAddSeparate = () => {
        const createSeperateReceipt = async () => {
            if(receiptsList.length >= seatCount && !allOnOne){
                props.setFireItAlert('CheckTab more receipts than seats')
            }

            if(receiptsList.length === 0 && receiptsList.length < seatCount && !allOnOne){
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

            if(receiptsList.length > 0 && receiptsList.length < seatCount && !allOnOne){
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
            
            if(allOnOne){
                props.setFireItAlert('CheckTab cancel all on one')
            }
        }
        createSeperateReceipt()
    }

    const handleRemoveSeparate = () => {
        const receiptToRemove = Math.max(...receiptsList)
        const receiptRef = 
            doc(db, 'receipts', `${props.employeeNumber}`, contextTable, `receipt${receiptToRemove}`)
        const removeSeperateReceipt = async () => {
            const docSnap = await getDoc(receiptRef)
            if(receiptsList.length > 0 && !allOnOne){
                if(docSnap.exists()){
                    deleteDoc(receiptRef)
                }
            }

            if(receiptsList.length === 0 && !allOnOne){
                props.setFireItAlert('CheckTab less than zero')
            }

            if(allOnOne){
                props.setFireItAlert('CheckTab cancel all on one')
            }
        }
        removeSeperateReceipt()
    }

    const handleSplitEven = () => {
        if(allOnOne){
            props.setFireItAlert('CheckTab cancel all on one')
        } else {
            setSplitEven(true)
        }
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
                <li>
                    <button 
                        onClick={handlePrintReceipts} 
                        id='printReceipts' 
                        className='workingButton'
                        >"PRINT" ALL RECEIPTS
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleAddSeparate}
                        id='addReceipt'
                        className='workingButton'
                        >ADD NEW RECEIPT
                    </button>
                </li>
                <li>
                    <button
                        onClick={handleRemoveSeparate}
                        id='removeReceipt'
                        className='workingButton'
                        >REMOVE RECEIPT
                    </button>
                </li>
                <li>
                    <button onClick={handleAllOnOne} className='workingButton'>
                        {allOnOne
                            ? 'cancel all on one'
                            : 'all on one receipt'
                        }
                    </button>
                </li>
                <li>
                    <button onClick={handleSplitEven} className='workingButton'>split total evenly</button>
                </li>
                <li>
                    <button onClick={handleChangeTable} className='workingButton'>CHNG TBL</button>
                </li>
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
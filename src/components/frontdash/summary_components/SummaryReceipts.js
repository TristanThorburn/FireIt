import { useEffect, useState } from "react";
import { useTable } from "../../../contexts/TableContext";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, getDoc, setDoc, deleteField, getCountFromServer, deleteDoc, } from "firebase/firestore";

const SummaryReceipts = (props) => {
    const { 
        setLoading, fullPaymentData, setFullPaymentData, undoSettledPayment, setUndoTargetReceipt, undoTargetReceipt, finalizePayments, setFinalizePayments
    } = props
    const { employeeContext } = useAuth();
    const { contextTable, setContextTable } = useTable();
    const [ receiptData, setReceiptData ] = useState([]);
    const [ startCleanUp, setStartCleanUp] = useState(false);
    const [ cleanUpSeatList, setCleanUpSeatList ] = useState([]);
    const [ cleanUpReceiptList, setCleanUpReceiptList ] = useState([])
    const [ checkTableRelease, setCheckTableRelease ] = useState(false)

    const getCurrentDate = (separator='') => {
        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    // Get data for current table receipts
    useEffect(() => {
        if(contextTable !== ''){
        const receiptCollectionRef = 
                    collection(db, 'receipts', employeeContext.employeeNumber, contextTable)
        const q = query(receiptCollectionRef, orderBy('receiptNumber', 'asc'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setReceiptData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
        }
    }, [contextTable, employeeContext]);

    // save temporary payment data and change receipt status after entering payment amount(s)
    useEffect(() => {
        if(fullPaymentData !== ''){
            const receiptRef = 
                doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt' + fullPaymentData.receiptNumber)
            updateDoc(receiptRef, {
                status:'settledReceipt',
                paymentData:fullPaymentData
            })
            setFullPaymentData('')
        }
    }, [fullPaymentData, contextTable, employeeContext.employeeNumber, setFullPaymentData])
    
    // Undo settlement of receipt
    useEffect(() => {
        if(undoSettledPayment === true && undoTargetReceipt !== ''){
            const receiptRef = 
                doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt' + undoTargetReceipt)
            const undoSettledPayment = async () => {
                await updateDoc(receiptRef, {
                    paymentData: deleteField(),
                    status:'unSettledReceipt'
                })
                setUndoTargetReceipt('')
            }
            undoSettledPayment()
        }
    }, [undoSettledPayment, contextTable, employeeContext.employeeNumber, undoTargetReceipt.receipt, undoTargetReceipt, setUndoTargetReceipt])

    // Store payment data from settle receipts when finalize payments selected.
    useEffect(() => {
        if(finalizePayments === true){
            setLoading(true)
            const paymentsToComplete = document.querySelectorAll('[data-status=settledReceipt]')
            let seatsToCleanUp = [];
            let receiptsToCleanUp = [];
            // For each settled payment, get data and set it to an object, use that object to store payment data based on day and time of settlement
            paymentsToComplete.forEach(payment => {
                let finalReceiptData = {}
                const date = getCurrentDate()
                const receiptRef = 
                    doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt' + payment.dataset.receiptnumber)
                const getReceiptAndStorePayment = async () => {
                    const receiptSnap = await getDoc(receiptRef)
                    finalReceiptData = receiptSnap.data()
                                        
                    receiptsToCleanUp.push(finalReceiptData.receiptNumber.toString())
                    finalReceiptData.seatsList.forEach(seat => {
                        seatsToCleanUp.push(seat.seat)
                    })
                    const time = Date.now().toString()
                    const paymentRef = 
                        doc(db, 'payments', employeeContext.employeeNumber, date, time)
                    await setDoc(paymentRef, {
                        receipt:finalReceiptData.receiptNumber,
                        payment:finalReceiptData.paymentData.payments,
                        table:contextTable,
                        server:employeeContext.firstName
                    })
                    setFinalizePayments(false)
                    setStartCleanUp(true)
                }
                getReceiptAndStorePayment()
            })
            setCleanUpSeatList(seatsToCleanUp)
            setCleanUpReceiptList(receiptsToCleanUp)
        }
    }, [finalizePayments, setFinalizePayments, contextTable, employeeContext.employeeNumber, employeeContext.firstName, setLoading])

    // Clean up settled seats from order and remove settled receipts
    useEffect(() => {
        if(startCleanUp === true
            && cleanUpReceiptList !== ''
            && cleanUpSeatList !== ''){
            const cleanUp = async () => {
                cleanUpSeatList.forEach(seat => {
                    const cleaning = async () => {
                        const orderRef = 
                    doc(db, 'orders', employeeContext.employeeNumber, contextTable, 'seat' + seat)
                    await deleteDoc(orderRef)
                    }
                    cleaning()
                })
                cleanUpReceiptList.forEach(receipt => {
                    const cleaning = async () => {
                        const receiptRef =
                    doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt' + receipt)
                    await deleteDoc(receiptRef)
                    }
                    cleaning()
                })
                setTimeout(() => {
                    setCleanUpReceiptList('')
                    setCleanUpSeatList('')
                    setStartCleanUp(false)
                    setCheckTableRelease(true)
                }, 1500)
            }
            cleanUp()
        }
    }, [cleanUpReceiptList, cleanUpSeatList, contextTable, employeeContext.employeeNumber, startCleanUp, setContextTable])

    // Clean up tables after seats and receipts have been removed
    useEffect(() => {
        if(checkTableRelease){
            const cleanTable = async () => {
                const docCollection = 
                    collection(db, 'orders', employeeContext.employeeNumber, contextTable)
                const collectionSnap = await getCountFromServer(docCollection)
                    setTimeout(() => {
                        if(collectionSnap.data().count === 0){
                            const resetTable =
                                doc(db, 'tables', contextTable)
                            updateDoc(resetTable, {
                                serverOwner:'none'
                            }).then(setContextTable(''))
                        }
                    }, 1500)
                    setLoading(false)
                    setCheckTableRelease(false)
            }
            cleanTable()
        }
    }, [checkTableRelease, contextTable, employeeContext.employeeNumber, setContextTable, setLoading])

    const handleSettleReceiptCapture = (e) => {
        const targetReceipt = e.currentTarget
        if(targetReceipt.dataset.status === 'unSettledReceipt'){
            let seatsList = []
            const seats = targetReceipt.querySelectorAll('[data-receiptseat]')
            seats.forEach(seat => {
                seatsList.push(seat.dataset.receiptseat)
            })
            props.setReceiptToSettle({
                receiptCost:targetReceipt.dataset.receiptcost,
                seatslist:seatsList,
                receipt:targetReceipt.dataset.receiptnumber,
                employeeNumber:employeeContext.employeeNumber,
                employeeName:employeeContext.firstName
            })
            props.setPaymentKeyPadActive(true)
        }
        if(targetReceipt.dataset.status === 'settledReceipt'){
            props.setUndoTargetReceipt(targetReceipt.dataset.receiptnumber)
            props.setFireItAlert('PaymentTab undo settled payment')
        }
        
    }

    return(
        <div className='summaryReceipts'>
            {!contextTable
                ? <h2>No Table Selected</h2>
                : receiptData.length <1
                    ? <h2>Use the Check Tab to organize receipts.</h2>
                    : <ul>
                        {receiptData.map((receipt, i) => {
                            return(
                                <button 
                                    key={i}
                                    className={receipt.data.status}
                                    data-receiptcost={receipt.data.receiptTotalCost}
                                    data-receiptnumber={receipt.data.receiptNumber}
                                    data-status={receipt.data.status}
                                    onClickCapture={handleSettleReceiptCapture}
                                    >
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Receipt: {receipt.data.receiptNumber}</th>
                                            </tr>
                                        </thead>
                                        {receipt.data.status === 'settledReceipt'
                                            ? <tbody>
                                                <tr>
                                                    <td>Payment(s):</td>
                                                </tr>
                                                {receipt.data.paymentData.payments.map((payment, i) => {
                                                    return(
                                                        <tr
                                                            key={i}
                                                            className='receiptSavedPayments'
                                                            >
                                                            <td>{payment.method}</td>
                                                            <td>${payment.amount}</td>
                                                            <td>Tip:</td>
                                                            <td>${payment.tip}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                            : <tbody>
                                                <tr>
                                                    <td>Seats List:</td>
                                                </tr>
                                                {receipt.data.seatsList.map(seat => {
                                                    return(
                                                        <tr
                                                            key={seat.seat}
                                                            data-receiptseat={seat.seat}
                                                            >
                                                            <td>Seat {seat.seat}</td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        }
                                        <thead>
                                            {receipt.data?.separation === 'split even'
                                                ? <tr>
                                                    <th>
                                                        Total: ${receipt.data.receiptTotalCost} / {receipt.data.splitEven} =
                                                        ${(receipt.data.receiptTotalCost / receipt.data.splitEven).toFixed(2)} each.
                                                    </th>
                                                </tr>
                                                : <tr>
                                                    <th>
                                                        Total: ${receipt.data.receiptTotalCost}
                                                    </th>
                                                </tr>
                                            }
                                        </thead>
                                    </table>
                                </button>
                            )
                        })}
                    </ul>
            }
            
        </div>
    )
}

export default SummaryReceipts;
import { useEffect, useState } from "react";
import { useTable } from "../../../contexts/TableContext";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc, getDoc, setDoc } from "firebase/firestore";

const SummaryReceipts = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ receiptData, setReceiptData ] = useState([])

    const getCurrentDate = (separator='') => {

        let newDate = new Date()
        let date = newDate.getDate();
        let month = newDate.getMonth() + 1;
        let year = newDate.getFullYear();
        
        return `${year}${separator}${month<10?`0${month}`:`${month}`}${separator}${date}`
    }

    const handleTest = () => {
        console.log('hi')
    }

    // Get data for current table receipts
    useEffect(() => {
        if(contextTable !== ''){
        //     const getTablesReceipts = async () => {
        //     const receiptCollectionRef = 
        //             collection(db, 'receipts', employeeContext.employeeNumber, contextTable)
        //     const q = query(receiptCollectionRef, orderBy('receiptNumber', 'asc'));
        //     const querySnapShot = await getDocsFromCache(q)
        //         if(querySnapShot){
        //             const receiptsList = querySnapShot.docs.map(doc => ({
        //                 id:doc.id,
        //                 data:doc.data()
        //             }))
        //             setReceiptData(receiptsList)
        //         } else {
        //             const severData = await getDocsFromServer(q)
        //             const receiptsList = severData.docs.map(doc => ({
        //                 id:doc.id,
        //                 data:doc.data()
        //             }))
        //             setReceiptData(receiptsList)
        //         }
        //     }
        // getTablesReceipts()
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

    // save temporary payment data and change receipt status
    useEffect(() => {
        if(props.fullPaymentData !== ''){
            const receiptRef = 
                doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt' + props.fullPaymentData.receiptNumber)
            updateDoc(receiptRef, {
                status:'settledReceipt',
                paymentData:props.fullPaymentData
            })
            props.setFullPaymentData('')
        }
    }, [props.fullPaymentData, contextTable, employeeContext.employeeNumber, props])

    // Store payment data from settle receipts when finalize payments selected.
    useEffect(() => {
        if(props.finalizePayments === true){
            const paymentsToComplete = document.querySelectorAll('[data-status=settledReceipt]')
            // For each settled payment, get data and set it to an object, use that object to store payment data based on day and time of settlement
            paymentsToComplete.forEach(payment => {
                let finalReceiptData = {}
                const date = getCurrentDate()
                const receiptRef = 
                    doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt' + payment.dataset.receiptnumber)
                const getReceiptAndStorePayment = async () => {
                    const receiptSnap = await getDoc(receiptRef)
                    finalReceiptData = receiptSnap.data()
                                        
                    const time = Date.now().toString()
                    const paymentRef = 
                        doc(db, 'payments', employeeContext.employeeNumber, date, time)
                    await setDoc(paymentRef, {
                        receipt:finalReceiptData.receiptNumber,
                        payment:finalReceiptData.paymentData.payments,
                        table:contextTable,
                        server:employeeContext.firstName
                    })
                    props.setFinalizePayments(false) 
                }
                getReceiptAndStorePayment()
            })
        }
    }, [props, props.finalizePayments, contextTable, employeeContext.employeeNumber, employeeContext.firstName])

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
<li><button onClick={handleTest} className='testButton'>TEST</button></li>
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
                                        <tbody>
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
                                        <thead>
                                            <tr>
                                                <th>
                                                    Total: ${receipt.data.receiptTotalCost}
                                                </th>
                                            </tr>
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
import { useEffect, useState } from "react";
import { useTable } from "../../../contexts/TableContext";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { collection, query, orderBy, onSnapshot, updateDoc, doc } from "firebase/firestore";

const SummaryReceipts = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ receiptData, setReceiptData ] = useState([])

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
                doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt' + props.fullPaymentData.receipt.receipt)
            updateDoc(receiptRef, {
                status:'settledReceipt',
                paymentData:props.fullPaymentData
            })
            props.setFullPaymentData('')
        }
    }, [props.fullPaymentData, contextTable, employeeContext.employeeNumber, props])

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
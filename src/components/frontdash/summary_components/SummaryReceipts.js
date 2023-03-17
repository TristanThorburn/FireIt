import { useEffect, useState } from "react";
import { useTable } from "../../../contexts/TableContext";
import { useAuth } from "../../../contexts/AuthContext";
import { db } from "../../../firebase";
import { collection, query, orderBy, getDocsFromCache, getDocsFromServer } from "firebase/firestore";

const SummaryReceipts = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ receiptData, setReceiptData ] = useState([])

    // Get data for current table receipts
    useEffect(() => {
        if(contextTable !== ''){
            const getTablesReceipts = async () => {
            const receiptCollectionRef = 
                    collection(db, 'receipts', employeeContext.employeeNumber, contextTable)
            const q = query(receiptCollectionRef, orderBy('receiptNumber', 'asc'));
            const querySnapShot = await getDocsFromCache(q)
                if(querySnapShot){
                    const receiptsList = querySnapShot.docs.map(doc => ({
                        id:doc.id,
                        data:doc.data()
                    }))
                    setReceiptData(receiptsList)
                } else {
                    const severData = await getDocsFromServer(q)
                    const receiptsList = severData.docs.map(doc => ({
                        id:doc.id,
                        data:doc.data()
                    }))
                    setReceiptData(receiptsList)
                }
            }
        getTablesReceipts()
        }
    }, [contextTable, employeeContext]);

    const handleSettleReceiptCapture = (e) => {
        const targetReceipt = e.currentTarget
        let seatsList = []
        const seats = targetReceipt.querySelectorAll('[data-receiptseat]')
        seats.forEach(seat => {
            seatsList.push(seat.dataset.receiptseat)
        })
        props.setReceiptToSettle({
            receiptCost:targetReceipt.dataset.receiptcost,
            seatslist:seatsList,
            receipt:targetReceipt.dataset.receiptnumber,
        })
        props.setPaymentKeyPadActive(true)
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
                                    className='unSettledReceipt'
                                    data-receiptcost={receipt.data.receiptTotalCost}
                                    data-receiptnumber={receipt.data.receiptNumber}
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
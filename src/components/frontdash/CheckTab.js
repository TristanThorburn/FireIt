import CheckTabNav from "./navs/CheckTabNav";
import ServerKeyPad from "../keypads/ServerKeyPad";
import { useTable } from "../../contexts/TableContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase";
import { doc, getDoc, collection, query, orderBy, onSnapshot, updateDoc, arrayUnion, arrayRemove, getDocs, deleteDoc, setDoc } from "firebase/firestore";
import TableCheck from './check_components/TableCheck';
import FireItAlert from "../help/FireItAlert";
import AlphaNumericPad from "../keypads/AlphaNumericPad";

const CheckTab = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const { setCheckTabActive, setPaymentTabActive } = props
    const [ receiptData, setReceiptData ] = useState([]);
    const [ fireItAlert, setFireItAlert ] = useState('')
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ seperatedSeatData, setSeperatedSeatData ] = useState({});
    const [ selectReceiptTarget, setSelectReceiptTarget ] = useState('false');
    const [ targetReceiptNumber, setTargetReceiptNumber ] = useState('');
    const [ appendReceipt, setAppendReceipt ] = useState('');
    const [ alphaNumericPadOpen, setAlphaNumericPadOpen ] = useState(false);
    const [ printReceipts, setPrintReceipts ] = useState(false);
    const [ confirmSeatRemove, setConfirmSeatRemove ] = useState(false);
    const [ targetRemovalSeat, setTargetRemovalSeat ] = useState('');
    const [ receiptsList, setReceiptsList ] = useState('')
    const [ allOnOne, setAllOnOne ] = useState(false);
    const [ splitEven, setSplitEven ] = useState(false);
    const [ divisionAmount, setDivisionAmount ] = useState('')
    const seperateChecksList = document.querySelector('.seperatedChecksContainer');
    
    // OLD SPLIT CHECKS LOGIC:
    // Populate / Remove array to determine render # of seperate check components
    // useEffect(() => {
    //     setReceiptsToDisplay(Array(newReceipts).fill(0))
    // }, [newReceipts])

    const handleDeletePendingSeat = useCallback((e) => {
        const deletePendingSeat = async () => {
            const seatToDeleteParent = e.currentTarget.parentNode
            const child = e.currentTarget
            seatToDeleteParent.removeChild(child)
            setSeperatedSeatData('')
            setAppendReceipt('')
        }
        deletePendingSeat()
    },[])

    const handlePrintedSeatDeleteCapture = (e) => {
        if(e.currentTarget.dataset.separation === 'seat'){
            setTargetRemovalSeat(e.currentTarget.dataset.seatnumber)
            setFireItAlert('CheckTab delete sent seat')
        } else if(e.currentTarget.dataset.separation === 'all on one' || e.currentTarget.dataset.separation === 'split even') {
            setFireItAlert('CheckTab delete all or split')
        }
    }

    // Get data for current table receipts
    useEffect(() => {
        if(contextTable !=='' && !allOnOne && divisionAmount !== ''){
            const getReceiptData = async () => {
                const checkCollectionRef = 
                    collection(db, 'orders', `${employeeContext.employeeNumber}`, contextTable)
                const q = query(checkCollectionRef, orderBy('seatNumber'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setReceiptData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })))
                })
                return unsubscribe
            }
            getReceiptData()
        }
        if(contextTable !== '' && allOnOne && divisionAmount === ''){
            const getReceiptData = async () => {
                const checkCollectionRef = 
                    collection(db, 'orders', `${employeeContext.employeeNumber}`, contextTable)
                const q = query(checkCollectionRef, orderBy('seatNumber'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setReceiptData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })))
                })
                return unsubscribe
            }
            getReceiptData()
        }
        if(contextTable !== '' && allOnOne === false && divisionAmount === ''){
            const getReceipts = async () => {
                const receiptCollectionRef = 
                    collection(db, 'receipts', employeeContext.employeeNumber, contextTable)
                const q = query(receiptCollectionRef, orderBy('receiptNumber', 'asc'));
                let receiptNumbers = []
                const unsubscribe = onSnapshot(q, snapshot => {
                    receiptNumbers = []
                    setReceiptData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })))
                    snapshot.forEach(receipt => {
                        receiptNumbers.push(receipt.data().receiptNumber)
                    })
                    setReceiptsList(receiptNumbers)
                })
                return unsubscribe
                }
            getReceipts()
        }
    }, [contextTable, employeeContext, allOnOne, divisionAmount]);

    // Check if selected receipt exists on display
    useEffect(() => {
        if(selectReceiptTarget === 'approved'){
            const receiptId = 'receipt' + targetReceiptNumber
            const targetReceipt = seperateChecksList.querySelector(`#${receiptId}`)
            if(targetReceipt === null){
                setFireItAlert('CheckTab receipt undefined')
                setSelectReceiptTarget('true')
            }
            if(targetReceipt){
                const duplicateCheck = document.querySelector('[data-seatid=' + seperatedSeatData.seat + ']')
                if(duplicateCheck === null){
                    setAppendReceipt(targetReceipt)
                }
                if(duplicateCheck){
                    setFireItAlert('CheckTab seat exists')
                }
            }
        }
    }, [selectReceiptTarget, seperateChecksList, targetReceiptNumber, seperatedSeatData.seat])

    // Put the selected seat on the selected check
    useEffect(() => {
        const appendSeatToReceipt = async () => {
            if(appendReceipt !== '' 
                && seperatedSeatData !== '' 
                && seperatedSeatData.order !== undefined
                ){
                const targetReceipt = document.getElementById(appendReceipt.id)
                const table = document.createElement('table')
                // Set up table head with seat
                const tableHead = document.createElement('thead')
                const tableHeadRow = document.createElement('tr')
                const tableHeadRowTh = document.createElement('th')
                tableHeadRowTh.setAttribute('colspan', '2')
                const seatNumber = document.createTextNode(`❌ Seat: ${seperatedSeatData.seatNumber}`)
                tableHeadRowTh.appendChild(seatNumber)
                tableHeadRow.appendChild(tableHeadRowTh)
                tableHead.appendChild(tableHeadRow)
                // set up subTotal display
                const subTotal = document.createTextNode(`Subtotal: $${seperatedSeatData.seatTotalCost}`)
                const subTotalRow = document.createElement('tr')
                const subTotalTh = document.createElement('th')
                subTotalTh.setAttribute('colspan', '2')
                subTotalTh.appendChild(subTotal)
                subTotalRow.appendChild(subTotalTh)
                // Set up table body
                const tableBody = document.createElement('tbody')
                // Loop orders
                seperatedSeatData.order.forEach((order, i) => {
                    const tableBodyRow = document.createElement('tr')
                    tableBodyRow.classList.add('seatItemList')
                    const tableBodyItem = document.createElement('td')
                    const tableBodyCost = document.createElement('td')
                    tableBodyCost.classList.add('receiptItemCost')
                    const item = document.createTextNode(order.item)
                    const cost = document.createTextNode(order.cost)
                    tableBodyItem.appendChild(item)
                    tableBodyCost.appendChild(cost)
                    tableBodyRow.appendChild(tableBodyItem)
                    tableBodyRow.appendChild(tableBodyCost)
                    tableBodyRow.setAttribute('data-item', order.item)
                    tableBodyRow.setAttribute('data-cost', order.cost)
                    tableBody.appendChild(tableBodyRow)
                })
                tableBody.appendChild(subTotalRow)
                table.appendChild(tableHead)
                table.appendChild(tableBody)
                table.classList.add('pendingSeperateSeat')
                table.setAttribute('data-seat', seperatedSeatData.seatNumber)
                table.setAttribute('data-seatid', 'seat' + seperatedSeatData.seatNumber)
                table.setAttribute('data-seatcost', seperatedSeatData.seatTotalCost)
                table.setAttribute('data-parentreceipt', appendReceipt.id)
                table.addEventListener('click', handleDeletePendingSeat, true)
                targetReceipt.appendChild(table)
                setAppendReceipt('')
                setSeperatedSeatData('')
            }
        }
        appendSeatToReceipt()
    }, [appendReceipt, seperatedSeatData.order, seperatedSeatData.seatNumber, handleDeletePendingSeat, seperatedSeatData, contextTable, employeeContext.employeeNumber])

    // Print Receipts AKA save to firestore
    useEffect(() => {
        // Upload receipt to firestore as one receipt.
        if(printReceipts && allOnOne && divisionAmount === ''){
            const clearOldReceipts = async () => {
                const receiptsCollection =
                            collection(db, 'receipts', employeeContext.employeeNumber, contextTable)
                const docRef = query(receiptsCollection)
                const toDelete = await getDocs(docRef)
                toDelete.forEach(item => {
                    const id = item.id
                    deleteDoc(doc(receiptsCollection, id))
                })
            }
            const seatInfo = document.querySelectorAll('.allOnOneSeatInfo')
            let seatsList = []
            seatInfo.forEach(seat => {
                let seatsOrders = []
                const seatItemList = seat.querySelectorAll('.seatItemList')
                seatItemList.forEach(item => {
                    const orderList = {
                        item:item.dataset.item,
                        cost:item.dataset.cost
                    }
                    seatsOrders.push(orderList)
                })
                const seatData = {
                    seat:seat.dataset.seatnumber,
                    order:seatsOrders
                }
                seatsList.push(seatData)
            })
            const setReceiptOnOne = async () => {
                const receiptRef = 
                            doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt1')
                const allOnOneReceipt = document.querySelector('.allOnOneCheck')
                setDoc(receiptRef, {
                    seatsList:seatsList,
                    receiptNumber: '1',
                    receiptTotalCost:allOnOneReceipt.dataset.receipttotalcost,
                    status:'unSettledReceipt',
                    separation:'all on one',
                })
                setPrintReceipts(false)
                setCheckTabActive(false)
                setPaymentTabActive(true)
                setDivisionAmount('')
            }
            clearOldReceipts().then(setReceiptOnOne)
        }
        // Upload receipt to firestore as one receipt with division data
        if(printReceipts && !allOnOne && divisionAmount !== ''){
            const clearOldReceipts = async () => {
                const receiptsCollection =
                            collection(db, 'receipts', employeeContext.employeeNumber, contextTable)
                const docRef = query(receiptsCollection)
                const toDelete = await getDocs(docRef)
                toDelete.forEach(item => {
                    const id = item.id
                    deleteDoc(doc(receiptsCollection, id))
                })
            }
            const seatInfo = document.querySelectorAll('.allOnOneSeatInfo')
            let seatsList = []
            seatInfo.forEach(seat => {
                let seatsOrders = []
                const seatItemList = seat.querySelectorAll('.seatItemList')
                seatItemList.forEach(item => {
                    const orderList = {
                        item:item.dataset.item,
                        cost:item.dataset.cost
                    }
                    seatsOrders.push(orderList)
                })
                const seatData = {
                    seat:seat.dataset.seatnumber,
                    order:seatsOrders
                }
                seatsList.push(seatData)
            })
            const setReceiptOnOne = async () => {
                const receiptRef = 
                            doc(db, 'receipts', employeeContext.employeeNumber, contextTable, 'receipt1')
                const allOnOneReceipt = document.querySelector('.allOnOneCheck')
                setDoc(receiptRef, {
                    seatsList:seatsList,
                    receiptNumber: '1',
                    receiptTotalCost:allOnOneReceipt.dataset.receipttotalcost,
                    status:'unSettledReceipt',
                    splitEven:divisionAmount,
                    separation:'split even'
                })
                setPrintReceipts(false)
                setCheckTabActive(false)
                setPaymentTabActive(true)
                setAllOnOne(false)
            }
            clearOldReceipts().then(setReceiptOnOne)
        }
        // Upload to firestore as seperate receipts by seat
        if(printReceipts && !allOnOne && divisionAmount === ''){
        // Get all the receipts on the screen
            const receiptsList = document.querySelectorAll('.seperatedCheck')
            receiptsList.forEach(receipt => {
        // Get all the pendingSeats on each receipt
                let seatSubtotalList = []
                const pendingSeats = receipt.querySelectorAll('.pendingSeperateSeat')
                pendingSeats.forEach(pendingSeat => {
                    const receiptRef = 
                        doc(db, 'receipts', employeeContext.employeeNumber, contextTable, pendingSeat.dataset.parentreceipt)
        // Push all subtotals to an array as numbers, and then find the sum
                    seatSubtotalList.push(Number(pendingSeat.dataset.seatcost))
                    const sum = seatSubtotalList.reduce((a, b) => a + b, 0)
                    let seatsOrders = []
                    const confirmDataAndUpdate = async () => {
        // Get the original total of the receipt
                        const receiptOriginalTotal = await getDoc(receiptRef)
        // Get all the items on the pending seat and push to the seatsOrders array
                        const seatItemList = pendingSeat.querySelectorAll('.seatItemList')
                        seatItemList.forEach(item => {
                            const orderList = {
                                item:item.dataset.item,
                                cost:item.dataset.cost
                            }
                            seatsOrders.push(orderList)
                        })
        // Update the receipt on firestore
                        const seatData = {
                            seat:pendingSeat.dataset.seat,
                            seatCost:pendingSeat.dataset.seatcost,
                            order:seatsOrders,
                        }
                        updateDoc(receiptRef, {
                            seatsList:arrayUnion(seatData),
                            receiptTotalCost:receiptOriginalTotal.data().receiptTotalCost + sum,
                            separation:'seat'
                        })
                    }
                    confirmDataAndUpdate()
                })
            })
            setPrintReceipts(false)
            setCheckTabActive(false)
            setPaymentTabActive(true)
        }
    }, [printReceipts, contextTable, employeeContext.employeeNumber, allOnOne, setCheckTabActive, setPaymentTabActive, divisionAmount])

    // Remove the selected seat from printed receipt after prompt
    useEffect(() => {
        if(confirmSeatRemove === true && targetRemovalSeat !== ''){
            const targetSeat = document.querySelector(`[data-seatnumber="${targetRemovalSeat}"]`)
            const receiptRef = doc(db, 'receipts', employeeContext.employeeNumber, contextTable, targetSeat.dataset.receipt)
            const targetSeatNumber = targetSeat.dataset.seatnumber
            const seatSubTotal = targetSeat.children[1].dataset.seatcost
            const seatItemList = targetSeat.querySelectorAll('.seatItemList')
            let seatOrders = []
            const deleteSeat = async () => {
                const docSnap = await getDoc(receiptRef)
                const receiptOriginalTotal = docSnap.data().receiptTotalCost
                seatItemList.forEach(order => {
                    const orderInfo = {
                        cost:order.dataset.cost,
                        item:order.dataset.item,
                    }
                    seatOrders.push(orderInfo)
                })
                const seatInfo = {
                    order:seatOrders,
                    seat:targetSeatNumber,
                    seatCost:seatSubTotal,
                }
                updateDoc(receiptRef, {
                    seatsList:arrayRemove(seatInfo),
                    receiptTotalCost:receiptOriginalTotal - Number(seatSubTotal),
                })
                setConfirmSeatRemove(false)
                setTargetRemovalSeat('')
            }
            deleteSeat()
        }
    }, [confirmSeatRemove, contextTable, employeeContext.employeeNumber, targetRemovalSeat])

    return(
        <div className='checkTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            {selectReceiptTarget === 'true'
                ? <ServerKeyPad
                    selectReceiptTarget={selectReceiptTarget}
                    setSelectReceiptTarget={setSelectReceiptTarget}
                    setTargetReceiptNumber={setTargetReceiptNumber}
                    targetReceiptNumber={targetReceiptNumber}
                    seperatedSeatData={seperatedSeatData}
                    />
                : null
            }

            {splitEven
                ? <ServerKeyPad 
                    divisionAmount={divisionAmount}
                    setDivisionAmount={setDivisionAmount}
                    setSplitEven={setSplitEven}
                    splitEven={splitEven}
                    checkTabActive={props.checkTabActive}
                    />
                : null
            }

            {alphaNumericPadOpen
                ? <AlphaNumericPad
                    setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                    serverTableList={props.serverTableList}
                    existingTables={props.existingTables}
                    />
                : null
            }
            {/* KEEP LAST FOR PRIORITY */}
            {fireItAlert !== ''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    setConfirmSeatRemove={setConfirmSeatRemove}
                    checkTabActive={props.checkTabActive}
                    />
                : null
            }

            <TableCheck
                    tableData={props.activeTableData}
                    checkTabActive={props.checkTabActive}
                    setSeperatedSeatData={setSeperatedSeatData}
                    setSelectReceiptTarget={setSelectReceiptTarget}
                    setTargetReceiptNumber={setTargetReceiptNumber}
                    setAppendReceipt={setAppendReceipt}
                    />

            <section className='checkTabDisplay'>
                <h2>ADD RECEIPTs, Click on Origin Checks' Seats to Transfer to Receipts, then Print.</h2>
                <div className='seperatedChecksContainer'>
                    {allOnOne || divisionAmount !== ''
                        ? <article
                            className='allOnOneCheck'
                            data-receipttotalcost={receiptData[0]?.data.checkTotal}
                            >
                            <h3>Receipt 1</h3>
                            {divisionAmount !== ''
                                ? <div className='splitEvenContainer'>
                                    <p>${receiptData[0]?.data.checkTotal} split {divisionAmount} ways</p>
                                    <p>is ${receiptData[0]?.data.checkTotal / divisionAmount} each.</p>
                                </div>
                                : null
                            }
                            {receiptData?.map(seat =>
                                <table
                                    key={seat.id}
                                    className='allOnOneSeatInfo'
                                    data-seatnumber={seat.data?.seatNumber}>
                                    <thead>
                                        <tr>
                                            <th
                                                colSpan={2}
                                                >Seat: {seat.data?.seatNumber}
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {seat.data.order?.map((order, i) => {
                                                return(
                                                    <tr
                                                        className='seatItemList'
                                                        data-item={order.item}
                                                        data-cost={order.cost}
                                                        key={i}>
                                                             <td>
                                                                {order.item}
                                                            </td>
                                                            <td
                                                                data-cost={order.cost}
                                                                className='checkItemCost'
                                                                >{order.cost}
                                                            </td>
                                                    </tr>    
                                                )
                                            })
                                        }
                                    </tbody>
                                </table> 
                            )}
                            
                            <footer>
                                <p>Check Total:</p>
                                <p>${receiptData[0]?.data.checkTotal}</p>
                            </footer>
                        </article>
                        : receiptData?.map((receipt, i) => {
                            return(
                                <article
                                    className='seperatedCheck'
                                    key={i}>

                                    {receipt.data?.separation === 'split even'
                                        ? <div className='splitEvenContainer'>
                                            <p>
                                                ${receipt.data.receiptTotalCost} split {receipt.data.splitEven} ways
                                            </p>
                                            <p>
                                                is ${receipt.data.receiptTotalCost / receipt.data.splitEven} each.
                                            </p>
                                        </div>
                                        : receipt.data?.separation === 'all on one'
                                            ? <div className='splitEvenContainer'>
                                                <p>All On One Receipt.</p>
                                            </div>
                                            : receipt.data?.separation === 'seat'
                                                ? <div className='splitEvenContainer'>
                                                    <p>Seperated by Seat.</p>
                                                </div>
                                                : null
                                    }
                                    
                                    <h3>Receipt {receipt.data.receiptNumber}</h3>
                        
                                    <div id={receipt.id}></div>

                                    {receipt.data.seatsList?.map((seat) => {
                                        return(
                                            <table
                                                key={seat.seat}
                                                className='receiptSeatInfo'
                                                data-receipt={receipt.id}
                                                data-seatnumber={seat.seat}
                                                data-separation={receipt.data.separation}
                                                onClickCapture={handlePrintedSeatDeleteCapture}
                                                >
                                                <thead>
                                                    <tr>
                                                        {receipt.data?.separation === 'all on one'
                                                            || receipt.data?.separation === 'split even'
                                                            ? <th
                                                                colSpan={2}
                                                                >Seat: {seat.seat}
                                                            </th>
                                                            : <th
                                                                colSpan={2}
                                                                >❌ Seat: {seat.seat}
                                                            </th>
                                                        }
                                                    </tr>
                                                </thead>
                                                <tbody 
                                                    data-seatid={'seat' + seat.seat}
                                                    data-seatcost={seat.seatCost}
                                                    >
                                                    {seat.order.map((order, i) => {
                                                        return(
                                                            <tr
                                                                key={i}
                                                                className='seatItemList'
                                                                data-item={order.item}
                                                                data-cost={order.cost}
                                                                >
                                                                <td>{order.item}</td>
                                                                <td
                                                                    className='receiptItemCost'
                                                                    >
                                                                    {order.cost}</td>
                                                            </tr>  
                                                        )
                                                    })}
                                                </tbody>
                                            </table>
                                            )
                                        })
                                    }
                        
                                    <footer>
                                        <p>Check Total:</p>
                                        <p>${receipt.data.receiptTotalCost}</p>
                                    </footer>
                                </article>
                            )
                        })
                    }
                </div>
            </section>

            <CheckTabNav
                setHelpModal={props.setHelpModal}
                setFireItAlert={setFireItAlert}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                setPrintReceipts={setPrintReceipts}
                employeeNumber={employeeContext.employeeNumber}
                tableId={props.activeTableData.searchId}
                receiptsList={receiptsList}
                setAllOnOne={setAllOnOne}
                allOnOne={allOnOne}
                setSplitEven={setSplitEven}
                setDivisionAmount={setDivisionAmount}
                />
        </div>
    )
}

export default CheckTab;
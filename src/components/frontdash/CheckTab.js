import CheckTabNav from "./navs/CheckTabNav";
import ServerKeyPad from "../keypads/ServerKeyPad";
import { useTable } from "../../contexts/TableContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect, useCallback } from "react";
import { db } from "../../firebase";
import { doc, getDoc, collection, query, orderBy, onSnapshot } from "firebase/firestore";
import TableCheck from './check_components/TableCheck';
import FireItAlert from "../help/FireItAlert";
import AlphaNumericPad from "../keypads/AlphaNumericPad";

const CheckTab = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ tableData, setTableData ] = useState({});
    const [ serverData, setServerData ] = useState({});
    const [ receiptData, setReceiptData ] = useState();
    const [ fireItAlert, setFireItAlert ] = useState('')
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ newReceipts, setNewReceipts ] = useState(0);
    const [ receiptsToDisplay, setReceiptsToDisplay ] = useState([0]);
    const [ seperatedSeatData, setSeperatedSeatData ] = useState({});
    const [ selectReceiptTarget, setSelectReceiptTarget ] = useState('false');
    const [ targetReceiptNumber, setTargetReceiptNumber ] = useState('');
    const [ appendReceipt, setAppendReceipt ] = useState();
    const [ alphaNumericPadOpen, setAlphaNumericPadOpen ] = useState(false);
    const [ printReceipts, setPrintReceipts ] = useState(true);
    // const [ recalculateReceiptCost, setRecalculateReceiptCost ] = useState(false)
    // const [ receiptTotal, setReceiptTotal ] = useState()
    const seperateChecksList = document.querySelector('.seperatedChecksContainer');

    const handleTest = () => {
        console.log('receipt Data', receiptData)
        console.log('seats to display', receiptsToDisplay)
        console.log(printReceipts)
    }

    const handleDeletePendingSeat = useCallback((e) => {
        const seatToDeleteParent = e.currentTarget.parentNode
        const child = e.currentTarget
        seatToDeleteParent.removeChild(child)
        e.currentTarget.removeEventListener('click', handleDeletePendingSeat)
        // setRecalculateReceiptCost(true)
    },[])

    // Get data for current employee and table, and tables receipts
    useEffect(() => {
        if(contextTable !== ''){
            const getTable = async () => {
                const docRef = doc(db, 'tables', contextTable)
                const tableDataRequest = await getDoc(docRef)
                const tableInfo = tableDataRequest.data();
                    if(tableInfo){
                        setTableData(tableInfo)
                    }
                }
            const getServer = async () => {
                const docRef = doc(db, 'employees', employeeContext.employeeNumber)
                const serverDataRequest = await getDoc(docRef)
                const serverInfo = serverDataRequest.data();
                    if(serverInfo){
                        setServerData(serverInfo)
                    }
                }
            const getReceipts = async () => {
                const receiptCollectionRef = 
                    collection(db, 'receipts', employeeContext.employeeNumber, contextTable)
                const q = query(receiptCollectionRef, orderBy('receiptNumber', 'asc'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setReceiptData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                    })))
                })
                return unsubscribe
            }
            getTable()
            .then(getServer()).then(getReceipts())
        }
    }, [contextTable, employeeContext]);

    // Populate / Remove array to determine render # of seperate check components
    useEffect(() => {
        setReceiptsToDisplay(Array(newReceipts).fill(0))
    }, [newReceipts])

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
                setAppendReceipt(targetReceipt)
            }
        }
    }, [selectReceiptTarget, seperateChecksList, targetReceiptNumber])

    // Put the selected seat on the selected check
    useEffect(() => {
        if(appendReceipt && seperatedSeatData){
            const targetReceipt = document.getElementById(appendReceipt.id)
            const table = document.createElement('table')
            table.classList.add('checkSeatInfo')
            // Set up table head with seat
            const tableHead = document.createElement('thead')
            const tableHeadRow = document.createElement('tr')
            const tableHeadRowTh = document.createElement('th')
            tableHeadRowTh.setAttribute('colspan', '2')
            const seatNumber = document.createTextNode(`Seat: ${seperatedSeatData.seatNumber}`)
            tableHeadRowTh.appendChild(seatNumber)
            tableHeadRow.appendChild(tableHeadRowTh)
            tableHead.appendChild(tableHeadRow)
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
                tableBody.appendChild(tableBodyRow)
            })
            table.appendChild(tableHead)
            table.appendChild(tableBody)
            table.classList.add('pendingSeperateSeat')
            table.addEventListener('click', handleDeletePendingSeat, true)
            targetReceipt.appendChild(table)
            console.log(seperatedSeatData)
            setAppendReceipt('')
            setSeperatedSeatData('')
        //    setRecalculateReceiptCost(true)
        }
    }, [appendReceipt, seperatedSeatData.order, seperatedSeatData.seatNumber, handleDeletePendingSeat, seperatedSeatData])

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

            {alphaNumericPadOpen
                ? <AlphaNumericPad
                    checkTabActive={props.checkTabActive}
                    setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                    />
                : null
            }
            {/* KEEP LAST FOR PRIORITY */}
            {fireItAlert !== ''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    />
                : null
            }

            <TableCheck
                    serverData={serverData}
                    tableData={tableData}
                    checkTabActive={props.checkTabActive}
                    setSeperatedSeatData={setSeperatedSeatData}
                    setSelectReceiptTarget={setSelectReceiptTarget}
                    setTargetReceiptNumber={setTargetReceiptNumber}
                    />

            <section className='checkTabDisplay'>
<button onClick={handleTest} className='testButton'>TEST</button>
                <div className='seperatedChecksContainer'>
                    {receiptData?.map((receipt, i) => {
                        return(
                            <article
                                className='seperatedCheck'
                                key={i}>
                                <h3>Receipt {receipt.data.receiptNumber}</h3>
                    
                                <div id={receipt.id}></div>
                    
                                <footer>
                                    <p>Check Total:</p>
                                    <p>${receipt.data.receiptTotalCost}</p>
                                </footer>
                            </article>
                        )
                    })}
                </div>
            </section>

            <CheckTabNav
                setHelpModal={props.setHelpModal}
                setFireItAlert={setFireItAlert}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setNewReceipts={setNewReceipts}
                newReceipts={newReceipts}
                setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                setPrintReceipts={setPrintReceipts}
                employeeNumber={serverData.employeeNumber}
                tableId={tableData.searchId}
                />
        </div>
    )
}

export default CheckTab;
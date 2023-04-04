import { db } from '../../../firebase';
import { orderBy, onSnapshot, query, collection, doc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import { useTable } from '../../../contexts/TableContext';
import { useState, useEffect, useCallback } from 'react';

const TableCheck = (props) => {
    const { 
        setFireItAlert, currentOrderData, setCurrentOrderData, selectedSeat, setSelectedSeat, doesSeatExist, sendOrder, setSendOrder, setMenuTabActive, setTableTabActive, tableData
    } = props
    const { managerContext, employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ checkData, setCheckData ] = useState([])
    const [ pendingOrder, setPendingOrder ] = useState('')
    const [ checkTotal, setCheckTotal ] = useState();
        
    const handlePendingOrderDelete = useCallback((e) => {
        const seatToAppend = document.getElementById(`${e.target.parentNode.dataset.seat}`)
        const child = e.target.parentNode
        seatToAppend.removeChild(child)
        e.target.removeEventListener('click', handlePendingOrderDelete)
    },[])

    const handlePendingSeatDelete = useCallback((e) => {
        const seatToAppend = 
            document.getElementById(`${e.target.parentNode.dataset.seat}`).parentNode
        const firstChild = seatToAppend.childNodes[0]
        const secondChild = seatToAppend.childNodes[1]
        if(secondChild.childNodes.length <= 1){
            seatToAppend.removeChild(firstChild)
            seatToAppend.removeChild(secondChild)
            e.target.removeEventListener('click', handlePendingOrderDelete)
        }
        if(secondChild.childNodes.length > 1){
            setFireItAlert('TableCheck seat delete')
        }
    },[handlePendingOrderDelete, setFireItAlert])

    // Add up costs of items for check total
    useEffect(() => {
        if(checkData !== []){
            let costsArray = []
            const itemCosts = document.querySelectorAll('.checkItemCost')
            itemCosts.forEach((item) => {
                costsArray.push(Number(item.dataset.cost))
            })
            const sum = costsArray.reduce((a, b) => a + b, 0)
            setCheckTotal(sum)
        }
    }, [checkData])

    // Get Data for the check from current server and table
    useEffect(() => {
        const getCheckData = async () => {
            if(tableData.searchId !== undefined){
                const checkCollectionRef = 
                    collection(db, 'orders', `${employeeContext.employeeNumber}`, `${tableData.searchId}`)
                const q = query(checkCollectionRef, orderBy('seatNumber'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setCheckData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data(),
                        seatNumber:doc.id.replace(/seat/g, ''),
                    })))
                })
                return unsubscribe
            }
        }
        getCheckData()
    },[tableData.searchId, employeeContext.employeeNumber])

    // append pending order to the current check, check for seats and compare to selected to determine how to append
    useEffect(() => {
        // Seat exists in firebase. User selected seat exists on check. Is there item data?
        if(doesSeatExist === true
            && document.getElementById(`seat${selectedSeat}`) !== null
            && currentOrderData !== ''){
                const seatToAppend = document.getElementById(`seat${currentOrderData.seat}`)
                const orderName = document.createTextNode(`${currentOrderData.name}`)
                const orderCost = document.createTextNode(currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.classList.add('pendingDeleteReminder')
                nameContainer.addEventListener('click', handlePendingOrderDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingOrderDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'false')
                orderInfo.setAttribute('data-number', currentOrderData.seat)
                orderInfo.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.setAttribute('data-time', currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                setCurrentOrderData('')
        }
        // Seat does NOT exists in firebase. Seat exsits on check in pending order. Is there item data?
        if(doesSeatExist === false
            && document.getElementById(`seat${selectedSeat}`) !== null
            && currentOrderData !== ''){
                const seatToAppend = document.getElementById(`seat${currentOrderData.seat}`)
                const orderName = document.createTextNode(`${currentOrderData.name}`)
                const orderCost = document.createTextNode(currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.classList.add('pendingDeleteReminder')
                nameContainer.addEventListener('click', handlePendingOrderDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingOrderDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'false')
                orderInfo.setAttribute('data-number', currentOrderData.seat)
                orderInfo.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.setAttribute('data-time', currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                setCurrentOrderData('')
        }
        // AUTO SEAT 1: Seat does exist in firebase. User has not selected a seat leaving it '' so use seat 1, is there item data?
        if(doesSeatExist === true
            && document.getElementById(`seat${selectedSeat}`) === null
            && selectedSeat === ''
            && currentOrderData !== ''){
                const seatToAppend = document.getElementById('seat1')
                const orderName = document.createTextNode(`${currentOrderData.name}`)
                const orderCost = document.createTextNode(currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.classList.add('pendingDeleteReminder')
                nameContainer.addEventListener('click', handlePendingOrderDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingOrderDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'false')
                orderInfo.setAttribute('data-number', currentOrderData.seat)
                orderInfo.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.setAttribute('data-time', currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                setSelectedSeat('1')
                setCurrentOrderData('')
        }
        // FRESH CHECK: Seat does NOT exist in firebase, seat does not exist on check, create new seat if there is item data, ALSO if selected seat is '' setSelectedSeat to 1
        if(doesSeatExist === false 
            && document.getElementById(`seat${selectedSeat}`) === null
            && selectedSeat === ''
            && currentOrderData !== ''){
                const seatsAndOrders = document.querySelector('.seatsAndOrders')
                const newTable = document.createElement('table')
                newTable.classList.add('checkSeatInfo')
                newTable.classList.add('pendingSeat')
                const newTableHead = document.createElement('thead')
                const newTableHeadRow = document.createElement('tr')
                const newTableBody = document.createElement('tbody')
                newTableBody.setAttribute('id', `seat${currentOrderData.seat}` )
                const newTableHeader = document.createElement('th')
                newTableHeader.setAttribute('colspan', '2')
                const seatNumber = document.createTextNode(`Seat: ${currentOrderData.seat}`)
                newTableHeader.appendChild(seatNumber)
                newTableHeadRow.appendChild(newTableHeader)
                const orderName = document.createTextNode(`${currentOrderData.name}`)
                const orderCost = document.createTextNode(currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.classList.add('pendingDeleteReminder')
                nameContainer.addEventListener('click', handlePendingSeatDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingSeatDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'true')
                orderInfo.setAttribute('data-number', currentOrderData.seat)
                orderInfo.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.setAttribute('data-time', currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                newTableBody.appendChild(orderInfo)
                newTableHead.appendChild(newTableHeadRow)
                newTable.appendChild(newTableHead)
                newTable.appendChild(newTableBody)
                seatsAndOrders.appendChild(newTable)
                setSelectedSeat('1')
                setCurrentOrderData('')
        }
        // FRESH SEAT: Seat does not exist in firebase, seat does not exist on check, create new seat table if there is item data.
        if(doesSeatExist === false 
            && document.getElementById(`seat${selectedSeat}`) === null
            && selectedSeat !== ''
            && currentOrderData !== ''){
                const seatsAndOrders = document.querySelector('.seatsAndOrders')
                const newTable = document.createElement('table')
                newTable.classList.add('checkSeatInfo')
                newTable.classList.add('pendingSeat')
                const newTableHead = document.createElement('thead')
                const newTableHeadRow = document.createElement('tr')
                const newTableBody = document.createElement('tbody')
                newTableBody.setAttribute('id', `seat${currentOrderData.seat}` )
                const newTableHeader = document.createElement('th')
                newTableHeader.setAttribute('colspan', '2')
                const seatNumber = document.createTextNode(`Seat: ${currentOrderData.seat}`)
                newTableHeader.appendChild(seatNumber)
                newTableHeadRow.appendChild(newTableHeader)
                const orderName = document.createTextNode(`${currentOrderData.name}`)
                const orderCost = document.createTextNode(currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.classList.add('pendingDeleteReminder')
                nameContainer.addEventListener('click', handlePendingSeatDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingSeatDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'true')
                orderInfo.setAttribute('data-number', currentOrderData.seat)
                orderInfo.setAttribute('data-cost', currentOrderData.cost)
                orderInfo.setAttribute('data-time', currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                newTableBody.appendChild(orderInfo)
                newTableHead.appendChild(newTableHeadRow)
                newTable.appendChild(newTableHead)
                newTable.appendChild(newTableBody)
                seatsAndOrders.appendChild(newTable)
                setCurrentOrderData('')
        }
    }, [currentOrderData, doesSeatExist, selectedSeat, handlePendingOrderDelete, handlePendingSeatDelete, setCurrentOrderData, setSelectedSeat])

    // Make array of pending orders to send to firebase
    useEffect(() => {
        if(sendOrder === true && document.querySelectorAll('.pendingOrder') !== null){
            let ordersToSend = [];
            const pendingOrders = document.querySelectorAll('.pendingOrder')
            pendingOrders.forEach(order => {
                ordersToSend.push({
                    seat:order.dataset.seat, 
                    name:order.firstElementChild.innerText,
                    cost:order.lastElementChild.innerText,
                    new:order.dataset.new,
                    number:order.dataset.number,
                    time:order.dataset.time,
                })
            })
            setPendingOrder(ordersToSend)
        }
    }, [sendOrder])

    // Add item to firebase, check for duplicates and allow.
    useEffect(() => {
        if(sendOrder === true && pendingOrder !== ''){
            pendingOrder.forEach(order => {
                const checkRef = 
                    doc(db, 'orders', `${employeeContext.employeeNumber}`, `${tableData.searchId}`, `${order.seat}`)
                if(order.new === 'true'){
                    const createNewCheckData = async () => {
                        setDoc(checkRef, {
                            seat:true,
                            seatNumber:order.number,
                            order:[{
                                item:order.name, 
                                cost:order.cost, 
                                discount:'0',
                                originalCost:order.cost,
                                qsa:'false',
                                time:order.time,
                            }],
                        })
                    }
                    const setTableOwnership = async () => {
                        const tableRef = doc(db, 'tables', `${tableData.searchId}`)
                        updateDoc(tableRef, {
                            serverOwner:employeeContext.firstName
                        })
                    }
                    createNewCheckData().then(setTableOwnership())
                }
                if(order.new === 'false'){
                    const orderToAdd = [{
                        item:order.name, 
                        cost:order.cost, 
                        discount:'0',
                        originalCost:order.cost,
                        qsa:'false',
                        time:order.time,
                    }]
                    updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd)})
                }
            })
        setSendOrder(false)
        setMenuTabActive(false)
        setTableTabActive(true)
        }
    }, [sendOrder, pendingOrder, employeeContext.employeeNumber, setMenuTabActive, setTableTabActive, setSendOrder, tableData.searchId, employeeContext.firstName])
    
    const handleCheckItemClickCapture = (e) => {
        if(props.menuTabActive && managerContext === false){
            props.setFireItAlert('TableCheck edit sent')
        }
        if(props.menuTabActive && managerContext === true){
            props.setCheckItemModData({
                seat:e.currentTarget.dataset.seat,
                discount:e.currentTarget.dataset.discount,
                cost:e.currentTarget.dataset.cost,
                name:e.currentTarget.dataset.name,
                originalCost:e.currentTarget.dataset.originalcost,
                qsa:e.currentTarget.dataset.qsa,
                time:e.currentTarget.dataset.time,
            })
            props.setModifyCheckItem(true)
        }
    }

    const handleSeperateSeatCapture = (e) => {
        if(props.checkTabActive){
            props.setAppendReceipt('')
            props.setSeperatedSeatData('')
            let seatOrders = []
            let costsArray = []
            props.setTargetReceiptNumber('')
            const targetSeat = e.currentTarget
            const seatItems = targetSeat.querySelectorAll('.seatItemList')
            seatItems.forEach(order => {
                costsArray.push(Number(order.dataset.cost))
                seatOrders.push({
                    item:order.dataset.name,
                    cost:order.dataset.cost,
                })
            })
            props.setSeperatedSeatData({
                seat:targetSeat.lastChild.id,
                order:seatOrders,
                seatNumber:targetSeat.lastChild.id.replace(/\D+/g, ''),
                seatTotalCost:costsArray.reduce((a, b) => a + b, 0)
            })
            props.setSelectReceiptTarget('true')
        }
    }

    return(
        <div className='activeCheck'>
            {contextTable !== ''
                ? <div>
                    <h2>{props.tableData.name}</h2>
                    
                    {props.summaryTabActive
                        ? null
                        : <h3>Server: {employeeContext.firstName}</h3>
                    }
                </div>
                : <div>
                    <h2>No Table Selected</h2>
                </div>
            }

            <div className='seatsAndOrders'>
                {checkData?.map(seat =>
                    <table
                        onClickCapture={handleSeperateSeatCapture}
                        key={seat?.id}
                        className='checkSeatInfo'
                        >
                        <thead>
                            <tr>
                                {props.checkTabActive
                                    ? <th
                                        className='seatTransferReminder'
                                        colSpan={2}
                                        >Seat: {seat.data?.seatNumber}
                                    </th>
                                    : <th
                                        colSpan={2}
                                        >Seat: {seat.data?.seatNumber}
                                    </th>
                                }
                            </tr>
                        </thead>
                        <tbody id={seat?.id}>
                            {seat.data.order?.map((order, i) => {
                                    return(
                                        <tr
                                            className='seatItemList'
                                            key={i}
                                            onClickCapture={handleCheckItemClickCapture}
                                            data-discount={order?.discount}
                                            data-seat={seat.id}
                                            data-name={order.item}
                                            data-cost={order.cost}
                                            data-originalcost={order.originalCost}
                                            data-qsa={order.qsa}
                                            data-time={order.time}>
                                                {props.menuTabActive
                                                    ? <td className='itemModifyReminder'>
                                                        {order.item}
                                                    </td>
                                                    : <td>
                                                        {order.item}
                                                    </td>
                                                }
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
            </div>

            {props.tableData.name !== undefined
                ?<footer>
                    <p>Check Total:</p>
                    <p>${checkTotal}</p>
                </footer>
                :null
            }
        </div>
    )
}

export default TableCheck;
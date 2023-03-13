import { db } from '../../../firebase';
import { orderBy, onSnapshot, query, collection, doc, setDoc, updateDoc, arrayUnion, getDocs } from 'firebase/firestore';
import { useAuth } from '../../../contexts/AuthContext';
import { useState, useEffect, useCallback } from 'react';

const TableCheck = (props) => {
    const { managerContext } = useAuth();
    const [ checkData, setCheckData ] = useState([])
    const [ pendingOrder, setPendingOrder ] = useState('')
    const [ checkTotal, setCheckTotal ] = useState()
    const checkCollectionRef = 
        collection(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.searchId}`)
        
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
            props.setFireItAlert('TableCheck seat delete')
        }
    },[handlePendingOrderDelete, props])

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
            if(props.tableData.searchId !== undefined){
                const q = query(checkCollectionRef, orderBy('seatNumber'));
                const querySnapshot = await getDocs(q, { source: 'cache'})
                if(!querySnapshot.empty){
                    const checkData = querySnapshot.docs.map(doc => ({
                        id: doc.id,
                        data:doc.data(),
                    }))
                    setCheckData(checkData)
                } else {
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
        }
        getCheckData()
    },[checkCollectionRef, props.tableData.searchId])

    // append pending order to the current check, check for seats and compare to selected to determine how to append
    useEffect(() => {
        // Seat exists in firebase. User selected seat exists on check. Is there item data?
        if(props.doesSeatExist === true
            && document.getElementById(`seat${props.selectedSeat}`) !== null
            && props.currentOrderData !== ''){
                const seatToAppend = document.getElementById(`seat${props.currentOrderData.seat}`)
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.addEventListener('click', handlePendingOrderDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingOrderDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'false')
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                orderInfo.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.setAttribute('data-time', props.currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                props.setCurrentOrderData('')
        }
        // Seat  does NOT exists in firebase. Seat exsits on check in pending order. Is there item data?
        if(props.doesSeatExist === false
            && document.getElementById(`seat${props.selectedSeat}`) !== null
            && props.currentOrderData !== ''){
                const seatToAppend = document.getElementById(`seat${props.currentOrderData.seat}`)
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.addEventListener('click', handlePendingOrderDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingOrderDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'false')
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                orderInfo.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.setAttribute('data-time', props.currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                props.setCurrentOrderData('')
        }
        // AUTO SEAT 1: Seat does exist in firebase. User has not selected a seat leaving it '' so use seat 1, is there item data?
        if(props.doesSeatExist === true
            && document.getElementById(`seat${props.selectedSeat}`) === null
            && props.selectedSeat === ''
            && props.currentOrderData !== ''){
                const seatToAppend = document.getElementById('seat1')
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.addEventListener('click', handlePendingOrderDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingOrderDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'false')
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                orderInfo.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.setAttribute('data-time', props.currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                props.setSelectedSeat('1')
                props.setCurrentOrderData('')
        }
        // FRESH CHECK: Seat does NOT exist in firebase, seat does not exist on check, create new seat if there is item data, ALSO if selected seat is '' setSelectedSeat to 1
        if(props.doesSeatExist === false 
            && document.getElementById(`seat${props.selectedSeat}`) === null
            && props.selectedSeat === ''
            && props.currentOrderData !== ''){
                const seatsAndOrders = document.querySelector('.seatsAndOrders')
                const newTable = document.createElement('table')
                newTable.classList.add('checkSeatInfo')
                newTable.classList.add('pendingSeat')
                const newTableHead = document.createElement('thead')
                const newTableHeadRow = document.createElement('tr')
                const newTableBody = document.createElement('tbody')
                newTableBody.setAttribute('id', `seat${props.currentOrderData.seat}` )
                const newTableHeader = document.createElement('th')
                newTableHeader.setAttribute('colspan', '2')
                const seatNumber = document.createTextNode(`Seat: ${props.currentOrderData.seat}`)
                newTableHeader.appendChild(seatNumber)
                newTableHeadRow.appendChild(newTableHeader)
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.addEventListener('click', handlePendingSeatDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingSeatDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'true')
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                orderInfo.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.setAttribute('data-time', props.currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                newTableBody.appendChild(orderInfo)
                newTableHead.appendChild(newTableHeadRow)
                newTable.appendChild(newTableHead)
                newTable.appendChild(newTableBody)
                seatsAndOrders.appendChild(newTable)
                props.setSelectedSeat('1')
                props.setCurrentOrderData('')
        }
        // FRESH SEAT: Seat does not exist in firebase, seat does not exist on check, create new seat table if there is item data.
        if(props.doesSeatExist === false 
            && document.getElementById(`seat${props.selectedSeat}`) === null
            && props.selectedSeat !== ''
            && props.currentOrderData !== ''){
                const seatsAndOrders = document.querySelector('.seatsAndOrders')
                const newTable = document.createElement('table')
                newTable.classList.add('checkSeatInfo')
                newTable.classList.add('pendingSeat')
                const newTableHead = document.createElement('thead')
                const newTableHeadRow = document.createElement('tr')
                const newTableBody = document.createElement('tbody')
                newTableBody.setAttribute('id', `seat${props.currentOrderData.seat}` )
                const newTableHeader = document.createElement('th')
                newTableHeader.setAttribute('colspan', '2')
                const seatNumber = document.createTextNode(`Seat: ${props.currentOrderData.seat}`)
                newTableHeader.appendChild(seatNumber)
                newTableHeadRow.appendChild(newTableHeader)
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                nameContainer.addEventListener('click', handlePendingSeatDelete)
                const costContainer = document.createElement('td')
                costContainer.addEventListener('click', handlePendingSeatDelete)
                costContainer.classList.add('checkItemCost')
                costContainer.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', 'true')
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                orderInfo.setAttribute('data-cost', props.currentOrderData.cost)
                orderInfo.setAttribute('data-time', props.currentOrderData.time)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                newTableBody.appendChild(orderInfo)
                newTableHead.appendChild(newTableHeadRow)
                newTable.appendChild(newTableHead)
                newTable.appendChild(newTableBody)
                seatsAndOrders.appendChild(newTable)
                props.setCurrentOrderData('')
        }
    }, [props.currentOrderData, props.doesSeatExist, props.selectedSeat, props, handlePendingOrderDelete, handlePendingSeatDelete])

    // Make array of pending orders to send to firebase
    useEffect(() => {
        if(props.sendOrder === true && document.querySelectorAll('.pendingOrder') !== null){
            let ordersToSend = [];
            const pendingOrders = document.querySelectorAll('.pendingOrder')
            pendingOrders.forEach((order, i) => {
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
    }, [props.sendOrder])

    // Add item to firebase, check for duplicates and allow.
    useEffect(() => {
        if(props.sendOrder === true && pendingOrder !== ''){
            pendingOrder.forEach(order => {
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.searchId}`, `${order.seat}`)
                if(order.new === 'true'){
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
        props.setSendOrder(false)
        props.setMenuTabActive(false)
        props.setTableTabActive(true)
        }
    }, [props.sendOrder, pendingOrder, props])
    
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
            {props.tableData.name !== undefined
                ? <div>
                    <h2>{props.tableData.name}</h2>
                    <h3>Server: {props.serverData.firstName}</h3>
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
                                <th
                                    colSpan={2}
                                    >Seat: {seat.data?.seatNumber}
                                </th>
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
                                                <td>{order.item}</td>
                                                <td
                                                    data-cost={order.cost}
                                                    className='checkItemCost'
                                                    >{order.cost}</td>
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
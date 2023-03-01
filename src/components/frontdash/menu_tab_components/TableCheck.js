import { db } from '../../../firebase';
import { orderBy, onSnapshot, query, collection, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const TableCheck = (props) => {
    const [ checkData, setCheckData ] = useState([])
    const [ pendingOrder, setPendingOrder ] = useState('')
    // const [ checkTotal, setCheckTotal ] = useState()
    const checkCollectionRef = 
        collection(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`)

    const handleTest = () => {
        // const sum = checkTotal.reduce((a, b) => a + b, 0)
        console.log(pendingOrder)
    }

    // Add up costs of items for check total
    // useEffect(() => {
    //     let costsArray = []
    //     const itemCosts = document.querySelectorAll('.checkItemCost')
    //     itemCosts.forEach((item) => {
    //         costsArray.push(Number(item.dataset.value))
    //     })
    //     const sum = costsArray.reduce((a, b) => a + b, 0)
    //     setCheckTotal(sum)
    // },[])

    // Get Data for the check from current server and table
    useEffect(() => {
        if(props.tableData.name !== undefined){
            const q = query(checkCollectionRef, orderBy('seatNumber'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCheckData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
    },[checkCollectionRef, props.tableData.name])

    // append pending order to the current check, check for seats and compare to selected to determine how to append
    useEffect(() => {
        if(props.doesSeatExist === true
            && document.getElementById(`seat${props.selectedSeat}`) !== null
            && props.currentOrderData !== ''){
                const seatToAppend = document.getElementById(`seat${props.currentOrderData.seat}`)
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                const costContainer = document.createElement('td')
                costContainer.classList.add('checkItemCost')
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', false)
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                props.setCurrentOrderData('')
        }
        if(props.doesSeatExist === false
            && document.getElementById(`seat${props.selectedSeat}`) !== null
            && props.currentOrderData !== ''){
                const seatToAppend = document.getElementById(`seat${props.currentOrderData.seat}`)
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                const costContainer = document.createElement('td')
                costContainer.classList.add('checkItemCost')
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', true)
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                props.setCurrentOrderData('')
        }
        if(props.doesSeatExist === true
            && document.getElementById(`seat${props.selectedSeat}`) === null
            && props.selectedSeat === ''
            && props.currentOrderData !== ''){
                const seatToAppend = document.getElementById('seat1')
                const orderName = document.createTextNode(props.currentOrderData.name)
                const orderCost = document.createTextNode(props.currentOrderData.cost)
                const orderInfo = document.createElement('tr')
                const nameContainer = document.createElement('td')
                const costContainer = document.createElement('td')
                costContainer.classList.add('checkItemCost')
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', false)
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
                nameContainer.appendChild(orderName)
                costContainer.appendChild(orderCost)
                orderInfo.appendChild(nameContainer)
                orderInfo.appendChild(costContainer)
                seatToAppend.appendChild(orderInfo)
                props.setCurrentOrderData('')
        }
        if(props.doesSeatExist === false 
            && document.getElementById(`seat${props.selectedSeat}`) === null
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
                const costContainer = document.createElement('td')
                costContainer.classList.add('checkItemCost')
                orderInfo.classList.add('pendingOrder')
                orderInfo.setAttribute('data-seat', `seat${props.currentOrderData.seat}`)
                orderInfo.setAttribute('data-new', true)
                orderInfo.setAttribute('data-number', props.currentOrderData.seat)
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
    }, [props.currentOrderData, props.doesSeatExist, props.selectedSeat, props])

    // Make array of pending orders to send to firebase
    useEffect(() => {
        if(props.sendOrder === true && document.querySelectorAll('.pendingOrder') !== null){
            let ordersToSend = [];
            const pendingOrders = document.querySelectorAll('.pendingOrder')
            pendingOrders.forEach(order => {
                ordersToSend.push({
                    seat:order.dataset.seat, 
                    name:order.firstElementChild.innerText,
                    cost:order.lastElementChild.innerText,
                    new:order.dataset.new,
                    number:order.dataset.number,
                })
            })
            setPendingOrder(ordersToSend)
        }
    }, [props.sendOrder])

    // Send order to Firebase
    useEffect(() => {
        if(props.sendOrder === true && pendingOrder !== ''){
            pendingOrder.forEach(order => {
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `${order.seat}`)
                    if(order.new === 'false'){
                        const orderToAdd = [{item:order.name, cost:order.cost}]
                        updateDoc(checkRef, {
                        order:arrayUnion(...orderToAdd)})
                    }
                    if(order.new === 'true'){
                        const doesSeatExist = async () => {
                            const docSnap = await getDoc(checkRef)
                            if(docSnap.exists()){
                                const orderToAdd = [{item:order.name, cost:order.cost}]
                                updateDoc(checkRef, {
                                order:arrayUnion(...orderToAdd),})
                            } else {
                                setDoc(checkRef, {
                                    seat:true,
                                    seatNumber:order.number,
                                    order:[{item:order.name, cost:order.price}],
                                    })
                            }
                        }
                        doesSeatExist()
                    }
            })
        props.setSendOrder(false)
        props.setMenuTabActive(false)
        props.setTableTabActive(true)
        }
    }, [props.sendOrder, pendingOrder, props])

    return(
        <div>            
            <button onClick={handleTest} className='testButton'>TEST</button>
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
                                        <tr key={i}>
                                            <td>{order.item}</td>
                                            <td
                                                data-value={order.cost}
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
                    {/* <p>${checkTotal}</p> */}
                </footer>
                :null
            }
        </div>
    )
}

export default TableCheck;
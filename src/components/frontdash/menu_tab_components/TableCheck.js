import { db } from '../../../firebase';
import { orderBy, onSnapshot, query, collection } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';

const TableCheck = (props) => {
    const [ checkData, setCheckData ] = useState([])
    // const [ checkTotal, setCheckTotal ] = useState()
    const checkCollectionRef = 
        collection(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`)

    const handleTest = () => {
        // const sum = checkTotal.reduce((a, b) => a + b, 0)
        const what = document.getElementById(`seat${props.selectedSeat}`)
        console.log('getbyid:', what)
        console.log('does seat exist?:', props.doesSeatExist)
        console.log('current order data?:', props.currentOrderData)
        console.log('selected seat:', props.selectedSeat)
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

    // append pending order to the current check.
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
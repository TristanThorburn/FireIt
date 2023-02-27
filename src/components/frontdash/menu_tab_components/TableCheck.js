import { db } from '../../../firebase';
import { orderBy, onSnapshot, query, collection } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const TableCheck = (props) => {
    const [ checkData, setCheckData ] = useState([])
    // const [ checkTotal, setCheckTotal ] = useState()
    const checkCollectionRef = 
        collection(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`)

    const handleTest = () => {
        // const sum = checkTotal.reduce((a, b) => a + b, 0)
        console.log('test')
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

            {checkData?.map(seat =>
                <table
                    key={seat?.id}
                    className='checkSeatInfo'
                    >
                    <thead>
                        <tr>
                            <th colSpan={2}>Seat: {seat.data?.seatNumber}</th>
                        </tr>
                    </thead>
                    <tbody>
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
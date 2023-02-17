import { db } from '../../../firebase';
import { doc, orderBy, onSnapshot, query, collection, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const TableCheck = (props) => {
    // props.serverData, props.tableData
    const [ checkData, setCheckData ] = useState([])
    // query where()
    // const checkRef = doc(db, 'checks', `${serverData.employeeNumber}`, `${tableData.name}`, props.selectedSeat)
    const checkRef = 
        doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat')
    const checkCollectionRef = 
        collection(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`)


    const handleTest = async () => {
        console.log('server:', props.serverData.employeeNumber, 'table:', props.tableData.name);
        setDoc(checkRef, {
            seat:true,
            seatNumber:'1',
            items:['bruschetta', 'caesar salad', 'curry'],
            checkTotal:'15',
        })
    }
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
            {props.tableData.name !== undefined
                ? <div>
                    <h2>{props.tableData.name}</h2>
                    <h3>Server: {props.serverData.firstName}</h3>
                </div>
                : <div>
                    <h2>No Table Selected</h2>
                </div>
            }
            <ul>
                {checkData?.map(seat =>
                    <div key={seat.id}>
                        <h4>Seat: {seat.data.seatNumber}</h4>
                        <p>Total: {seat.data.checkTotal}</p>
                        <div>{seat.data.items.map((item, i) => 
                            <p key={i}>{item}</p>)
                        }</div>
                    </div> 
                )}
            </ul>
            <button onClick={handleTest} className='testButton'>Test</button>
            <footer>
                <p>Check Total:</p>
                <p>$$$$$$</p>
            </footer>
            
        </div>
    )
}

export default TableCheck;
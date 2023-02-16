import { useTable } from '../../../contexts/TableContext';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { doc, getDoc, orderBy, onSnapshot, query, collection, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const TableCheck = () => {
    const { employeeContext } = useAuth()
    const { contextTable } = useTable();
    const [ tableData, setTableData ] = useState([])
    const [ serverData, setServerData ] = useState({})
    const [ checkData, setCheckData ] = useState([])
    // query where()
    const checkRef = doc(db, 'checks', `${serverData.employeeNumber}`, `${tableData.name}`, 'seat')
    const checkCollectionRef = 
        collection(db, 'checks', `${serverData.employeeNumber}`, `${tableData.name}`)

    useEffect(() => {
        const q = query(checkCollectionRef, orderBy('seatNumber'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setCheckData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[checkCollectionRef])

    const handleTest = async () => {
        // console.log('server:', serverData.employeeNumber, 'table:', tableData.name);
        setDoc(checkRef, {
            seat:true,
            seatNumber:'1',
            items:['bruschetta', 'caesar salad', 'curry'],
            checkTotal:'15',
        })
    }

    // Check which table is in tableContext
    useEffect(() => {
        if(contextTable !== '' ){
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
            getTable()
            .then(() => {getServer()}).catch(error => console.log(error))
        }
    }, [contextTable, employeeContext]);

    return(
        <div>
            <button onClick={handleTest}>Test</button>
            {tableData && serverData
                ? <div>
                    <h2>{tableData.name}</h2>
                    <h3>Server: {serverData.firstName}</h3>
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
        </div>
    )
}

export default TableCheck;
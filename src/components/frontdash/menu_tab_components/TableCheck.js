import { useTable } from '../../../contexts/TableContext';
import { useAuth } from '../../../contexts/AuthContext';
import { db } from '../../../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const TableCheck = () => {
    const { employeeContext } = useAuth()
    const { contextTable } = useTable();
    const [ tableData, setTableData ] = useState([])
    const [ serverData, setServerData ] = useState({})
    // query where()
    const checkRef = doc(db, 'checks', `${serverData.employeeNumber}`, `${tableData.name}`, 'seat')

    const handleTest = async () => {
        // console.log('server:', serverData, 'table:', tableData);
        setDoc(checkRef, {
            seat:true,
            seatNumber:'1',
            items:['chicken strips', 'burger', 'spaghetti'],
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
        </div>
    )
}

export default TableCheck;
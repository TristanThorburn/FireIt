import { useTable } from '../../../contexts/TableContext';
import { db } from '../../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import { useState, useEffect } from 'react';

const TableCheck = () => {
    const { contextTable } = useTable();
    const [ tableData, setTableData ] = useState('')

    // const handleTest = async () => {
    //     console.log(contextTable);
    // }
    // Check which table is in tableContext
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
            getTable()
        }
    });

    return(
        <div>
            {/* <button onClick={handleTest}>Test</button> */}
            {tableData
                ? <div>
                    <h2>{tableData.name}</h2>
                </div>
                : <div>
                    <h2>No Table Selected</h2>
                </div>
            }
        </div>
    )
}

export default TableCheck;
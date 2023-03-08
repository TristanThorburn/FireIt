import CheckTabNav from "./navs/CheckTabNav";
import ServerKeyPad from "../user/ServerKeyPad";
import { useTable } from "../../contexts/TableContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import TableCheck from './check_components/TableCheck';
import SeparateCheck from "./check_components/SeperateCheck";
import FireItAlert from "../help/FireItAlert";

const CheckTab = (props) => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const [ tableData, setTableData ] = useState({});
    const [ serverData, setServerData ] = useState({});
    const [ fireItAlert, setFireItAlert ] = useState('')
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ newReceipts, setNewReceipts ] = useState(1);
    const [ receiptsToDisplay, setReceiptsToDisplay ] = useState([0]);

    const handleTest = () => {
        console.log(contextTable)
    }

    // Get data for current employee and table
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
            getTable()
            .then(() => {getServer()}).catch(error => console.log(error))
        }
    }, [contextTable, employeeContext]);

    // Populate / Remove separate check components
    useEffect(() => {
        setReceiptsToDisplay(Array(newReceipts).fill(0))
        console.log(receiptsToDisplay)
        // Array(newReceipts).fill(0).map((_, i) => <YourComponent key={i} />)

        // Array(10): Create an empty array that can hold 10 values (replace 10 with a dynamic value in your code).
        // .fill(0): Fill it with some dummy value like 0. The array is now populated with 0 10 times.
        // .map((_, i) => (...)): Transform an array of 0 to an array of YourComponent. You can change the name of an unused argument to _ to remove the the no-unused-vars warning from ESLint.

    }, [newReceipts, receiptsToDisplay])

    return(
        <div className='checkTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

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
                    />

            <header>
                <button onClick={handleTest} className='testButton'>TEST</button>
                
                <h2>Check Tab Under Construction</h2>
            </header>

            <section>
                {receiptsToDisplay.map((_, i) => <SeparateCheck key={i} />)}
            </section>

            <CheckTabNav
                setHelpModal={props.setHelpModal}
                setFireItAlert={setFireItAlert}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setNewReceipts={setNewReceipts}
                newReceipts={newReceipts}
                />
        </div>
    )
}

export default CheckTab;
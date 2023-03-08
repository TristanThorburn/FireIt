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

    // Populate / Remove array to determine render # of seperate check components
    useEffect(() => {
        setReceiptsToDisplay(Array(newReceipts).fill(0))
    }, [newReceipts])

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
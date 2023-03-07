import CheckTabNav from "./navs/CheckTabNav";
import ServerKeyPad from "../user/ServerKeyPad";
import { useTable } from "../../contexts/TableContext";
import { useAuth } from "../../contexts/AuthContext";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import TableCheck from '../frontdash/menu_tab_components/TableCheck';

const CheckTab = (props) => {
    const { employeeContext } = useAuth()
    const { contextTable } = useTable();
    const [ tableData, setTableData ] = useState({})
    const [ serverData, setServerData ] = useState({})
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);

    const handleTest = () => {
        console.log(tableData)
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

    return(
        <div className='checkTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            <TableCheck
                    serverData={serverData}
                    tableData={tableData}
                    />

            <section>
                <button onClick={handleTest} className='testButton'>TEST</button>
                
                <h2>Check Tab Under Construction</h2>

            </section>

            <CheckTabNav
                setHelpModal={props.setHelpModal}
                setManagerKeyPadActive={setManagerKeyPadActive}
                />
        </div>
    )
}

export default CheckTab;
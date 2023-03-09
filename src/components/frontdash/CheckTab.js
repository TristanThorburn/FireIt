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
    const [ seperatedSeatData, setSeperatedSeatData ] = useState({});
    const [ selectReceiptTarget, setSelectReceiptTarget ] = useState('false')
    const [ targetReceiptNumber, setTargetReceiptNumber ] = useState('')
    const [ appendReceipt, setAppendReceipt ] = useState()
    const seperateChecksList = document.querySelector('.seperatedChecksContainer')

    const handleTest = () => {
        console.log(targetReceiptNumber)
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

    // Check if selected receipt exists on display
    useEffect(() => {
        if(selectReceiptTarget === 'approved'){
            const receiptId = 'receipt' + targetReceiptNumber
            const targetReceipt = seperateChecksList.querySelector(`#${receiptId}`)
            if(targetReceipt === null){
                setFireItAlert('CheckTab receipt undefined')
                setSelectReceiptTarget('true')
            }
            if(targetReceipt){
                setAppendReceipt(targetReceipt)
            }
        }
    }, [selectReceiptTarget, seperateChecksList, targetReceiptNumber])

    return(
        <div className='checkTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            {selectReceiptTarget === 'true'
                ? <ServerKeyPad
                    selectReceiptTarget={selectReceiptTarget}
                    setSelectReceiptTarget={setSelectReceiptTarget}
                    setTargetReceiptNumber={setTargetReceiptNumber}
                    targetReceiptNumber={targetReceiptNumber}
                    seperatedSeatData={seperatedSeatData}
                    />
                : null
            }
            {/* KEEP LAST FOR PRIORITY */}
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
                    checkTabActive={props.checkTabActive}
                    setSeperatedSeatData={setSeperatedSeatData}
                    setSelectReceiptTarget={setSelectReceiptTarget}
                    />

            <section className='checkTabDisplay'>
<button onClick={handleTest} className='testButton'>TEST</button>
                <div className='seperatedChecksContainer'>
                    {receiptsToDisplay.map((_, i) => 
                        <SeparateCheck 
                            key={i}
                            receiptNum={i}
                            seperatedSeatData={seperatedSeatData}
                            setSeperatedSeatData={setSeperatedSeatData}
                            targetReceiptNumber={targetReceiptNumber}
                            selectReceiptTarget={selectReceiptTarget}
                            appendReceipt={appendReceipt}
                            setAppendReceipt={setAppendReceipt}
                            employeeNumber={serverData.employeeNumber}
                            tableId={tableData.searchId}
                            />
                        )}
                </div>
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
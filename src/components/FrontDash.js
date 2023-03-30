import { useState, useEffect } from 'react'
import { useTable } from '../contexts/TableContext';
import { useAuth } from '../contexts/AuthContext';
import { db } from '../firebase';
import { 
    doc, getDoc, getDocFromCache, where, query, onSnapshot
    } from 'firebase/firestore';
import { tableMapCollectionRef } from '../library/firestoreCollections';
import FrontDashNavTabs from './frontdash/navs/FrontDashTabsNav';
import FrontDashHelp from './help/FrontDashHelp';
import SummaryTab from './frontdash/SummaryTab';
import TableTab from './frontdash/TableTab';
import MenuTab from './frontdash/MenuTab';
import CheckTab from './frontdash/CheckTab';
import PaymentTab from './frontdash/PaymentTab';
import FireItAlert from './help/FireItAlert';
import MessageOfTheDay from './help/MessageOfTheDay';
import AdminPad from './keypads/AdminPad';
 
const FrontDash = () => {
    const { employeeContext } = useAuth();
    const { contextTable } = useTable();
    const[ summaryTabActive, setSummaryTabActive ] = useState(false);
    const[ tableTabActive, setTableTabActive ] = useState(true);
    const[ menuTabActive, setMenuTabActive ] = useState(false);
    const[ checkTabActive, setCheckTabActive ] = useState(false);
    const[ paymentTabActive, setPaymentTabActive ] = useState(false);
    const [ adminPad, setAdminPad ] = useState(false)
    const [ helpModal, setHelpModal ] = useState(false);
    const [ fireItAlert, setFireItAlert ] = useState('');
    const [ activeTableData, setActiveTableData ] = useState({});
    const [ serverTableList, setServerTableList ] = useState([]);
    const [ messageOfTheDay, setMessageOfTheDay ] = useState(false)

    // Populate data of selected table for use in MenuTab, CheckTab, PaymentTab
    useEffect(() => {
        if(contextTable !== '' ){
            const getTable = async () => {
                const docRef = doc(db, 'tables', contextTable)
                const tableDataRequest = await getDocFromCache(docRef)
                const tableInfo = tableDataRequest.data();
                    if(tableInfo){
                        setActiveTableData(tableInfo)
                    } else {
                        const serverDataRequest = await getDoc(docRef)
                        const serverData = serverDataRequest.data()
                        if(serverData){
                            setActiveTableData(serverData)
                        } else {
                            setFireItAlert('Table data error')
                        }
                    }
                }
            getTable()
        }
    }, [contextTable, employeeContext]);

    // Get a list of the active servers tables and check if employee first login
    useEffect(() => {
        const q = 
            query(tableMapCollectionRef, 
                where('serverOwner', '==', `${employeeContext.employeeNumber}`))
            const getTableList = async () => {
                if(employeeContext.firstLogin === 'true'){
                    setMessageOfTheDay(true)
                }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setServerTableList(snapshot.docs.map(doc => ({
                        id: doc.data().searchId,
                        data: doc.data()
                    })))
                })
                return unsubscribe
        }
        getTableList()
    }, [employeeContext.employeeNumber, employeeContext.firstLogin])

    return(
        <div className='frontDash'>
            <FrontDashNavTabs 
                tableTabActive={tableTabActive}
                tableTab={setTableTabActive} 
                menuTabActive={menuTabActive}
                menuTab={setMenuTabActive} 
                checkTabActive={checkTabActive}
                checkTab={setCheckTabActive}
                paymentTabActive={paymentTabActive}
                paymentTab={setPaymentTabActive}
                summaryTabActive={summaryTabActive}
                summaryTab={setSummaryTabActive}
                setAdminPad={setAdminPad}
                />

            {messageOfTheDay
                ? <MessageOfTheDay 
                    firstLogin={employeeContext.firstLogin}
                    employeeNumber={employeeContext.employeeNumber}
                    employeeName={employeeContext.firstName}
                    setMessageOfTheDay={setMessageOfTheDay}
                    />
                : null
            }
            
            {helpModal
                ? <FrontDashHelp
                    tableTabActive={tableTabActive}
                    menuTabActive={menuTabActive}
                    checkTabActive={checkTabActive}
                    paymentTabActive={paymentTabActive}
                    summaryTabActive={summaryTabActive}
                    setHelpModal={setHelpModal}
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

            {adminPad
                ? <AdminPad 
                    setAdminPad={setAdminPad}
                    />
                : null
            }
            
            
            {summaryTabActive
                ? <SummaryTab
                    setHelpModal={setHelpModal}
                    serverTableList={serverTableList}
                    activeTableData={activeTableData}
                    summaryTabActive={summaryTabActive}
                    setSummaryTabActive={setSummaryTabActive}
                    setMenuTabActive={setMenuTabActive}
                    />
                : null
            }

            {tableTabActive
                ? <TableTab
                    setHelpModal={setHelpModal}
                    tableTabActive={tableTabActive}
                    setTableTabActive={setTableTabActive}
                    setMenuTabActive={setMenuTabActive}
                    setMessageOfTheDay={setMessageOfTheDay}
                    />
                : null
            }

            {menuTabActive
                ? <MenuTab
                    setHelpModal={setHelpModal}
                    setTableTabActive={setTableTabActive}
                    setMenuTabActive={setMenuTabActive}
                    menuTabActive={menuTabActive}
                    activeTableData={activeTableData}
                    serverTableList={serverTableList}
                    />
                : null
            }

            {checkTabActive
                ? <CheckTab
                    setHelpModal={setHelpModal}
                    checkTabActive={checkTabActive}
                    setCheckTabActive={setCheckTabActive}
                    setPaymentTabActive={setPaymentTabActive}
                    activeTableData={activeTableData}
                    serverTableList={serverTableList}
                    />
                : null
            }

            {paymentTabActive
                ? <PaymentTab
                    setHelpModal={setHelpModal}
                    paymentTabActive={paymentTabActive}
                    activeTableData={activeTableData}
                    serverTableList={serverTableList}
                    />
                : null
            }
        </div>
    )
}

export default FrontDash;
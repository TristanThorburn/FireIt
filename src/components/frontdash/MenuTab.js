import TableCheck from "./menu_tab_components/TableCheck";
import MenuTabNav from "./navs/MenuTabNav";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useTable } from "../../contexts/TableContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import AppsScreen from './menu_tab_components/AppsScreen';
import MainsScreen from './menu_tab_components/MainsScreen';
import DessertsScreen from './menu_tab_components/DessertsScreen';
import NonAlchScreen from './menu_tab_components/NonAlchScreen';
import BeerScreen from './menu_tab_components/BeerScreen';
import CiderSeltzScreen from './menu_tab_components/CiderSeltzScreen';
import MixedDrinksScreen from './menu_tab_components/MixedDrinksScreen';
import LiquorsScreen from './menu_tab_components/LiquorsScreen';
import WinesScreen from './menu_tab_components/WinesScreen';
import ServerKeyPad from '../user/ServerKeyPad';
import ModifyCheckItem from "./menu_tab_components/ModifyCheckItem";
import FireItAlert from "../user/FireItAlert";

const MenuTab = (props) => {
    const { employeeContext } = useAuth()
    const { contextTable } = useTable();
    const [ tableData, setTableData ] = useState([])
    const [ serverData, setServerData ] = useState({})
    const [ directory, setDirectory ] = useState(true);
    const [ appsCategory, setAppsCategory ] = useState(false);
    const [ mainsCategory, setMainsCategory ] = useState(false);
    const [ dessertsCategory, setDessertsCategory ] = useState(false);
    const [ nonAlchCategory, setNonAlchCategory ] = useState(false);
    const [ beerCategory, setBeerCategory ] = useState(false);
    const [ cidSprCategory, setCidSprCategory ] = useState(false);
    const [ mixedCategory, setMixedCategory ] = useState(false);
    const [ liquorsCategory, setLiquorsCategory ] = useState(false);
    const [ winesCategory, setWinesCategory ] = useState(false);
    const [ selectedSeat, setSelectedSeat ] = useState('');
    const [ seatKeyPadActive, setSeatKeyPadActive ] = useState(false);
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ doesSeatExist, setDoesSeatExist ] = useState(false);
    const [ currentOrderData, setCurrentOrderData ] = useState('');
    const [ sendOrder, setSendOrder ] = useState(false);
    const [ modifyCheckItem, setModifyCheckItem ] = useState(false)
    const [ checkItemModData, setCheckItemModData ] = useState()
    const [ fireItAlert, setFireItAlert ] = useState('')

    // Get data for current employee and table
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

    // Confirm if seat exists on check, if none is selected assume we are using seat 1
    useEffect(() => {
        const doesSeatExist = async () => {
            if(selectedSeat === ''){
                const docRef = 
                    doc(db, 'checks', `${serverData.employeeNumber}`, `${tableData.searchId}`, 'seat1')
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    setDoesSeatExist(true)
                } else {
                    setDoesSeatExist(false)
                }
            }
            if(selectedSeat !== ''){
                const docRef = 
                    doc(db, 'checks', `${serverData.employeeNumber}`, `${tableData.searchId}`, `seat${selectedSeat}`)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    setDoesSeatExist(true)
                } else {
                    setDoesSeatExist(false)
                }
            }
        }
        doesSeatExist()
    }, [selectedSeat, serverData.employeeNumber, tableData.searchId])

    const handleGoApps = () => {
        setDirectory(false);
        setAppsCategory(true);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoMain = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(true);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoDesserts = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(true);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoNonAlch = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(true);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoBeer = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(true);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoCidSpr = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(true);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoMixed = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(true);
        setLiquorsCategory(false);
        setWinesCategory(false);
    }

    const handleGoLiquor = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(true);
        setWinesCategory(false);
    }

    const handleGoWine = () => {
        setDirectory(false);
        setAppsCategory(false);
        setMainsCategory(false);
        setDessertsCategory(false);
        setNonAlchCategory(false);
        setBeerCategory(false);
        setCidSprCategory(false);
        setMixedCategory(false);
        setLiquorsCategory(false);
        setWinesCategory(true);
    }

    return(
        <div className='menuTab'>
            {fireItAlert !== ''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    />
                : null
            }

            {seatKeyPadActive
                ? <ServerKeyPad
                    seatKeyPadActive={seatKeyPadActive}
                    setSeatKeyPadActive={setSeatKeyPadActive}
                    setSelectedSeat={setSelectedSeat}
                    selectedSeat={selectedSeat}
                    />
                : null
            }

            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            {modifyCheckItem
                ? <ModifyCheckItem
                    modifyCheckItem={modifyCheckItem}
                    setModifyCheckItem={setModifyCheckItem}
                    checkItemModData={checkItemModData}
                    setCheckItemModData={setCheckItemModData}
                    setDoesSeatExist={setDoesSeatExist}
                    />
                : null
            }

            <article className='activeCheck'>
                <TableCheck
                    doesSeatExist={doesSeatExist}
                    selectedSeatExists={doesSeatExist}
                    selectedSeat={selectedSeat}
                    setSelectedSeat={setSelectedSeat}
                    serverData={serverData}
                    tableData={tableData}
                    currentOrderData={currentOrderData}
                    setCurrentOrderData={setCurrentOrderData}
                    sendOrder={sendOrder}
                    setSendOrder={setSendOrder}
                    setTableTabActive={props.setTableTabActive}
                    setMenuTabActive={props.setMenuTabActive}
                    setModifyCheckItem={setModifyCheckItem}
                    setCheckItemModData={setCheckItemModData}
                    setFireItAlert={setFireItAlert}
                    />
            </article>
            
            <section className='activeMenuCategory'>
                {directory
                    ? <div className='menuCategories'>
                        <ul>
                            <li onClick={handleGoApps}><button>APPS</button></li>
                            <li onClick={handleGoBeer}><button>BEER</button></li>
                            <li onClick={handleGoMain}><button>MAINS</button></li>
                            <li onClick={handleGoCidSpr}><button>CIDER/SELTZ</button></li>
                            <li onClick={handleGoDesserts}><button>DESSERTS</button></li>
                            <li onClick={handleGoLiquor}><button>LIQUOR</button></li>
                            <li onClick={handleGoNonAlch}><button>NON ALCH</button></li>
                            <li onClick={handleGoMixed}><button>MIXED DRINKS</button></li>
                            <li></li>
                            <li onClick={handleGoWine}><button>WINES</button></li>
                        </ul>
                    </div>
                    : null
                }

                {appsCategory
                    ? <AppsScreen
                        appsActive={appsCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {mainsCategory
                    ? <MainsScreen
                        mainsActive={mainsCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {dessertsCategory
                    ? <DessertsScreen
                        dessertsActive={dessertsCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {nonAlchCategory
                    ? <NonAlchScreen
                        nonAlchActive={nonAlchCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {beerCategory
                    ? <BeerScreen
                        beerActive={beerCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {cidSprCategory
                    ? <CiderSeltzScreen
                        cidSprActive={cidSprCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {mixedCategory
                    ? <MixedDrinksScreen
                        mixedActive={mixedCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {liquorsCategory
                    ? <LiquorsScreen
                        liquorsActive={liquorsCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }

                {winesCategory
                    ? <WinesScreen
                        winesActive={winesCategory}
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        serverData={serverData}
                        tableData={tableData}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        />
                    : null
                }
            </section>
            
            <MenuTabNav
                setHelpModal={props.setHelpModal}
                toDirectory={setDirectory}
                toApps={setAppsCategory}
                toMains={setMainsCategory}
                toDesserts={setDessertsCategory}
                toNonAlch={setNonAlchCategory}
                toBeer={setBeerCategory}
                toCidSpr={setCidSprCategory}
                toMixed={setMixedCategory}
                toLiquors={setLiquorsCategory}
                toWines={setWinesCategory}
                setSelectedSeat={setSelectedSeat}
                setSeatKeyPadActive={setSeatKeyPadActive}
                setCurrentOrderData={setCurrentOrderData}
                setSendOrder={setSendOrder}
                setManagerKeyPadActive={setManagerKeyPadActive}
                />
        </div>
    )
}

export default MenuTab;
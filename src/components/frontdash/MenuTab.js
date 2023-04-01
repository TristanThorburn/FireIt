import TableCheck from './check_components/TableCheck';
import MenuTabNav from "./navs/MenuTabNav";
import { useState, useEffect } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import AppsScreen from './menu_components/AppsScreen';
import MainsScreen from './menu_components/MainsScreen';
import DessertsScreen from './menu_components/DessertsScreen';
import NonAlchScreen from './menu_components/NonAlchScreen';
import BeerScreen from './menu_components/BeerScreen';
import CiderSeltzScreen from './menu_components/CiderSeltzScreen';
import MixedDrinksScreen from './menu_components/MixedDrinksScreen';
import LiquorsScreen from './menu_components/LiquorsScreen';
import WinesScreen from './menu_components/WinesScreen';
import ServerKeyPad from '../keypads/ServerKeyPad';
import ModifyCheckItem from "./check_components/ModifyCheckItem";
import FireItAlert from "../help/FireItAlert";
import AlphaNumericPad from '../keypads/AlphaNumericPad';

const MenuTab = (props) => {
    const { activeTableData } = props
    const { employeeContext } = useAuth()
    const [ menuCategory, setMenuCategory ] = useState('directory')
    const [ selectedSeat, setSelectedSeat ] = useState('');
    const [ seatKeyPadActive, setSeatKeyPadActive ] = useState(false);
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);
    const [ doesSeatExist, setDoesSeatExist ] = useState(false);
    const [ currentOrderData, setCurrentOrderData ] = useState('');
    const [ sendOrder, setSendOrder ] = useState(false);
    const [ modifyCheckItem, setModifyCheckItem ] = useState(false)
    const [ checkItemModData, setCheckItemModData ] = useState()
    const [ fireItAlert, setFireItAlert ] = useState('')
    const [ alphaNumericPadOpen, setAlphaNumericPadOpen ] = useState(false)

    // Confirm if seat exists on check, if none is selected assume we are using seat 1
    useEffect(() => {
        const doesSeatExist = async () => {
            if(selectedSeat === ''){
                const docRef = 
                    doc(db, 'orders', `${employeeContext.employeeNumber}`, `${activeTableData.searchId}`, 'seat1')
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    setDoesSeatExist(true)
                } else {
                    setDoesSeatExist(false)
                }
            }
            if(selectedSeat !== ''){
                const docRef = 
                    doc(db, 'orders', `${employeeContext.employeeNumber}`, `${activeTableData.searchId}`, `seat${selectedSeat}`)
                const docSnap = await getDoc(docRef)
                if(docSnap.exists()){
                    setDoesSeatExist(true)
                } else {
                    setDoesSeatExist(false)
                }
            }
        }
        doesSeatExist()
    }, [selectedSeat, employeeContext.employeeNumber, activeTableData.searchId])

    const handleGoApps = () => {
        setMenuCategory('apps')
    }

    const handleGoMain = () => {
        setMenuCategory('mains')
    }

    const handleGoDesserts = () => {
        setMenuCategory('desserts')
    }

    const handleGoNonAlch = () => {
        setMenuCategory('non alch')
    }

    const handleGoBeer = () => {
        setMenuCategory('beer')
    }

    const handleGoCidSpr = () => {
        setMenuCategory('cider spritz')
    }

    const handleGoMixed = () => {
        setMenuCategory('mixed')
    }

    const handleGoLiquor = () => {
        setMenuCategory('liquors')
    }

    const handleGoWine = () => {
        setMenuCategory('wines')
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

            {alphaNumericPadOpen
                ? <AlphaNumericPad
                    setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                    serverTableList={props.serverTableList}
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

            <TableCheck
                doesSeatExist={doesSeatExist}
                selectedSeatExists={doesSeatExist}
                selectedSeat={selectedSeat}
                setSelectedSeat={setSelectedSeat}
                tableData={props.activeTableData}
                currentOrderData={currentOrderData}
                setCurrentOrderData={setCurrentOrderData}
                sendOrder={sendOrder}
                setSendOrder={setSendOrder}
                setTableTabActive={props.setTableTabActive}
                setMenuTabActive={props.setMenuTabActive}
                setModifyCheckItem={setModifyCheckItem}
                setCheckItemModData={setCheckItemModData}
                setFireItAlert={setFireItAlert}
                menuTabActive={props.menuTabActive}
                />
            
            <section className='menuDirectoryContainer'>
                {menuCategory === 'directory'
                    ? <div className='menuDirectoriesScreen'>
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

                {menuCategory === 'apps'
                    ? <AppsScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setSelectedSeat={setSelectedSeat}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'mains'
                    ? <MainsScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'desserts'
                    ? <DessertsScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'non alch'
                    ? <NonAlchScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'beer'
                    ? <BeerScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'cider spritz'
                    ? <CiderSeltzScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'mixed'
                    ? <MixedDrinksScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'liquors'
                    ? <LiquorsScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }

                {menuCategory === 'wines'
                    ? <WinesScreen
                        selectedSeatExists={doesSeatExist}
                        selectedSeat={selectedSeat}
                        setCurrentOrderData={setCurrentOrderData}
                        currentOrderData={currentOrderData}
                        setMenuCategory={setMenuCategory}
                        />
                    : null
                }
            </section>
            
            <MenuTabNav
                setHelpModal={props.setHelpModal}
                setMenuCategory={setMenuCategory}
                setSelectedSeat={setSelectedSeat}
                setSeatKeyPadActive={setSeatKeyPadActive}
                setCurrentOrderData={setCurrentOrderData}
                setSendOrder={setSendOrder}
                setManagerKeyPadActive={setManagerKeyPadActive}
                setAlphaNumericPadOpen={setAlphaNumericPadOpen}
                />
        </div>
    )
}

export default MenuTab;
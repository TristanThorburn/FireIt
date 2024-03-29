import { useState, useEffect } from 'react';
import { appCollectionRef } from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, onSnapshot, getDocFromCache } from 'firebase/firestore';

const AppsScreen = (props) => {
    const { selectedSeat, setCurrentOrderData, contextTable, setFireItAlert } = props
    const [ appsData, setAppsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    // Initial Data Population
    useEffect(() => {
        // const getMenuCategory = async () => {
            const q = query(appCollectionRef, orderBy('name'));
        //     const querySnapShot = await getDocsFromCache(q)
        //     if(querySnapShot){
        //         const menuItemList = querySnapShot.docs.map(doc => ({
        //             id:doc.id,
        //             data:doc.data()
        //         }))
        //         setAppsData(menuItemList)
        //     } else {
        //         const severData = await getDocs(q)
        //         const menuItemList = severData.docs.map(doc => ({
        //             id:doc.id,
        //             data:doc.data()
        //         }))
        //         setAppsData(menuItemList)
        //     }
        // }
        // getMenuCategory()
        const unsubscribe = onSnapshot(q, snapshot => {
            setAppsData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe

    },[])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== ''){
                const docRef = doc(appCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
        }
        getItem()
    }, [selectedItem])

    // add selected item to display as pending order on check
    useEffect(() => {
        if(contextTable === '' && selectedItem !== ''){
            setFireItAlert('FireIt no table')
        } else {
            const time = Date.now().toString()
            if(itemData.name && selectedSeat === ''){
                const orderToAdd = {seat: '1', name:itemData.screenName, cost:itemData.price, time:time}
                setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
            if(itemData.name && selectedSeat !== ''){
                const orderToAdd = {seat:selectedSeat, name:itemData.screenName, cost:itemData.price, time:time}
                setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
        }
    }, [itemData, setCurrentOrderData, selectedItem, selectedSeat, contextTable, setFireItAlert])

    // OLD LOGIC TO ADD ITEM DIRECTLY TO FIREBASE AND DISPLAY ON CHECK, CAUSING EMPTY STRING PUSHES:
    // logic for seat number, no seat number add/update
    // useEffect(() => {
    //     if(props.appsActive){
    //         if(!props.selectedSeatExists && props.selectedSeat === '' && selectedItem !== ''){
    //             const checkRef = 
    //                 doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
    //             setDoc(checkRef, {
    //             seat:true,
    //             seatNumber:'1',
    //             order:[{item:itemData.name, cost:itemData.price}],
    //             })
    //         }
    //         if(!props.selectedSeatExists && props.selectedSeat !== '' && selectedItem !== ''){
    //             const checkRef = 
    //                 doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
    //             setDoc(checkRef, {
    //             seat:true,
    //             seatNumber:props.selectedSeat,
    //             order:[{item:itemData.name, cost:itemData.price}],
    //             })
    //         }
    //         if(props.selectedSeatExists && props.selectedSeat === '' && selectedItem !== ''){
    //             const checkRef = 
    //                 doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
    //             const orderToAdd = [{item:itemData.name, cost:itemData.price}]
    //             updateDoc(checkRef, {
    //                 order:arrayUnion(...orderToAdd),
    //             })
    //         }
    //         if(props.selectedSeatExists && props.selectedSeat !== '' && selectedItem !== ''){
    //             const checkRef = 
    //                 doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
    //             const orderToAdd = [{item:itemData.name, cost:itemData.price}]
    //             updateDoc(checkRef, {
    //                 order:arrayUnion(...orderToAdd),
    //             })
    //         }
    //     }
    // }, [itemData, props.selectedSeat, props.appsActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }

    const handleGoMain = () => {
        props.setMenuCategory('mains')
    }

    const handleGoDesserts = () => {
        props.setMenuCategory('desserts')
    }

    const handleGoNonAlch = () => {
        props.setMenuCategory('non alch')
    }

    const handleGoBeer = () => {
        props.setMenuCategory('beer')
    }

    const handleGoCidSpr = () => {
        props.setMenuCategory('cider spritz')
    }

    const handleGoMixed = () => {
        props.setMenuCategory('mixed')
    }

    const handleGoLiquor = () => {
        props.setMenuCategory('liquors')
    }

    const handleGoWine = () => {
        props.setMenuCategory('wines')
    }
 
    return(
        <div className='menuSubcategoryContainer'>
            <div className='menuSubcategoryScreen'>
                <h3>Appetizers</h3>
                <ul>
                    {appsData.map(appetizer => 
                        <li 
                            key={appetizer.id}
                            >
                            <button
                                id={appetizer.id}
                                onClick={handleClick}
                                >{appetizer.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>
            <footer className='menuCategoryNav'>
                <ul>
                    <li><button onClick={handleGoMain}>mains</button></li>
                    <li><button onClick={handleGoDesserts}>desserts</button></li>
                    <li><button onClick={handleGoNonAlch}>non alch</button></li>
                    <li><button onClick={handleGoBeer}>beer</button></li>
                    <li><button onClick={handleGoCidSpr}>cider/seltz</button></li>
                    <li><button onClick={handleGoLiquor}>liquor</button></li>
                    <li><button onClick={handleGoMixed}>mixed drinks</button></li>
                    <li><button onClick={handleGoWine}>wine</button></li>
                </ul>
            </footer>
        </div>
    )
}

export default AppsScreen
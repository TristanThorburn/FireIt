import { useState, useEffect } from 'react';
import { appCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const AppsScreen = (props) => {
    const [ appsData, setAppsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()

    // Initial Data Population
    useEffect(() => {
        const q = query(appCollectionRef, orderBy('name'));
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
        if(selectedItem !== ''){
            const docRef = doc(appCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem])

    // add selected item to display as pending order on check
    useEffect(() => {
        if(selectedItem !== ''){
            if(itemData.name && props.selectedSeat === ''){
                const orderToAdd = {seat: '1', name:itemData.screenName, cost:itemData.price, time:time}
                props.setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
            if(itemData.name && props.selectedSeat !== ''){
                const orderToAdd = {seat:props.selectedSeat, name:itemData.screenName, cost:itemData.price, time:time}
                props.setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
        }
    }, [itemData, props, selectedItem, time])

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
        </div>
    )
}

export default AppsScreen
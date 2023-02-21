import { useState, useEffect } from 'react';
import { appCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const AppsScreen = (props) => {
    const [ appsData, setAppsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

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

    // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.appsActive){
            if(!props.selectedSeatExists && props.selectedSeat === '' && selectedItem){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                setDoc(checkRef, {
                seat:true,
                seatNumber:'1',
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(!props.selectedSeatExists && props.selectedSeat !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                setDoc(checkRef, {
                seat:true,
                seatNumber:props.selectedSeat,
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(props.selectedSeatExists && props.selectedSeat === ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
            if(props.selectedSeatExists && props.selectedSeat !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
        }
    }, [itemData, props.selectedSeat, props.appsActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
 
    return(
        <div className='appScreenList'>
            <div className='appScreenContainer'>
                <h3>Appetizers</h3>
                <ul>
                    {appsData.map(appetizer => 
                        <li 
                            key={appetizer.id}
                            >
                            <button
                                id={appetizer.id}
                                onClick={handleClick}
                                >{appetizer.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default AppsScreen
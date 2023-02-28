import { useState, useEffect } from 'react';
import { coldDrinksCollectionRef, hotDrinksCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const NonAlchScreen = (props) => {
    const [ coldDrinkData, setColdDrinkData ] = useState([]);
    const [ hotDrinkData, setHotDrinkData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    // Initial data population
    useEffect(() => {
        const fetchCold = () => {
            const q = query(coldDrinksCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setColdDrinkData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchHot = () => {
            const q = query(hotDrinksCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setHotDrinkData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchCold()
        fetchHot()
    },[])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== '' && collectionRef === 'cold'){
            const docRef = doc(coldDrinksCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'hot'){
            const docRef = doc(hotDrinksCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem, collectionRef])

    // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.nonAlchActive){
            if(!props.selectedSeatExists && props.selectedSeat === '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                setDoc(checkRef, {
                seat:true,
                seatNumber:'1',
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(!props.selectedSeatExists && props.selectedSeat !== '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                setDoc(checkRef, {
                seat:true,
                seatNumber:props.selectedSeat,
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(props.selectedSeatExists && props.selectedSeat === '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
            if(props.selectedSeatExists && props.selectedSeat !== '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
        }
    }, [itemData, props.selectedSeat, props.nonAlchActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleColdClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('cold')
    }

    const handleHotClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('hot')
    }
 
    return(
        <div className='nonAlchScreenList'>
            <div className='nonAlchScreenContainer'>
                <h3>Cold Drinks List</h3>
                <ul>
                    {coldDrinkData.map(coldDrink => 
                        <li 
                            key={coldDrink.id}
                            >
                            <button
                                id={coldDrink.id}
                                onClick={handleColdClick}
                                >{coldDrink.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='nonAlchScreenContainer'>
                <h3>Hot Drinks List</h3>
                <ul>
                    {hotDrinkData.map(hotDrink => 
                        <li 
                            key={hotDrink.id}
                            >
                            <button
                                id={hotDrink.id}
                                onClick={handleHotClick}
                                >{hotDrink.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default NonAlchScreen
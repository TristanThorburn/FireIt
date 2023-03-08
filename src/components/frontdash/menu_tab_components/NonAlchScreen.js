import { useState, useEffect } from 'react';
import { coldDrinksCollectionRef, hotDrinksCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const NonAlchScreen = (props) => {
    const [ coldDrinkData, setColdDrinkData ] = useState([]);
    const [ hotDrinkData, setHotDrinkData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()

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

    const handleColdClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('cold')
    }

    const handleHotClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('hot')
    }
 
    return(
        <div className='menuSubcategoryContainer'>
            <div className='menuSubcategoryScreen'>
                <h3>Cold Drinks List</h3>
                <ul>
                    {coldDrinkData.map(coldDrink => 
                        <li 
                            key={coldDrink.id}
                            >
                            <button
                                id={coldDrink.id}
                                onClick={handleColdClick}
                                >{coldDrink.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='menuSubcategoryScreen'>
                <h3>Hot Drinks List</h3>
                <ul>
                    {hotDrinkData.map(hotDrink => 
                        <li 
                            key={hotDrink.id}
                            >
                            <button
                                id={hotDrink.id}
                                onClick={handleHotClick}
                                >{hotDrink.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default NonAlchScreen
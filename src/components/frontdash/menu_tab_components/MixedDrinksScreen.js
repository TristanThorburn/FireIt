import { useState, useEffect } from 'react';
import { cocktailCollectionRef, shotsCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const MixedDrinksScreen = (props) => {
    const [ cocktailData, setCocktailData ] = useState([]);
    const [ shotData, setShotData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()

    // Initial data population screen display
    useEffect(() => {
        const fetchCocktails = () => {
            const q = query(cocktailCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCocktailData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchShots = () => {
            const q = query(shotsCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setShotData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchCocktails()
        fetchShots()
    },[])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== '' && collectionRef === 'cocktail'){
            const docRef = doc(cocktailCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'shot'){
            const docRef = doc(shotsCollectionRef, selectedItem)
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

    const handleCocktailClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('cocktail')
    }

    const handleShotClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('shot')
    }
 
 
    return(
        <div className='menuSubcategoryContainer'>
            <div className='menuSubcategoryScreen'>
                <h3>Cocktails List</h3>
                <ul>
                    {cocktailData.map(cocktail => 
                        <li 
                            key={cocktail.id}
                            >
                            <button
                                id={cocktail.id}
                                onClick={handleCocktailClick}
                                >{cocktail.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='menuSubcategoryScreen'>
                <h3>Shots List</h3>
                <ul>
                    {shotData.map(shot => 
                        <li 
                            key={shot.id}
                            >
                            <button
                                id={shot.id}
                                onClick={handleShotClick}
                                >{shot.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default MixedDrinksScreen
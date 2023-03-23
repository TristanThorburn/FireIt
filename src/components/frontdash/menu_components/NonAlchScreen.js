import { useState, useEffect } from 'react';
import { coldDrinksCollectionRef, hotDrinksCollectionRef } from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, onSnapshot, getDocFromCache } from 'firebase/firestore';

const NonAlchScreen = (props) => {
    const [ drinkData, setDrinkData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('cold');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()
    const coldButton = document.getElementById('coldDrinks')
    const hotButton = document.getElementById('hotDrinks')

    // Initial data population
    useEffect(() => {
        if(collectionRef === 'cold'){
            const fetchCold = async () => {
                const q = query(coldDrinksCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setDrinkData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setDrinkData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setDrinkData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchCold()
        }
        if(collectionRef === 'hot'){
            const fetchHot = async () => {
                const q = query(hotDrinksCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setDrinkData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setDrinkData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setDrinkData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchHot()
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        const getItem =  async () => {
            if(selectedItem !== '' && collectionRef === 'cold'){
                const docRef = doc(coldDrinksCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
            if(selectedItem !== '' && collectionRef === 'hot'){
                const docRef = doc(hotDrinksCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
        }
        getItem()
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

    const handleColdCategory = () => {
        setCollectionRef('cold')
        coldButton.classList.add('activeSub')
        hotButton.classList.remove('activeSub')
    }

    const handleHotCategory = () => {
        setCollectionRef('hot')
        coldButton.classList.remove('activeSub')
        hotButton.classList.add('activeSub')
    }

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }

    const handleGoApps = () => {
        props.setMenuCategory('apps')
    }

    const handleGoMain = () => {
        props.setMenuCategory('mains')
    }

    const handleGoDesserts = () => {
        props.setMenuCategory('desserts')
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
            <div className='alcoholSubcategoryNav'>
                <button 
                    onClick={handleColdCategory} 
                    id='coldDrinks' 
                    className='activeSub'
                    >Cold Drinks
                </button>
                <button 
                    onClick={handleHotCategory} 
                    id='hotDrinks'
                    >Hot Drinks
                </button>
            </div>

            <div className='menuSubcategoryScreen'>
                <ul>
                    {drinkData.map(drink => 
                        <li 
                            key={drink.id}
                            >
                            <button
                                id={drink.id}
                                onClick={handleClick}
                                >{drink.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>
            <footer className='menuCategoryNav'>
                <ul>
                    <li><button onClick={handleGoApps}>apps</button></li>
                    <li><button onClick={handleGoMain}>mains</button></li>
                    <li><button onClick={handleGoDesserts}>desserts</button></li>
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

export default NonAlchScreen
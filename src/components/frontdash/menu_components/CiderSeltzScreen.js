import { useState, useEffect } from 'react';
import { ciderCollectionRef, hardSeltzerCollectionRef } from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, onSnapshot, getDocFromCache } from 'firebase/firestore';

const CiderSeltzScreen = (props) => {
    const { selectedSeat, setCurrentOrderData } = props
    const [ drinkData, setDrinkData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('cider');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const ciderButton = document.getElementById('ciders')
    const seltzerButton = document.getElementById('seltzers')

    // Populate screen with items data
    useEffect(() => {
        if(collectionRef === 'cider'){
            const fetchCider = async () => {
                const q = query(ciderCollectionRef, orderBy('name'));
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
            fetchCider()
        }
        if(collectionRef === 'seltzer'){
            const fetchSeltzer = async () => {
                const q = query(hardSeltzerCollectionRef, orderBy('name'));
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
            fetchSeltzer()
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== '' && collectionRef === 'cider'){
                const docRef = doc(ciderCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            if(selectedItem !== '' && collectionRef === 'seltzer'){
                const docRef = doc(hardSeltzerCollectionRef, selectedItem)
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
    }, [itemData, setCurrentOrderData, selectedItem, selectedSeat])

    const handleCiderCategory = () => {
        setCollectionRef('cider')
        ciderButton.classList.add('activeSub')
        seltzerButton.classList.remove('activeSub')
    }

    const handleSeltzerCategory = () => {
        setCollectionRef('seltzer')
        ciderButton.classList.remove('activeSub')
        seltzerButton.classList.add('activeSub')
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

    const handleGoNonAlch = () => {
        props.setMenuCategory('non alch')
    }

    const handleGoBeer = () => {
        props.setMenuCategory('beer')
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
                    onClick={handleCiderCategory} 
                    id='ciders' 
                    className='activeSub'
                    >Ciders
                </button>
                <button 
                    onClick={handleSeltzerCategory} 
                    id='seltzers'
                    >Hard Seltzers
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
                    <li><button onClick={handleGoNonAlch}>non alch</button></li>
                    <li><button onClick={handleGoBeer}>beer</button></li>
                    <li><button onClick={handleGoLiquor}>liquor</button></li>
                    <li><button onClick={handleGoMixed}>mixed drinks</button></li>
                    <li><button onClick={handleGoWine}>wine</button></li>
                </ul>
            </footer>
        </div>
    )
}

export default CiderSeltzScreen
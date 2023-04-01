import { useState, useEffect } from 'react';
import { cocktailCollectionRef, shotsCollectionRef } from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, onSnapshot, getDocFromCache } from 'firebase/firestore';

const MixedDrinksScreen = (props) => {
    const { selectedSeat, setCurrentOrderData } = props
    const [ mixedData, setMixedData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('cocktails');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const cocktailsButton = document.getElementById('cocktails')
    const shotsButton = document.getElementById('shots')

    // Initial data population screen display
    useEffect(() => {
        if(collectionRef === 'cocktails'){
            const fetchCocktails = async () => {
                const q = query(cocktailCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setMixedData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setMixedData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setMixedData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchCocktails()
        }
        if(collectionRef === 'shots'){
            const fetchShots = async () => {
                const q = query(shotsCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setMixedData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setMixedData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setMixedData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchShots()
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== '' && collectionRef === 'cocktails'){
                const docRef = doc(cocktailCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
            if(selectedItem !== '' && collectionRef === 'shots'){
                const docRef = doc(shotsCollectionRef, selectedItem)
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

    const handleCocktailsCategory = () => {
        setCollectionRef('cocktails')
        cocktailsButton.classList.add('activeSub')
        shotsButton.classList.remove('activeSub')
    }

    const handleShotsCategory = () => {
        setCollectionRef('shots')
        cocktailsButton.classList.remove('activeSub')
        shotsButton.classList.add('activeSub')
    }

    const handleClick = (e) => {
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

    const handleGoCidSpr = () => {
        props.setMenuCategory('cider spritz')
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
                    onClick={handleCocktailsCategory} 
                    id='cocktails' 
                    className='activeSub'
                    >Cocktails
                </button>
                <button 
                    onClick={handleShotsCategory} 
                    id='shots'
                    >Shots
                </button>
            </div>

            <div className='menuSubcategoryScreen'>
                <ul>
                    {mixedData.map(mixed => 
                        <li 
                            key={mixed.id}
                            >
                            <button
                                id={mixed.id}
                                onClick={handleClick}
                                >{mixed.data.screenName}
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
                    <li><button onClick={handleGoCidSpr}>cider/seltz</button></li>
                    <li><button onClick={handleGoLiquor}>liquor</button></li>
                    <li><button onClick={handleGoWine}>wine</button></li>
                </ul>
            </footer>
        </div>
    )
}

export default MixedDrinksScreen
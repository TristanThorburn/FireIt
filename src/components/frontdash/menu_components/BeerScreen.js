import { useState, useEffect } from 'react';
import { 
    beerBottleCollectionRef,
    beerCanCollectionRef,
    beerDraftCollectionRef }
    from '../../../library/firestoreCollections';
    import { query, orderBy, doc, getDoc, onSnapshot, getDocFromCache } from 'firebase/firestore';

const BeerScreen = (props) => {
    const [ beerData, setBeerData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('bottle');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString();
    const bottleButton = document.getElementById('bottle')
    const canButton = document.getElementById('can')
    const draftButton = document.getElementById('draft')

    // Data population based on beer type
    useEffect(() => {
        if(collectionRef === 'bottle'){
            // const fetchBottles = async () => {
                const q = query(beerBottleCollectionRef, orderBy('name'));
            //     const querySnapShot = await getDocsFromCache(q)
            //     if(querySnapShot){
            //         const menuItemList = querySnapShot.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setBeerData(menuItemList)
            //     } else {
            //         const severData = await getDocs(q)
            //         const menuItemList = severData.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setBeerData(menuItemList)
            //     }
            // }
            // fetchBottles()
            const unsubscribe = onSnapshot(q, snapshot => {
                setBeerData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        if(collectionRef === 'can'){
            // const fetchCans = async () => {
                const q = query(beerCanCollectionRef, orderBy('name'));
            //     const querySnapShot = await getDocsFromCache(q)
            //     if(querySnapShot){
            //         const menuItemList = querySnapShot.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setBeerData(menuItemList)
            //     } else {
            //         const severData = await getDocs(q)
            //         const menuItemList = severData.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setBeerData(menuItemList)
            //     }
            // }
            // fetchCans()
            const unsubscribe = onSnapshot(q, snapshot => {
                setBeerData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        if(collectionRef === 'draft'){
            // const fetchDraft = async () => {
                const q = query(beerDraftCollectionRef, orderBy('name'));
            //     const querySnapShot = await getDocsFromCache(q)
            //     if(querySnapShot){
            //         const menuItemList = querySnapShot.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setBeerData(menuItemList)
            //     } else {
            //         const severData = await getDocs(q)
            //         const menuItemList = severData.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setBeerData(menuItemList)
            //     }
            // }
            // fetchDraft()
            const unsubscribe = onSnapshot(q, snapshot => {
                setBeerData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== '' && collectionRef === 'bottle'){
                const docRef = doc(beerBottleCollectionRef, selectedItem)
                    const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            if(selectedItem !== '' && collectionRef === 'can'){
                const docRef = doc(beerCanCollectionRef, selectedItem)
                    const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            if(selectedItem !== '' && collectionRef === 'draft'){
                const docRef = doc(beerDraftCollectionRef, selectedItem)
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

    const handleBottlesCategory = () => {
        setCollectionRef('bottle')
        bottleButton.classList.add('activeSub')
        canButton.classList.remove('activeSub')
        draftButton.classList.remove('activeSub')
    }

    const handleCansCategory = () => {
        setCollectionRef('can')
        bottleButton.classList.remove('activeSub')
        canButton.classList.add('activeSub')
        draftButton.classList.remove('activeSub')
    }

    const handleDraftCategory = () => {
        setCollectionRef('draft')
        bottleButton.classList.remove('activeSub')
        canButton.classList.remove('activeSub')
        draftButton.classList.add('activeSub')
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
                <button onClick={handleBottlesCategory} id='bottle' className='activeSub'>Bottles</button>
                <button onClick={handleCansCategory} id='can'>Cans</button>
                <button onClick={handleDraftCategory} id='draft'>Draft</button>
            </div>
            
            <div className='menuSubcategoryScreen'>
                <ul>
                    {beerData.map(beer => 
                        <li 
                            key={beer.id}
                            >
                            <button
                                id={beer.id}
                                onClick={handleClick}
                                >{beer.data.screenName}
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
                    <li><button onClick={handleGoCidSpr}>cider/seltz</button></li>
                    <li><button onClick={handleGoLiquor}>liquor</button></li>
                    <li><button onClick={handleGoMixed}>mixed drinks</button></li>
                    <li><button onClick={handleGoWine}>wine</button></li>
                </ul>
            </footer>
        </div>
    )
}

export default BeerScreen
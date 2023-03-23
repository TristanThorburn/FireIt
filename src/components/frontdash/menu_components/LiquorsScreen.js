import { useState, useEffect } from 'react';
import { 
    ginCollectionRef,
    rumCollectionRef,
    tequilaCollectionRef,
    vodkaCollectionRef,
    whiskeyCollectionRef,
} from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, onSnapshot, getDocFromCache } from 'firebase/firestore';

const LiquorsScreen = (props) => {
    const [ liquorData, setLiquorData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('gin');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()
    const ginButton = document.getElementById('gin')
    const rumButton = document.getElementById('rum')
    const tequilaButton = document.getElementById('tequila')
    const vodkaButton = document.getElementById('vodka')
    const whiskeyButton = document.getElementById('whiskey')

    // Initial population of screen from data
    useEffect(() => {
        if(collectionRef === 'gin'){
            const fetchGins = async () => {
                const q = query(ginCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setLiquorData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchGins()
        }
        if(collectionRef === 'rum'){
            const fetchRums = async () => {
                const q = query(rumCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setLiquorData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchRums()
        }
        if(collectionRef === 'tequila'){
            const fetchTequilas = async () => {
                const q = query(tequilaCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setLiquorData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchTequilas()
        }
        if(collectionRef === 'vodka'){
            const fetchVodkas = async () => {
                const q = query(vodkaCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setLiquorData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchVodkas()
        }
        if(collectionRef === 'whiskey'){
            const fetchWhiskeys = async () => {
                const q = query(whiskeyCollectionRef, orderBy('name'));
                // const querySnapShot = await getDocsFromCache(q)
                // if(querySnapShot){
                //     const menuItemList = querySnapShot.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // } else {
                //     const severData = await getDocs(q)
                //     const menuItemList = severData.docs.map(doc => ({
                //         id:doc.id,
                //         data:doc.data()
                //     }))
                //     setLiquorData(menuItemList)
                // }
                const unsubscribe = onSnapshot(q, snapshot => {
                    setLiquorData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchWhiskeys()
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== '' && collectionRef === 'gin'){
                const docRef = doc(ginCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
            if(selectedItem !== '' && collectionRef === 'rum'){
                const docRef = doc(rumCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
            if(selectedItem !== '' && collectionRef === 'tequila'){
                const docRef = doc(tequilaCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
            if(selectedItem !== '' && collectionRef === 'vodka'){
                const docRef = doc(vodkaCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
            if(selectedItem !== '' && collectionRef === 'whiskey'){
                const docRef = doc(whiskeyCollectionRef, selectedItem)
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

    const handleGinCategory = () => {
        setCollectionRef('gin')
        ginButton.classList.add('activeSub')
        rumButton.classList.remove('activeSub')
        tequilaButton.classList.remove('activeSub')
        vodkaButton.classList.remove('activeSub')
        whiskeyButton.classList.remove('activeSub')
    }

    const handleRumCategory = () => {
        setCollectionRef('rum')
        ginButton.classList.remove('activeSub')
        rumButton.classList.add('activeSub')
        tequilaButton.classList.remove('activeSub')
        vodkaButton.classList.remove('activeSub')
        whiskeyButton.classList.remove('activeSub')
    }

    const handleTequilaCategory = () => {
        setCollectionRef('tequila')
        ginButton.classList.remove('activeSub')
        rumButton.classList.remove('activeSub')
        tequilaButton.classList.add('activeSub')
        vodkaButton.classList.remove('activeSub')
        whiskeyButton.classList.remove('activeSub')
    }

    const handleVodkaCategory = () => {
        setCollectionRef('vodka')
        ginButton.classList.remove('activeSub')
        rumButton.classList.remove('activeSub')
        tequilaButton.classList.remove('activeSub')
        vodkaButton.classList.add('activeSub')
        whiskeyButton.classList.remove('activeSub')
    }

    const handleWhiskeyCategory = () => {
        setCollectionRef('whiskey')
        ginButton.classList.remove('activeSub')
        rumButton.classList.remove('activeSub')
        tequilaButton.classList.remove('activeSub')
        vodkaButton.classList.remove('activeSub')
        whiskeyButton.classList.add('activeSub')
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

    const handleGoCidSpr = () => {
        props.setMenuCategory('cider spritz')
    }

    const handleGoMixed = () => {
        props.setMenuCategory('mixed')
    }

    const handleGoWine = () => {
        props.setMenuCategory('wines')
    }
     
    return(
        <div className='menuSubcategoryContainer'>
            <div className='alcoholSubcategoryNav'>
                <button onClick={handleGinCategory} id='gin' className='activeSub'>Gin</button>
                <button onClick={handleRumCategory} id='rum'>Rum</button>
                <button onClick={handleTequilaCategory} id='tequila'>Tequila</button>
                <button onClick={handleVodkaCategory} id='vodka'>Vodka</button>
                <button onClick={handleWhiskeyCategory} id='whiskey'>Whiskey</button>
            </div>

            <div className='menuSubcategoryScreen'>
                <ul>
                    {liquorData.map(liquor => 
                        <li 
                            key={liquor.id}
                            >
                            <button
                                id={liquor.id}
                                onClick={handleClick}
                                >{liquor.data.screenName}
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
                    <li><button onClick={handleGoMixed}>mixed drinks</button></li>
                    <li><button onClick={handleGoWine}>wine</button></li>
                </ul>
            </footer>
        </div>
    )
}

export default LiquorsScreen
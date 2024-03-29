import { useState, useEffect } from 'react';
import { 
    redWineCollectionRef,
    whiteWineCollectionRef,
    bubblyCollectionRef
    } from '../../../library/firestoreCollections';
    import { getDocFromCache, query, orderBy, doc, getDoc, onSnapshot } from 'firebase/firestore';

const WinesScreen = (props) => {
    const { selectedSeat, setCurrentOrderData, contextTable, setFireItAlert } = props
    const [ wineData, setWineData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('bubbly');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const bubblyButton = document.getElementById('bubbly')
    const redButton = document.getElementById('red')
    const whiteButton = document.getElementById('white')

    // Populate menu screen with data
    useEffect(() => {
        if(collectionRef === 'bubbly'){
            // const fetchBubbly = async () => {
                const q = query(bubblyCollectionRef, orderBy('name'));
            //     const querySnapShot = await getDocsFromCache(q)
            //     if(querySnapShot){
            //         const menuItemList = querySnapShot.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setWineData(menuItemList)
            //     } else {
            //         const severData = await getDocs(q)
            //         const menuItemList = severData.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setWineData(menuItemList)
            //         }
            // }
            // fetchBubbly()
            const unsubscribe = onSnapshot(q, snapshot => {
                setWineData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        if(collectionRef === 'red'){
            // const fetchReds = async () => {
                const q = query(redWineCollectionRef, orderBy('name'));
            //     const querySnapShot = await getDocsFromCache(q)
            //     if(querySnapShot){
            //         const menuItemList = querySnapShot.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setWineData(menuItemList)
            //     } else {
            //         const severData = await getDocs(q)
            //         const menuItemList = severData.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setWineData(menuItemList)
            //     }
            // }
            // fetchReds()
            const unsubscribe = onSnapshot(q, snapshot => {
                setWineData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        if(collectionRef === 'white'){
            // const fetchWhites = async () => {
                const q = query(whiteWineCollectionRef, orderBy('name'));
            //     const querySnapShot = await getDocsFromCache(q)
            //     if(querySnapShot){
            //         const menuItemList = querySnapShot.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setWineData(menuItemList)
            //     } else {
            //         const severData = await getDocs(q)
            //         const menuItemList = severData.docs.map(doc => ({
            //             id:doc.id,
            //             data:doc.data()
            //         }))
            //         setWineData(menuItemList)
            //     }
            // }
            // fetchWhites()
            const unsubscribe = onSnapshot(q, snapshot => {
                setWineData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== '' && collectionRef === 'red'){
            const getRedWine = async () => {
                const docRef = doc(redWineCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            getRedWine()
        }
        if(selectedItem !== '' && collectionRef === 'white'){
            const getWhiteWine = async () => {
                const docRef = doc(whiteWineCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            getWhiteWine()
        }
        if(selectedItem !== '' && collectionRef === 'bubbly'){
            const getBubbly = async () => {
                const docRef = doc(bubblyCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            getBubbly()
        }
    }, [selectedItem, collectionRef])

    // add selected item to display as pending order on check
    useEffect(() => {
        if(contextTable === '' && selectedItem !== ''){
            setFireItAlert('FireIt no table')
        } else {
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
    }, [itemData, setCurrentOrderData, selectedItem, selectedSeat, contextTable, setFireItAlert])

    const handleBubblyCategory = () => {
        setCollectionRef('bubbly')
        bubblyButton.classList.add('activeSub')
        redButton.classList.remove('activeSub')
        whiteButton.classList.remove('activeSub')
    }

    const handleRedCategory = () => {
        setCollectionRef('red')
        bubblyButton.classList.remove('activeSub')
        redButton.classList.add('activeSub')
        whiteButton.classList.remove('activeSub')
    }

    const handleWhiteCategory = () => {
        setCollectionRef('white')
        bubblyButton.classList.remove('activeSub')
        redButton.classList.remove('activeSub')
        whiteButton.classList.add('activeSub')
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

    const handleGoLiquor = () => {
        props.setMenuCategory('liquors')
    }
    
    return(
        <div className='menuSubcategoryContainer'>
            <div className='alcoholSubcategoryNav'>
                <button onClick={handleBubblyCategory} id='bubbly' className='activeSub'>Bubbly</button>
                <button onClick={handleRedCategory} id='red'>Red</button>
                <button onClick={handleWhiteCategory} id='white'>White</button>
            </div>

            <div className='menuSubcategoryScreen'>
                <ul>
                    {wineData.map(wine => 
                        <li 
                            key={wine.id}
                            >
                            <button
                                id={wine.id}
                                onClick={handleClick}
                                >{wine.data.screenName}
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
                    <li><button onClick={handleGoMixed}>mixed drinks</button></li>
                </ul>
            </footer>
        </div>
    )
}

export default WinesScreen
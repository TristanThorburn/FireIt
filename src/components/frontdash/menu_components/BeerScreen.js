import { useState, useEffect } from 'react';
import { 
    beerBottleCollectionRef,
    beerCanCollectionRef,
    beerDraftCollectionRef }
    from '../../../library/firestoreCollections';
    import { onSnapshot, query, orderBy, doc, getDoc, getDocs } from 'firebase/firestore';

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
            const fetchBottles = async () => {
                const q = query(beerBottleCollectionRef, orderBy('name'));
                const querySnapShot = await getDocs(q, { source: 'cache' })
                if(!querySnapShot.empty){
                    const menuItemList = querySnapShot.docs.map(doc => ({
                        id:doc.id,
                        data:doc.data()
                    }))
                    setBeerData(menuItemList)
                } else {
                    const unsubscribe = onSnapshot(q, snapshot => {
                        setBeerData(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })))
                    })
                    return unsubscribe
                }
            }
            fetchBottles()
        }
        if(collectionRef === 'can'){
            const fetchCans = async () => {
                const q = query(beerCanCollectionRef, orderBy('name'));
                const querySnapShot = await getDocs(q, { source: 'cache' })
                if(!querySnapShot.empty){
                    const menuItemList = querySnapShot.docs.map(doc => ({
                        id:doc.id,
                        data:doc.data()
                    }))
                    setBeerData(menuItemList)
                } else {
                    const unsubscribe = onSnapshot(q, snapshot => {
                        setBeerData(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })))
                    })
                    return unsubscribe
                }
            }
            fetchCans()
        }
        if(collectionRef === 'draft'){
            const fetchDraft = async () => {
                const q = query(beerDraftCollectionRef, orderBy('name'));
                const querySnapShot = await getDocs(q, { source: 'cache' })
                if(!querySnapShot.empty){
                    const menuItemList = querySnapShot.docs.map(doc => ({
                        id:doc.id,
                        data:doc.data()
                    }))
                    setBeerData(menuItemList)
                } else {
                    const unsubscribe = onSnapshot(q, snapshot => {
                        setBeerData(snapshot.docs.map(doc => ({
                            id: doc.id,
                            data: doc.data()
                        })))
                    })
                    return unsubscribe
                }
            }
            fetchDraft()
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== '' && collectionRef === 'bottle'){
                const docRef = doc(beerBottleCollectionRef, selectedItem)
                    const itemDataRequest = await getDoc(docRef, { source: 'cache' })
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            if(selectedItem !== '' && collectionRef === 'can'){
                const docRef = doc(beerCanCollectionRef, selectedItem)
                    const itemDataRequest = await getDoc(docRef, { source: 'cache' })
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            if(selectedItem !== '' && collectionRef === 'draft'){
                const docRef = doc(beerDraftCollectionRef, selectedItem)
                    const itemDataRequest = await getDoc(docRef, { source: 'cache' })
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
        </div>
    )
}

export default BeerScreen
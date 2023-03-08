import { useState, useEffect } from 'react';
import { 
    beerBottleCollectionRef,
    beerCanCollectionRef,
    beerDraftCollectionRef }
    from '../../../library/firestoreCollections';
    import { onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const BeerScreen = (props) => {
    const [ bottlesData, setBottlesData ] = useState([]);
    const [ cansData, setCansData ] = useState([]);    
    const [ draftData, setDraftData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('bottle');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()

    // Data population based on beer type
    useEffect(() => {
        if(collectionRef === 'bottle'){
            const fetchBottles = () => {
                const q = query(beerBottleCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setBottlesData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchBottles()
        }
        if(collectionRef === 'can'){
            const fetchCans = () => {
                const q = query(beerCanCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setCansData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchCans()
        }
        if(collectionRef === 'draft'){
            const fetchDraft = () => {
                const q = query(beerDraftCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setDraftData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchDraft()
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== '' && collectionRef === 'bottle'){
            const docRef = doc(beerBottleCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'can'){
            const docRef = doc(beerCanCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'draft'){
            const docRef = doc(beerDraftCollectionRef, selectedItem)
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

    const handleBottlesCategory = () => {
        setCollectionRef('bottle')
    }

    const handleCansCategory = () => {
        setCollectionRef('can')
    }

    const handleDraftCategory = () => {
        setCollectionRef('draft')
    }

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
  
    return(
        <div className='menuSubcategoryContainer'>
            <div className='alcoholSubcategoryNav'>
                <button onClick={handleBottlesCategory}>Bottles</button>
                <button onClick={handleCansCategory}>Cans</button>
                <button onClick={handleDraftCategory}>Draft</button>
            </div>

            {collectionRef === 'bottle'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Bottles List</h3>
                    <ul>
                        {bottlesData.map(bottle => 
                            <li 
                                key={bottle.id}
                                >
                                <button
                                    id={bottle.id}
                                    onClick={handleClick}
                                    >{bottle.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }

            {collectionRef === 'can'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Cans List</h3>
                    <ul>
                        {cansData.map(can => 
                            <li 
                                key={can.id}
                                >
                                <button
                                    id={can.id}
                                    onClick={handleClick}
                                    >{can.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            
            {collectionRef === 'draft'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Draft List</h3>
                    <ul>
                        {draftData.map(draft => 
                            <li 
                                key={draft.id}
                                >
                                <button
                                    id={draft.id}
                                    onClick={handleClick}
                                    >{draft.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            
        </div>
    )
}

export default BeerScreen
import { useState, useEffect } from 'react';
import { 
    ginCollectionRef,
    rumCollectionRef,
    tequilaCollectionRef,
    vodkaCollectionRef,
    whiskeyCollectionRef,
} from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const LiquorsScreen = (props) => {
    const [ ginData, setGinData ] = useState([]);
    const [ rumData, setRumData ] = useState([]);    
    const [ tequilaData, setTequilaData ] = useState([]);
    const [ vodkaData, setVodkaData ] = useState([]);
    const [ whiskeyData, setWhiskeyData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('gin');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()

    // Initial population of screen from data
    useEffect(() => {
        if(collectionRef === 'gin'){
            const fetchGins = () => {
                const q = query(ginCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setGinData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchGins()
        }
        if(collectionRef === 'rum'){
            const fetchRums = () => {
                const q = query(rumCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setRumData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchRums()
        }
        if(collectionRef === 'tequila'){
            const fetchTequilas = () => {
                const q = query(tequilaCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setTequilaData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchTequilas()
        }
        if(collectionRef === 'vodka'){
            const fetchVodkas = () => {
                const q = query(vodkaCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setVodkaData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchVodkas()
        }
        if(collectionRef === 'whiskey'){
            const fetchWhiskeys = () => {
                const q = query(whiskeyCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setWhiskeyData(snapshot.docs.map(doc => ({
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
        if(selectedItem !== '' && collectionRef === 'gin'){
            const docRef = doc(ginCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'rum'){
            const docRef = doc(rumCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'tequila'){
            const docRef = doc(tequilaCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'vodka'){
            const docRef = doc(vodkaCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'whiskey'){
            const docRef = doc(whiskeyCollectionRef, selectedItem)
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

    const handleGinCategory = () => {
        setCollectionRef('gin')
    }

    const handleRumCategory = () => {
        setCollectionRef('rum')
    }

    const handleTequilaCategory = () => {
        setCollectionRef('tequila')
    }

    const handleVodkaCategory = () => {
        setCollectionRef('vodka')
    }

    const handleWhiskeyCategory = () => {
        setCollectionRef('whiskey')
    }

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
     
    return(
        <div className='menuSubcategoryContainer'>
            <div className='alcoholSubcategoryNav'>
                <button onClick={handleGinCategory}>Gin</button>
                <button onClick={handleRumCategory}>Rum</button>
                <button onClick={handleTequilaCategory}>Tequila</button>
                <button onClick={handleVodkaCategory}>Vodka</button>
                <button onClick={handleWhiskeyCategory}>Whiskey</button>
            </div>

            {collectionRef === 'gin'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Gins List</h3>
                    <ul>
                        {ginData.map(gin => 
                            <li 
                                key={gin.id}
                                >
                                <button
                                    id={gin.id}
                                    onClick={handleClick}
                                    >{gin.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            {collectionRef === 'rum'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Rums List</h3>
                    <ul>
                        {rumData.map(rum => 
                            <li 
                                key={rum.id}
                                >
                                <button
                                    id={rum.id}
                                    onClick={handleClick}
                                    >{rum.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            
            {collectionRef === 'tequila'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Tequilas List</h3>
                    <ul>
                        {tequilaData.map(tequilas => 
                            <li 
                                key={tequilas.id}
                                >
                                <button
                                    id={tequilas.id}
                                    onClick={handleClick}
                                    >{tequilas.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            
            {collectionRef === 'vodka'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Vodkas List</h3>
                    <ul>
                        {vodkaData.map(vodka => 
                            <li 
                                key={vodka.id}
                                >
                                <button
                                    id={vodka.id}
                                    onClick={handleClick}
                                    >{vodka.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            
            {collectionRef === 'whiskey'
                ? <div className='menuSubcategoryScreen'>
                    <h3>Whiskeys List</h3>
                    <ul>
                        {whiskeyData.map(whiskey => 
                            <li 
                                key={whiskey.id}
                                >
                                <button
                                    id={whiskey.id}
                                    onClick={handleClick}
                                    >{whiskey.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
        </div>
    )
}

export default LiquorsScreen
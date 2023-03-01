import { useState, useEffect } from 'react';
import { 
    redWineCollectionRef,
    whiteWineCollectionRef,
    bubblyCollectionRef
    } from '../../../library/firestoreCollections';
    import { onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const WinesScreen = (props) => {
    const [ bubblyData, setBubblyData ] = useState([]);
    const [ redsData, setRedsData ] = useState([]);    
    const [ whitesData, setWhitesData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('bubbly');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    useEffect(() => {
        if(collectionRef === 'bubbly'){
            const fetchBubbly = () => {
                const q = query(bubblyCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setBubblyData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchBubbly()
        }
        if(collectionRef === 'red'){
            const fetchReds = () => {
                const q = query(redWineCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setRedsData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchReds()
        }
        if(collectionRef === 'white'){
            const fetchWhites = () => {
                const q = query(whiteWineCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setWhitesData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            fetchWhites()
        }
    },[collectionRef])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== '' && collectionRef === 'red'){
            const docRef = doc(redWineCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'white'){
            const docRef = doc(whiteWineCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'bubbly'){
            const docRef = doc(bubblyCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem, collectionRef])

    // add selected item to display as pending order on check
    useEffect(() => {
        if(selectedItem !== ''){
            if(itemData.name && props.selectedSeat === ''){
                const orderToAdd = {seat: '1', name:itemData.screenName, cost:itemData.price}
                props.setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
            if(itemData.name && props.selectedSeat !== ''){
                const orderToAdd = {seat:props.selectedSeat, name:itemData.screenName, cost:itemData.price}
                props.setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
        }
    }, [itemData, props, selectedItem])

    const handleBubblyCategory = () => {
        setCollectionRef('bubbly')
    }

    const handleRedCategory = () => {
        setCollectionRef('red')
    }

    const handleWhiteCategory = () => {
        setCollectionRef('white')
    }

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
    
    return(
        <div className='wineScreenList'>
            <div className='wineScreenSubNav'>
                <button onClick={handleBubblyCategory}>Bubbly</button>
                <button onClick={handleRedCategory}>Red</button>
                <button onClick={handleWhiteCategory}>White</button>
            </div>

            {collectionRef === 'bubbly'
                ? <div className='wineScreenContainer'>
                    <h3>Bubbly List</h3>
                    <ul>
                        {bubblyData.map(bubbly => 
                            <li 
                                key={bubbly.id}
                                >
                                <button
                                    id={bubbly.id}
                                    onClick={handleClick}
                                    >{bubbly.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            
            {collectionRef === 'red'
                ? <div className='wineScreenContainer'>
                    <h3>Red Wine List</h3>
                    <ul>
                        {redsData.map(red => 
                            <li 
                                key={red.id}
                                >
                                <button
                                    id={red.id}
                                    onClick={handleClick}
                                    >{red.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
            
            {collectionRef === 'white'
                ? <div className='wineScreenContainer'>
                    <h3>White Wine List</h3>
                    <ul>
                        {whitesData.map(white => 
                            <li 
                                key={white.id}
                                >
                                <button
                                    id={white.id}
                                    onClick={handleClick}
                                    >{white.data.screenName}
                                </button>
                            </li>)}
                    </ul>
                </div>
                : null
            }
        </div>
    )
}

export default WinesScreen
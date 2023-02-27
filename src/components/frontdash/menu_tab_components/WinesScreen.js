import { useState, useEffect } from 'react';
import { 
    redWineCollectionRef,
    whiteWineCollectionRef,
    bubblyCollectionRef
    } from '../../../library/firestoreCollections';
    import { db } from '../../../firebase';
    import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const WinesScreen = (props) => {
    const [ bubblyData, setBubblyData ] = useState([]);
    const [ redsData, setRedsData ] = useState([]);    
    const [ whitesData, setWhitesData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    useEffect(() => {
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
        fetchBubbly()
        fetchReds()
        fetchWhites()
    },[])

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

    // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.winesActive){
            if(!props.selectedSeatExists && props.selectedSeat === '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                setDoc(checkRef, {
                seat:true,
                seatNumber:'1',
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(!props.selectedSeatExists && props.selectedSeat !== '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                setDoc(checkRef, {
                seat:true,
                seatNumber:props.selectedSeat,
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(props.selectedSeatExists && props.selectedSeat === '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
            if(props.selectedSeatExists && props.selectedSeat !== '' && selectedItem !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
        }
    }, [itemData, props.selectedSeat, props.winesActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleRedClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('red')
    }

    const handleWhiteClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('white')
    }

    const handleBubblyClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('bubbly')
    }
    
    return(
        <div className='wineScreenList'>
            <div className='wineScreenContainer'>
                <h3>Bubbly List</h3>
                <ul>
                    {bubblyData.map(bubbly => 
                        <li 
                            key={bubbly.id}
                            >
                            <button
                                id={bubbly.id}
                                onClick={handleBubblyClick}
                                >{bubbly.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='wineScreenContainer'>
                <h3>Red Wine List</h3>
                <ul>
                    {redsData.map(red => 
                        <li 
                            key={red.id}
                            >
                            <button
                                id={red.id}
                                onClick={handleRedClick}
                                >{red.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='wineScreenContainer'>
                <h3>White Wine List</h3>
                <ul>
                    {whitesData.map(white => 
                        <li 
                            key={white.id}
                            >
                            <button
                                id={white.id}
                                onClick={handleWhiteClick}
                                >{white.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default WinesScreen
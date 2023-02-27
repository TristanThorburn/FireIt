import { useState, useEffect } from 'react';
import { 
    beerBottleCollectionRef,
    beerCanCollectionRef,
    beerDraftCollectionRef }
    from '../../../library/firestoreCollections';
    import { db } from '../../../firebase';
    import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const BeerScreen = (props) => {
    const [ bottlesData, setBottlesData ] = useState([]);
    const [ cansData, setCansData ] = useState([]);    
    const [ draftData, setDraftData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    useEffect(() => {
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
        fetchBottles()
        fetchCans()
        fetchDraft()
    },[])

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

    // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.beerActive){
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
    }, [itemData, props.selectedSeat, props.beerActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleBottleClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('bottle')
    }

    const handleCanClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('can')
    }

    const handleDraftClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('draft')
    }
  
    return(
        <div className='beerScreenList'>
            <div className='beerScreenContainer'>
                <h3>Bottles List</h3>
                <ul>
                    {bottlesData.map(bottle => 
                        <li 
                            key={bottle.id}
                            >
                            <button
                                id={bottle.id}
                                onClick={handleBottleClick}
                                >{bottle.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='beerScreenContainer'>
                <h3>Cans List</h3>
                <ul>
                    {cansData.map(can => 
                        <li 
                            key={can.id}
                            >
                            <button
                                id={can.id}
                                onClick={handleCanClick}
                                >{can.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='beerScreenContainer'>
                <h3>Draft List</h3>
                <ul>
                    {draftData.map(draft => 
                        <li 
                            key={draft.id}
                            >
                            <button
                                id={draft.id}
                                onClick={handleDraftClick}
                                >{draft.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default BeerScreen
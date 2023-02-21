import { useState, useEffect } from 'react';
import { 
    ginCollectionRef,
    rumCollectionRef,
    tequilaCollectionRef,
    vodkaCollectionRef,
    whiskeyCollectionRef,
} from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const LiquorsScreen = (props) => {
    const [ ginData, setGinData ] = useState([]);
    const [ rumData, setRumData ] = useState([]);    
    const [ tequilaData, setTequilaData ] = useState([]);
    const [ vodkaData, setVodkaData ] = useState([]);
    const [ whiskeyData, setWhiskeyData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    useEffect(() => {
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
        fetchGins()
        fetchRums()
        fetchTequilas()
        fetchVodkas()
        fetchWhiskeys()
    },[])

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

    // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.liquorsActive){
            if(!props.selectedSeatExists && props.selectedSeat === '' && selectedItem){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                setDoc(checkRef, {
                seat:true,
                seatNumber:'1',
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(!props.selectedSeatExists && props.selectedSeat !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                setDoc(checkRef, {
                seat:true,
                seatNumber:props.selectedSeat,
                order:[{item:itemData.name, cost:itemData.price}],
            })
            }
            if(props.selectedSeatExists && props.selectedSeat === ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, 'seat1')
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
            if(props.selectedSeatExists && props.selectedSeat !== ''){
                const checkRef = 
                    doc(db, 'checks', `${props.serverData.employeeNumber}`, `${props.tableData.name}`, `seat${props.selectedSeat}`)
                const orderToAdd = [{item:itemData.name, cost:itemData.price}]
                updateDoc(checkRef, {
                    order:arrayUnion(...orderToAdd),
            })
            }
        }
    }, [itemData, props.selectedSeat, props.liquorsActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleGinClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('gin')
    }

    const handleRumClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('rum')
    }

    const handleTequilaClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('tequila')
    }

    const handleVodkaClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('vodka')
    }

    const handleWhiskeyClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('whiskey')
    }
     
    return(
        <div className='liquorScreenList'>
            <div className='liquorScreenContainer'>
                <h3>Gins List</h3>
                <ul>
                    {ginData.map(gin => 
                        <li 
                            key={gin.id}
                            >
                            <button
                                id={gin.id}
                                onClick={handleGinClick}
                                >{gin.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='liquorScreenContainer'>
                <h3>Rums List</h3>
                <ul>
                    {rumData.map(rum => 
                        <li 
                            key={rum.id}
                            >
                            <button
                                id={rum.id}
                                onClick={handleRumClick}
                                >{rum.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='liquorScreenContainer'>
                <h3>Tequilas List</h3>
                <ul>
                    {tequilaData.map(tequilas => 
                        <li 
                            key={tequilas.id}
                            >
                            <button
                                id={tequilas.id}
                                onClick={handleTequilaClick}
                                >{tequilas.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='liquorScreenContainer'>
                <h3>Vodkas List</h3>
                <ul>
                    {vodkaData.map(vodka => 
                        <li 
                            key={vodka.id}
                            >
                            <button
                                id={vodka.id}
                                onClick={handleVodkaClick}
                                >{vodka.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='liquorScreenContainer'>
                <h3>Whiskeys List</h3>
                <ul>
                    {whiskeyData.map(whiskey => 
                        <li 
                            key={whiskey.id}
                            >
                            <button
                                id={whiskey.id}
                                onClick={handleWhiskeyClick}
                                >{whiskey.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default LiquorsScreen
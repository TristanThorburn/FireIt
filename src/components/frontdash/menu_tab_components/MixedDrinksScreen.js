import { useState, useEffect } from 'react';
import { cocktailCollectionRef, shotsCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const MixedDrinksScreen = (props) => {
    const [ cocktailData, setCocktailData ] = useState([]);
    const [ shotData, setShotData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    useEffect(() => {
        const fetchCocktails = () => {
            const q = query(cocktailCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCocktailData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchShots = () => {
            const q = query(shotsCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setShotData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchCocktails()
        fetchShots()
    },[])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== '' && collectionRef === 'cocktail'){
            const docRef = doc(cocktailCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'shot'){
            const docRef = doc(shotsCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem, collectionRef])

    // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.mixedActive){
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
    }, [itemData, props.selectedSeat, props.mixedActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleCocktailClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('cocktail')
    }

    const handleShotClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('shot')
    }
 
 
    return(
        <div className='mixedScreenList'>
            <div className='mixedScreenContainer'>
                <h3>Cocktails List</h3>
                <ul>
                    {cocktailData.map(cocktail => 
                        <li 
                            key={cocktail.id}
                            >
                            <button
                                id={cocktail.id}
                                onClick={handleCocktailClick}
                                >{cocktail.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='mixedScreenContainer'>
                <h3>Shots List</h3>
                <ul>
                    {shotData.map(shot => 
                        <li 
                            key={shot.id}
                            >
                            <button
                                id={shot.id}
                                onClick={handleShotClick}
                                >{shot.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default MixedDrinksScreen
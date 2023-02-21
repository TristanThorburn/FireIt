import { useState, useEffect } from 'react';
import { ciderCollectionRef, hardSeltzerCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const CiderSeltzScreen = (props) => {
    const [ ciderData, setCiderData ] = useState([]);
    const [ seltzerData, setSeltzerData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    useEffect(() => {
        const fetchCider = () => {
            const q = query(ciderCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCiderData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchSeltzer = () => {
            const q = query(hardSeltzerCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setSeltzerData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchCider()
        fetchSeltzer()
    },[])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== '' && collectionRef === 'cider'){
            const docRef = doc(ciderCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
        if(selectedItem !== '' && collectionRef === 'seltzer'){
            const docRef = doc(hardSeltzerCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem, collectionRef])

    // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.cidSprActive){
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
    }, [itemData, props.selectedSeat, props.cidSprActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleCiderClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('cider')
    }

    const handleSeltzerClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('seltzer')
    }
 
    return(
        <div className='ciderSpritzScreenList'>
            <div className='ciderSpritzScreenContainer'>
                <h3>Ciders List</h3>
                <ul>
                    {ciderData.map(cider => 
                        <li 
                            key={cider.id}
                            >
                            <button
                                id={cider.id}
                                onClick={handleCiderClick}
                                >{cider.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='ciderSpritzScreenContainer'>
                <h3>Hard Seltzers List</h3>
                <ul>
                    {seltzerData.map(seltzer => 
                        <li 
                            key={seltzer.id}
                            >
                            <button
                                id={seltzer.id}
                                onClick={handleSeltzerClick}
                                >{seltzer.data.name}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default CiderSeltzScreen
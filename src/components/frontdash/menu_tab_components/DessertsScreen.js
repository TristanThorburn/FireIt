import { useState, useEffect } from 'react';
import { dessertsCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const DessertsScreen = (props) => {
    const [ dessertsData, setDessertsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    // const [ testData, setTestData ] = useState()

    const handleTest = () => {
        console.log('selected:', selectedItem, 'data:', itemData)
    }

    // Initial Data Population
    useEffect(() => {
        const q = query(dessertsCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setDessertsData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== ''){
            const docRef = doc(dessertsCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem])

        // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.dessertsActive){
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
    }, [itemData, props.selectedSeat, props.dessertsActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
 
    return(
        <div className='dessertScreenList'>
            <div className='dessertScreenContainer'>
                <h3>Dessertss List</h3>
                <ul>
                    {dessertsData.map(desserts => 
                        <li 
                            key={desserts.id}
                            >
                            <button
                                id={desserts.id}
                                onClick={handleClick}
                                >{desserts.data.name}
                            </button>
                        </li>)}
                <li><button onClick={handleTest} className='testButton'>Test</button></li>
                </ul>
            </div>
        </div>
    )
}

export default DessertsScreen
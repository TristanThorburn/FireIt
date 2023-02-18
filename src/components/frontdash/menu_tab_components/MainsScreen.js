import { useState, useEffect } from 'react';
import { mainsCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase'
import { onSnapshot, query, orderBy, doc, getDoc, setDoc, updateDoc, arrayUnion } from 'firebase/firestore';

const MainsScreen = (props) => {
    const [ mainsData, setMainsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    // const [ testData, setTestData ] = useState()

    const handleTest = () => {
        console.log('selected:', selectedItem, 'data:', itemData)
    }

    // Initial Data Population
    useEffect(() => {
        const q = query(mainsCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setMainsData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== ''){
            const docRef = doc(mainsCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem])

        // Push selected item to check....
    // logic for seat number, no seat number add/update
    useEffect(() => {
        if(props.mainsActive){
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
    }, [itemData, props.selectedSeat, props.mainsActive, props.selectedSeatExists, props.serverData.employeeNumber, props.tableData.name, selectedItem])

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
 
    return(
        <div className='mainScreenList'>
            <div className='mainScreenContainer'>
                <h3>Mains List</h3>
                <ul>
                    {mainsData.map(main => 
                        <li 
                            key={main.id}
                            >
                            <button
                                id={main.id}
                                onClick={handleClick}
                                >{main.data.name}
                            </button>
                        </li>)}
                    <li><button onClick={handleTest} className='testButton'>Test</button></li>
                </ul>
            </div>
        </div>
    )
}

export default MainsScreen
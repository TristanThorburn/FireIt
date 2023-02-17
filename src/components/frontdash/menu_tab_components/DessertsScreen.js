import { useState, useEffect } from 'react';
import { dessertsCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const DessertsScreen = (props) => {
    const [ dessertsData, setDessertsData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

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
 
    return(
        <div>
            <div className='itemList'>
                <h3>Dessertss List</h3>
                <ul>
                    {dessertsData.map(desserts => 
                        <li 
                            key={desserts.id}
                            >
                                {desserts.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default DessertsScreen
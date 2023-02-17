import { useState, useEffect } from 'react';
import { mainsCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const MainsScreen = (props) => {
    const [ mainsData, setMainsData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

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
 
    return(
        <div>
            <div className='itemList'>
                <h3>Mains List</h3>
                <ul>
                    {mainsData.map(main => 
                        <li 
                            key={main.id}
                            >
                                {main.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default MainsScreen
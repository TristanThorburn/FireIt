import { useState, useEffect } from 'react';
import { appCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const AppsScreen = (props) => {
    const [ appsData, setAppsData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const q = query(appCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setAppsData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[])
 
    return(
        <div>
            <div className='itemList'>
                <h3>Apps List</h3>
                <ul>
                    {appsData.map(appetizer => 
                        <li 
                            key={appetizer.id}
                            >
                                {appetizer.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default AppsScreen
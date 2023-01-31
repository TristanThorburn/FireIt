import MenuItemForm from './MenuItemForm';
import { useState, useEffect } from 'react';
import { appCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot } from 'firebase/firestore';

// LOGIC: select item from list, choose new/update/delete to open form component

const AppsData = () => {
    const [ appsData, setAppsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false)

    // const getApps = () => {
    //     getDocs(appCollectionRef)
    //     .then(response => { 
    //         const appetizers = response.docs.map(doc => ({
    //             data:doc.data(),
    //             id: doc.id,
    //         }))
    //         setAppsData(appetizers)
    //     })
    //     .catch(error => console.log(error))
    // }

    // useEffect(() => {
    //     getApps();
    // },[])

    useEffect(() => {
        const unsubscribe = onSnapshot(appCollectionRef, snapshot => {
            setAppsData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return () => {
            unsubscribe()
        }
    },[])

    const handleNewItem = () => {
        setNewItem(true)
    }
    
    return(
        <div>
            <div className='itemList'>
                <ul>
                    <li><button onClick={handleNewItem}>New Item</button></li>
                    {appsData.map(appetizer => <li key={appetizer.id}>{appetizer.data.name}{appetizer.data.price}{appetizer.data.sides}</li>)}
                </ul>
            </div>
            <MenuItemForm setNewItem={setNewItem} newItem={newItem}/>
        </div>
    )
}

export default AppsData
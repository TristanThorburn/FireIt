import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { appCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot } from 'firebase/firestore';

const AppsData = (props) => {
    const [ appsData, setAppsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

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
        return unsubscribe
    },[])

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div className='itemList'>
                <h3>Apps List</h3>
                <ul>
                    <li><button onClick={handleNewItem}>New Item</button></li>
                    {appsData.map(appetizer => 
                        <li 
                            key={appetizer.id}
                            onClick={() => {
                                setSelectedItem(appetizer.id)
                                setNewItem(false)
                            }}
                            >
                                {appetizer.data.name}
                        </li>)}
                </ul>
            </div>

            <MenuItemForm 
                setNewItem={setNewItem}
                newItem={newItem}
                id={selectedItem}
                setSelectedItem={setSelectedItem}
                activeTab={props.activeTab}
                docQuery={props.docQuery} />
        </div>
    )
}

export default AppsData
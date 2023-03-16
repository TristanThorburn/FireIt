import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { mainsCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const MainsData = (props) => {
    const [ mainsData, setMainsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

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

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div className='backDataList'>
                <h3>Mains List</h3>
                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                <ul>
                    {mainsData.map(main => 
                        <li 
                            key={main.id}
                            onClick={() => {
                                setSelectedItem(main.id)
                                setNewItem(false)
                            }}
                            >
                                {main.data.name}
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

export default MainsData;
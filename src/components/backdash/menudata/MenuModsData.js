import MenuItemForm from './MenuItemForm';
import { useState, useEffect } from 'react';
import { menuModsCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const MenuModsData = (props) => {
    const [ modsData, setModsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const q = query(menuModsCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setModsData(snapshot.docs.map(doc => ({
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
                <h3>Modifiers List</h3>
                <ul>
                    <li><button onClick={handleNewItem}>New Item</button></li>
                    {modsData.map(modifier => 
                        <li 
                            key={modifier.id}
                            onClick={() => {
                                setSelectedItem(modifier.id)
                                setNewItem(false)
                            }}
                            >
                                {modifier.data.name}
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

export default MenuModsData
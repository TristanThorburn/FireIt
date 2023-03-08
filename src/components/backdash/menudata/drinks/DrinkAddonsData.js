import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { drinkAddsCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const DrinkAddonsData = (props) => {
    const [ drinkAddsData, setDrinkAddsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const q = query(drinkAddsCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setDrinkAddsData(snapshot.docs.map(doc => ({
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
                <h3>Drink Addons List</h3>
                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                <ul>
                    {drinkAddsData.map(dAddon => 
                        <li 
                            key={dAddon.id}
                            onClick={() => {
                                setSelectedItem(dAddon.id)
                                setNewItem(false)
                            }}
                            >
                                {dAddon.data.name}
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

export default DrinkAddonsData
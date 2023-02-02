import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { drinkAddsCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot } from 'firebase/firestore';

// LOGIC: select item from list, choose new/update/delete to open form component

const DrinkAddonsData = (props) => {
    const [ drinkAddsData, setDrinkAddsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(drinkAddsCollectionRef, snapshot => {
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
            <div className='itemList'>
                <h3>Drink Addons List</h3>
                <ul>
                    <li><button onClick={handleNewItem}>New Item</button></li>
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
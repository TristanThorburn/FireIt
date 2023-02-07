import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { foodAddsCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const FoodAddonsData = (props) => {
    const [ foodAddsData, setFoodAddsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const q = query(foodAddsCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setFoodAddsData(snapshot.docs.map(doc => ({
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
                <h3>Food Addons List</h3>
                <ul>
                    <li><button onClick={handleNewItem}>New Item</button></li>
                    {foodAddsData.map(fAddon => 
                        <li 
                            key={fAddon.id}
                            onClick={() => {
                                setSelectedItem(fAddon.id)
                                setNewItem(false)
                            }}
                            >
                                {fAddon.data.name}
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

export default FoodAddonsData
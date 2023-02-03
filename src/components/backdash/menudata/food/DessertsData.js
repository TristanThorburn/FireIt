import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { dessertsCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const DessertsData = (props) => {
    const [ dessertsData, setDessertsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const q = query(dessertsCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setDessertsData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })));
        });
        return unsubscribe
    },[])

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div className='itemList'>
                <h3>Dessert List</h3>
                <ul>
                    <li><button onClick={handleNewItem}>New Item</button></li>
                    {dessertsData.map(dessert => 
                        <li 
                            key={dessert.id}
                            onClick={() => {
                                setSelectedItem(dessert.id)
                                setNewItem(false)
                            }}
                            >
                                {dessert.data.name}
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

export default DessertsData;
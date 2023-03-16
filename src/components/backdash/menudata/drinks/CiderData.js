import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { ciderCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const CiderData = (props) => {
    const [ ciderData, setCiderData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    // Data population
    useEffect(() => {
        const getMenuCategory = async () => {
            const q = query(ciderCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCiderData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        getMenuCategory()
    },[])

    const handleNewItem = () => {
        setSelectedItem('');
        setNewItem(true);
    }
 
    return(
        <div>
            <div className='backDataList'>
                <h3>Cider List</h3>
                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                <ul>
                    {ciderData.map(cider => 
                        <li 
                            key={cider.id}
                            onClick={() => {
                                setSelectedItem(cider.id)
                                setNewItem(false)
                            }}
                            >
                                {cider.data.name}
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

export default CiderData;
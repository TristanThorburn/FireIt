import MenuItemForm from './MenuItemForm';
import { useState, useEffect } from 'react';
import { menuModsCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy, getDocs } from 'firebase/firestore';

const MenuModsData = (props) => {
    const [ modsData, setModsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const getMenuCategory = async () => {
            const q = query(menuModsCollectionRef, orderBy('name'));
            const querySnapShot = await getDocs(q, { source: 'cache' })
            if(!querySnapShot.empty){
                const menuItemList = querySnapShot.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setModsData(menuItemList)
            } else {
                const unsubscribe = onSnapshot(q, snapshot => {
                    setModsData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
        }
        getMenuCategory()
    },[])

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div className='backDataList'>
                <h3>Modifiers List</h3>
                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                <ul>
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
import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { dessertsCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy, getDocs } from 'firebase/firestore';

const DessertsData = (props) => {
    const [ dessertsData, setDessertsData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const getMenuCategory = async () => {
            const q = query(dessertsCollectionRef, orderBy('name'));
            const querySnapShot = await getDocs(q, { source: 'cache' })
            if(!querySnapShot.empty){
                const menuItemList = querySnapShot.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setDessertsData(menuItemList)
            } else {
                const unsubscribe = onSnapshot(q, snapshot => {
                    setDessertsData(snapshot.docs.map(doc => ({
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
                <h3>Dessert List</h3>
                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                <ul>
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
import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { hardSeltzerCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot } from 'firebase/firestore';

const HardSeltzerData = (props) => {
    const [ hardSeltzerData, setHardSeltzerData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const unsubscribe = onSnapshot(hardSeltzerCollectionRef, snapshot => {
            setHardSeltzerData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[])

    const handleNewItem = () => {
        setSelectedItem('');
        setNewItem(true);
    }
 
    return(
        <div>
            <div className='itemList'>
                <h3>Hard Seltzer List</h3>
                <ul>
                    <li><button onClick={handleNewItem}>New Item</button></li>
                    {hardSeltzerData.map(hardSeltzer => 
                        <li 
                            key={hardSeltzer.id}
                            onClick={() => {
                                setSelectedItem(hardSeltzer.id)
                                setNewItem(false)
                            }}
                            >
                                {hardSeltzer.data.name}
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

export default HardSeltzerData;
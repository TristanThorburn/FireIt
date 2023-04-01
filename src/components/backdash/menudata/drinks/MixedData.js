import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { 
        cocktailCollectionRef,
        shotsCollectionRef,
        } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const MixedData = (props) => {
    const { activeTab } = props
    const [ mixedData, setMixedData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const getMenuCategory = async () => {
            if(activeTab === 'cocktails'){
                const q = query(cocktailCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setMixedData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            if(activeTab === 'shots'){
                const q = query(shotsCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setMixedData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            else {
                setSelectedItem('');
                setNewItem(false);
            }
        }
        getMenuCategory()
    },[activeTab])

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div className='backDataList'>
                {props.activeTab === 'cocktails'
                    ? <>
                        <h3>Cocktails List</h3>
                        <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                    </>
                    : props.activeTab === 'shots'
                        ?<>
                            <h3>Shots List</h3>
                            <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                        </>
                        : null
                }

                {props.activeTab === 'cocktails' || props.activeTab === 'shots'
                    ? <ul>
                        {mixedData.map(mixed => 
                            <li 
                                key={mixed.id}
                                onClick={() => {
                                    setSelectedItem(mixed.id)
                                    setNewItem(false)
                                }}
                                >
                                    {mixed.data.name}
                            </li>)}
                    </ul>
                    :null
                }
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

export default MixedData;
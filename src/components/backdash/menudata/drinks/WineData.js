import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { 
        redWineCollectionRef,
        whiteWineCollectionRef,
        bubblyCollectionRef,
        } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const WineData = (props) => {
    const [ wineData, setWineData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        if(props.activeTab === 'red wine'){
            const q = query(redWineCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setWineData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'white wine'){
            const q = query(whiteWineCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setWineData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'bubbly'){
            const q = query(bubblyCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setWineData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        else {
            setSelectedItem('');
            setNewItem(false);
        }
    },[props.activeTab])

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div className='backDataList'>
                {props.activeTab === 'red wine'
                    ?<>
                        <h3>Red Wine List</h3>
                        <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                    </>
                    : props.activeTab === 'white wine'
                        ?<>
                            <h3>White Wine List</h3>
                            <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                        </>
                        : props.activeTab === 'bubbly'
                            ?<>
                                <h3>Bubbly List</h3>
                                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                            </>
                            : null
                }

                {props.activeTab === 'red wine' || props.activeTab === 'white wine' || props.activeTab === 'bubbly'
                    ?<ul>
                        {wineData.map(wine => 
                            <li 
                                key={wine.id}
                                onClick={() => {
                                    setSelectedItem(wine.id)
                                    setNewItem(false)
                                }}
                                >
                                    {wine.data.name}
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

export default WineData;
import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { 
        ginCollectionRef,
        rumCollectionRef,
        tequilaCollectionRef,
        vodkaCollectionRef,
        whiskeyCollectionRef,
        } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const LiquorsData = (props) => {
    const [ liquorData, setLiquorData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        if(props.activeTab === 'gin'){
            const q = query(ginCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'rum'){
            const q = query(rumCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'tequila'){
            const q = query(tequilaCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'vodka'){
            const q = query(vodkaCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'whiskey'){
            const q = query(whiskeyCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
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
                {props.activeTab === 'gin'
                    ? <>
                        <h3>Gin List</h3>
                        <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                    </>
                    : props.activeTab === 'rum'
                        ?<>
                            <h3>Rum List</h3>
                            <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                        </>
                        : props.activeTab === 'tequila'
                            ?<>
                                <h3>Tequila List</h3>
                                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                            </>
                            : props.activeTab === 'vodka'
                                ?<>
                                    <h3>Vodka List</h3>
                                    <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                                </>
                                : props.activeTab === 'whiskey'
                                    ?<>
                                        <h3>Whiskey List</h3>
                                        <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                                    </>
                                    : null
                }

                {props.activeTab === 'gin' || props.activeTab === 'rum' || props.activeTab === 'tequila' || props.activeTab === 'vodka' || props.activeTab === 'whiskey'
                    ? <ul>
                        {liquorData.map(liquor => 
                            <li 
                                key={liquor.id}
                                onClick={() => {
                                    setSelectedItem(liquor.id)
                                    setNewItem(false)
                                }}
                                >
                                    {liquor.data.name}
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

export default LiquorsData;
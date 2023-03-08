import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { 
        beerBottleCollectionRef, 
        beerCanCollectionRef, 
        beerDraftCollectionRef,
        } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const BeerData = (props) => {
    const [ beerData, setBeerData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        if(props.activeTab === 'beer bottle'){
            const q = query(beerBottleCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setBeerData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'beer can'){
            const q = query(beerCanCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setBeerData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'beer draft'){
            const q = query(beerDraftCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setBeerData(snapshot.docs.map(doc => ({
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
                {props.activeTab === 'beer bottle'
                    ?<>
                        <h3>Beer Bottle List</h3>
                        <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                    </>
                    : props.activeTab === 'beer can'
                        ?<>
                            <h3>Beer Can List</h3>
                            <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                        </>
                        : props.activeTab === 'beer draft'
                            ? <>
                                <h3>Beer Bottle List</h3>
                                <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                            </>
                            : null
                }

                {props.activeTab === 'beer bottle' || props.activeTab === 'beer can' || props.activeTab === 'beer draft'
                    ?<ul>
                        {beerData.map(beer => 
                            <li 
                                key={beer.id}
                                onClick={() => {
                                    setSelectedItem(beer.id)
                                    setNewItem(false)
                                }}
                                >
                                    {beer.data.name}
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

export default BeerData;
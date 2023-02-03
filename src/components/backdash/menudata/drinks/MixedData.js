import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { 
        cocktailCollectionRef,
        shotsCollectionRef,
        } from '../../../../library/firestoreCollections';
import { onSnapshot } from 'firebase/firestore';

const MixedData = (props) => {
    const [ mixedData, setMixedData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        if(props.activeTab === 'cocktails'){
            const unsubscribe = onSnapshot(cocktailCollectionRef, snapshot => {
            setMixedData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'shots'){
            const unsubscribe = onSnapshot(shotsCollectionRef, snapshot => {
            setMixedData(snapshot.docs.map(doc => ({
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
            <div className='itemList'>
                {props.activeTab === 'cocktails'
                    ? <h3>Cocktails List</h3>
                    : props.activeTab === 'shots'
                        ?<h3>Shots List</h3>
                        : null
                }

                {props.activeTab === 'cocktails' || props.activeTab === 'shots'
                    ? <ul>
                        <li><button onClick={handleNewItem}>New Item</button></li>
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
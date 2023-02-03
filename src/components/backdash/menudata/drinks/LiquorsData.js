import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { 
        ginCollectionRef,
        rumCollectionRef,
        tequilaCollectionRef,
        vodkaCollectionRef,
        whiskeyCollectionRef,
        } from '../../../../library/firestoreCollections';
import { onSnapshot } from 'firebase/firestore';

const LiquorsData = (props) => {
    const [ liquorData, setLiquorData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        if(props.activeTab === 'gin'){
            const unsubscribe = onSnapshot(ginCollectionRef, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'rum'){
            const unsubscribe = onSnapshot(rumCollectionRef, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'tequila'){
            const unsubscribe = onSnapshot(tequilaCollectionRef, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'vodka'){
            const unsubscribe = onSnapshot(vodkaCollectionRef, snapshot => {
            setLiquorData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(props.activeTab === 'whiskey'){
            const unsubscribe = onSnapshot(whiskeyCollectionRef, snapshot => {
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
            <div className='itemList'>
                {props.activeTab === 'gin'
                    ? <h3>Gin List</h3>
                    : props.activeTab === 'rum wine'
                        ?<h3>Rum List</h3>
                        : props.activeTab === 'tequila'
                            ? <h3>Tequila List</h3>
                            : props.activeTab === 'vodka'
                                ? <h3>Vodka List</h3>
                                : props.activeTab === 'whiskey'
                                    ? <h3>Whisky List</h3>
                                    : null
                }

                {props.activeTab === 'gin' || props.activeTab === 'rum' || props.activeTab === 'tequila' || props.activeTab === 'vodka' || props.activeTab === 'whiskey'
                    ? <ul>
                        <li><button onClick={handleNewItem}>New Item</button></li>
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
import MenuItemForm from '../MenuItemForm';
import { useState, useEffect } from 'react';
import { coldDrinksCollectionRef, hotDrinksCollectionRef } from '../../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const NonAlchData = (props) => {
    const [ nonAlchData, setNonAlchData ] = useState([]);
    const [ newItem, setNewItem ] = useState(false);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ drinkType, setDrinkType ] = useState('');

    const handleColdDrink = () => {
        setDrinkType('cold')
        props.setActiveDataDoc('cold drinks');
        props.setDocQuery(['drinks', 'non alcoholic', 'cold drinks'])
    }

    const handleHotDrink = () => {
        setDrinkType('hot')
        props.setActiveDataDoc('hot drinks');
        props.setDocQuery(['drinks', 'non alcoholic', 'hot drinks'])
    }

    useEffect(() => {
        setSelectedItem('');
        setNewItem(false);
        if(drinkType === 'cold'){
            const q = query(coldDrinksCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setNonAlchData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
        if(drinkType === 'hot'){
            const q = query(hotDrinksCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
            setNonAlchData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
                })));
            });
            return unsubscribe
        }
    },[drinkType])

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div>
                <button onClick={handleColdDrink}>Cold Drinks</button>
                <button onClick={handleHotDrink}>Hot Drinks</button>
            </div>
            <div className='itemList'>
                {drinkType === 'cold'
                    ?<h3>Cold Drinks List</h3>
                    :drinkType === 'hot'
                        ?<h3>Hot Drinks List</h3>
                        :null
                }

                {drinkType === 'cold' || drinkType === 'hot'
                    ?<ul>
                        <li><button onClick={handleNewItem}>New Item</button></li>
                        {nonAlchData.map(nonAlch => 
                            <li 
                                key={nonAlch.id}
                                onClick={() => {
                                    setSelectedItem(nonAlch.id)
                                    setNewItem(false)
                                }}
                                >
                                    {nonAlch.data.name}
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

export default NonAlchData;
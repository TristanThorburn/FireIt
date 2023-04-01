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
        setDrinkType('cold drinks')
        props.setDocQuery(['drinks', 'non alcoholic', 'cold drinks'])
    }

    const handleHotDrink = () => {
        setDrinkType('hot drinks')
        props.setDocQuery(['drinks', 'non alcoholic', 'hot drinks'])
    }

    // Initial data population
    useEffect(() => {
        const getMenuCategory = async () => {
            setSelectedItem('');
            setNewItem(false);
            if(drinkType === 'cold drinks'){
                const q = query(coldDrinksCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setNonAlchData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            if(drinkType === 'hot drinks'){
                const q = query(hotDrinksCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setNonAlchData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
        }
        getMenuCategory()
    },[drinkType])

    const handleNewItem = () => {
        setSelectedItem('')
        setNewItem(true)
    }
 
    return(
        <div>
            <div className='alcoholNavButtons'>
                <button onClick={handleColdDrink}>Cold Drinks</button>
                <button onClick={handleHotDrink}>Hot Drinks</button>
            </div>

            {drinkType === 'cold drinks' || drinkType === 'hot drinks'
                ? <div className='backDataList'>
                    <h3>
                        {drinkType === 'cold drinks'
                            ? 'Cold Drinks List'
                            : drinkType === 'hot drinks'
                                ? 'Hot Drinks List'
                                : null
                        }
                    </h3>
                    <button onClick={handleNewItem} className='newItemButton'>New Item</button>
                    <ul>
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
                </div>
                : null
            }

            {drinkType === 'cold drinks' || drinkType === 'hot drinks'
                ? <MenuItemForm 
                    setNewItem={setNewItem}
                    newItem={newItem}
                    id={selectedItem}
                    setSelectedItem={setSelectedItem}
                    activeTab={drinkType}
                    docQuery={props.docQuery} 
                    />
                : null
            }
        </div>
    )
}

export default NonAlchData;
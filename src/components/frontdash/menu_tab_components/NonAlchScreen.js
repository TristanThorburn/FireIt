import { useState, useEffect } from 'react';
import { coldDrinksCollectionRef, hotDrinksCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const NonAlchScreen = (props) => {
    const [ coldDrinkData, setColdDrinkData ] = useState([]);
    const [ hotDrinkData, setHotDrinkData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const fetchCold = () => {
            const q = query(coldDrinksCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setColdDrinkData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchHot = () => {
            const q = query(hotDrinksCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setHotDrinkData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchCold()
        fetchHot()
    },[])
 
    return(
        <div>
            <div className='itemList'>
                <h3>Cold Drinks List</h3>
                <ul>
                    {coldDrinkData.map(coldDrink => 
                        <li 
                            key={coldDrink.id}
                            >
                                {coldDrink.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Hot Drinks List</h3>
                <ul>
                    {hotDrinkData.map(hotDrink => 
                        <li 
                            key={hotDrink.id}
                            >
                                {hotDrink.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default NonAlchScreen
import { useState, useEffect } from 'react';
import { cocktailCollectionRef, shotsCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const MixedDrinksScreen = (props) => {
    const [ cocktailData, setCocktailData ] = useState([]);
    const [ shotData, setShotData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const fetchCocktails = () => {
            const q = query(cocktailCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCocktailData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchShots = () => {
            const q = query(shotsCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setShotData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchCocktails()
        fetchShots()
    },[])
 
    return(
        <div>
            <div className='itemList'>
                <h3>Cocktails List</h3>
                <ul>
                    {cocktailData.map(cocktail => 
                        <li 
                            key={cocktail.id}
                            >
                                {cocktail.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Shots List</h3>
                <ul>
                    {shotData.map(shot => 
                        <li 
                            key={shot.id}
                            >
                                {shot.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default MixedDrinksScreen
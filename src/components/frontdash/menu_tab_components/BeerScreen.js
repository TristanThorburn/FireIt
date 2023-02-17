import { useState, useEffect } from 'react';
import { 
    beerBottleCollectionRef,
    beerCanCollectionRef,
    beerDraftCollectionRef }
    from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const BeerScreen = (props) => {
    const [ bottlesData, setBottlesData ] = useState([]);
    const [ cansData, setCansData ] = useState([]);    
    const [ draftData, setDraftData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const fetchBottles = () => {
            const q = query(beerBottleCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setBottlesData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchCans = () => {
            const q = query(beerCanCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCansData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchDraft = () => {
            const q = query(beerDraftCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setDraftData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchBottles()
        fetchCans()
        fetchDraft()
    },[])
 
    return(
        <div className='beerScreen'>
            <div className='itemList'>
                <h3>Bottles List</h3>
                <ul>
                    {bottlesData.map(bottle => 
                        <li 
                            key={bottle.id}
                            >
                                {bottle.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Cans List</h3>
                <ul>
                    {cansData.map(can => 
                        <li 
                            key={can.id}
                            >
                                {can.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Draft List</h3>
                <ul>
                    {draftData.map(draft => 
                        <li 
                            key={draft.id}
                            >
                                {draft.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default BeerScreen
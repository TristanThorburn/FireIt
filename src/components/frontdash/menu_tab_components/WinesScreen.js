import { useState, useEffect } from 'react';
import { 
    redWineCollectionRef,
    whiteWineCollectionRef,
    bubblyCollectionRef
    } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const WinesScreen = (props) => {
    const [ bubblyData, setBubblyData ] = useState([]);
    const [ redsData, setRedsData ] = useState([]);    
    const [ whitesData, setWhitesData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const fetchBubbly = () => {
            const q = query(bubblyCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setBubblyData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchReds = () => {
            const q = query(redWineCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setRedsData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchWhites = () => {
            const q = query(whiteWineCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setWhitesData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchBubbly()
        fetchReds()
        fetchWhites()
    },[])
 
    return(
        <div className='beerScreen'>
            <div className='itemList'>
                <h3>Bubbly List</h3>
                <ul>
                    {bubblyData.map(bubbly => 
                        <li 
                            key={bubbly.id}
                            >
                                {bubbly.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Red Wine List</h3>
                <ul>
                    {redsData.map(red => 
                        <li 
                            key={red.id}
                            >
                                {red.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>White Wine List</h3>
                <ul>
                    {whitesData.map(white => 
                        <li 
                            key={white.id}
                            >
                                {white.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default WinesScreen
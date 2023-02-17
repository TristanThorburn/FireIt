import { useState, useEffect } from 'react';
import { 
    ginCollectionRef,
    rumCollectionRef,
    tequilaCollectionRef,
    vodkaCollectionRef,
    whiskeyCollectionRef,
} from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const LiquorsScreen = (props) => {
    const [ ginData, setGinData ] = useState([]);
    const [ rumData, setRumData ] = useState([]);    
    const [ tequilaData, setTequilaData ] = useState([]);
    const [ vodkaData, setVodkaData ] = useState([]);
    const [ whiskeyData, setWhiskeyData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const fetchGins = () => {
            const q = query(ginCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setGinData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchRums = () => {
            const q = query(rumCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setRumData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchTequilas = () => {
            const q = query(tequilaCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setTequilaData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchVodkas = () => {
            const q = query(vodkaCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setVodkaData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchWhiskeys = () => {
            const q = query(whiskeyCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setWhiskeyData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchGins()
        fetchRums()
        fetchTequilas()
        fetchVodkas()
        fetchWhiskeys()
    },[])
 
    return(
        <div className='beerScreen'>
            <div className='itemList'>
                <h3>Gins List</h3>
                <ul>
                    {ginData.map(gin => 
                        <li 
                            key={gin.id}
                            >
                                {gin.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Rums List</h3>
                <ul>
                    {rumData.map(rum => 
                        <li 
                            key={rum.id}
                            >
                                {rum.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Tequilas List</h3>
                <ul>
                    {tequilaData.map(tequilas => 
                        <li 
                            key={tequilas.id}
                            >
                                {tequilas.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Vodkas List</h3>
                <ul>
                    {vodkaData.map(vodka => 
                        <li 
                            key={vodka.id}
                            >
                                {vodka.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Whiskeys List</h3>
                <ul>
                    {whiskeyData.map(whiskey => 
                        <li 
                            key={whiskey.id}
                            >
                                {whiskey.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default LiquorsScreen
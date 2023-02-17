import { useState, useEffect } from 'react';
import { ciderCollectionRef, hardSeltzerCollectionRef } from '../../../library/firestoreCollections';
import { onSnapshot, query, orderBy } from 'firebase/firestore';

const CiderSeltzScreen = (props) => {
    const [ ciderData, setCiderData ] = useState([]);
    const [ seltzerData, setSeltzerData ] = useState([]);
    // const [ selectedItem, setSelectedItem ] = useState('');

    useEffect(() => {
        const fetchCider = () => {
            const q = query(ciderCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setCiderData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        const fetchSeltzer = () => {
            const q = query(hardSeltzerCollectionRef, orderBy('name'));
            const unsubscribe = onSnapshot(q, snapshot => {
                setSeltzerData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        fetchCider()
        fetchSeltzer()
    },[])
 
    return(
        <div>
            <div className='itemList'>
                <h3>Ciders List</h3>
                <ul>
                    {ciderData.map(cider => 
                        <li 
                            key={cider.id}
                            >
                                {cider.data.name}
                        </li>)}
                </ul>
            </div>

            <div className='itemList'>
                <h3>Hard Seltzers List</h3>
                <ul>
                    {seltzerData.map(seltzer => 
                        <li 
                            key={seltzer.id}
                            >
                                {seltzer.data.name}
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default CiderSeltzScreen
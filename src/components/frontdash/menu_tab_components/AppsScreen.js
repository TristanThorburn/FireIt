import { useState, useEffect } from 'react';
import { appCollectionRef } from '../../../library/firestoreCollections';
// import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';

const AppsScreen = (props) => {
    const [ appsData, setAppsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    // const [ testData, setTestData ] = useState()

    const handleTest = () => {
        console.log('selected:', selectedItem, 'data:', itemData)
    }

    // Initial Data Population
    useEffect(() => {
        const q = query(appCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setAppsData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[])

    // GetDoc for selected item
    useEffect(() => {
        if(selectedItem !== ''){
            const docRef = doc(appCollectionRef, selectedItem)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    }, [selectedItem])

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
 
    return(
        <div className='appScreenList'>
            <div className='appScreenContainer'>
                <h3>Appetizers</h3>
                <ul>
                    {appsData.map(appetizer => 
                        <li 
                            key={appetizer.id}
                            >
                            <button
                                id={appetizer.id}
                                onClick={handleClick}>{appetizer.data.name}</button>
                        </li>)}
                    <li><button onClick={handleTest} className='testButton'>Test</button></li>
                </ul>
            </div>
        </div>
    )
}

export default AppsScreen
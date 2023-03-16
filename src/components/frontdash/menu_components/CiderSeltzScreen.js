import { useState, useEffect } from 'react';
import { ciderCollectionRef, hardSeltzerCollectionRef } from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, getDocs, getDocsFromCache, getDocFromCache } from 'firebase/firestore';

const CiderSeltzScreen = (props) => {
    const [ ciderData, setCiderData ] = useState([]);
    const [ seltzerData, setSeltzerData ] = useState([]);
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()

    // Populate screen with items data
    useEffect(() => {
        const fetchCider = async () => {
            const q = query(ciderCollectionRef, orderBy('name'));
            const querySnapShot = await getDocsFromCache(q)
            if(querySnapShot){
                const menuItemList = querySnapShot.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setCiderData(menuItemList)
            } else {
                const severData = await getDocs(q)
                const menuItemList = severData.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setCiderData(menuItemList)
            }
        }
        const fetchSeltzer = async () => {
            const q = query(hardSeltzerCollectionRef, orderBy('name'));
            const querySnapShot = await getDocsFromCache(q)
            if(querySnapShot){
                const menuItemList = querySnapShot.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setSeltzerData(menuItemList)
            } else {
                const severData = await getDocs(q)
                const menuItemList = severData.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setSeltzerData(menuItemList)
            }
        }
        fetchCider()
        fetchSeltzer()
    },[])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== '' && collectionRef === 'cider'){
                const docRef = doc(ciderCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
            if(selectedItem !== '' && collectionRef === 'seltzer'){
                const docRef = doc(hardSeltzerCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                    if(itemDataRequest.data()){
                        setItemData(itemDataRequest.data())
                    } else {
                        getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                    }
            }
        }
        getItem()
    }, [selectedItem, collectionRef])

    // add selected item to display as pending order on check
    useEffect(() => {
        if(selectedItem !== ''){
            if(itemData.name && props.selectedSeat === ''){
                const orderToAdd = {seat: '1', name:itemData.screenName, cost:itemData.price, time:time}
                props.setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
            if(itemData.name && props.selectedSeat !== ''){
                const orderToAdd = {seat:props.selectedSeat, name:itemData.screenName, cost:itemData.price, time:time}
                props.setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
        }
    }, [itemData, props, selectedItem, time])

    const handleCiderClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('cider')
    }

    const handleSeltzerClick =(e) => {
        setSelectedItem(e.target.id)
        setCollectionRef('seltzer')
    }
 
    return(
        <div className='menuSubcategoryContainer'>
            <div className='menuSubcategoryScreen'>
                <h3>Ciders List</h3>
                <ul>
                    {ciderData.map(cider => 
                        <li 
                            key={cider.id}
                            >
                            <button
                                id={cider.id}
                                onClick={handleCiderClick}
                                >{cider.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>

            <div className='menuSubcategoryScreen'>
                <h3>Hard Seltzers List</h3>
                <ul>
                    {seltzerData.map(seltzer => 
                        <li 
                            key={seltzer.id}
                            >
                            <button
                                id={seltzer.id}
                                onClick={handleSeltzerClick}
                                >{seltzer.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default CiderSeltzScreen
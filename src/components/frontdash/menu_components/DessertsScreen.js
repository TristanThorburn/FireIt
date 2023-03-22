import { useState, useEffect } from 'react';
import { dessertsCollectionRef } from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, getDocs, getDocsFromCache } from 'firebase/firestore';

const DessertsScreen = (props) => {
    const [ dessertsData, setDessertsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const time = Date.now().toString()

    // Initial Data Population
    useEffect(() => {
        const getMenuCategory = async () => {
            const q = query(dessertsCollectionRef, orderBy('name'));
            const querySnapShot = await getDocsFromCache(q)
            if(querySnapShot){
                const menuItemList = querySnapShot.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setDessertsData(menuItemList)
            } else {
                const severData = await getDocs(q)
                const menuItemList = severData.docs.map(doc => ({
                    id:doc.id,
                    data:doc.data()
                }))
                setDessertsData(menuItemList)
            }
        }
        getMenuCategory()
    },[])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== ''){
                const docRef = doc(dessertsCollectionRef, selectedItem)
                // const itemDataRequest = await getDocFromCache(docRef)
                // if(itemDataRequest.data()){
                //     setItemData(itemDataRequest.data())
                // } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                // }
            }
        }
        getItem()
    }, [selectedItem])

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

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }
 
    return(
        <div className='menuSubcategoryContainer'>
            <div className='menuSubcategoryScreen'>
                <h3>Desserts List</h3>
                <ul>
                    {dessertsData.map(desserts => 
                        <li 
                            key={desserts.id}
                            >
                            <button
                                id={desserts.id}
                                onClick={handleClick}
                                >{desserts.data.screenName}
                            </button>
                        </li>)}
                </ul>
            </div>
        </div>
    )
}

export default DessertsScreen
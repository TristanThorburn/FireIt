import { useState, useEffect } from 'react';
import { dessertsCollectionRef } from '../../../library/firestoreCollections';
import { query, orderBy, doc, getDoc, onSnapshot, getDocFromCache } from 'firebase/firestore';

const DessertsScreen = (props) => {
    const { selectedSeat, setCurrentOrderData } = props
    const [ dessertsData, setDessertsData ] = useState([]);
    const [ selectedItem, setSelectedItem ] = useState('');
    const [ itemData, setItemData ] = useState('');

    // Initial Data Population
    useEffect(() => {
        const getMenuCategory = async () => {
            const q = query(dessertsCollectionRef, orderBy('name'));
            // const querySnapShot = await getDocsFromCache(q)
            // if(querySnapShot){
            //     const menuItemList = querySnapShot.docs.map(doc => ({
            //         id:doc.id,
            //         data:doc.data()
            //     }))
            //     setDessertsData(menuItemList)
            // } else {
            //     const severData = await getDocs(q)
            //     const menuItemList = severData.docs.map(doc => ({
            //         id:doc.id,
            //         data:doc.data()
            //     }))
            //     setDessertsData(menuItemList)
            // }
            const unsubscribe = onSnapshot(q, snapshot => {
                setDessertsData(snapshot.docs.map(doc => ({
                    id: doc.id,
                    data: doc.data()
                })))
            })
            return unsubscribe
        }
        getMenuCategory()
    },[])

    // GetDoc for selected item
    useEffect(() => {
        const getItem = async () => {
            if(selectedItem !== ''){
                const docRef = doc(dessertsCollectionRef, selectedItem)
                const itemDataRequest = await getDocFromCache(docRef)
                if(itemDataRequest.data()){
                    setItemData(itemDataRequest.data())
                } else {
                    getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
                }
            }
        }
        getItem()
    }, [selectedItem])

    // add selected item to display as pending order on check
    useEffect(() => {
        if(selectedItem !== ''){
            const time = Date.now().toString()
            if(itemData.name && selectedSeat === ''){
                const orderToAdd = {seat: '1', name:itemData.screenName, cost:itemData.price, time:time}
                setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
            if(itemData.name && selectedSeat !== ''){
                const orderToAdd = {seat:selectedSeat, name:itemData.screenName, cost:itemData.price, time:time}
                setCurrentOrderData(orderToAdd)
                setSelectedItem('')
                setItemData('')
            }
        }
    }, [itemData, setCurrentOrderData, selectedItem, selectedSeat])

    const handleClick =(e) => {
        setSelectedItem(e.target.id)
    }

    const handleGoApps = () => {
        props.setMenuCategory('apps')
    }

    const handleGoMain = () => {
        props.setMenuCategory('mains')
    }

    const handleGoNonAlch = () => {
        props.setMenuCategory('non alch')
    }

    const handleGoBeer = () => {
        props.setMenuCategory('beer')
    }

    const handleGoCidSpr = () => {
        props.setMenuCategory('cider spritz')
    }

    const handleGoMixed = () => {
        props.setMenuCategory('mixed')
    }

    const handleGoLiquor = () => {
        props.setMenuCategory('liquors')
    }

    const handleGoWine = () => {
        props.setMenuCategory('wines')
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
            <footer className='menuCategoryNav'>
                <ul>
                    <li><button onClick={handleGoApps}>apps</button></li>
                    <li><button onClick={handleGoMain}>mains</button></li>
                    <li><button onClick={handleGoNonAlch}>non alch</button></li>
                    <li><button onClick={handleGoBeer}>beer</button></li>
                    <li><button onClick={handleGoCidSpr}>cider/seltz</button></li>
                    <li><button onClick={handleGoLiquor}>liquor</button></li>
                    <li><button onClick={handleGoMixed}>mixed drinks</button></li>
                    <li><button onClick={handleGoWine}>wine</button></li>
                </ul>
            </footer>
        </div>
    )
}

export default DessertsScreen
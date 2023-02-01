import { 
    appCollectionRef, 
    dessertsCollectionRef, 
    mainsCollectionRef, 
    coldDrinksCollectionRef, 
    hotDrinksCollectionRef 
    } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { addDoc, doc, updateDoc, deleteDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';
import PopUpData from './PopUpData';

const MenuItemForm = (props) => {
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ itemData, setItemData ] = useState();
    const [ itemType, setItemType ] = useState('');
    const [ taxGroup, setTaxGroup ] = useState('');
    const [ printerRoute, setPrinterRoute ] = useState('');
    const [ popUps, setPopUps ] = useState({popUpsList:[]});
    const [ popUpsAction, setPopUpsAction ] = useState('');
    const nameRef = useRef('');
    const itemStockRef = useRef('');
    const onScreenNameRef = useRef('');
    const chitNameRef = useRef('');
    const itemPriceRef = useRef('');
    
    useEffect(() => {
        if(props.id === ''){
            setItemData({})

            if(props.activeTab === 'apps'){
                setCollectionRef(appCollectionRef)
            }
            if(props.activeTab === 'mains'){
                setCollectionRef(mainsCollectionRef)
            }
            if(props.activeTab === 'desserts'){
                setCollectionRef(dessertsCollectionRef)
            }if(props.activeTab === 'cold drinks'){
                setCollectionRef(coldDrinksCollectionRef)
            }if(props.activeTab === 'hot drinks'){
                setCollectionRef(hotDrinksCollectionRef)
            }
        }
        if(props.id !== ''){
            const docRef = doc(db, ...props.docQuery, props.id)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    },[props.id, props.docQuery, props.activeTab])

    const handleTest = (e) => {
        e.preventDefault();
        console.log(popUps.popUpsList)
    }

    const handleAddItem = (e) => {
        e.preventDefault()

        if(props.newItem === true && nameRef.current.value !== ''){
            addDoc(collectionRef, {
                name:nameRef.current.value,
                itemStock:itemStockRef.current.value,
                screenName:onScreenNameRef.current.value,
                chitName:chitNameRef.current.value,
                price:itemPriceRef.current.value,
                type:itemType,
                taxGroup:taxGroup,
                printerRoute:printerRoute,
                popUps:popUps.popUpsList,
            });
            props.setNewItem(false);
            setPopUps({popUpsList:[]})
            Array.from(document.querySelectorAll('input')).forEach(
                input => (input.value = ''))
            Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
                    input => (input.checked = false))
            Array.from(document.querySelectorAll('input[type=radio]')).forEach(
                input => (input.checked = false))
        }
    }

    const handleUpdateItem = (e) => {
        e.preventDefault()
        const docRef = doc(db, ...props.docQuery, props.id)

        if(props.id !== '' && nameRef.current.value !== ''){
            updateDoc(docRef, {
                name:nameRef.current.value
            })
        }
        if(props.id !== '' && itemStockRef.current.value !== ''){
            updateDoc(docRef, {
                itemStock:itemStockRef.current.value
            })
        }
        if(props.id !== '' && onScreenNameRef.current.value !== ''){
            updateDoc(docRef, {
                screenName:onScreenNameRef.current.value
            })
        }
        if(props.id !== '' && chitNameRef.current.value !==''){
            updateDoc(docRef, {
                chitName:chitNameRef.current.value
            })
        }
        if(props.id !== '' && itemPriceRef.current.value !== ''){
            updateDoc(docRef, {
                price:itemPriceRef.current.value
            })
        }
        if(props.id !== '' && itemType !== ''){
            updateDoc(docRef, {
                type:itemType
            })
        }
        if(props.id !== '' && taxGroup !== ''){
            updateDoc(docRef, {
                taxGroup:taxGroup
            })
        }
        if(props.id !== '' && printerRoute !== ''){
            updateDoc(docRef, {
                printerRoute:printerRoute
            })
        }
        if(props.id !== '' && popUps.popUpsList.length > 0 && popUpsAction === 'add'){
            updateDoc(docRef, {
                popUps:arrayUnion(...popUps.popUpsList)
            });
            setPopUpsAction('')
        }
        if(props.id !== '' && popUps.popUpsList.length > 0 && popUpsAction === 'remove'){
            updateDoc(docRef, {
                popUps:arrayRemove(...popUps.popUpsList)
            });
            setPopUpsAction('')
        }
        props.setSelectedItem('');
        setPopUps({popUpsList:[]});
        Array.from(document.querySelectorAll('input')).forEach(
            input => (input.value = ''))
        Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
                input => (input.checked = false))
        Array.from(document.querySelectorAll('input[type=radio]')).forEach(
            input => (input.checked = false))
        }

    const handleDelete = () => {
        const docRef = doc(db, ...props.docQuery, props.id)
        
        if(props.id !== ''){
            deleteDoc(docRef)
            setItemData('')
        }
    }

    const handleItemType = (e) => {
        setItemType(e.target.value)
    }

    const handlePrinterRoute = (e) => {
        setPrinterRoute(e.target.value)
    }

    const handleTaxGroup = (e) => {
        setTaxGroup(e.target.value)
    }

    const handleAddPopUp = (e) => {
        e.preventDefault();
        setPopUpsAction('add');
    }

    const handleRemovePopUp = (e) => {
        e.preventDefault();
        setPopUpsAction('remove')
    }

    return(
        <form className='menuItemForm'>
            {/* Item Name */}
            <div>
                <label htmlFor='itemName'>Item Name:</label>
                {props.id !== ''
                    ? <input 
                        id='itemName'
                        name='itemName'
                        type='text'
                        ref={nameRef}
                        placeholder={itemData?.name}
                        />
                    : <input
                        id='itemName'
                        name='itemName'
                        type='text'
                        ref={nameRef}
                        />
                }
            </div>
            {/* Item Count */}
            <div>
                <label htmlFor='itemStock'>Item Stock:</label>
                {props.id !== ''
                    ? <input 
                        id='itemStock'
                        name='itemStock'
                        type='number'
                        ref={itemStockRef}
                        placeholder={itemData?.itemStock}
                        />
                    : <input 
                        id='price'
                        name='price'
                        type='number'
                        ref={itemStockRef}
                        />
                }
            </div>
            {/* On Screen Name */}
            <div>
                <label htmlFor='screenName'>On Screen Name:</label>
                {props.id !== ''
                    ? <input 
                        id='screenName'
                        name='screenName'
                        type='text'
                        ref={onScreenNameRef}
                        placeholder={itemData?.screenName}
                        />
                    : <input 
                        id='screenName'
                        name='screenName'
                        type='text'
                        ref={onScreenNameRef}
                        />
                }
            </div>
            {/* ChitName */}
            <div>
                <label htmlFor='chitName'>Chit Name:</label>
                {props.id !== ''
                    ? <input 
                        id='chitName'
                        name='chitName'
                        type='text'
                        ref={chitNameRef}
                        placeholder={itemData?.chitName}
                        />
                    : <input 
                        id='chitName'
                        name='chitName'
                        type='text'
                        ref={chitNameRef}
                        />
                }
            </div>
            {/* Item Price */}
            <div>
                <label htmlFor='price'>Item Price:</label>
                {props.id !== ''
                    ? <input 
                        id='price'
                        name='price'
                        type='number'
                        ref={itemPriceRef}
                        placeholder={itemData?.price}
                        />
                    : <input 
                        id='price'
                        name='price'
                        type='number'
                        ref={itemPriceRef}
                        />
                }
            </div>
            {/* Item Type */}
            <fieldset>
                <legend>Select Item Type</legend>
                {props.id !== '' && itemData.type
                    ? <> Current type: {itemData.type}</>
                    : null
                }
                <div>
                    <label htmlFor='itemType'>Item</label>
                    <input 
                        id='item'
                        type='radio'
                        name='itemType'
                        value='item'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='itemType'>Addon</label>
                    <input 
                        id='addon'
                        type='radio'
                        name='itemType'
                        value='addon'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='itemType'>Modifier</label>
                    <input  
                        id='modifier'
                        type='radio'
                        name='itemType'
                        value='modifier'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='itemType'>Non Item</label>
                    <input  
                        id='nonItem'
                        type='radio'
                        name='itemType'
                        value='non item'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='itemType'>Transformer</label>
                    <input 
                        id='transformer'
                        type='radio'
                        name='itemType'
                        value='transformer'
                        onClick={handleItemType}
                        />
                </div>
            </fieldset>
            {/* Tax Group */}
            <div>
                <label htmlFor='taxGroup'>Tax Group:</label>
                <select 
                    id='taxGroup'
                    name='taxGroup'
                    onChange={handleTaxGroup}
                    >
                    {props.id !== '' && itemData.taxGroup === 'foodTax'
                        ? <option value='' disabled selected>Food Tax</option>
                        : props.id !== '' && itemData.taxGroup === 'alcoholTax'
                            ? <option value='' disabled selected>Alcohol Tax</option>
                            :<option value='' disabled selected>Select Tax Type</option>
                    }
                    <option 
                        value='foodTax'
                        name='taxGroup'
                        >Food Tax
                    </option>
                    <option 
                        value='alcoholTax'
                        name='taxGroup'
                        >Alcohol Tax
                    </option>
                    {/* {props.id !== '' && itemData.taxGroup === 'foodTax'
                        ? <>
                            <option 
                                value='foodTax'
                                name='taxGroup'
                                >Food Tax
                            </option>
                            <option 
                                value='alcoholTax'
                                name='taxGroup'
                                >Alcohol Tax
                            </option>
                          </>
                        :props.id !== '' && itemData.taxGroup === 'alcoholTax'
                            ? <>
                                <option 
                                    value='alcoholTax'
                                    name='taxGroup'
                                    >Alcohol Tax
                                </option>
                                <option 
                                    value='foodTax'
                                    name='taxGroup'
                                    >Food Tax
                                </option>
                              </>
                            : <>
                                <option 
                                    value='foodTax'
                                    name='taxGroup'
                                    >Food Tax
                                </option>
                                <option 
                                    value='alcoholTax'
                                    name='taxGroup'
                                    >Alcohol Tax
                                </option>
                              </>
                    } */}
                </select>
            </div>
            {/* Printer Route */}
            <div>
                <label htmlFor='printerRoute'>Printer Route:</label>
                <select 
                    id='printerRoute'
                    name='printerRoute'
                    onChange={handlePrinterRoute}
                    >
                    {props.id !== '' && itemData.printerRoute === 'noPrint'
                        ?<option value='' disabled selected>NO PRINT</option>
                        :props.id !== '' && itemData.printerRoute === 'bar'
                            ?<option value='' disabled selected>BAR</option>
                            :props.id !== '' && itemData.printerRoute === 'kitchen'
                                ?<option value='' disabled selected>KITCHEN</option>
                                :<option value='' disabled selected>SELECT ROUTE</option>
                    }
                    <option 
                        value='noPrint'
                        name='printerRoute'
                        >NO PRINT
                    </option>
                    <option 
                        value='bar'
                        name='printerRoute'
                        >BAR
                    </option>
                    <option
                        value='kitchen'
                        name='printerRoute'
                        >KITCHEN
                    </option>
                </select>
            </div>
            {/* Pop Up Groups */}
            <fieldset>
                <legend htmlFor='popUpGroup'>Pop Up Group(s):</legend>

                {props.id !== '' && itemData.popUps
                    ? <>Current Pop Ups: {itemData.popUps.join(', ')}</>
                    : null
                }

                <div>
                    <button onClick={handleAddPopUp}>Add</button>
                    <button onClick={handleRemovePopUp}>Remove</button>
                </div>

                {popUpsAction === 'add' || popUpsAction === 'remove'
                    ? <PopUpData popUps={popUps} setPopUps={setPopUps} popUpsAction={popUpsAction}/>
                    : null
                }
            </fieldset>

            {props.newItem === false && props.id === ''
                ? null
                : props.id !== ''
                    ? <button type='submit' onClick={handleUpdateItem}>Update Item</button>
                    : props.newItem === true
                ? <button type='submit' onClick={handleAddItem}>Add Item</button>
                : null
            }
            
            <button onClick={handleDelete}>Delete Item</button>
            <button onClick={handleTest}>Test Button</button>
        </form>
    )
}

export default MenuItemForm;
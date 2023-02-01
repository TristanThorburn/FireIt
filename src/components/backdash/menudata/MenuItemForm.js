import { appCollectionRef, mainsCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { addDoc, doc, updateDoc, deleteDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';

const MenuItemForm = (props) => {
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ itemData, setItemData ] = useState();
    const [ itemType, setItemType ] = useState('');
    const [ taxGroup, setTaxGroup ] = useState('foodTax');
    const [ printerRoute, setPrinterRoute ] = useState('noPrint');
    const [ popUps, setPopUps ] = useState({popUpsList:[]});
    const [ popUpsAction, setPopUpsAction ] = useState('');
    const nameRef = useRef('');
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
        }
        if(props.id !== ''){
            const docRef = doc(db, props.activeTab, props.id)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    },[props.id, props.activeTab])

    const handleTest = (e) => {
        e.preventDefault();
        console.log(popUps.popUpsList)
    }

    const handleAddItem = (e) => {
        e.preventDefault()

        if(props.newItem === true && nameRef.current.value !== ''){
            addDoc(collectionRef, {
                name:nameRef.current.value,
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
        const docRef = doc(db, props.activeTab, props.id)

        if(props.id !== '' && nameRef.current.value !== ''){
            updateDoc(docRef, {
                name:nameRef.current.value
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
        const docRef = doc(db, props.activeTab, props.id)
        
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

    const handlePopUps = (e) => {
        const { value, checked } = e.target;
        const { popUpsList } = popUps;

        if(checked){
            setPopUps({
                popUpsList:[...popUpsList, value],
            })
        } else {
            setPopUps({
                popUpsList:popUpsList.filter((e) => e !== value),
            })
        }
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

            <div>
                <label 
                    htmlFor='screenName'>On Screen Name:</label>
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
            
            <div>
                <label htmlFor='price'>Item Price:</label>
                {props.id !== ''
                    ? <input 
                        id='price'
                        name='price'
                        type='text'
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

            <fieldset>
                <legend>Select Item Type</legend>
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
                        value='nonItem'
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
            
            <div>
                <label htmlFor='taxGroup'>Tax Group:</label>
                <select 
                    id='taxGroup'
                    name='taxGroup'
                    onChange={handleTaxGroup}
                    >
                    {props.id !== '' && itemData.taxGroup === 'foodTax'
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
                    }
                </select>
            </div>

            <div>
                <label htmlFor='printerRoute'>Printer Route:</label>
                <select 
                    id='printerRoute'
                    name='printerRoute'
                    onChange={handlePrinterRoute}
                    >
                    {props.id !== '' && itemData.printerRoute === 'noPrint'
                        ? <>
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
                          </>
                        :props.id !== '' && itemData.printerRoute === 'bar'
                            ? <>
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
                                <option 
                                    value='noPrint'
                                    name='printerRoute'
                                    >NO PRINT
                                </option>
                              </>
                            :props.id !== '' && itemData.printerRoute === 'kitchen'
                                ? <>
                                    <option
                                        value='kitchen'
                                        name='printerRoute'
                                        >KITCHEN
                                    </option>
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
                                  </>
                                : <>
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
                                  </>
                    }
                </select>
            </div>

            <fieldset>
                <legend htmlFor='popUpGroup'>Pop Up Group(s):</legend>
                {<p>{popUpsAction}</p>}
                <div>
                    <input 
                        id='sides'
                        type='checkbox'
                        name='popUpGroup'
                        value='sides'
                        onChange={handlePopUps}
                        />
                    <label htmlFor='sides'>Sides</label>
                </div>

                <div>
                    <input 
                        id='proteins'
                        type='checkbox'
                        name='popUpGroup'
                        value='proteins'
                        onChange={handlePopUps}
                        />
                    <label htmlFor='proteins'>Proteins</label>
                </div>

                <div>
                    <input 
                        id='dressings'
                        type='checkbox'
                        name='popUpGroup'
                        value='dressings'
                        onChange={handlePopUps}
                        />
                    <label htmlFor='dressings'>Dressings</label>
                </div>

                <div>
                    <input 
                        id='foodAddons'
                        type='checkbox'
                        name='popUpGroup'
                        value='foodAddons'
                        onChange={handlePopUps}
                        />
                    <label htmlFor='foodAddons'>Food Addons</label>
                </div>

                <div>
                    <input 
                        id='mixes'
                        type='checkbox'
                        name='popUpGroup'
                        value='mixes'
                        onChange={handlePopUps}
                        />
                    <label htmlFor='mixes'>Mixes</label>
                </div>

                <div>
                    <input 
                        id='barAddons'
                        type='checkbox'
                        name='popUpGroup'
                        value='barAddons'
                        onChange={handlePopUps}
                        />
                    <label htmlFor='barAddons'>Bar Addons</label>
                </div>
                <div>
                    <button onClick={handleAddPopUp}>Add</button>
                    <button onClick={handleRemovePopUp}>Remove</button>
                </div>
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
import { 
    appCollectionRef, 
    dessertsCollectionRef, 
    mainsCollectionRef, 
    coldDrinksCollectionRef, 
    hotDrinksCollectionRef, 
    foodAddsCollectionRef,
    drinkAddsCollectionRef,
    beerBottleCollectionRef,
    beerCanCollectionRef,
    beerDraftCollectionRef,
    redWineCollectionRef,
    whiteWineCollectionRef,
    bubblyCollectionRef,
    cocktailCollectionRef,
    shotsCollectionRef,
    ginCollectionRef,
    rumCollectionRef,
    tequilaCollectionRef,
    vodkaCollectionRef,
    whiskeyCollectionRef,
    ciderCollectionRef,
    hardSeltzerCollectionRef,
    menuModsCollectionRef,
    } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { addDoc, doc, updateDoc, deleteDoc, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';
import PopUpData from './PopUpData';

const MenuItemForm = (props) => {
    const [ collectionRef, setCollectionRef ] = useState('');
    const [ itemData, setItemData ] = useState('');
    const [ itemType, setItemType ] = useState('');
    const [ popUps, setPopUps ] = useState({popUpsList:[]});
    const [ popUpsAction, setPopUpsAction ] = useState('');
    const nameRef = useRef('');
    const itemStockRef = useRef('');
    const onScreenNameRef = useRef('');
    const chitNameRef = useRef('');
    const itemPriceRef = useRef('');
    const taxOptions = [
        {value: '', label: '--Choose an option--'},
        {value: 'Food Tax', label: 'Food Tax'},
        {value: 'Alcohol Tax', label: 'Alcohol Tax'},
      ];
    const printOptions = [
        {value: '', label: '--Choose an option--'},
        {value: 'No Print', label: 'No Print'},
        {value: 'Bar', label: 'Bar'},
        {value: 'Kitchen', label: 'Kitchen'},
        ];
    const [ taxGroup, setTaxGroup ] = useState(taxOptions[0].value);
    const [ printerRoute, setPrinterRoute ] = useState(printOptions[0].value);
    const [ cloneItem, setCloneItem ] = useState({})

// DETERMINE WHICH COLLECTION REF TO USE FOR DATA && What item data to display when  item selected
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
            }
            if(props.activeTab === 'cold drinks'){
                setCollectionRef(coldDrinksCollectionRef)
            }
            if(props.activeTab === 'hot drinks'){
                setCollectionRef(hotDrinksCollectionRef)
            }
            if(props.activeTab === 'food addons'){
                setCollectionRef(foodAddsCollectionRef)
            }
            if(props.activeTab === 'drink addons'){
                setCollectionRef(drinkAddsCollectionRef)
            }
            if(props.activeTab === 'beer bottle'){
                setCollectionRef(beerBottleCollectionRef)
            }
            if(props.activeTab === 'beer can'){
                setCollectionRef(beerCanCollectionRef)
            }
            if(props.activeTab === 'beer draft'){
                setCollectionRef(beerDraftCollectionRef)
            }
            if(props.activeTab === 'red wine'){
                setCollectionRef(redWineCollectionRef)
            }
            if(props.activeTab === 'white wine'){
                setCollectionRef(whiteWineCollectionRef)
            }
            if(props.activeTab === 'bubbly'){
                setCollectionRef(bubblyCollectionRef)
            }
            if(props.activeTab === 'cocktails'){
                setCollectionRef(cocktailCollectionRef)
            }
            if(props.activeTab === 'shots'){
                setCollectionRef(shotsCollectionRef)
            }
            if(props.activeTab === 'gin'){
                setCollectionRef(ginCollectionRef)
            }
            if(props.activeTab === 'rum'){
                setCollectionRef(rumCollectionRef)
            }
            if(props.activeTab === 'tequila'){
                setCollectionRef(tequilaCollectionRef)
            }
            if(props.activeTab === 'vodka'){
                setCollectionRef(vodkaCollectionRef)
            }
            if(props.activeTab === 'whiskey'){
                setCollectionRef(whiskeyCollectionRef)
            }
            if(props.activeTab === 'cider'){
                setCollectionRef(ciderCollectionRef)
            }
            if(props.activeTab === 'hard seltzer'){
                setCollectionRef(hardSeltzerCollectionRef)
            }
            if(props.activeTab === 'menu mods'){
                setCollectionRef(menuModsCollectionRef)
            }
        }
        if(props.id !== ''){
            const docRef = doc(db, ...props.docQuery, props.id)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    },[props.id, props.docQuery, props.activeTab])
// RESET FORMS
    useEffect(() => {
        // Array.from(document.querySelectorAll('input')).forEach(
        //     input => (input.value = ''))
        // Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
        //         input => (input.checked = false))
        // Array.from(document.querySelectorAll('input[type=radio]')).forEach(
        //     input => (input.checked = false))
        document.getElementById('menuItemForm').reset();
    }, [props.id, props.newItem])
// ADD CLONED ITEM TO FIRESTORE
    useEffect(() => {
        if(cloneItem.name !== undefined && cloneItem.name !== ''){
            addDoc(collectionRef, {
                name:cloneItem.name,
                itemStock:cloneItem.itemStock,
                screenName:cloneItem.screenName,
                chitName:cloneItem.chitName,
                price:cloneItem.price,
                type:cloneItem.type,
                taxGroup:cloneItem.taxGroup,
                printerRoute:cloneItem.printerRoute,
                popUps:cloneItem.popUps,
            })
        }
    }, [collectionRef, cloneItem])

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
            setPopUpsAction('')
            setTaxGroup('')
            setPrinterRoute('')
            // Array.from(document.querySelectorAll('input')).forEach(
            //     input => (input.value = ''))
            // Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
            //         input => (input.checked = false))
            // Array.from(document.querySelectorAll('input[type=radio]')).forEach(
            //     input => (input.checked = false))
            document.getElementById('menuItemForm').reset();
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
            setTaxGroup('');
        }
        if(props.id !== '' && printerRoute !== ''){
            updateDoc(docRef, {
                printerRoute:printerRoute
            })
            setPrinterRoute('');
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
        setPopUpsAction('')
        // Array.from(document.querySelectorAll('input')).forEach(
        //     input => (input.value = ''))
        // Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
        //         input => (input.checked = false))
        // Array.from(document.querySelectorAll('input[type=radio]')).forEach(
        //     input => (input.checked = false))
        document.getElementById('menuItemForm').reset(); 
    }

    const handleDelete = (e) => {
        e.preventDefault()
        const docRef = doc(db, ...props.docQuery, props.id)
        
        if(props.id !== ''){
            deleteDoc(docRef)
            setItemData('')
        }
    }

    const handleClone = async (e) => {
        e.preventDefault()
        if(props.id !==''){
            try {
                const docRef = doc(db, ...props.docQuery, props.id)
                const itemToClone = await getDoc(docRef)
                const cloneData = itemToClone.data()
                if(itemToClone.exists()){
                    setCloneItem({
                        name : cloneData.name + 'CLONE', 
                            itemStock : cloneData.itemStock,
                            screenName : cloneData.screenName,
                            chitName : cloneData.chitName,
                            price : cloneData.price,
                            type : cloneData.type,
                            taxGroup : cloneData.taxGroup,
                            printerRoute : cloneData.printerRoute,
                            popUps : cloneData.popUps,
                    })
                }
            } catch (error) {
                console.log(error)
            }
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
        <form className='menuItemForm' id='menuItemForm'>
            {props.id !== '' || props.newItem === true
                ? <>
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
                        {props.id !== '' && itemData?.type
                            ? <> Current type: {itemData?.type}</>
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
                        <p>{itemData?.taxGroup}</p>
                        <select
                            id='taxGroup'
                            name='taxGroup'
                            value={taxGroup}
                            onChange={handleTaxGroup}
                            >
                            {taxOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                {/* Printer Route */}
                    <div>
                        <label htmlFor='printerRoute'>Printer Route:</label>
                        <p>{itemData?.printerRoute}</p>
                        <select
                            id='printerRoute'
                            name='printerRoute'
                            value={printerRoute}
                            onChange={handlePrinterRoute}
                            >
                            {printOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>
                {/* Pop Up Groups */}
                    <fieldset>
                        <legend htmlFor='popUpGroup'>Pop Up Group(s):</legend>

                        {props.id !== '' && itemData?.popUps
                            ? <>Current Pop Ups: {itemData?.popUps.join(', ')}</>
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
                </>
                : <h3>Select an item, or create a new item</h3>
            }

            {props.newItem === false && props.id === ''
                ? null
                : props.id !== ''
                    ? <div className='updateButtons'>
                        <button type='submit' onClick={handleUpdateItem}>Update Item</button>
                        <button onClick={handleClone}>Clone Item</button>
                        <button onClick={handleDelete}>Delete Item</button>
                    </div>
                    : props.newItem
                ? <button type='submit' onClick={handleAddItem}>Add Item</button>
                : null
            }
        </form>
    )
}

export default MenuItemForm;
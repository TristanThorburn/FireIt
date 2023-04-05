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
    const { activeTab, id, docQuery, newItem, setNewItem, setSelectedItem } = props
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
        if(id === ''){
            setItemData({})

            if(activeTab === 'apps'){
                setCollectionRef(appCollectionRef)
            }
            if(activeTab === 'mains'){
                setCollectionRef(mainsCollectionRef)
            }
            if(activeTab === 'desserts'){
                setCollectionRef(dessertsCollectionRef)
            }
            if(activeTab === 'cold drinks'){
                setCollectionRef(coldDrinksCollectionRef)
            }
            if(activeTab === 'hot drinks'){
                setCollectionRef(hotDrinksCollectionRef)
            }
            if(activeTab === 'food addons'){
                setCollectionRef(foodAddsCollectionRef)
            }
            if(activeTab === 'drink addons'){
                setCollectionRef(drinkAddsCollectionRef)
            }
            if(activeTab === 'beer bottle'){
                setCollectionRef(beerBottleCollectionRef)
            }
            if(activeTab === 'beer can'){
                setCollectionRef(beerCanCollectionRef)
            }
            if(activeTab === 'beer draft'){
                setCollectionRef(beerDraftCollectionRef)
            }
            if(activeTab === 'red wine'){
                setCollectionRef(redWineCollectionRef)
            }
            if(activeTab === 'white wine'){
                setCollectionRef(whiteWineCollectionRef)
            }
            if(activeTab === 'bubbly'){
                setCollectionRef(bubblyCollectionRef)
            }
            if(activeTab === 'cocktails'){
                setCollectionRef(cocktailCollectionRef)
            }
            if(activeTab === 'shots'){
                setCollectionRef(shotsCollectionRef)
            }
            if(activeTab === 'gin'){
                setCollectionRef(ginCollectionRef)
            }
            if(activeTab === 'rum'){
                setCollectionRef(rumCollectionRef)
            }
            if(activeTab === 'tequila'){
                setCollectionRef(tequilaCollectionRef)
            }
            if(activeTab === 'vodka'){
                setCollectionRef(vodkaCollectionRef)
            }
            if(activeTab === 'whiskey'){
                setCollectionRef(whiskeyCollectionRef)
            }
            if(activeTab === 'cider'){
                setCollectionRef(ciderCollectionRef)
            }
            if(activeTab === 'hard seltzer'){
                setCollectionRef(hardSeltzerCollectionRef)
            }
            if(activeTab === 'menu mods'){
                setCollectionRef(menuModsCollectionRef)
            }
        }
        if(id !== ''){
            const docRef = doc(db, ...docQuery, id)
            getDoc(docRef).then((doc) => setItemData(doc.data())).catch(error => console.log(error))
        }
    },[id, docQuery, activeTab])

// RESET FORMS
    useEffect(() => {
        // Array.from(document.querySelectorAll('input')).forEach(
        //     input => (input.value = ''))
        // Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
        //         input => (input.checked = false))
        // Array.from(document.querySelectorAll('input[type=radio]')).forEach(
        //     input => (input.checked = false))
        document.getElementById('menuItemForm').reset();
    }, [id, newItem])
    
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
            setSelectedItem('');
            setCloneItem('')
            document.getElementById('menuItemForm').reset(); 
        }
    }, [collectionRef, cloneItem, setSelectedItem])

    const handleAddItem = (e) => {
        e.preventDefault()
        // Ensure there is a screen Name
        if(newItem === true 
            && nameRef.current.value !== '' 
            && onScreenNameRef.current.value === ''){
            addDoc(collectionRef, {
                name:nameRef.current.value,
                itemStock:itemStockRef.current.value,
                screenName:nameRef.current.value,
                chitName:chitNameRef.current.value,
                price:itemPriceRef.current.value,
                type:itemType,
                taxGroup:taxGroup,
                printerRoute:printerRoute,
                popUps:popUps.popUpsList,
            });
        }
        // Original add item code
        if(newItem === true 
            && nameRef.current.value !== ''
            && onScreenNameRef.current.value !== ''){
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
        }
        setNewItem(false);
        setPopUps({popUpsList:[]})
        setPopUpsAction('')
        setTaxGroup('')
        setPrinterRoute('')
        document.getElementById('menuItemForm').reset();
    }

    const handleUpdateItem = (e) => {
        e.preventDefault()
        const docRef = doc(db, ...docQuery, id)

        if(id !== '' && nameRef.current.value !== ''){
            updateDoc(docRef, {
                name:nameRef.current.value
            })
        }
        if(id !== '' && itemStockRef.current.value !== ''){
            updateDoc(docRef, {
                itemStock:itemStockRef.current.value
            })
        }
        if(id !== '' && onScreenNameRef.current.value !== ''){
            updateDoc(docRef, {
                screenName:onScreenNameRef.current.value
            })
        }
        if(id !== '' && chitNameRef.current.value !==''){
            updateDoc(docRef, {
                chitName:chitNameRef.current.value
            })
        }
        if(id !== '' && itemPriceRef.current.value !== ''){
            updateDoc(docRef, {
                price:itemPriceRef.current.value
            })
        }
        if(id !== '' && itemType !== ''){
            updateDoc(docRef, {
                type:itemType
            })
        }
        if(id !== '' && taxGroup !== ''){
            updateDoc(docRef, {
                taxGroup:taxGroup
            })
            setTaxGroup('');
        }
        if(id !== '' && printerRoute !== ''){
            updateDoc(docRef, {
                printerRoute:printerRoute
            })
            setPrinterRoute('');
        }
        if(id !== '' && popUps.popUpsList.length > 0 && popUpsAction === 'add'){
            updateDoc(docRef, {
                popUps:arrayUnion(...popUps.popUpsList)
            });
            setPopUpsAction('')
        }
        if(id !== '' && popUps.popUpsList.length > 0 && popUpsAction === 'remove'){
            updateDoc(docRef, {
                popUps:arrayRemove(...popUps.popUpsList)
            });
            setPopUpsAction('')
        }
        setSelectedItem('');
        setPopUps({popUpsList:[]});
        setPopUpsAction('')
        document.getElementById('menuItemForm').reset(); 
    }

    const handleDelete = (e) => {
        e.preventDefault()
        const docRef = doc(db, ...docQuery, id)
        
        if(id !== ''){
            deleteDoc(docRef)
            setItemData('')
        }
    }

    const handleClone = async (e) => {
        e.preventDefault()
        if(id !==''){
            try {
                const docRef = doc(db, ...docQuery, id)
                const itemToClone = await getDoc(docRef)
                const cloneData = itemToClone.data()
                if(itemToClone.exists()){
                    setCloneItem({
                        name : cloneData.name + '-CLONE', 
                        itemStock : cloneData.itemStock,
                        screenName :  cloneData.name + '-CLONE',
                        chitName : '',
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

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <form className='menuItemForm' id='menuItemForm' onSubmit={handleSubmit}>
            {id !== '' || newItem === true
                ? <>
                {/* Item Name */}
                    <div>
                        <label htmlFor='itemName'>Item Name:</label>
                        {id !== ''
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
                        {id !== ''
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
                        {id !== ''
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
                        {id !== ''
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
                        {id !== ''
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
                    <div>
                    {/* Tax Group */}
                        <div className='taxGroup'>
                            <label 
                                htmlFor='taxGroup'
                                >
                                {itemData?.taxGroup 
                                    ? `Current Tax: ${itemData?.taxGroup}`
                                    : 'Tax Group?'
                                }
                            </label>
                            <br />
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
                        <div className='printerRoute'>
                            <label 
                                htmlFor='printerRoute'
                                >
                                {itemData?.printerRoute 
                                    ? `Current Printer Route: ${itemData?.printerRoute}`
                                    : 'Printer Route?'
                                }
                            </label>
                            <br />
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
                    </div>
                {/* Item Type */}
                    <fieldset className='itemTypes'>
                        <legend>Select Item Type</legend>
                        {id !== '' && itemData?.type
                            ? <h4> Current type: {itemData?.type}</h4>
                            : null
                        }
                        <div>
                            <input 
                                id='item'
                                type='radio'
                                name='itemType'
                                value='item'
                                onClick={handleItemType}
                                />
                            <label htmlFor='itemType'> Item</label>
                        </div>

                        <div>
                            <input 
                                id='addon'
                                type='radio'
                                name='itemType'
                                value='addon'
                                onClick={handleItemType}
                                />
                            <label htmlFor='itemType'> Addon</label>
                        </div>

                        <div>
                            <input  
                                id='modifier'
                                type='radio'
                                name='itemType'
                                value='modifier'
                                onClick={handleItemType}
                                />
                            <label htmlFor='itemType'> Modifier</label>
                        </div>

                        <div>
                            <input  
                                id='nonItem'
                                type='radio'
                                name='itemType'
                                value='non item'
                                onClick={handleItemType}
                                />
                            <label htmlFor='itemType'> Non Item</label>
                        </div>

                        <div>
                            <input 
                                id='transformer'
                                type='radio'
                                name='itemType'
                                value='transformer'
                                onClick={handleItemType}
                                />
                            <label htmlFor='itemType'> Transformer</label>
                        </div>
                    </fieldset>
                {/* Pop Up Groups */}
                    <fieldset className='itemPopUps'>
                        <legend htmlFor='popUpGroup'>Pop Up Group(s):</legend>

                        {id !== '' && itemData?.popUps
                            ? <h4>Current Pop Ups:
                                <br />
                                 {itemData?.popUps.join(', ')}
                            </h4>
                            : null
                        }

                        <div className='popUpButtonsContainer'>
                            <button
                                className='newItemButton'
                                onClick={handleAddPopUp}
                                >Add
                            </button>
                            <button
                                className='newItemButton deleteItemButton'
                                onClick={handleRemovePopUp}
                                >Remove
                            </button>
                        </div>

                        {popUpsAction === 'add' || popUpsAction === 'remove'
                            ? <PopUpData popUps={popUps} setPopUps={setPopUps} popUpsAction={popUpsAction}/>
                            : null
                        }
                    </fieldset>
                </>
                : <h3>Select an item, or create a new item</h3>
            }

            {newItem === false && id === ''
                ? null
                : id !== ''
                    ? <div className='updateButtons'>
                        <button
                            type='submit'
                            className='newItemButton'
                            onClick={handleUpdateItem}
                            >Update Item
                        </button>
                        <button
                            className='newItemButton'
                            onClick={handleClone}
                            >Clone Item
                        </button>
                        <button
                            className='newItemButton deleteItemButton'
                            onClick={handleDelete}
                            >Delete Item
                        </button>
                    </div>
                    : newItem
                ? <button
                    type='submit'
                    className='newItemButton'
                    onClick={handleAddItem}>Add Item</button>
                : null
            }
        </form>
    )
}

export default MenuItemForm;
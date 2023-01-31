import { appCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { addDoc, doc, updateDoc, deleteDoc, getDoc } from 'firebase/firestore';
import { useRef, useEffect, useState } from 'react';

const MenuItemForm = (props) => {
    const nameRef = useRef('');
    const onScreenNameRef = useRef('');
    const chitNameRef = useRef('');
    const itemPriceRef = useRef('');
    const [ appData, setAppData ] = useState();
    const [ itemType, setItemType ] = useState('');
    const [ printerRoute, setPrinterRoute ] = useState('noPrint');
    const [ taxGroup, setTaxGroup ] = useState('foodTax');
    const [ popUps, setPopUps ] = useState({popUpsList:[]});
    
    useEffect(() => {
        if(props.id === ''){
            setAppData({})
        }
        if(props.id !== ''){
            const docRef = doc(db, 'apps', props.id)
            getDoc(docRef).then((doc) => setAppData(doc.data())).catch(error => console.log(error))
        }
    },[props.id])

    const handleUpdate = (e) => {
        e.preventDefault()
        if(props.newItem === true && nameRef.current.value !== ''){
            addDoc(appCollectionRef, {
                name:nameRef.current.value,
                screenName:onScreenNameRef.current.value,
                chitName:chitNameRef.current.value,
                price:itemPriceRef.current.value,
                type:itemType,
                taxGroup:taxGroup,
                printerRoute:printerRoute,
                popUps:popUps,
            })
            props.setNewItem(false);
            setPopUps({popUpsList:[]})
            Array.from(document.querySelectorAll('input')).forEach(
                input => (input.value = ''))
            Array.from(document.querySelectorAll('input[type=checkbox]')).forEach(
                    input => (input.checked = false))
            Array.from(document.querySelectorAll('input[type=radio]')).forEach(
                input => (input.checked = false))
        }
        if(props.id !== '' && nameRef.current.value !== ''){
            const docRef = doc(db, 'apps', props.id)
            
            updateDoc(docRef, {
                name:nameRef.current.value
            })
        }
    }

    const handleDelete = () => {
        const docRef = doc(db, 'apps', props.id)
        
        if(props.id !== ''){
            deleteDoc(docRef)
            setAppData('')
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

    const testPopState = () => {
        console.log(popUps)
    }

    return(
        <form className='menuItemForm' onSubmit={handleUpdate}>

            <div>
                <label htmlFor='itemName'>Item Name:</label>
                {props.id
                    ? <input 
                        id='itemName'
                        type='text'
                        ref={nameRef}
                        placeholder={appData.name}
                        />
                    : <input
                        id='itemName' 
                        type='text'
                        ref={nameRef}
                        />
                }
            </div>

            <div>
                <label 
                    htmlFor='screenName'>On Screen Name:</label>
                <input 
                    id='screenName'
                    type='text'
                    ref={onScreenNameRef}
                    />
            </div>

            <div>
                <label htmlFor='chitName'>Chit Name:</label>
                <input 
                    id='chitName'
                    type='text'
                    ref={chitNameRef}
                    />
            </div>
            
            <div>
                <label htmlFor='price'>Item Price:</label>
                <input 
                    id='price'
                    type='number'
                    ref={itemPriceRef}
                    />
            </div>           

            <fieldset>
                <legend>Select Item Type</legend>
                <div>
                    <label htmlFor='item'>Item</label>
                    <input 
                        id='item'
                        type='radio'
                        name='type'
                        value='item'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='addon'>Addon</label>
                    <input 
                        id='addon'
                        type='radio'
                        name='type'
                        value='addon'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='modifier'>Modifier</label>
                    <input  
                        id='modifier'
                        type='radio'
                        name='type'
                        value='modifier'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='nonItem'>Non Item</label>
                    <input  
                        id='nonItem'
                        type='radio'
                        name='type'
                        value='nonItem'
                        onClick={handleItemType}
                        />
                </div>

                <div>
                    <label htmlFor='transformer'>Transformer</label>
                    <input 
                        id='transformer'
                        type='radio'
                        name='type'
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
                </select>
            </div>

            <div>
                <label htmlFor='printerRoute'>Printer Route:</label>
                <select 
                    id='printerRoute'
                    name='printerRoute'
                    onChange={handlePrinterRoute}
                    >
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

            <fieldset>
                <legend htmlFor='popUpGroup'>Pop Up Group(s):</legend>

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
            </fieldset>

            {props.newItem
                ? <button type='submit'>Add Item</button>
                : <button type='submit'>Update Item</button>
            }
            
            <button onClick={handleDelete}>Delete Item</button>
            <button onClick={testPopState}>TestPopUps</button>
        </form>
    )
}

export default MenuItemForm;
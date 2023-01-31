import { appCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { useRef } from 'react';

const MenuItemForm = (props) => {
    const nameRef = useRef('')

    // useEffect(() => {
    //     const docRef = (db, 'apps', props.id);
        
    //     try{
    //         const docSnap = await getDoc(docRef)
    //         if(docSnap.exists()){
    //             console.log(docSnap.data())
    //         } else {
    //             console.log('no doc')
    //         }
    //     } catch(error) {
    //         console.log(error)
    //     }
    // },[props.id])

    const handleUpdate = (e) => {
        e.preventDefault()
        if(props.newItem === true && nameRef.current.value !== ''){
            addDoc(appCollectionRef, {
                name:nameRef.current.value
            })
            props.setNewItem(false);
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
        }
    }

    return(
        <form className='menuItemForm' onSubmit={handleUpdate}>

            <div>
                <label htmlFor='name'>Item Name:</label>
                {props.id
                    ? <input type='text' id='name' ref={nameRef} placeholder='placeholder'/>
                    : <input type='text' id='name' ref={nameRef}/>
                }
                
            </div>

            <div>
                <label htmlFor='screenName'>On Screen Name:</label>
                <input type='text' id='screenName'/>
            </div>

            <div>
                <label htmlFor='chitName'>Chit Name:</label>
                <input type='text' id='chitName'/>
            </div>
            
            <div>
                <label htmlFor='price'>Item Price:</label>
                <input type='number' id='price'/>
            </div>           

            <fieldset><legend>Select the Type of Menu Entry</legend>
                <div>
                    <label htmlFor='item'>Item</label>
                    <input type='radio' name='type' id='item' value='item'/>
                </div>

                <div>
                    <label htmlFor='addon'>Addon</label>
                    <input type='radio' name='type' id='addon' value='addon'/>
                </div>

                <div>
                    <label htmlFor='modifier'>Modifier</label>
                    <input type='radio' name='type' id='modifier' value='modifier'/>
                </div>

                <div>
                    <label htmlFor='nonItem'>Non Item</label>
                    <input type='radio' name='type' id='nonItem' value='nonItem'/>
                </div>

                <div>
                    <label htmlFor='transformer'>Transformer</label>
                    <input type='radio' name='type' id='transformer' value='transformer'/>
                </div>
            </fieldset>
            
            <div>
                <label htmlFor='taxGroup'>Tax Group:</label>
                <select name='taxGroup' id='taxGroup'>
                    <option value='foodTax'>Food Tax</option>
                    <option value='alcoholTax'>Alcohol Tax</option>
                </select>
            </div>

            <div>
                <label htmlFor='printerRoute'>Printer Route:</label>
                <select name='printerRoute' id='printerRoute'>
                    <option value='bar'>BAR</option>
                    <option value='kitchen'>KITCHEN</option>
                    <option value='null'>NULL</option>
                </select>
            </div>

            <div>
                <label htmlFor='popUpGroup'>Pop Up Group:</label>
                <select name='popUpGroup' id='popUpGroup'>
                    <option value='sides'>sides</option>
                    <option value='mixes'>mixes</option>
                    <option value='dressings'>dressings</option>
                </select>
            </div>
            {props.newItem
                ? <button type='submit'>Add Item</button>
                : <button type='submit'>Update Item</button>
            }
            <button onClick={handleDelete}>Delete Item</button>
        </form>
    )
}

export default MenuItemForm;
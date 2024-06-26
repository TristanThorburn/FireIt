import { useState, useRef, useEffect } from 'react';
import { setDoc, getDocs, doc } from 'firebase/firestore';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';

const AddTableForm = (props) => {
    const { setAddingTable } = props
    const [ design, setDesign ] = useState('')
    const tableNameRef = useRef('')
    const [ existingTable, setExistingTable ] = useState('')
    const [ error, setError ] = useState('')

    // Push the new table to firestore
    useEffect(() => {
        if(tableNameRef.current.value !== '' && existingTable === false){
            const tableRef = 
                doc(db, 'tables', `${tableNameRef.current.value.replace(/ /g, '').toLowerCase()}`)
                if(design === ''){
                    setError('Choose a table design')
                    setTimeout(() => {
                        setError('')
                    }, 2000)
                }
                if(design !== ''){
                    setDoc(tableRef , {
                        name:tableNameRef.current.value,
                        searchId:tableNameRef.current.value.replace(/ /g, '').toLowerCase(),
                        tableStyle:design,
                        top:'625px',
                        left:'925px',
                        serverOwner:'none',
                    })
                setAddingTable(false)
                }
            }
        if(tableNameRef.current.value !== '' && existingTable === true){
            setError('Table already exists')
            setTimeout(() => {
                setError('')
            }, 2000)
        }
    }, [existingTable, setAddingTable, design])

    const handleAddTable = (e) => {
        e.preventDefault()
        const symbols = /[`!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~]/
        const newTableName = tableNameRef?.current.value
        if(symbols.test(newTableName)){
            setError('Symbols cannot be used in table names')
        } else {
            const confirmTableInfo = async () => {
                let tablesList = []
                getDocs(tableMapCollectionRef).then(snap => {
                    snap.forEach(doc => {                
                        tablesList.push(doc.data().name)
                    })            
                    // check if table table is in the list
                    const tableExists = tablesList.indexOf(tableNameRef?.current.value) > -1
                    setExistingTable(tableExists)
                    const designOptions = document.getElementsByName('design');
                        for (var radio of designOptions){
                            if (radio.checked) {    
                                setDesign(radio.value)
                            }
                        }
                })
            }
            confirmTableInfo()
        }
    }

    const handleCancel = () => {
        props.setAddingTable(false)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
    }

    return(
        <div className='popUpModal'>
            <div className='tableFormContainer'>
                <h2>Add New Table?</h2>

                <form onSubmit={handleSubmit}>
                    <div className='tableFormName'>
                        <label htmlFor='tableName'>Table Name:</label>
                        <input
                            id='tableName'
                            name='tableName'
                            type='text'
                            ref={tableNameRef}
                            />
                    </div>

                    <fieldset>
                        <legend>Select Table Style</legend>
                            <div className='tableFormStyle'>
                                <label htmlFor='design'>Square</label>
                                <input 
                                    id='square'
                                    type='radio'
                                    name='design'
                                    value='squareTable'
                                    />
                                <div 
                                    className='table squareTable demoTable'
                                    ><p>Table #</p>
                                </div>
                            </div>

                            <div className='tableFormStyle'>
                                <label htmlFor='design'>Diamond</label>
                                <input 
                                    id='diamond'
                                    type='radio'
                                    name='design'
                                    value='diamondTable'
                                    />
                                <div 
                                    className='table diamondTable demoTable'
                                    ><p>Table #</p>
                                </div>
                            </div>

                            <div className='tableFormStyle'>
                                <label htmlFor='Design'>Rectangle</label>
                                <input  
                                    id='rectangle'
                                    type='radio'
                                    name='design'
                                    value='rectangleTable'
                                    />
                                <div 
                                    className='table rectangleTable demoTable'
                                    ><p>Table #</p>
                                </div>
                            </div>

                            <div className='tableFormStyle'>
                                <label htmlFor='Design'>Circle</label>
                                <input  
                                    id='circle'
                                    type='radio'
                                    name='design'
                                    value='circleTable'
                                    />
                                <div 
                                    className='table circleTable demoTable'
                                    ><p>Table #</p>
                                </div>
                            </div>
                    </fieldset>
                </form>

                {error
                    ? <div className='padError'>{error}</div>
                    : null
                }

                <footer>
                    <button
                        className='newItemButton'
                        onClick={handleAddTable}
                        >Add Table
                    </button>
                    <button
                        className='newItemButton deleteItemButton'
                        onClick={handleCancel}
                        >Cancel
                    </button>
                </footer>
            </div>
        </div>
    )
}

export default AddTableForm;
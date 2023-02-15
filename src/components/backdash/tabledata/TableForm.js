import { useState, useRef, useEffect } from 'react';
import { setDoc, getDocs, doc } from 'firebase/firestore';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';

const TableForm = (props) => {
    const [ design, setDesign ] = useState('squareTable')
    const tableNameRef = useRef('')
    const [ existingTable, setExistingTable ] = useState('')

    useEffect(() => {
        if(tableNameRef.current.value !== '' && existingTable === false){
            const designOptions = document.getElementsByName('design');
            const tableRef = doc(db, 'tables', `${tableNameRef.current.value.toLowerCase()}`)
                for (var radio of designOptions){
                    if (radio.checked) {    
                        setDesign(radio.value)
                    }
                }
            setDoc(tableRef , {
                name:tableNameRef.current.value,
                tableStyle:design,
                top:'50px',
                left:'50px',
            });
            props.setAddingTable(false)
            }
        if(tableNameRef.current.value !== '' && existingTable === true){
            alert('Table already exists')
        }
    }, [existingTable, props, design])

    const handleAddTable = (e) => {
        e.preventDefault()
        getDocs(tableMapCollectionRef).then(snap => {
            let tablesList = []
            snap.forEach(doc => {                
                tablesList.push(doc.data().name)
            })            
            // check if table table is in the list
            const tableExists = tablesList.indexOf(tableNameRef?.current.value) > -1
            setExistingTable(tableExists)
        })
    }

    const handleCancel = () => {
        props.setAddingTable(false)
    }

    return(
        <div className='tableFormModal'>
            <div className='tableFormContainer'>
                <header>
                    <h2>Add New Table?</h2>
                </header>

                <form>
                    <div className='tableFormName'>
                        <label htmlFor='tableName'>Table Name</label>
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

                <footer>
                    <button onClick={handleAddTable}>Add Table</button>
                    <button onClick={handleCancel}>Cancel</button>
                </footer>
            </div>
        </div>
    )
}

export default TableForm;
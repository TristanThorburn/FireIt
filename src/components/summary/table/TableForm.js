import { useState, useRef } from 'react';
import { addDoc } from 'firebase/firestore';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';

const TableForm = (props) => {
    const [ design, setDesign ] = useState('')
    const tableNameRef = useRef('')

    const handleAddTable = (e) => {
        e.preventDefault()
        if(tableNameRef.current.value !== ''){
            addDoc(tableMapCollectionRef, {
                name:tableNameRef.current.value,
                tableStyle:design,
                top:'50px',
                left:'50px',
            });
            props.setAddingTable(false)
            }
    }

    const handleCancel = () => {
        props.setAddingTable(false)
    }

    const handleDesign = (e) => {
        setDesign(e.target.value)
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
                                <label htmlFor='design'>Diamond</label>
                                <input 
                                    id='diamond'
                                    type='radio'
                                    name='design'
                                    value='diamondTable'
                                    onClick={handleDesign}
                                    />
                                <div 
                                    className='table diamondTable demoTable'
                                    ><p>Table #</p>
                                </div>
                            </div>

                            <div className='tableFormStyle'>
                                <label htmlFor='design'>Square</label>
                                <input 
                                    id='square'
                                    type='radio'
                                    name='design'
                                    value='squareTable'
                                    onClick={handleDesign}
                                    />
                                <div 
                                    className='table squareTable demoTable'
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
                                    onClick={handleDesign}
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
                                    onClick={handleDesign}
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
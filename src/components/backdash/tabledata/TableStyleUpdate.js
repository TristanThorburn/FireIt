import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../firebase';

const TableStyleUpdate = (props) => {
    const [ design, setDesign ] = useState('')

    const handleCancel = () => {
        props.setStylingTable(false)
    }

    const handleDesign = (e) => {
        setDesign(e.target.value)
    }

    const handleUpdate = (e) => {
        e.preventDefault()
        const docRef = doc(db, 'tables', props.tableId)
        updateDoc(docRef, {
            tableStyle:design
        })
        setDesign('')
        props.setStylingTable(false)
    }

    return(
        <div className='tableFormModal'>
            <div className='tableFormContainer'>
                <header>
                    <h2>Update {props.activeTable}</h2>
                </header>

                <form onSubmit={handleUpdate}>
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
                    <button
                        className='newItemButton'
                        onClick={handleUpdate}
                        >Update Table
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

export default TableStyleUpdate;
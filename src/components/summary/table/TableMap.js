import { useEffect, useState } from 'react';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';
import TableForm from './TableForm';

const TableMap = (props) => {
    const tableMap = document.querySelector('.tableMap');
    const tables = document.querySelectorAll('.table');
    const [ tablesData, setTablesData ] = useState([]);
    const [ enableDrag, setEnableDrag ] = useState(false);
    const [ addingTable, setAddingTable ] = useState(false);

    useEffect(() => {
        const q = query(tableMapCollectionRef, orderBy('name'));
        const unsubscribe = onSnapshot(q, snapshot => {
            setTablesData(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        return unsubscribe
    },[])

    
    const handleTest = () => {
        console.log(tableMap.children)
    }

    const handleAllowDragging = () => {
        if(enableDrag === false){
            setEnableDrag(true)
            tables.forEach((table) => {
                table.setAttribute('draggable', true)
            })
        }
        if(enableDrag === true){
            setEnableDrag(false)
            tables.forEach((table) => {
                table.removeAttribute('draggable', true)
            })
        }
    }

    const handleAddTable = () => {
            setAddingTable(!addingTable)
    }

    const handleSave = () => {
        tables.forEach((table)=>{
            const docRef = doc(db, 'tables', table.id)
            updateDoc(docRef, {
                left:table.style.left,
                top:table.style.top,
            })
        })
        props.setMapUpdateable(false)
    }

    const handleDrag = (e) => {
        if(enableDrag === true){
            const element = e.target
            element.style.border='2px solid white'

            const mouseMove = (e) => {
                element.style.left = e.clientX+'px'
                element.style.top = e.clientY+'px'

                const setTable = () => {
                    element.style.border='none'
                    tableMap.removeEventListener('mousemove', mouseMove)
                    tableMap.removeEventListener('click', setTable)
                }

                tableMap.addEventListener('click', setTable)
            }

            tableMap.addEventListener('mousemove', mouseMove)
        }
    }

    const handleNoPropagation = (e) => {
        e.stopPropagation()
    }

    return(
        <>
            {props.updateable === true
                ?<div className='updateMapNav'>
                    <ul>
                        <li><button onClick={handleTest}>Test</button></li>
                        <li>
                            {enableDrag
                            ?<button onClick={handleAllowDragging}>Disable Table Dragging</button>
                            :<button onClick={handleAllowDragging}>Enable Table Dragging</button>
                        }</li>
                        <li><button onClick={handleAddTable}>Add Table</button></li>
                        <li><button>Change Table Style</button></li>
                        <li><button>Delete Table</button></li>
                        <li><button onClick={handleSave}>Save Updates</button></li>
                    </ul>
                    {enableDrag 
                        ? <p className='tableMapDirections'>Click to move, click again to set</p>
                        : null
                    }  
                </div>
                :null
            }

            {addingTable
                ?<TableForm setAddingTable={setAddingTable}/>
                :<ul className='tableMap'>            
                    {tablesData.map(table => 
                        <li 
                            key={table.id}
                            id={table.id}
                            className={['table', table.data?.tableStyle].join(' ')}
                            onClick={handleDrag}
                            style={{left:table?.data.left, top: table?.data.top}}
                            >
                                <p onClick={handleNoPropagation}>{table.data.name}</p>
                        </li>)}
                </ul>
            }
            
        </>
    )
}

export default TableMap;
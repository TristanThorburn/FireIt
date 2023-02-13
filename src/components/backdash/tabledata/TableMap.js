import { useEffect, useState } from 'react';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import TableForm from './TableForm';
import TableStyleUpdate from './TableStyleUpdate';

const TableMap = (props) => {
    const tableMap = document.querySelector('.tableMap');
    const tables = document.querySelectorAll('.table');
    const [ tablesData, setTablesData ] = useState([]);
    const [ enableDrag, setEnableDrag ] = useState(false);
    const [ addingTable, setAddingTable ] = useState(false);    
    const [ stylingTable, setStylingTable ] = useState(false);
    const [ selectedTable, setSelectedTable ] = useState('');
    const activeTable = document.getElementById(`${selectedTable}`)

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
    }

    const handleAllowDragging = () => {
        if(enableDrag === false){
            setEnableDrag(true)
        }
        if(enableDrag === true){
            setEnableDrag(false)
        }
    }

    const handleAddTable = () => {
            setAddingTable(!addingTable)
    }

    const handleUpdateStyle = () => {
        if(selectedTable !== ''){
            setStylingTable(!stylingTable)
        } else {
            alert('Select a Table')
        }
    }

    const handleDelete = (e) => {
        const docRef = doc(db, 'tables', `${selectedTable}`)
        if(props.id !== ''){
            deleteDoc(docRef)
            setSelectedTable('')
        }
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

    const handleTableClick = (e) => {
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
        setSelectedTable(e.target.id)
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
                            ?<button onClick={handleAllowDragging}>Disable Table Reposition</button>
                            :<button onClick={handleAllowDragging}>Enable Table Reposition</button>
                        }</li>
                        <li><button onClick={handleSave}>Save Table Positions</button></li>
                        <li><button onClick={handleAddTable}>Add Table</button></li>
                        <li><button onClick={handleUpdateStyle}>Change Table Style</button></li>
                        <li><button onClick={handleDelete}>Delete Table</button></li>
                    </ul>
                    {enableDrag 
                        ? <p className='tableMapDirections'>Click to move, click again to set</p>
                        : selectedTable
                            ? <p className='tableMapDirections'>Selected Table: {activeTable?.innerText}</p>
                            : <p className='tableMapDirections'>No Selected Table</p>
                    }  
                </div>
                :null
            }

            {addingTable
                ? <TableForm
                    setAddingTable={setAddingTable}
                    />
                : stylingTable
                    ? <TableStyleUpdate
                        setStylingTable={setStylingTable}
                        activeTable={activeTable?.innerText}
                        tableId={selectedTable}
                        />
                    :<ul className='tableMap'>            
                        {tablesData.map(table => 
                            <li 
                                key={table.id}
                                id={table.id}
                                className={['table', table.data?.tableStyle].join(' ')}
                                onClick={handleTableClick}
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
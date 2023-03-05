import { useEffect, useState } from 'react';
import { useTable } from './../../../contexts/TableContext';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from 'firebase/firestore';
import TableForm from './TableForm';
import TableStyleUpdate from './TableStyleUpdate';

const TableMap = (props) => {
    const tableMap = document.querySelector('.tableMap');
    const tables = document.querySelectorAll('.table');
    const { setContextTable } = useTable()
    const [ tablesData, setTablesData ] = useState([]);
    const [ enableDrag, setEnableDrag ] = useState(false);
    const [ addingTable, setAddingTable ] = useState(false);    
    const [ stylingTable, setStylingTable ] = useState(false);
    const [ selectedTable, setSelectedTable ] = useState('');

    // Populate screen from table Data
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
        const docRef = doc(db, 'tables', `${selectedTable.id}`)
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
        setEnableDrag(false)
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
        if(props.tableTabActive){
            props.setTableTabActive(false);
            props.setMenuTabActive(true);
            setContextTable(e.target.id);
        }
        setSelectedTable(e.target)
    }

    const handleNoPropagation = (e) => {
        if(props.tableTabActive){
            props.setTableTabActive(false);
            props.setMenuTabActive(true);
            setContextTable(e.target.parentElement.id);
        }
        e.stopPropagation()
    }

    return(
        <>
            {props.updateable === true
                ?<div className='updateMapNav'>
                    <ul>
                        <li><button
                            className='newItemButton'
                            onClick={handleSave}
                            >Save Table Positions
                        </button></li>
                        <li><button
                            className='newItemButton'
                            onClick={handleAddTable}
                            >Add Table
                        </button></li>
                        <li>
                            {enableDrag
                            ?<button
                                className='newItemButton deleteItemButton'
                                onClick={handleAllowDragging}
                                >Disable Table Reposition
                            </button>
                            :<button
                                className='newItemButton enableDrag'
                                onClick={handleAllowDragging}
                                >Enable Table Reposition
                            </button>
                        }</li>
                        <li><button
                            className='newItemButton'
                            onClick={handleUpdateStyle}
                            >Change Table Style
                        </button></li>
                        <li><button
                            className='newItemButton deleteItemButton'
                            onClick={handleDelete}
                            >Delete Table
                        </button></li>
                    </ul>
                    {enableDrag 
                        ? <p className='tableMapDirections'>Click to move, click again to set</p>
                        : selectedTable
                            ? <p className='tableMapDirections'>Selected Table: {selectedTable?.innerText}</p>
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
                        activeTable={selectedTable?.innerText}
                        tableId={selectedTable.id}
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
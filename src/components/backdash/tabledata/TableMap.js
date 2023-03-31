import { useEffect, useState } from 'react';
import { useTable } from './../../../contexts/TableContext';
import { useAuth } from '../../../contexts/AuthContext';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, getDoc } from 'firebase/firestore';
import AddTableForm from './AddTableForm';
import TableStyleUpdate from './TableStyleUpdate';
import FireItAlert from '../../help/FireItAlert';

const TableMap = (props) => {
    const { setContextTable } = useTable();
    const { employeeContext } = useAuth();
    const { frontTableMapData, tableTabActive } = props
    const [ tablesData, setTablesData ] = useState([]);
    const [ enableDrag, setEnableDrag ] = useState(false);
    const [ addingTable, setAddingTable ] = useState(false);    
    const [ stylingTable, setStylingTable ] = useState(false);
    const [ selectedTable, setSelectedTable ] = useState('');
    const [ fireItAlert, setFireItAlert ] = useState('')
    const [ showTableOwner, setShowTableOwner ] = useState('')
    const tableMap = document.querySelector('.tableMap');
    const tables = document.querySelectorAll('.table');

    // Populate screen from table Data
    useEffect(() => {
        if(tableTabActive === true){
            setTablesData(frontTableMapData)
        }
        if(tableTabActive === undefined){
            const getTables = async () => {
                const q = query(tableMapCollectionRef, orderBy('name'));
                const unsubscribe = onSnapshot(q, snapshot => {
                    setTablesData(snapshot.docs.map(doc => ({
                        id: doc.id,
                        data: doc.data()
                    })))
                })
                return unsubscribe
            }
            getTables()
        }
    },[tableTabActive, frontTableMapData])

    // Turn off enable drag when map is not updateable
    useEffect(() => {
        if(props.updateable){
            setEnableDrag(false)
        }
    }, [props.updateable])
    
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
        if(selectedTable.id){
            setStylingTable(!stylingTable)
        }
        if(!selectedTable.id){
            setFireItAlert('TableMap no table')
            console.log(selectedTable.id)
        }
    }

    const handleDelete = async (e) => {
        if(selectedTable.id){
            const docRef = doc(db, 'tables', selectedTable.id)
            await getDoc(docRef)
            .then(doc => {
                if(doc.data().serverOwner === 'none'){
                    deleteDoc(docRef)
                    setSelectedTable('')
                }
                if(doc.data().serverOwner !== 'none'){
                    setShowTableOwner(doc.data().serverOwner)
                    setFireItAlert('TableMap delete table in use')
                }
            })
        }
        else {
            setFireItAlert('TableMap no table')
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

    const handleTableClickCapture = (e) => {
        if(enableDrag === true){
            const element = e.currentTarget
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
            if(e.currentTarget.dataset.inuse === 'none' 
                || e.currentTarget.dataset.inuse === employeeContext.employeeNumber){
                props.setTableTabActive(false);
                props.setMenuTabActive(true);
                setContextTable(e.currentTarget.id);
            }
            if(e.currentTarget.dataset.inuse !== 'none' 
            || e.currentTarget.dataset.inuse !== employeeContext.employeeNumber){
                setShowTableOwner(e.currentTarget.dataset.inuse)
                setFireItAlert('TableMap table in use')
            }
        }
        setSelectedTable(e.currentTarget)
    }

    return(
        <section className='tableDisplay'>
            {fireItAlert !==''
                ? <FireItAlert
                    fireItAlert={fireItAlert}
                    setFireItAlert={setFireItAlert}
                    showTableOwner={showTableOwner}
                    setShowTableOwner={setShowTableOwner}
                    />
                : null
            }

            {addingTable
                ? <AddTableForm
                    setAddingTable={setAddingTable}
                    />
                : stylingTable
                    ? <TableStyleUpdate
                        setStylingTable={setStylingTable}
                        activeTable={selectedTable?.innerText}
                        tableId={selectedTable.id}
                        />
                    :<ul className='tableMap'>
                            {tablesData.map(table => {
                                return(
                                    <li 
                                        key={table.id}
                                        id={table.id}
                                        data-inuse={table.data?.serverOwner}
                                        className={[
                                            'table', 
                                            table.data?.tableStyle, 
                                            table.data?.serverOwner !== 'none' 
                                                ? 'tableInUse'
                                                : null,
                                            ].join(' ')}
                                        onClickCapture={handleTableClickCapture}
                                        style={{left:table?.data.left, top: table?.data.top}}
                                        >
                                            <p>
                                                {table.data.name}
                                            </p>
                                    </li>
                                )}                                
                            )}
                        </ul>
            }    

            
            {props.updateable === true
                ?<div className='updateMapNav'>
                    <ul>
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
                            onClick={handleSave}
                            >Save Table Positions
                        </button></li>
                        <li><button
                            className='newItemButton'
                            onClick={handleAddTable}
                            >Add Table
                        </button></li>
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
        </section>
    )
}

export default TableMap;
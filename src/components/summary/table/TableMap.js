import { useEffect, useState } from 'react';
import { tableMapCollectionRef } from '../../../library/firestoreCollections';
import { db } from '../../../firebase';
import { onSnapshot, query, orderBy, updateDoc, doc } from 'firebase/firestore';

const TableMap = (props) => {
    const tables = document.querySelectorAll('.table')
    const tableMap = document.querySelector('.tableMap')
    const [ tablesData, setTablesData ] = useState([])

    useEffect(() => {
        if(props.updateable === true){
            tables.forEach((table) => {
                table.setAttribute('draggable', true)
            })
        }
        if(props.updateable === false){
            tables.forEach((table) => {
                table.setAttribute('draggable', false)
            })
        }        
    },[props.updateable, tables])

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

    const handleDrag = (e) => {
        if(props.updateable === true){
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

    const handleSave = () => {
        tables.forEach((table)=>{
            console.log(table.id, ':', table.style.left, table.style.top)
            const docRef = doc(db, 'tables', table.id)
            updateDoc(docRef, {
                left:table.style.left,
                top:table.style.top,
            })
        })
        props.setMapUpdateable(false)
    }

    return(
        <>
            {props.updateable === true
                ?<button onClick={handleSave}>Save Updates</button>
                :null
            }
            <ul className='tableMap'>
            {tablesData.map(table => 
                <li 
                    key={table.id}
                    id={table.id}
                    className='table'
                    onClick={handleDrag}
                    style={{left:table?.data.left, top: table?.data.top}}
                    >
                        <p onClick={handleNoPropagation}>{table.data.name}</p>
                </li>)}
            </ul>
        </>
    )
}

export default TableMap;
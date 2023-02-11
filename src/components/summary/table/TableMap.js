import { useEffect } from 'react';

const TableMap = (props) => {
    const tables = document.querySelectorAll('.table')
    const tableMap = document.querySelector('.tableMap')

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

    const handleDrag = (e) => {
        if(props.updateable === true){
            const element = e.target
            element.style.border='2px solid white'

            const mouseMove = (e) => {
                element.style.left = e.clientX+'px'
                element.style.top = e.clientY+'px'

                tableMap.addEventListener('click', function setTable () {
                    element.style.border='none'
                    tableMap.removeEventListener('mousemove', mouseMove)
                    tableMap.removeEventListener('mouseup', setTable)
                })
            }

            tableMap.addEventListener('mousemove', mouseMove)
        }
    }

    const handleNoPropagation = (e) => {
        e.stopPropagation()
    }

    return(
        <ul className='tableMap'>
            <li onClick={handleDrag} className='table tableOne'>
                <p onClick={handleNoPropagation}>Table 1</p></li>
            <li onClick={handleDrag} className='table tableTwo'>
                <p onClick={handleNoPropagation}>Table 2</p></li>
            <li onClick={handleDrag} className='table tableThree'>
                <p onClick={handleNoPropagation}>Table 3</p></li>
            <li onClick={handleDrag} className='table tableFour'>
                <p onClick={handleNoPropagation}>Table 4</p></li>
            <li onClick={handleDrag} className='table tableFive'>
                <p onClick={handleNoPropagation}>Table 5</p></li>
            <li onClick={handleDrag} className='table tableSix'>
                <p onClick={handleNoPropagation}>Table 6</p></li>
            <li onClick={handleDrag} className='table tableSeven'>
                <p onClick={handleNoPropagation}>Table 7</p></li>
            <li onClick={handleDrag} className='table tableEight'>
                <p onClick={handleNoPropagation}>Table 8</p></li>
            <li onClick={handleDrag} className='table tableNine'>
                <p onClick={handleNoPropagation}>Table 9</p></li>
            <li onClick={handleDrag} className='table tableTen'>
                <p onClick={handleNoPropagation}>Table 10</p></li>
        </ul>
    )
}

export default TableMap;
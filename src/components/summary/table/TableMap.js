import { useEffect } from 'react';

const TableMap = (props) => {

    useEffect(() => {
        const tables = document.querySelectorAll('.table')

        if(props.updateable === true){
            tables.forEach((table) => {
                table.setAttribute('draggable', true)
            })
            // tables.addEventListener.forEach((table) => {

            // })
        }
        if(props.updateable === false){
            tables.forEach((table) => {
                table.setAttribute('draggable', false)
            })
        }
        
    },[props.updateable])

    return(
        <ul className='tableMap'>
            <li className='table tableOne'><p>Table 1</p></li>
            <li className='table tableTwo'><p>Table 2</p></li>
            <li className='table tableThree'><p>Table 3</p></li>
            <li className='table tableFour'><p>Table 4</p></li>
            <li className='table tableFive'><p>Table 5</p></li>
            <li className='table tableSix'><p>Table 6</p></li>
            <li className='table tableSeven'><p>Table 7</p></li>
            <li className='table tableEight'><p>Table 8</p></li>
            <li className='table tableNine'><p>Table 9</p></li>
            <li className='table tableTen'><p>Table 10</p></li>
        </ul>
    )
}

export default TableMap;
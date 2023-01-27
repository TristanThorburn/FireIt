import TableTabNav from './table/TableTabNav';

const TableTab = () => {
    return(
        <div className='tableTab'>
            <ul className='tableMap'>
                <li className='tableOne'><p>Table 1</p></li>
                <li className='tableTwo'><p>Table 2</p></li>
                <li className='tableThree'><p>Table 3</p></li>
                <li className='tableFour'><p>Table 4</p></li>
                <li className='tableFive'><p>Table 5</p></li>
                <li className='tableSix'><p>Table 6</p></li>
                <li className='tableSeven'><p>Table 7</p></li>
                <li className='tableEight'><p>Table 8</p></li>
                <li className='tableNine'><p>Table 9</p></li>
                <li className='tableTen'><p>Table 10</p></li>
            </ul>
            <TableTabNav />
        </div>
    )
}

export default TableTab;
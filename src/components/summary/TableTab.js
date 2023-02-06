import TableTabNav from './table/TableTabNav';
import TableMap from './table/TableMap';

const TableTab = () => {
    return(
        <div className='tableTab'>
            <TableMap />
            <TableTabNav />
        </div>
    )
}

export default TableTab;
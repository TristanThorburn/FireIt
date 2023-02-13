import TableTabNav from './navs/TableTabNav';
import TableMap from '../backdash/tabledata/TableMap';

const TableTab = () => {
    return(
        <div className='tableTab'>
            <TableMap />
            <TableTabNav />
        </div>
    )
}

export default TableTab;
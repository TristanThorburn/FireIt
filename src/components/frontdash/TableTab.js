import TableTabNav from './navs/TableTabNav';
import TableMap from '../backdash/tabledata/TableMap';

const TableTab = (props) => {
    return(
        <div className='tableTab'>
            <TableMap
                 tableTabActive={props.tableTabActive}
                 setTableTabActive={props.setTableTabActive}
                 setMenuTabActive={props.setMenuTabActive}
                 />
            <TableTabNav />
        </div>
    )
}

export default TableTab;
import TableTabNav from './navs/TableTabNav';
import TableMap from '../backdash/tabledata/TableMap';
import ServerKeyPad from '../keypads/ServerKeyPad';
import { useState } from 'react';

const TableTab = (props) => {
    const [ managerKeyPadActive, setManagerKeyPadActive ] = useState(false);

    return(
        <div className='tableTab'>
            {managerKeyPadActive
                ? <ServerKeyPad
                    managerKeyPadActive={managerKeyPadActive}
                    setManagerKeyPadActive={setManagerKeyPadActive}
                    />
                : null
            }

            <TableMap
                 tableTabActive={props.tableTabActive}
                 setTableTabActive={props.setTableTabActive}
                 setMenuTabActive={props.setMenuTabActive}
                 />
            <TableTabNav 
                setManagerKeyPadActive={setManagerKeyPadActive}
                setHelpModal={props.setHelpModal}
                setMessageOfTheDay={props.setMessageOfTheDay}
                />
        </div>
    )
}

export default TableTab;
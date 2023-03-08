import { Link } from 'react-router-dom';
import TableMap from '../backdash/tabledata/TableMap';
import { useState } from 'react';
import BackDashHelp from '../help/BackDashHelp';

const TableMapData = () => {
    const [ mapUpdateable, setMapUpdateable ] = useState(false);
    const [ tableSetupHelp, setTableSetupHelp ] = useState(false);

    const enableUpdate = () => {
        setMapUpdateable(true)
    }

    const disableUpdate = () => {
        setMapUpdateable(false)
    }

    const handleTableSetupHelp = () => {
        setTableSetupHelp(true)
    }

    return(
        <div className='tableData'>
            <header>
                <Link to='/backend-dash'>
                    <button className='newItemButton deleteItemButton'>Back to Dashboard</button>
                </Link>

                <div className='backDashHeader'>
                    <h2>Table Setup</h2>
                    <div className='infoButton'>
                        <button onClick={handleTableSetupHelp}>🔥</button>
                        <p onClick={handleTableSetupHelp}>INFO</p>
                    </div>
                </div>

                {tableSetupHelp
                    ? <BackDashHelp
                        tableSetupHelp={tableSetupHelp}
                        setTableSetupHelp={setTableSetupHelp}
                        />
                    : null
                }

                {mapUpdateable
                    ? <button
                        className='newItemButton deleteItemButton'
                        onClick={disableUpdate}
                        >Disable Updates
                    </button>
                    : <button
                        className='newItemButton'
                        onClick={enableUpdate}
                        >Update Map
                    </button>
                }
            </header>
            
            <div className='tableTab'>
                <TableMap updateable={mapUpdateable} setMapUpdateable={setMapUpdateable}/>
            </div>
        </div>
    )
}

export default TableMapData;
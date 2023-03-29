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

                <div className='backTitleAndInfo'>
                    <h2>Table Setup</h2>
                    <button onClickCapture={handleTableSetupHelp} className='infoButton'>
                        🔥
                        <p>INFO</p>
                    </button>
                </div>

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
            
            {tableSetupHelp
                    ? <BackDashHelp
                        tableSetupHelp={tableSetupHelp}
                        setTableSetupHelp={setTableSetupHelp}
                        />
                    : null
                }

            <TableMap updateable={mapUpdateable} setMapUpdateable={setMapUpdateable}/>
        </div>
    )
}

export default TableMapData;
import { Link } from 'react-router-dom';
import TableMap from '../backdash/tabledata/TableMap';
import TableTabNav from '../frontdash/navs/TableTabNav';
import { useState } from 'react';

const TableMapData = () => {
    const [ mapUpdateable, setMapUpdateable ] = useState(false)

    const enableUpdate = () => {
        setMapUpdateable(true)
    }

    const disableUpdate = () => {
        setMapUpdateable(false)
    }

    return(
        <div className='tableBackDash'>
            <header>
                <Link to='/backend-dash'>
                    <button className='newItemButton deleteItemButton'>Back to Dashboard</button>
                </Link>

                <h2>Tables and Map Setup</h2>

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
                <TableTabNav />
            </div>
        </div>
    )
}

export default TableMapData;